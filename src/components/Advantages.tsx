import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Smartphone, UserCheck, Clock, CheckCircle2, Headphones, Sparkles } from 'lucide-react';

export const Advantages: React.FC = () => {
  const { t } = useLanguage();

  const advantageIcons = [
    Sparkles,
    Smartphone,
    UserCheck,
    Clock,
    CheckCircle2,
    Headphones,
  ];

  return (
    <section className="py-16 lg:py-24 relative border-t border-b border-white/5 bg-gradient-to-b from-transparent via-cyan-950/[0.07] to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.advantages.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.advantages.items.map((item, idx) => {
            const Icon = advantageIcons[idx % advantageIcons.length];
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col justify-start hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
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