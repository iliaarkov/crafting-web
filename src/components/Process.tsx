import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, Compass } from 'lucide-react';

export const Process: React.FC = () => {
  const { t, lang } = useLanguage();

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Состояние пути SVG и длины линии
  const [svgPath, setSvgPath] = useState<string>('');
  const [totalLength, setTotalLength] = useState<number>(0);
  const [snakeProgress, setSnakeProgress] = useState<number>(0);
  const [tipCoord, setTipCoord] = useState<{ x: number; y: number } | null>(null);

  // Массив активных шагов (true когда скролл достиг шага)
  const [activeSteps, setActiveSteps] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const steps = t.process.steps || [];

  // Пересчет координат точек и построение плавной кривой маршрута
  const updateRouteGeometry = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const points: { x: number; y: number }[] = [];

    pinRefs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        points.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      }
    });

    if (points.length < 2) return;

    // Начало линии: вертикально чуть выше первой точки
    let d = `M ${points[0].x} ${Math.max(0, points[0].y - 40)}`;
    d += ` L ${points[0].x} ${points[0].y}`;

    // Соединяем точки красивыми кубическими кривыми Безье
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const deltaY = p2.y - p1.y;

      // Контрольные точки для плавного S-образного изгиба строго между маркерами
      const cp1x = p1.x;
      const cp1y = p1.y + deltaY * 0.55;
      const cp2x = p2.x;
      const cp2y = p1.y + deltaY * 0.45;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    setSvgPath(d);
  };

  // Измерение длины SVG пути после обновления атрибута `d`
  useEffect(() => {
    if (pathRef.current && svgPath) {
      try {
        const len = pathRef.current.getTotalLength();
        setTotalLength(len);
      } catch (e) {
        // Игнорируем кратковременную ошибку измерения при ререндере
      }
    }
  }, [svgPath]);

  // Слушатель скролла и обновление заполнения линии
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportH = window.innerHeight;
      // Линия триггера активности: 74% от верха экрана (чтобы сверху было много места для чтения)
      const triggerY = viewportH * 0.74;

      // Проверяем статус каждого шага относительно triggerY
      const newActive = pinRefs.current.map((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= triggerY;
      });

      setActiveSteps(newActive);

      // Рассчитываем прогресс линии (от первой точки до последней)
      const firstPin = pinRefs.current[0];
      const lastPin = pinRefs.current[pinRefs.current.length - 1];

      if (firstPin && lastPin) {
        const firstPinRect = firstPin.getBoundingClientRect();
        const lastPinRect = lastPin.getBoundingClientRect();

        const startTrigger = firstPinRect.top;
        const endTrigger = lastPinRect.top;
        const range = endTrigger - startTrigger;

        if (range > 0) {
          const rawProgress = (triggerY - startTrigger) / range;
          const clamped = Math.max(0, Math.min(1, rawProgress));
          setSnakeProgress(clamped);

          // Координата кончика светящейся линии
          if (pathRef.current && totalLength > 0) {
            try {
              const currentLen = totalLength * clamped;
              if (currentLen > 0) {
                const pt = pathRef.current.getPointAtLength(currentLen);
                setTipCoord({ x: pt.x, y: pt.y });
              } else {
                setTipCoord(null);
              }
            } catch (err) {
              setTipCoord(null);
            }
          }
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateRouteGeometry();
      onScroll();
    });

    updateRouteGeometry();
    const timeout = setTimeout(() => {
      updateRouteGeometry();
      handleScroll();
    }, 150);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
      clearTimeout(timeout);
    };
  }, [totalLength]);

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden select-none">
      {/* Мягкие фоновые свечения внутри секции с overflow-hidden */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[320px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[320px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Маршрут от и до' : 'Project Roadmap'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.process.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {lang === 'ru'
              ? 'Каждый этап прозрачен: от первого сообщения до передачи доступов и запуска сайта.'
              : 'Clear milestones from the very first greeting to custom domain launch and keys handoff.'}
          </p>
        </div>

        {/* ================= КОНТЕЙНЕР МАРШРУТА ================= */}
        <div ref={containerRef} className="relative w-full">
          {/* SVG ЛИНИЯ НАВИГАТОРА */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              {/* Градиент светящейся линии */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="65%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>

              {/* Мягкий фильтр неонового свечения */}
              <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Фоновая неактивная пунктирная линия маршрута */}
            {svgPath && (
              <path
                d={svgPath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2.5"
                strokeDasharray="5 5"
              />
            )}

            {/* 2. СПЛОШНАЯ светящаяся линия, последовательно заполняющаяся при скролле */}
            {svgPath && totalLength > 0 && (
              <path
                ref={pathRef}
                d={svgPath}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={totalLength}
                strokeDashoffset={totalLength * (1 - snakeProgress)}
                filter="url(#glowFilter)"
                className="transition-[stroke-dashoffset] duration-75 ease-out"
              />
            )}

            {/* 3. Светящаяся искра на кончике заполняющейся линии */}
            {tipCoord && snakeProgress > 0.01 && (
              <g transform={`translate(${tipCoord.x}, ${tipCoord.y})`}>
                <circle r="6" fill="#ffffff" filter="url(#glowFilter)" />
                <circle r="2.5" fill="#22d3ee" />
              </g>
            )}
          </svg>

          {/* 
            СПИСОК ШАГОВ С АРХИТЕКТУРОЙ ИСКЛЮЧЕНИЯ ПЕРЕСЕЧЕНИЙ:
            На десктопе: 
              - Шаги 01, 03, 05: текст СЛЕВА от маркера (text-right), маркер в центре.
              - Шаги 02, 04, 06: маркер в центре, текст СПРАВА от маркера (text-left).
              - Шаг 07: маркер строго по центру, текст центрирован.
            Линия идёт строго по центральному коридору между маркерами и НИКОГДА не задевает текст!
            
            На смартфонах (< 768px):
              - Все маркеры выстроены по левому краю (x = 24px).
              - Весь текст расположен строго справа с отступом pl-14.
              Линия проходит только по маркерам слева и НИКОГДА не касается текста!
          */}
          <div className="space-y-16 sm:space-y-24 lg:space-y-28 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeSteps[idx];
              const isFinish = idx === 6; // Шаг 07: Запуск
              const isLeftOnDesktop = idx % 2 === 0 && !isFinish; // 01, 03, 05

              // ФИНИШНЫЙ ШАГ 07 (ЦЕНТРИРОВАН)
              if (isFinish) {
                return (
                  <div
                    key={idx}
                    className="w-full flex flex-col items-center text-center pt-4"
                  >
                    {/* МАРКЕР ФИНИША */}
                    <div
                      ref={(el) => {
                        pinRefs.current[idx] = el;
                      }}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-5 select-none transition-all duration-500 ${
                        isActive
                          ? 'bg-[#081a18] border-2 border-emerald-400 text-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.65)] scale-105'
                          : 'bg-[#080c14] border border-white/15 text-slate-500 opacity-60'
                      }`}
                    >
                      <Rocket
                        className={`w-6 h-6 transition-transform duration-500 ${
                          isActive ? 'text-emerald-300 rotate-12 scale-110' : 'text-slate-500'
                        }`}
                      />
                    </div>

                    {/* СТРОГО ОТДЕЛЬНАЯ СТРОКА: ЭТАП 07 */}
                    <div
                      className={`text-xs font-mono font-bold uppercase tracking-wider mb-1.5 transition-colors duration-300 ${
                        isActive ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    >
                      {lang === 'ru' ? 'Этап 07' : 'Stage 07'}
                    </div>

                    {/* ЗАГОЛОВОК: ЗАПУСК */}
                    <h3
                      className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-colors duration-300 ${
                        isActive
                          ? 'text-white drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* ОПИСАНИЕ ЭТАПА */}
                    <p
                      className={`text-sm sm:text-base leading-relaxed mt-2.5 max-w-lg mx-auto transition-colors duration-300 ${
                        isActive ? 'text-slate-200 font-medium' : 'text-slate-600'
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* КРАСИВАЯ ЭЛЕГАНТНАЯ ПЛАШКА ФИНИША */}
                    <div
                      className={`mt-4.5 inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                          : 'bg-white/5 border border-white/10 text-slate-500 opacity-60'
                      }`}
                    >
                      <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-semibold">
                        {lang === 'ru' ? 'Финиш • Сайт в сети и готов к работе!' : 'Finish • Site is live and operational!'}
                      </span>
                    </div>
                  </div>
                );
              }

              // ШАГИ 01 - 06:
              return (
                <div key={idx} className="w-full relative">
                  {/* МОБИЛЬНЫЙ ВИД (< 768px): Маркер слева, текст справа */}
                  <div className="flex md:hidden items-start gap-4">
                    {/* Маркер на мобильном */}
                    <div
                      ref={(el) => {
                        // На мобилках привязываем реф
                        if (window.innerWidth < 768) {
                          pinRefs.current[idx] = el;
                        }
                      }}
                      className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-mono font-bold text-sm select-none transition-all duration-500 ${
                        isActive
                          ? 'bg-[#09182a] border-2 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.7)] scale-105'
                          : 'bg-[#080c14] border border-white/15 text-slate-500 opacity-60'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Текст на мобильном */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                          isActive ? 'text-cyan-400' : 'text-slate-600'
                        }`}
                      >
                        {lang === 'ru' ? `Этап ${step.number}` : `Stage ${step.number}`}
                      </div>
                      <h3
                        className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mt-1.5 transition-colors duration-300 ${
                          isActive ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* ДЕСКТОПНЫЙ ВИД (>= 768px): 2-колоночный коридор */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div
                      className={`flex items-center justify-end ${
                        isLeftOnDesktop ? 'text-right' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {isLeftOnDesktop && (
                        <div className="max-w-md pr-4">
                          <div
                            className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                              isActive ? 'text-cyan-400' : 'text-slate-600'
                            }`}
                          >
                            {lang === 'ru' ? `Этап ${step.number}` : `Stage ${step.number}`}
                          </div>
                          <h3
                            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                              isActive ? 'text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]' : 'text-slate-500'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-sm lg:text-base leading-relaxed mt-1.5 transition-colors duration-300 ${
                              isActive ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      )}

                      {/* МАРКЕР ШАГА СЛЕВА (В центре) */}
                      {isLeftOnDesktop && (
                        <div
                          ref={(el) => {
                            if (window.innerWidth >= 768) {
                              pinRefs.current[idx] = el;
                            }
                          }}
                          className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-mono font-bold text-base select-none transition-all duration-500 ${
                            isActive
                              ? 'bg-[#09182a] border-2 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.7)] scale-105'
                              : 'bg-[#080c14] border border-white/15 text-slate-500 opacity-60'
                          }`}
                        >
                          {step.number}
                        </div>
                      )}
                    </div>

                    {/* ПРАВАЯ КОЛОНКА */}
                    <div
                      className={`flex items-center justify-start ${
                        !isLeftOnDesktop ? 'text-left' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* МАРКЕР ШАГА СПРАВА (В центре) */}
                      {!isLeftOnDesktop && (
                        <div
                          ref={(el) => {
                            if (window.innerWidth >= 768) {
                              pinRefs.current[idx] = el;
                            }
                          }}
                          className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-mono font-bold text-base select-none transition-all duration-500 ${
                            isActive
                              ? 'bg-[#09182a] border-2 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.7)] scale-105'
                              : 'bg-[#080c14] border border-white/15 text-slate-500 opacity-60'
                          }`}
                        >
                          {step.number}
                        </div>
                      )}

                      {!isLeftOnDesktop && (
                        <div className="max-w-md pl-4">
                          <div
                            className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                              isActive ? 'text-cyan-400' : 'text-slate-600'
                            }`}
                          >
                            {lang === 'ru' ? `Этап ${step.number}` : `Stage ${step.number}`}
                          </div>
                          <h3
                            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                              isActive ? 'text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]' : 'text-slate-500'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-sm lg:text-base leading-relaxed mt-1.5 transition-colors duration-300 ${
                              isActive ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;