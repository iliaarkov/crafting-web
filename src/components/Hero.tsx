import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sparkles, Zap, ShieldCheck, UserCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      const offsetTop = elem.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Неоновые градиенты на фоне */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-cyan-600/20 via-sky-500/15 to-blue-700/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-blue-600/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Фоновая микро-сетка */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Бейдж стартовой стоимости */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-8 backdrop-blur-md shadow-lg shadow-cyan-950/40">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Главный заголовок */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.12] mb-6 max-w-4xl mx-auto text-balance">
          {t.hero.title}
        </h1>

        {/* Описание */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-5 text-balance">
          {t.hero.description}
        </p>

        {/* Дополнительные абзацы */}
        <div className="space-y-3 max-w-2xl mx-auto mb-8 text-sm sm:text-base text-slate-400 leading-normal">
          <p>{t.hero.subDescription1}</p>
          <p className="text-slate-300 font-medium">{t.hero.subDescription2}</p>
        </div>

        {/* Плашка стоимости и срока */}
        <div className="inline-block px-5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-300 font-semibold text-sm sm:text-base tracking-wide mb-10 shadow-inner">
          {t.hero.priceTag}
        </div>

        {/* Кнопки действия */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <span>{t.hero.ctaSecondary}</span>
          </a>
        </div>

        {/* Карточки надежности */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3.5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-base">{t.hero.metrics.days}</div>
              <div className="text-xs text-slate-400">{t.hero.metrics.daysLabel}</div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3.5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-base">{t.hero.metrics.price}</div>
              <div className="text-xs text-slate-400">{t.hero.metrics.priceLabel}</div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3.5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-base">{t.hero.metrics.direct}</div>
              <div className="text-xs text-slate-400">{t.hero.metrics.directLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};