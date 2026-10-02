import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, X, Code2, Users2 } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            {t.header.nav.about}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.about.title}
          </h2>
        </div>

        {/* Верхняя карточка истории и услуг */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
              <p>{t.about.p1}</p>
              <p className="text-slate-400">{t.about.p2}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-cyan-300 text-sm font-medium">
              <Users2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>{t.about.directComm}</span>
            </div>
          </div>

          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1017]/80 to-[#0e1624]/80">
            <div className="flex items-center gap-2 text-white font-semibold text-base mb-5">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <h3>{t.about.canIncludeTitle}</h3>
            </div>
            <ul className="space-y-3">
              {t.about.canIncludeList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Кому подойдет vs Кому не подойдет */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 bg-[#091214]/60">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg mb-6">
              <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <h3>{t.about.whoIsItForTitle}</h3>
            </div>
            <ul className="space-y-3.5">
              {t.about.whoIsItForList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#120f12]/40">
            <div className="flex items-center gap-2.5 text-rose-400/90 font-bold text-lg mb-6">
              <div className="w-7 h-7 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <X className="w-4 h-4 text-rose-400" />
              </div>
              <h3>{t.about.whoIsNotForTitle}</h3>
            </div>
            <ul className="space-y-3.5">
              {t.about.whoIsNotForList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};