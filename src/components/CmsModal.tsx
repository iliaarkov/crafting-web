import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCms, Lead } from '../context/CmsContext';
import {
  X,
  Send,
  Download,
  Trash2,
  Key,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  AlertTriangle,
  Lock,
  LogOut,
  ShieldAlert,
} from 'lucide-react';

export const CmsModal: React.FC = () => {
  const { t, lang } = useLanguage();
  const {
    leads,
    isCmsOpen,
    setIsCmsOpen,
    telegramConfig,
    updateTelegramConfig,
    updateLeadStatus,
    deleteLead,
    clearAllLeads,
    exportLeadsCsv,
    sendTestTelegramNotification,
  } = useCms();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ilya_cms_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const [botToken, setBotToken] = useState(telegramConfig.botToken || '');
  const [chatId, setChatId] = useState(telegramConfig.chatId || '');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'settings'>('leads');

  if (!isCmsOpen) return null;

  const requiredPassword = (import.meta.env.CMS_PASSWORD || 'ilya2026').trim();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (attempts >= 5) {
      setAuthError(lang === 'ru' ? 'Превышено количество попыток. Попробуйте позже.' : 'Too many attempts. Please try again later.');
      return;
    }

    if (passwordInput.trim() === requiredPassword) {
      try {
        sessionStorage.setItem('ilya_cms_auth', 'true');
      } catch {}
      setIsAuthenticated(true);
      setAuthError(null);
      setPasswordInput('');
    } else {
      setAttempts((prev) => prev + 1);
      setAuthError(
        lang === 'ru'
          ? `Неверный пароль доступа (${attempts + 1}/5).`
          : `Invalid access password (${attempts + 1}/5).`
      );
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('ilya_cms_auth');
    } catch {}
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateTelegramConfig({ botToken, chatId });
    setTestResult({
      success: true,
      message: t.cms.savedToast,
    });
  };

  const handleTestSend = async () => {
    setTesting(true);
    setTestResult(null);
    const res = await sendTestTelegramNotification();
    setTestResult(res);
    setTesting(false);
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'in_progress':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'archived':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsCmsOpen(false)}
    >
      <div
        className="relative w-full max-w-5xl h-[88vh] glass-panel rounded-3xl border border-white/15 bg-[#0b0e14]/98 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0d121c]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {t.cms.title}
            </h2>
            {isAuthenticated && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {leads.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 transition-colors cursor-pointer"
                title={lang === 'ru' ? 'Выйти из сессии' : 'Log out'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'ru' ? 'Выйти' : 'Log out'}</span>
              </button>
            )}

            <button
              onClick={() => setIsCmsOpen(false)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label={t.cms.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-[#090d14] to-[#0b0e14]">
            <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-center shadow-2xl relative">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {lang === 'ru' ? 'Доступ ограничен' : 'Access Restricted'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                {lang === 'ru'
                  ? 'Панель управления заявками защищена паролем. Введите мастер-пароль разработчика.'
                  : 'The CMS dashboard is password-protected. Enter developer master password.'}
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder={lang === 'ru' ? 'Введите пароль...' : 'Enter password...'}
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm font-mono placeholder:text-slate-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2 text-left">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={attempts >= 5}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-lg shadow-cyan-500/20 transition-all text-sm cursor-pointer disabled:opacity-50"
                >
                  {lang === 'ru' ? 'Войти в панель' : 'Unlock Dashboard'}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-500">
                {lang === 'ru'
                  ? 'Задается переменной: CMS_PASSWORD'
                  : 'Configured via CMS_PASSWORD'}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between gap-4 bg-[#090d14] shrink-0 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ru' ? 'Заявки' : 'Inbound Leads'} ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ru' ? 'Настройки Telegram' : 'Telegram Settings'}
                </button>
              </div>

              {activeTab === 'leads' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportLeadsCsv}
                    disabled={leads.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.cms.exportCsv}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(lang === 'ru' ? 'Удалить все заявки из истории?' : 'Clear all lead history?')) {
                        clearAllLeads();
                      }
                    }}
                    disabled={leads.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.cms.clearLeads}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {activeTab === 'leads' ? (
                <div>
                  {leads.length === 0 ? (
                    <div className="text-center py-24 text-slate-400">
                      <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-base">{t.cms.noLeads}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/20 transition-all flex flex-col gap-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="font-bold text-white text-base">
                                {lead.name}
                              </span>
                              <span
                                className={`text-xs px-2.5 py-0.5 rounded-full border ${getStatusColor(
                                  lead.status
                                )}`}
                              >
                                {t.cms.status[lead.status]}
                              </span>
                              {lead.sentToTelegram && (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-600/30">
                                  ✓ Telegram
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-slate-400 font-mono">
                              {new Date(lead.createdAt).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                            <div>
                              <span className="text-slate-400 block text-xs mb-1">
                                {lang === 'ru' ? 'Контакт:' : 'Contact:'}
                              </span>
                              <span className="font-semibold text-cyan-300 break-all select-all">
                                {lead.contact}
                              </span>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-xs mb-1">
                                {lang === 'ru' ? 'Тариф / Задача:' : 'Tariff / Request:'}
                              </span>
                              <span className="text-white">
                                {lead.tariff || '—'}
                              </span>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-xs mb-1">
                                {lang === 'ru' ? 'Ссылка на проект:' : 'Project URL:'}
                              </span>
                              {lead.projectUrl ? (
                                <a
                                  href={lead.projectUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-cyan-400 hover:underline break-all"
                                >
                                  {lead.projectUrl}
                                </a>
                              ) : (
                                <span className="text-slate-500">—</span>
                              )}
                            </div>
                          </div>

                          {lead.message && (
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-slate-300">
                              <span className="text-slate-400 block text-xs font-medium mb-1">
                                {lang === 'ru' ? 'Описание задачи:' : 'Message:'}
                              </span>
                              <p className="whitespace-pre-wrap">{lead.message}</p>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 mr-1">
                                {lang === 'ru' ? 'Сменить статус:' : 'Change Status:'}
                              </span>
                              {(['new', 'in_progress', 'completed', 'archived'] as const).map(
                                (st) => (
                                  <button
                                    key={st}
                                    onClick={() => updateLeadStatus(lead.id, st)}
                                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                                      lead.status === st
                                        ? 'bg-cyan-400 text-slate-950 font-bold'
                                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                    }`}
                                  >
                                    {t.cms.status[st]}
                                  </button>
                                )
                              )}
                            </div>

                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                              title={lang === 'ru' ? 'Удалить заявку' : 'Delete Lead'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Key className="w-5 h-5 text-cyan-400" />
                      <span>{t.cms.telegramSettingsTitle}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                      {lang === 'ru'
                        ? 'Для автоматических уведомлений в продакшене настройте переменные TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в Vercel. Здесь вы можете ввести их прямо сейчас для проверки работы бота прямо из браузера.'
                        : 'For automatic notifications in production, set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel. You can also test and override them directly here.'}
                    </p>

                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          {t.cms.telegramTokenLabel}
                        </label>
                        <input
                          type="text"
                          value={botToken}
                          onChange={(e) => setBotToken(e.target.value)}
                          placeholder="123456789:ABCDefghIJklmnOPqrstUVwxyz"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          {t.cms.telegramChatIdLabel}
                        </label>
                        <input
                          type="text"
                          value={chatId}
                          onChange={(e) => setChatId(e.target.value)}
                          placeholder="e.g. 987654321 or -100123456789"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm font-mono"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
                        >
                          {t.cms.saveSettings}
                        </button>

                        <button
                          type="button"
                          onClick={handleTestSend}
                          disabled={testing || !botToken || !chatId}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 disabled:opacity-40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{testing ? 'Отправка...' : t.cms.testSend}</span>
                        </button>
                      </div>
                    </form>

                    {testResult && (
                      <div
                        className={`mt-4 p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
                          testResult.success
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                        }`}
                      >
                        {testResult.success ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                        )}
                        <span>{testResult.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CmsModal;