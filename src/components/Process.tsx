import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Process: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            {t.header.nav.process}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.process.title}
          </h2>
        </div>

        {/* 7 шагов сотрудничества */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {t.process.steps.map((step, idx) => (
            <div
              key={idx}
              className={`glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-cyan-400/30 transition-all ${
                idx === 6 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="text-cyan-400 font-mono font-bold text-2xl mb-4 flex items-center justify-between">
                  <span>{step.number}</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400/30"></span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {step.title}
                </h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};