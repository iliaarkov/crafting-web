import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  contact: string;
  tariff?: string;
  service?: string;
  projectUrl?: string;
  message?: string;
  lang: string;
  status: 'new' | 'in_progress' | 'completed' | 'archived';
  sentToTelegram?: boolean;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface CmsContextType {
  leads: Lead[];
  telegramConfig: TelegramConfig;
  updateTelegramConfig: (config: TelegramConfig) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;
  submitLead: (data: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; sentToTelegram: boolean; message?: string }>;
  isCmsOpen: boolean;
  setIsCmsOpen: (open: boolean) => void;
  exportLeadsCsv: () => void;
  sendTestTelegramNotification: () => Promise<{ success: boolean; message: string }>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const LEADS_STORAGE_KEY = 'ilya_arkov_leads';
const TG_STORAGE_KEY = 'ilya_arkov_tg_config';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>(() => {
    try {
      const saved = localStorage.getItem(TG_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { botToken: '', chatId: '' };
  });

  const [isCmsOpen, setIsCmsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch {}
  }, [leads]);

  const updateTelegramConfig = (config: TelegramConfig) => {
    setTelegramConfig(config);
    try {
      localStorage.setItem(TG_STORAGE_KEY, JSON.stringify(config));
    } catch {}
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const clearAllLeads = () => {
    setLeads([]);
  };

  const submitLead = async (data: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: Lead = {
      ...data,
      id: 'lead_' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new',
      sentToTelegram: false,
    };

    let sentToTelegram = false;

    // 1. Попытка отправки через серверную функцию /api/lead (Vercel)
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.sentToTelegram) {
          sentToTelegram = true;
        }
      }
    } catch (err) {
      console.warn('Backend /api/lead call failed or running in static mode:', err);
    }

    // 2. Клиентский fallback, если токен введен прямо в настройках CMS
    if (!sentToTelegram && telegramConfig.botToken && telegramConfig.chatId) {
      try {
        const text = `🚀 <b>Новая заявка с сайта!</b>\n\n` +
          `👤 <b>Имя:</b> ${data.name || 'Не указано'}\n` +
          `📱 <b>Контакт:</b> ${data.contact || 'Не указано'}\n` +
          `💼 <b>Тариф:</b> ${data.tariff || 'Не выбран'}\n` +
          `🔗 <b>Проект:</b> ${data.projectUrl || 'Нет'}\n` +
          `📝 <b>Сообщение:</b>\n${data.message || 'Без описания'}\n\n` +
          `🌐 <b>Язык:</b> ${data.lang || 'ru'}\n` +
          `🕒 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}`;

        const tgRes = await fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramConfig.chatId,
            text,
            parse_mode: 'HTML',
          }),
        });
        const tgData = await tgRes.json();
        if (tgData.ok) {
          sentToTelegram = true;
        }
      } catch (tgErr) {
        console.warn('Client-side Telegram dispatch failed:', tgErr);
      }
    }

    newLead.sentToTelegram = sentToTelegram;
    setLeads(prev => [newLead, ...prev]);

    return {
      success: true,
      sentToTelegram,
    };
  };

  const sendTestTelegramNotification = async () => {
    if (!telegramConfig.botToken || !telegramConfig.chatId) {
      return { success: false, message: 'Укажите Bot Token и Chat ID' };
    }
    try {
      const res = await fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramConfig.chatId,
          text: `🔔 <b>Тестовое уведомление!</b>\nИнтеграция Telegram бота для сайта Ильи Арькова успешно подключена.`,
          parse_mode: 'HTML',
        }),
      });
      const data = await res.json();
      if (data.ok) {
        return { success: true, message: 'Тестовое сообщение успешно отправлено в ваш Telegram!' };
      }
      return { success: false, message: data.description || 'Ошибка Telegram API' };
    } catch (e: any) {
      return { success: false, message: e.message || 'Не удалось отправить сообщение' };
    }
  };

  const exportLeadsCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Contact', 'Tariff', 'Project URL', 'Message', 'Language', 'Status', 'SentToTelegram'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleString(),
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.contact || '').replace(/"/g, '""')}"`,
      `"${(l.tariff || '').replace(/"/g, '""')}"`,
      `"${(l.projectUrl || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      l.lang,
      l.status,
      l.sentToTelegram ? 'Yes' : 'No'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_ilya_arkov_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <CmsContext.Provider
      value={{
        leads,
        telegramConfig,
        updateTelegramConfig,
        updateLeadStatus,
        deleteLead,
        clearAllLeads,
        submitLead,
        isCmsOpen,
        setIsCmsOpen,
        exportLeadsCsv,
        sendTestTelegramNotification,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};