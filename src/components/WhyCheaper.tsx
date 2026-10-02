import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, HeartHandshake, Zap, Award } from 'lucide-react';

export const WhyCheaper: React.FC = () => {
  const { t } = useLanguage();

  const reasonIcons = [Award, HeartHandshake, ShieldCheck, Zap];

  return (
    <section id="why-cheaper" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            {t.whyCheaper.preTitle}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.whyCheaper.title}
          </h2>
          <div className="space-y-2 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>{t.whyCheaper.intro1}</p>
            <p className="text-cyan-200/90 font-medium">{t.whyCheaper.intro2}</p>
          </div>
        </div>

        {/* 4 причины сниженной цены */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {t.whyCheaper.reasons.map((reason, idx) => {
            const Icon = reasonIcons[idx % reasonIcons.length];
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-start hover:border-cyan-400/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                  {reason.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Финальное резюме */}
        <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl text-center max-w-4xl mx-auto">
          <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
            {t.whyCheaper.finalText}
          </p>
        </div>
      </div>
    </section>
  );
};