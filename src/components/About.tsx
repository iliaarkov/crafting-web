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

  // 2. Расчет точного математического центра экрана относительно якорного слота
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

    const timer = setTimeout(measureOffset, 150);
    window.addEventListener('resize', measureOffset);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureOffset);
    };
  }, [isDesktop]);

  // 3. Плавный слушатель скролла
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

  // ================= ФАЗЫ АНИМАЦИИ ДЛЯ ПК (min-h-[460vh]) ================= //
  // Фаза 1: Призыв легендарной карты ровно в ЦЕНТРЕ (0.02 -> 0.12)
  const summonEnter = Math.min(1, Math.max(0, (progress - 0.02) / 0.10));

  // Фаза 2: Полет на свое место в левую колонку (0.14 -> 0.26)
  const flyToSlot = Math.min(1, Math.max(0, (progress - 0.14) / 0.12));

  // Фаза 3: Влет правого блока "Меня зовут Илья..." (0.20 -> 0.30)
  const descEnter = Math.min(1, Math.max(0, (progress - 0.20) / 0.10));

  // Фаза 4: ДЛИННАЯ ПАУЗА ДЛЯ ЧТЕНИЯ (0.30 -> 0.60)
  // Блок стабильно стоит по вертикальному центру, пользователь спокойно читает без движения!

  // Фаза 5: Плавный уход первой сцены вверх (0.60 -> 0.72)
  const scene1Exit = Math.min(1, Math.max(0, (progress - 0.60) / 0.12));
  const scene1Opacity = Math.max(0, 1 - scene1Exit);
  const scene1TranslateY = -scene1Exit * 110;

  // Фаза 6: Всплытие второй сцены "Кому подходит / не подходит" снизу в центр (0.64 -> 0.76)
  const scene2Enter = Math.min(1, Math.max(0, (progress - 0.64) / 0.12));
  const scene2Exit = Math.min(1, Math.max(0, (progress - 0.92) / 0.08));
  const scene2Opacity = Math.max(0, scene2Enter - scene2Exit);
  const scene2TranslateY = (1 - scene2Enter) * 90 - scene2Exit * 90;

  // Координаты легендарной карты в Сцене 1
  const currentDeltaX = deltaOffset.x * (1 - flyToSlot);
  const currentDeltaY = deltaOffset.y * (1 - flyToSlot);
  const currentScale = 0.88 + 0.16 * summonEnter - 0.04 * flyToSlot;
  const currentRotateY = 18 * (1 - summonEnter);
  const currentRotateX = 10 * (1 - summonEnter);
  const cardOpacity = summonEnter;
  const isCentered = flyToSlot < 0.95;

  return (
    <section
      id="about"
      ref={containerRef}
      className={isDesktop ? 'relative min-h-[460vh]' : 'py-16 sm:py-24 relative overflow-hidden'}
    >
      {/* ДЕСКТОП: Липкий экран с двумя просторными сценами */}
      {isDesktop ? (
        <div
          ref={frameRef}
          className="sticky top-0 h-screen w-full flex flex-col justify-center pt-24 pb-12 overflow-hidden"
        >
          {/* ================= СЦЕНА 1: ПРОФИЛЬ + ОПИСАНИЕ ================= */}
          <div
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-150 ease-out"
            style={{
              opacity: scene1Opacity,
              transform: `translate3d(0, ${scene1TranslateY}px, 0)`,
              pointerEvents: scene1Opacity > 0.4 ? 'auto' : 'none',
              visibility: scene1Opacity <= 0 ? 'hidden' : 'visible',
            }}
          >
            {/* Заголовок секции с запасом сверху */}
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.header.nav.about}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t.about.title}
              </h2>
            </div>

            {/* Сетка: Профиль (слева) + Описание (справа) — строго по вертикальному центру */}
            <div className="grid grid-cols-12 gap-8 items-stretch relative">
              {/* Якорный слот левой колонки */}
              <div ref={profileSlotRef} className="col-span-4 relative min-h-[390px]">
                {/* Легендарная карточка профиля */}
                <div
                  className={`glass-panel p-6 rounded-3xl border flex flex-col justify-between items-center text-center relative overflow-hidden group transition-shadow duration-300 ${
                    isCentered
                      ? 'z-40 shadow-[0_0_100px_rgba(34,211,238,0.45)] border-cyan-400/80 bg-[#070b13]/95 ring-2 ring-cyan-400/50'
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

              {/* Правая колонка: Описание и что могу разместить */}
              <div
                className="col-span-8 flex flex-col gap-5"
                style={{
                  opacity: descEnter,
                  transform: `perspective(1000px) translateX(${(1 - descEnter) * 50}px) rotateY(${(1 - descEnter) * -8}deg)`,
                  transformOrigin: 'right center',
                  pointerEvents: descEnter > 0.5 ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex-1 flex flex-col justify-between shadow-xl">
                  <div className="space-y-3.5 text-slate-300 leading-relaxed text-sm sm:text-base">
                    <p>{t.about.p1}</p>
                    <p className="text-slate-400">{t.about.p2}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-3 text-cyan-300 text-sm font-medium">
                    <Users2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{t.about.directComm}</span>
                  </div>
                </div>

                <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1017]/80 to-[#0e1624]/80 shadow-xl">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <h3>{t.about.canIncludeTitle}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
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
          </div>

          {/* ================= СЦЕНА 2: КОМУ ПОДХОДИТ VS НЕ ПОДХОДИТ ================= */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-200 ease-out"
            style={{
              opacity: scene2Opacity,
              transform: `translate3d(0, calc(-50% + ${scene2TranslateY}px), 0)`,
              pointerEvents: scene2Opacity > 0.4 ? 'auto' : 'none',
              visibility: scene2Opacity <= 0 ? 'hidden' : 'visible',
            }}
          >
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'Формат работы' : 'Collaboration Style'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {lang === 'ru'
                  ? 'С кем я работаю и кому подойдёт сайт'
                  : 'Who I work with and who this is for'}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-8 items-stretch">
              {/* Кому подходит */}
              <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-emerald-500/30 bg-[#091316]/85 shadow-2xl hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg mb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3>{t.about.whoIsItForTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {t.about.whoIsItForList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base">
                      <Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Кому не подходит */}
              <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-rose-500/20 bg-[#140e12]/80 shadow-2xl hover:border-rose-500/40 transition-colors">
                <div className="flex items-center gap-3 text-rose-400/90 font-bold text-lg mb-6">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-rose-400" />
                  </div>
                  <h3>{t.about.whoIsNotForTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {t.about.whoIsNotForList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= МОБИЛЬНЫЕ УСТРОЙСТВА ================= */
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