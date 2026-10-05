import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCms, Lead, CustomProject } from '../context/CmsContext';
import {
  X,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Plus,
  Image as ImageIcon,
  DollarSign,
  FolderPlus,
} from 'lucide-react';

export const CmsModal: React.FC = () => {
  const { t, lang } = useLanguage();
  const {
    leads,
    isCmsOpen,
    setIsCmsOpen,
    updateLeadStatus,
    deleteLead,
    clearAllLeads,
    exportLeadsCsv,
    cmsContent,
    updateCmsContent,
    addCustomProject,
    deleteCustomProject,
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

  const [activeTab, setActiveTab] = useState<'leads' | 'badge' | 'about' | 'projects' | 'pricing'>('leads');

  // Hero Badge
  const [badgeRu, setBadgeRu] = useState(cmsContent.heroBadgeRu || '');
  const [badgeEn, setBadgeEn] = useState(cmsContent.heroBadgeEn || '');
  const [badgeSaved, setBadgeSaved] = useState(false);

  // About
  const [aboutPhoto, setAboutPhoto] = useState(cmsContent.aboutPhotoUrl || '');
  const [aboutScale, setAboutScale] = useState(cmsContent.aboutPhotoScale || 1);
  const [aboutPosX, setAboutPosX] = useState(cmsContent.aboutPhotoPositionX ?? 50);
  const [aboutPosY, setAboutPosY] = useState(cmsContent.aboutPhotoPositionY ?? 50);
  const [aboutP1Ru, setAboutP1Ru] = useState(cmsContent.aboutP1Ru || '');
  const [aboutP1En, setAboutP1En] = useState(cmsContent.aboutP1En || '');
  const [aboutP2Ru, setAboutP2Ru] = useState(cmsContent.aboutP2Ru || '');
  const [aboutP2En, setAboutP2En] = useState(cmsContent.aboutP2En || '');
  const [aboutSaved, setAboutSaved] = useState(false);

  // New Project
  const [newTitleRu, setNewTitleRu] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTagRu, setNewTagRu] = useState('Коммерческий проект');
  const [newTagEn, setNewTagEn] = useState('Commercial Project');
  const [newDescRu, setNewDescRu] = useState('');
  const [newDescEn, setNewDescEn] = useState('');
  const [newP2Ru, setNewP2Ru] = useState('');
  const [newP2En, setNewP2En] = useState('');
  const [newWhatDoneRuText, setNewWhatDoneRuText] = useState('');
  const [newWhatDoneEnText, setNewWhatDoneEnText] = useState('');
  const [newProjectImages, setNewProjectImages] = useState<string[]>([]);
  const [projectSavedToast, setProjectSavedToast] = useState(false);

  // Tariffs
  const [tariffsRu, setTariffsRu] = useState(cmsContent.tariffsRu || {});
  const [tariffsSaved, setTariffsSaved] = useState(false);

  if (!isCmsOpen) return null;

  // Безопасное чтение пароля без жестко закодированных дефолтов
  const envPasswordRaw = import.meta.env.CMS_PASSWORD || import.meta.env.VITE_CMS_PASSWORD;
  const requiredPassword = typeof envPasswordRaw === 'string' ? envPasswordRaw.trim() : '';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!requiredPassword) {
      setAuthError(
        lang === 'ru'
          ? 'Переменная CMS_PASSWORD не настроена в Vercel или .env'
          : 'CMS_PASSWORD variable is not configured in Vercel or .env'
      );
      return;
    }

    if (attempts >= 5) {
      setAuthError(
        lang === 'ru'
          ? 'Превышено количество попыток. Попробуйте позже.'
          : 'Too many attempts. Please try again later.'
      );
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAboutPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateCmsContent((prev) => ({
      ...prev,
      aboutPhotoUrl: aboutPhoto,
      aboutPhotoScale: aboutScale,
      aboutPhotoPositionX: aboutPosX,
      aboutPhotoPositionY: aboutPosY,
      aboutP1Ru: aboutP1Ru.trim(),
      aboutP1En: aboutP1En.trim(),
      aboutP2Ru: aboutP2Ru.trim(),
      aboutP2En: aboutP2En.trim(),
    }));
    setAboutSaved(true);
    setTimeout(() => setAboutSaved(false), 2500);
  };

  const handleSaveBadge = (e: React.FormEvent) => {
    e.preventDefault();
    updateCmsContent((prev) => ({
      ...prev,
      heroBadgeRu: badgeRu.trim(),
      heroBadgeEn: badgeEn.trim(),
    }));
    setBadgeSaved(true);
    setTimeout(() => setBadgeSaved(false), 2500);
  };

  const handleProjectImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setNewProjectImages((prev) => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleRu.trim() || newProjectImages.length === 0) {
      alert(lang === 'ru' ? 'Укажите название проекта и добавьте хотя бы 1 фото' : 'Provide project title and at least 1 image');
      return;
    }

    const whatDoneRu = newWhatDoneRuText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const whatDoneEn = newWhatDoneEnText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const newProject: CustomProject = {
      id: 'custom_proj_' + Date.now(),
      titleRu: newTitleRu.trim(),
      titleEn: newTitleEn.trim() || newTitleRu.trim(),
      tagRu: newTagRu.trim() || 'Проект',
      tagEn: newTagEn.trim() || 'Project',
      descRu: newDescRu.trim(),
      descEn: newDescEn.trim() || newDescRu.trim(),
      p2Ru: newP2Ru.trim(),
      p2En: newP2En.trim() || newP2Ru.trim(),
      whatDoneRu: whatDoneRu.length > 0 ? whatDoneRu : ['индивидуальная разработка;', 'адаптивный дизайн;'],
      whatDoneEn: whatDoneEn.length > 0 ? whatDoneEn : ['custom web engineering;', 'responsive layout;'],
      image: newProjectImages[0],
      images: newProjectImages,
    };

    addCustomProject(newProject);
    setNewTitleRu('');
    setNewTitleEn('');
    setNewDescRu('');
    setNewDescEn('');
    setNewP2Ru('');
    setNewP2En('');
    setNewWhatDoneRuText('');
    setNewWhatDoneEnText('');
    setNewProjectImages([]);
    setProjectSavedToast(true);
    setTimeout(() => setProjectSavedToast(false), 2500);
  };

  const handleSaveTariffs = (e: React.FormEvent) => {
    e.preventDefault();
    updateCmsContent((prev) => ({
      ...prev,
      tariffsRu,
    }));
    setTariffsSaved(true);
    setTimeout(() => setTariffsSaved(false), 2500);
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
        className="relative w-full max-w-5xl h-[90vh] glass-panel rounded-3xl border border-white/15 bg-[#0b0e14]/98 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0d121c]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Панель управления (CMS)</span>
            </h2>
            {isAuthenticated && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Администратор
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
                  ? 'Панель управления защищена паролем. Введите ваш пароль администратора.'
                  : 'Dashboard is password-protected. Enter your administrator password.'}
              </p>

              {!requiredPassword && (
                <div className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-left leading-relaxed">
                  <strong>Внимание:</strong> переменная <code>CMS_PASSWORD</code> не обнаружена в Vercel. 
                  Добавьте её в <em>Vercel &rarr; Settings &rarr; Environment Variables</em> с именем <code>CMS_PASSWORD</code> и выполните Redeploy.
                </div>
              )}

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
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                  className="w-full py-3 px-4 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-lg shadow-cyan-500/20 transition-all text-sm cursor-pointer disabled:opacity-50 font-bold"
                >
                  {lang === 'ru' ? 'Войти в панель' : 'Unlock Dashboard'}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-500">
                Защищено переменной: <code>CMS_PASSWORD</code>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto bg-[#090d14] shrink-0 text-xs sm:text-sm">
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Заявки</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/10">{leads.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('badge')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'badge'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Статус в шапке</span>
                </button>

                <button
                  onClick={() => setActiveTab('about')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'about'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Обо мне (Фото/Текст)</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'projects'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Проекты (+Добавить)</span>
                </button>

                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'pricing'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Цены тарифов</span>
                </button>
              </div>

              {activeTab === 'leads' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={exportLeadsCsv}
                    disabled={leads.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Удалить все заявки из истории?')) {
                        clearAllLeads();
                      }
                    }}
                    disabled={leads.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Очистить</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* TAB 1: ЗАЯВКИ */}
              {activeTab === 'leads' && (
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
                              {new Date(lead.createdAt).toLocaleString('ru-RU')}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                            <div>
                              <span className="text-slate-400 block text-xs mb-1">Контакт:</span>
                              <span className="font-semibold text-cyan-300 break-all select-all">
                                {lead.contact}
                              </span>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-xs mb-1">Тариф:</span>
                              <span className="text-white">{lead.tariff || '—'}</span>
                            </div>

                            <div>
                              <span className="text-slate-400 block text-xs mb-1">Ссылка на проект:</span>
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
                              <span className="text-slate-400 block text-xs font-medium mb-1">Сообщение:</span>
                              <p className="whitespace-pre-wrap">{lead.message}</p>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 mr-1">Сменить статус:</span>
                              {(['new', 'in_progress', 'completed', 'archived'] as const).map((st) => (
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
                              ))}
                            </div>

                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                              title="Удалить заявку"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: СТАТУС В ШАПКЕ */}
              {activeTab === 'badge' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      <span>Статус в самом верху сайта (Hero Badge)</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                      Здесь вы можете написать любой текст, как статус в Instagram (например: «Открыт к 2 новым проектам на октябрь», «Скидка на запуск до пятницы» и т.д.).
                    </p>

                    <form onSubmit={handleSaveBadge} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Текст на русском языке (RU):
                        </label>
                        <input
                          type="text"
                          value={badgeRu}
                          onChange={(e) => setBadgeRu(e.target.value)}
                          placeholder="Стартовая стоимость для ближайших 3 проектов"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Текст на английском языке (EN):
                        </label>
                        <input
                          type="text"
                          value={badgeEn}
                          onChange={(e) => setBadgeEn(e.target.value)}
                          placeholder="Starter rates available for next 3 projects"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
                        >
                          Сохранить статус
                        </button>
                      </div>

                      {badgeSaved && (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Текст статуса успешно обновлен на сайте!</span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 3: ОБО МНЕ */}
              {activeTab === 'about' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-cyan-400" />
                      <span>Фотография и кадрирование в блоке «Обо мне»</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                      Загрузите новую фотографию любого формата (даже 9:16). С помощью ползунков выберите нужный зум и позицию, чтобы фото идеально сидело в квадратной рамке. Старое фото мгновенно заменяется.
                    </p>

                    <form onSubmit={handleSaveAbout} className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-black/40 border border-white/5">
                        <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl bg-slate-950 shrink-0">
                          {aboutPhoto ? (
                            <img
                              src={aboutPhoto}
                              alt="Предпросмотр"
                              style={{
                                transform: `scale(${aboutScale})`,
                                objectPosition: `${aboutPosX}% ${aboutPosY}%`,
                              }}
                              className="w-full h-full object-cover transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs p-3 text-center">
                              <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                              <span>Фото не выбрано (используется /images/ilya.jpg)</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-4 w-full text-xs">
                          <div>
                            <label className="block text-slate-300 font-semibold mb-1.5">
                              Загрузить новую фотографию:
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-slate-300 mb-1">
                              <span>Масштаб (Zoom):</span>
                              <span className="font-mono text-cyan-300">{Math.round(aboutScale * 100)}%</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="2.5"
                              step="0.05"
                              value={aboutScale}
                              onChange={(e) => setAboutScale(parseFloat(e.target.value))}
                              className="w-full accent-cyan-400 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-slate-300 mb-1">
                              <span>Смещение по горизонтали (X):</span>
                              <span className="font-mono text-cyan-300">{aboutPosX}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="1"
                              value={aboutPosX}
                              onChange={(e) => setAboutPosX(parseInt(e.target.value))}
                              className="w-full accent-cyan-400 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-slate-300 mb-1">
                              <span>Смещение по вертикали (Y):</span>
                              <span className="font-mono text-cyan-300">{aboutPosY}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="1"
                              value={aboutPosY}
                              onChange={(e) => setAboutPosY(parseInt(e.target.value))}
                              className="w-full accent-cyan-400 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-bold text-white">Тексты описания в блоке «Обо мне»</h4>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Первый абзац (RU):
                          </label>
                          <textarea
                            rows={3}
                            value={aboutP1Ru}
                            onChange={(e) => setAboutP1Ru(e.target.value)}
                            placeholder="Меня зовут Илья Арков. Я веб-разработчик..."
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Второй абзац (RU):
                          </label>
                          <textarea
                            rows={3}
                            value={aboutP2Ru}
                            onChange={(e) => setAboutP2Ru(e.target.value)}
                            placeholder="Моя задача — аккуратно собрать предоставленную вами информацию..."
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Первый абзац (EN):
                            </label>
                            <textarea
                              rows={2}
                              value={aboutP1En}
                              onChange={(e) => setAboutP1En(e.target.value)}
                              placeholder="My name is Ilia Arkov..."
                              className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Второй абзац (EN):
                            </label>
                            <textarea
                              rows={2}
                              value={aboutP2En}
                              onChange={(e) => setAboutP2En(e.target.value)}
                              placeholder="My goal is to structure provided materials..."
                              className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
                        >
                          Сохранить изменения «Обо мне»
                        </button>

                        {aboutPhoto && (
                          <button
                            type="button"
                            onClick={() => {
                              setAboutPhoto('');
                              setAboutScale(1);
                              setAboutPosX(50);
                              setAboutPosY(50);
                            }}
                            className="px-4 py-2.5 rounded-xl text-xs text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                          >
                            Сбросить фото
                          </button>
                        )}
                      </div>

                      {aboutSaved && (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Блок «Обо мне» и фотография успешно обновлены!</span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 4: ДОБАВЛЕНИЕ ПРОЕКТОВ */}
              {activeTab === 'projects' && (
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <FolderPlus className="w-5 h-5 text-cyan-400" />
                      <span>Добавить новый проект в портфолио</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                      Загрузите фотографии проекта (можно несколько — они станут автоматической каруселью), укажите название и выполненные задачи. Проект сразу отобразится на сайте.
                    </p>

                    <form onSubmit={handleCreateProject} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Название проекта (RU) <span className="text-cyan-400">*</span>:
                          </label>
                          <input
                            type="text"
                            required
                            value={newTitleRu}
                            onChange={(e) => setNewTitleRu(e.target.value)}
                            placeholder="Сайт для архитектурного бюро"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Название проекта (EN):
                          </label>
                          <input
                            type="text"
                            value={newTitleEn}
                            onChange={(e) => setNewTitleEn(e.target.value)}
                            placeholder="Architecture Studio Website"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Метка/Тег (RU):
                          </label>
                          <input
                            type="text"
                            value={newTagRu}
                            onChange={(e) => setNewTagRu(e.target.value)}
                            placeholder="Реальный коммерческий проект"
                            className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Метка/Тег (EN):
                          </label>
                          <input
                            type="text"
                            value={newTagEn}
                            onChange={(e) => setNewTagEn(e.target.value)}
                            placeholder="Commercial Client Project"
                            className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                        <label className="block text-xs font-semibold text-slate-300">
                          Фотографии проекта (можно выбрать сразу несколько):
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleProjectImagesUpload}
                          className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                        />

                        {newProjectImages.length > 0 && (
                          <div className="flex flex-wrap gap-2.5 pt-2">
                            {newProjectImages.map((img, idx) => (
                              <div key={idx} className="relative w-20 h-14 rounded-lg overflow-hidden border border-cyan-400/40 group">
                                <img src={img} alt="Превью" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setNewProjectImages((prev) => prev.filter((_, i) => i !== idx))}
                                  className="absolute inset-0 bg-black/70 flex items-center justify-center text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Краткое описание (RU):
                        </label>
                        <textarea
                          rows={2}
                          value={newDescRu}
                          onChange={(e) => setNewDescRu(e.target.value)}
                          placeholder="Сайт, который собрал портфолио работ, услуги и способы связаться..."
                          className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Что сделано (каждый пункт с новой строки):
                        </label>
                        <textarea
                          rows={3}
                          value={newWhatDoneRuText}
                          onChange={(e) => setNewWhatDoneRuText(e.target.value)}
                          placeholder={'индивидуальный дизайн\nадаптивная вёрстка под смартфоны\nинтеграция с Telegram\nпубликация на домене'}
                          className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Опубликовать проект в портфолио</span>
                      </button>

                      {projectSavedToast && (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Проект успешно добавлен на сайт!</span>
                        </div>
                      )}
                    </form>
                  </div>

                  {cmsContent.customProjects && cmsContent.customProjects.length > 0 && (
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-sm font-bold text-white">
                        Добавленные вами проекты ({cmsContent.customProjects.length}):
                      </h4>
                      <div className="space-y-3">
                        {cmsContent.customProjects.map((p) => (
                          <div
                            key={p.id}
                            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.titleRu} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                              <div>
                                <h5 className="font-bold text-white text-xs sm:text-sm">{p.titleRu}</h5>
                                <span className="text-[11px] text-cyan-400">{p.tagRu} · {p.images.length} фото</span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (confirm(`Удалить проект "${p.titleRu}"?`)) {
                                  deleteCustomProject(p.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors cursor-pointer"
                              title="Удалить проект"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: ЦЕНЫ ТАРИФОВ */}
              {activeTab === 'pricing' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-cyan-400" />
                      <span>Изменение стоимости тарифов</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                      Укажите новую текущую цену или зачеркнутую цену для любого формата. Оставьте поле пустым, чтобы вернуть стандартную цену.
                    </p>

                    <form onSubmit={handleSaveTariffs} className="space-y-6">
                      {[
                        { id: 'start', title: 'Тариф «СТАРТ» (визитка)' },
                        { id: 'optimal', title: 'Тариф «ОПТИМАЛЬНЫЙ» (эксперт/бизнес)' },
                        { id: 'business', title: 'Тариф «БИЗНЕС» (с базой данных)' },
                        { id: 'redesign', title: 'Переделка существующего сайта' },
                      ].map((tPlan) => {
                        const curRu = tariffsRu[tPlan.id]?.currentPrice || '';
                        const oldRu = tariffsRu[tPlan.id]?.oldPrice || '';

                        return (
                          <div key={tPlan.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                            <span className="font-bold text-white text-xs sm:text-sm block text-cyan-300">
                              {tPlan.title}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                  Текущая цена (напр. 39 000 ₽):
                                </label>
                                <input
                                  type="text"
                                  value={curRu}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTariffsRu((prev) => ({
                                      ...prev,
                                      [tPlan.id]: { ...prev[tPlan.id], currentPrice: val },
                                    }));
                                  }}
                                  placeholder="39 000 ₽"
                                  className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                  Зачеркнутая цена (напр. 55 000 ₽):
                                </label>
                                <input
                                  type="text"
                                  value={oldRu}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setTariffsRu((prev) => ({
                                      ...prev,
                                      [tPlan.id]: { ...prev[tPlan.id], oldPrice: val },
                                    }));
                                  }}
                                  placeholder="55 000 ₽"
                                  className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
                        >
                          Сохранить новые цены
                        </button>
                      </div>

                      {tariffsSaved && (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Цены тарифов успешно обновлены на сайте!</span>
                        </div>
                      )}
                    </form>
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