import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { PrivacyModal } from './PrivacyModal';
import { Send, Mail, Shield, Database, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { setIsCmsOpen, leads } = useCms();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 lg:py-20 border-t border-white/10 relative bg-[#040609]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Инфо о бренде */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="text-xl font-bold text-white tracking-tight">
                {t.footer.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Ссылки и контакты */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-300">
            <a
              href="https://t.me/arkovilya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              <span>{t.footer.telegram}</span>
            </a>

            <a
              href="mailto:arkovilia7@gmail.com"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{t.footer.email}</span>
            </a>

            <button
              onClick={() => setPrivacyOpen(true)}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4 text-slate-400" />
              <span>{t.footer.privacy}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Наверх"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Нижняя полоса копирайта и CMS */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{t.footer.copyright}</div>

          <button
            onClick={() => setIsCmsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.footer.cmsButton}</span>
            {leads.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 ml-0.5"></span>
            )}
          </button>
        </div>
      </div>

      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
};