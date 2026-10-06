import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Smartphone,
  UserCheck,
  Clock,
  Headphones,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const Advantages: React.FC = () => {
  const { t, lang } = useLanguage();

  const advantageIcons = [
    Sparkles,
    Smartphone,
    UserCheck,
    Clock,
    ShieldCheck,
    Headphones,
  ];

  // Массив фиксированных звезд для космического фона (чтобы не пересчитывать при рендере)
  const cosmicStars = [
    { top: '8%', left: '12%', size: '2px', opacity: '0.6', delay: '0s' },
    { top: '15%', left: '85%', size: '3px', opacity: '0.8', delay: '1s' },
    { top: '22%', left: '42%', size: '1.5px', opacity: '0.5', delay: '2s' },
    { top: '35%', left: '7%', size: '2px', opacity: '0.7', delay: '0.5s' },
    { top: '45%', left: '92%', size: '2.5px', opacity: '0.6', delay: '1.5s' },
    { top: '55%', left: '25%', size: '1.5px', opacity: '0.4', delay: '2.5s' },
    { top: '65%', left: '78%', size: '2px', opacity: '0.7', delay: '0.8s' },
    { top: '75%', left: '15%', size: '3px', opacity: '0.8', delay: '1.2s' },
    { top: '85%', left: '60%', size: '2px', opacity: '0.5', delay: '2.2s' },
    { top: '92%', left: '38%', size: '1.5px', opacity: '0.6', delay: '1.8s' },
    { top: '18%', left: '65%', size: '2px', opacity: '0.5', delay: '0.3s' },
    { top: '40%', left: '50%', size: '1px', opacity: '0.7', delay: '1.7s' },
    { top: '70%', left: '90%', size: '2px', opacity: '0.6', delay: '2.7s' },
    { top: '28%', left: '28%', size: '2px', opacity: '0.4', delay: '1.1s' },
    { top: '82%', left: '82%', size: '1.5px', opacity: '0.7', delay: '0.9s' },
  ];

  return (
    <section
      id="advantages"
      className="py-20 lg:py-28 relative border-t border-b border-white/5 overflow-hidden bg-[#04060a]"
    >
      {/* ================= КОСМИЧЕСКИЙ ФОН С СУПЕРГЛУБИНОЙ ================= */}
      {/* 1. Глубокие космические туманности (Nebulae) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-indigo-900/15 via-purple-900/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[650px] h-[450px] bg-gradient-to-tl from-cyan-950/25 via-blue-950/20 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-sky-900/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* 2. Тонкая космическая световая дуга на горизонте */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* 3. Мерцающие звезды на заднем плане */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {cosmicStars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-200 animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: star.delay,
              animationDuration: '3s',
              boxShadow: `0 0 6px 1px rgba(165, 243, 252, ${star.opacity})`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Стандарты запуска' : 'Launch Standards'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.advantages.title}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {lang === 'ru'
              ? 'Всё, чтобы ваш проект запустился быстро, работал стабильно и без лишней траты нервов.'
              : 'Everything for a swift launch, robust uptime, and zero hassle.'}
          </p>
        </div>

        {/* ================= СЕТКА КАРТОЧЕК С ТОЧЕЧНОЙ СЕТКОЙ И ПЕРСПЕКТИВОЙ К КРАЯМ ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.advantages.items.map((item, idx) => {
            const Icon = advantageIcons[idx % advantageIcons.length];
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#070b13]/85 backdrop-blur-xl flex flex-col justify-start hover:border-cyan-400/40 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.18)] transition-all duration-300 overflow-hidden"
              >
                {/* 
                  ФОН КАРТОЧКИ: СЕТКА ИЗ ТОЧЕК С 3D-ПЕРСПЕКТИВОЙ К КРАЯМ БЛОКА
                  Сетка точек слегка наклонена в перспективе, а радиальная маска 
                  плавно рассеивает точки к границам, создавая ощущение искривлённого космического пространства
                */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none -z-10">
                  {/* Перспективный слой точечной матрицы */}
                  <div
                    className="absolute -inset-6 opacity-35 group-hover:opacity-65 transition-opacity duration-500"
                    style={{
                      perspective: '450px',
                      perspectiveOrigin: '50% 50%',
                    }}
                  >
                    <div
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, rgba(56, 189, 248, 0.45) 1.2px, transparent 1.2px)',
                        backgroundSize: '16px 16px',
                        transform: 'rotateX(18deg)',
                        transformOrigin: 'center center',
                        maskImage:
                          'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.15) 85%, transparent 100%)',
                        WebkitMaskImage:
                          'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.15) 85%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* Мягкое космическое внутреннее свечение в углу карточки */}
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-400/20 transition-all duration-500" />
                  <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-indigo-500/10 blur-2xl rounded-full group-hover:bg-indigo-400/20 transition-all duration-500" />
                </div>

                {/* Иконка карточки */}
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Заголовок */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>

                {/* Описание */}
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

export default Advantages;
