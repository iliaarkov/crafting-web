import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, HelpCircle, FolderHeart, ArrowRightCircle, Building2, ShieldAlert } from 'lucide-react';

export const Solutions: React.FC = () => {
  const { t } = useLanguage();

  const solutionIcons = [
    FileText,
    HelpCircle,
    FolderHeart,
    ArrowRightCircle,
    Building2,
    ShieldAlert,
  ];

  return (
    <section id="solutions" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            {t.header.nav.solutions}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 text-balance">
            {t.solutions.title}
          </h2>
          <div className="space-y-2 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>{t.solutions.intro1}</p>
            <p className="text-cyan-200/90 font-medium">{t.solutions.intro2}</p>
          </div>
        </div>

        {/* 6 карточек решений */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.solutions.items.map((item, idx) => {
            const Icon = solutionIcons[idx % solutionIcons.length];
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};