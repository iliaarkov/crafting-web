import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, X, Code2, GraduationCap, Users2, Sparkles, UserCheck, Award } from 'lucide-react';

export const About: React.FC = () => {
  const { t, lang } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const profileSlotRef = useRef<HTMLDivElement>(null);
  const [deltaOffset, setDeltaOffset] = useState({ x: 0, y: 0 });

  // 1. Определение разрешения экрана (ПК / мобильный)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // 2. Расчет точного центра экрана относительно якорного слота
  useEffect(() => {
    if (!isDesktop) return;

    const measureOffset = () => {
      if (!frameRef.current || !profileSlotRef.current) return;
      const frameRect = frameRef.current.getBoundingClientRect();
      const slotRect = profileSlotRef.current.getBoundingClientRect();

      const frameCenterX = frameRect.width / 2;
      const frameCenterY = frameRect.height / 2;

      const slotCenterX = slotRect.left - frameRect.left + slotRect.width / 2;
      const slotCenterY = slotRect.top - frameRect.top + slotRect.height / 2;

      setDeltaOffset({
        x: frameCenterX - slotCenterX,
        y: frameCenterY - slotCenterY,
      });
    };

    const timer = setTimeout(measureOffset, 100);
    window.addEventListener('resize', measureOffset);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureOffset);
    };
  }, [isDesktop]);

  // 3. Плавный слушатель скролла для фаз анимации на ПК
  useEffect(() => {
    if (!isDesktop) return;

    let animId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(1, Math.max(0, currentScroll / totalScrollable));

      animId = requestAnimationFrame(() => {
        setProgress(rawProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDesktop]);

  // Фазы анимации для ПК
  const summonEnter = Math.min(1, Math.max(0, (progress - 0.04) / 0.12));
  const flyToSlot = Math.min(1, Math.max(0, (progress - 0.26) / 0.16));
  const descEnter = Math.min(1, Math.max(0, (progress - 0.42) / 0.18));
  const compareEnter = Math.min(1, Math.max(0, (progress - 0.60) / 0.20));

  // Панорамирование сцены вверх при появлении нижних карточек
  const stagePanProgress = Math.min(1, Math.max(0, (progress - 0.48) / 0.32));
  const stagePanY = stagePanProgress * 190;

  // Координаты легендарной карты
  const currentDeltaX = deltaOffset.x * (1 - flyToSlot);
  const currentDeltaY = deltaOffset.y * (1 - flyToSlot);
  const currentScale = 0.85 + 0.2 * summonEnter - 0.05 * flyToSlot;
  const currentRotateY = 20 * (1 - summonEnter);
  const currentRotateX = 12 * (1 - summonEnter);
  const cardOpacity = summonEnter;
  const isCentered = flyToSlot < 0.96;

  return (
    <section
      id="about"
      ref={containerRef}
      className={isDesktop ? 'relative min-h-[340vh]' : 'py-16 sm:py-24 relative overflow-hidden'}
    >
      {/* ДЕСКТОП: Липкий экран с панорамированием */}
      {isDesktop ? (
        <div
          ref={frameRef}
          className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-16 pb-8"
        >
          {/* Контейнер сцены, поднимающийся вверх при прокрутке */}
          <div
            className="max-w-6xl mx-auto px-4 sm:px-6 w-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(0, -${stagePanY}px, 0)`,
            }}
          >
            {/* Заголовок секции */}
            <div
              className="max-w-3xl mb-6 lg:mb-8 transition-opacity duration-300"
              style={{
                opacity: Math.max(0.2, 1 - stagePanProgress * 0.85),
              }}
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.header.nav.about}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t.about.title}
              </h2>
            </div>

            {/* Верхний ряд: Профиль (слева) + Описание (справа) */}
            <div className="grid grid-cols-12 gap-8 mb-6 items-stretch relative">
              {/* Якорный слот левой колонки */}
              <div ref={profileSlotRef} className="col-span-4 relative min-h-[390px]">
                {/* Легендарная карточка профиля */}
                <div
                  className={`glass-panel p-6 rounded-3xl border flex flex-col justify-between items-center text-center relative overflow-hidden group transition-shadow duration-300 ${
                    isCentered
                      ? 'z-40 shadow-[0_0_90px_rgba(34,211,238,0.4)] border-cyan-400/80 bg-[#070b13]/95 ring-2 ring-cyan-400/50'
                      : 'shadow-2xl border-white/10 hover:border-cyan-400/40'
                  }`}
                  style={{
                    opacity: cardOpacity,
                    transform: `perspective(1200px) translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0) scale(${currentScale}) rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`,
                    transformOrigin: 'center center',
                    pointerEvents: cardOpacity > 0.5 ? 'auto' : 'none',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Неоновый ореол при вызове */}
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none -z-10 transition-opacity duration-500 ${
                      isCentered
                        ? 'bg-gradient-to-b from-cyan-400/40 via-sky-500/20 to-transparent blur-[70px] opacity-100'
                        : 'bg-cyan-500/10 blur-[60px] opacity-40'
                    }`}
                  />

                  {/* Легендарный бейдж */}
                  {isCentered && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-lg shadow-cyan-500/40">
                        <Award className="w-3.5 h-3.5" />
                        <span>{lang === 'ru' ? 'Веб-разработчик' : 'Lead Developer'}</span>
                      </span>
                    </div>
                  )}

                  <div className="w-full flex flex-col items-center mt-2">
                    <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-2xl shadow-cyan-950/50 mb-4 bg-[#090d14] group-hover:border-cyan-400/60 transition-colors">
                      {!imgError ? (
                        <img
                          src="/images/ilya.jpg"
                          alt={lang === 'ru' ? 'Илья Арьков — Веб-разработчик' : 'Ilia Arkov — Web Developer'}
                          onError={() => setImgError(true)}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950/80 via-[#0a0f18] to-slate-900 text-cyan-300 p-4">
                          <UserCheck className="w-14 h-14 text-cyan-400/80 mb-2" />
                          <span className="text-xs font-semibold text-slate-300">
                            {lang === 'ru' ? 'Илья Арьков' : 'Ilia Arkov'}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{lang === 'ru' ? 'Доступен для проектов' : 'Available for projects'}</span>
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-0.5">
                      {lang === 'ru' ? 'Илья Арьков' : 'Ilia Arkov'}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-cyan-300 mb-3">
                      {lang === 'ru' ? 'Веб-разработчик сайтов' : 'Web Developer'}
                    </p>
                  </div>

                  <div className="w-full pt-3 border-t border-white/5 space-y-1.5 text-left">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === 'ru' ? 'Профильное высшее IT-образование' : 'University Degree in Computer Science'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === 'ru' ? 'Прямая связь без посредников' : '1-on-1 direct collaboration'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Правая колонка: Описание и услуги */}
              <div
                className="col-span-8 flex flex-col gap-4"
                style={{
                  opacity: descEnter,
                  transform: `perspective(1000px) translateX(${(1 - descEnter) * 60}px) rotateY(${(1 - descEnter) * -10}deg)`,
                  transformOrigin: 'right center',
                  pointerEvents: descEnter > 0.5 ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="glass-panel p-6 rounded-3xl border border-white/10 flex-1 flex flex-col justify-between shadow-xl">
                  <div className="space-y-3 text-slate-300 leading-relaxed text-sm sm:text-base">
                    <p>{t.about.p1}</p>
                    <p className="text-slate-400">{t.about.p2}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 text-cyan-300 text-sm font-medium">
                    <Users2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{t.about.directComm}</span>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1017]/80 to-[#0e1624]/80 shadow-xl">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <h3>{t.about.canIncludeTitle}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {t.about.canIncludeList.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Нижний ряд: Кому подходит vs Кому не подходит */}
            <div
              className="grid grid-cols-2 gap-6"
              style={{
                opacity: compareEnter,
                transform: `perspective(1000px) translateY(${(1 - compareEnter) * 50}px) rotateX(${(1 - compareEnter) * 12}deg)`,
                transformOrigin: 'bottom center',
                pointerEvents: compareEnter > 0.5 ? 'auto' : 'none',
                willChange: 'transform, opacity',
              }}
            >
              {/* Кому подходит */}
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/25 bg-[#091214]/70 shadow-2xl hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base mb-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <h3>{t.about.whoIsItForTitle}</h3>
                </div>
                <ul className="space-y-2.5">
                  {t.about.whoIsItForList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-200 text-xs sm:text-sm">
                      <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Кому не подходит */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#120f12]/50 shadow-2xl hover:border-rose-500/30 transition-colors">
                <div className="flex items-center gap-2.5 text-rose-400/90 font-bold text-base mb-4">
                  <div className="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <h3>{t.about.whoIsNotForTitle}</h3>
                </div>
                <ul className="space-y-2.5">
                  {t.about.whoIsNotForList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-400 text-xs sm:text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* МОБИЛЬНЫЕ УСТРОЙСТВА: вертикальный поток */
        <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.header.nav.about}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {t.about.title}
            </h2>
          </div>

          {/* 1. Мобильная карточка профиля */}
          <div className="glass-panel p-6 rounded-3xl border border-cyan-400/30 bg-[#090e17]/90 shadow-2xl text-center relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/15 blur-[60px] rounded-full pointer-events-none -z-10" />

            <div className="w-full flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl shadow-cyan-950/60 mb-4 bg-[#090d14]">
                {!imgError ? (
                  <img
                    src="/images/ilya.jpg"
                    alt={lang === 'ru' ? 'Илья Арьков — Веб-разработчик' : 'Ilia Arkov — Web Developer'}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950/80 via-[#0a0f18] to-slate-900 text-cyan-300 p-4">
                    <UserCheck className="w-14 h-14 text-cyan-400/80 mb-2" />
                    <span className="text-xs font-semibold text-slate-300">
                      {lang === 'ru' ? 'Илья Арьков' : 'Ilia Arkov'}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/85 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{lang === 'ru' ? 'Доступен для проектов' : 'Available for projects'}</span>
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-0.5">
                {lang === 'ru' ? 'Илья Арьков' : 'Ilia Arkov'}
              </h3>
              <p className="text-xs font-medium text-cyan-300 mb-4">
                {lang === 'ru' ? 'Веб-разработчик сайтов' : 'Web Developer'}
              </p>
            </div>

            <div className="w-full pt-4 border-t border-white/5 space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{lang === 'ru' ? 'Профильное высшее IT-образование' : 'University Degree in Computer Science'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{lang === 'ru' ? 'Прямая связь без посредников' : '1-on-1 direct collaboration'}</span>
              </div>
            </div>
          </div>

          {/* 2. Мобильная карточка описания */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>{t.about.p1}</p>
            <p className="text-slate-400">{t.about.p2}</p>
            <div className="pt-4 border-t border-white/5 flex items-center gap-3 text-cyan-300 text-xs font-medium">
              <Users2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{t.about.directComm}</span>
            </div>
          </div>

          {/* 3. Мобильная карточка списка услуг */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1017]/80 to-[#0e1624]/80 shadow-xl">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-4">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <h3>{t.about.canIncludeTitle}</h3>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {t.about.canIncludeList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Мобильная карточка: Кому подходит */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/25 bg-[#091214]/70 shadow-2xl">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base mb-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h3>{t.about.whoIsItForTitle}</h3>
            </div>
            <ul className="space-y-3">
              {t.about.whoIsItForList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-200 text-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Мобильная карточка: Кому не подходит */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#120f12]/50 shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-400/90 font-bold text-base mb-4">
              <div className="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <X className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <h3>{t.about.whoIsNotForTitle}</h3>
            </div>
            <ul className="space-y-3">
              {t.about.whoIsNotForList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-400 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;