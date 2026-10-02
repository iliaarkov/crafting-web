import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle } from 'lucide-react';

export const TechStack: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            Tech Stack
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.tools.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.tools.intro}
          </p>
        </div>

        {/* Сетка технологий */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {t.tools.items.map((tool, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-cyan-400 font-bold text-lg group-hover:text-cyan-300 transition-colors">
                  {tool.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors"></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        {/* Подпись гарантии */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 flex items-center gap-3.5 text-cyan-200 text-sm sm:text-base font-medium">
          <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{t.tools.signature}</span>
        </div>
      </div>
    </section>
  );
};