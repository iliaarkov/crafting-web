/* eslint-disable react/only-export-components, react-refresh/only-export-components */
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

export interface CustomProject {
  id: string;
  titleRu: string;
  titleEn: string;
  tagRu: string;
  tagEn: string;
  descRu: string;
  descEn: string;
  p2Ru: string;
  p2En: string;
  p3Ru?: string;
  p3En?: string;
  whatDoneRu: string[];
  whatDoneEn: string[];
  image: string;
  images: string[];
}

export interface TariffOverride {
  currentPrice?: string;
  oldPrice?: string;
  currentPriceSub?: string;
}

export interface CmsContent {
  heroBadgeRu: string;
  heroBadgeEn: string;
  aboutPhotoUrl: string;
  aboutPhotoScale: number;
  aboutPhotoPositionX: number;
  aboutPhotoPositionY: number;
  aboutP1Ru: string;
  aboutP1En: string;
  aboutP2Ru: string;
  aboutP2En: string;
  tariffsRu: Record<string, TariffOverride>;
  tariffsEn: Record<string, TariffOverride>;
  customProjects: CustomProject[];
}

interface CmsContextType {
  leads: Lead[];
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;
  submitLead: (data: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; sentToTelegram: boolean; message?: string }>;
  isCmsOpen: boolean;
  setIsCmsOpen: (open: boolean) => void;
  exportLeadsCsv: () => void;
  cmsContent: CmsContent;
  updateCmsContent: (updater: (prev: CmsContent) => CmsContent) => void;
  addCustomProject: (project: CustomProject) => void;
  deleteCustomProject: (id: string) => void;
  updateCustomProject: (id: string, updated: CustomProject) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const LEADS_STORAGE_KEY = 'ilya_arkov_leads';
const CONTENT_STORAGE_KEY = 'ilya_arkov_cms_content';

const defaultContent: CmsContent = {
  heroBadgeRu: 'Стартовая стоимость для ближайших 3 проектов',
  heroBadgeEn: 'Starter rates available for next 3 projects',
  aboutPhotoUrl: '',
  aboutPhotoScale: 1,
  aboutPhotoPositionX: 50,
  aboutPhotoPositionY: 50,
  aboutP1Ru: '',
  aboutP1En: '',
  aboutP2Ru: '',
  aboutP2En: '',
  tariffsRu: {},
  tariffsEn: {},
  customProjects: [],
};

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [cmsContent, setCmsContent] = useState<CmsContent>(() => {
    try {
      const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        return { ...defaultContent, ...JSON.parse(saved) };
      }
    } catch {}
    return defaultContent;
  });

  const [isCmsOpen, setIsCmsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(cmsContent));
    } catch {}
  }, [cmsContent]);

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const clearAllLeads = () => {
    setLeads([]);
  };

  const updateCmsContent = (updater: (prev: CmsContent) => CmsContent) => {
    setCmsContent(prev => updater(prev));
  };

  const addCustomProject = (project: CustomProject) => {
    setCmsContent(prev => ({
      ...prev,
      customProjects: [project, ...(prev.customProjects || [])],
    }));
  };

  const deleteCustomProject = (id: string) => {
    setCmsContent(prev => ({
      ...prev,
      customProjects: (prev.customProjects || []).filter(p => p.id !== id),
    }));
  };

  const updateCustomProject = (id: string, updated: CustomProject) => {
    setCmsContent(prev => ({
      ...prev,
      customProjects: (prev.customProjects || []).map(p => p.id === id ? updated : p),
    }));
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

    newLead.sentToTelegram = sentToTelegram;
    setLeads(prev => [newLead, ...prev]);

    return {
      success: true,
      sentToTelegram,
    };
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
        updateLeadStatus,
        deleteLead,
        clearAllLeads,
        submitLead,
        isCmsOpen,
        setIsCmsOpen,
        exportLeadsCsv,
        cmsContent,
        updateCmsContent,
        addCustomProject,
        deleteCustomProject,
        updateCustomProject,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};