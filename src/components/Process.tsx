import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, Trophy, Compass } from 'lucide-react';

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
    let d = `M ${points[0].x} ${Math.max(0, points[0].y - 50)}`;
    d += ` L ${points[0].x} ${points[0].y}`;

    // Соединяем точки красивыми кубическими кривыми Безье (как маршрут навигатора)
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const deltaY = p2.y - p1.y;

      // Контрольные точки для плавного S-образного изгиба
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
        // Игнорируем в случае кратковременного сбоя измерения
      }
    }
  }, [svgPath]);

  // Слушатель скролла и обновление "ползущей светящейся змеи"
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportH = window.innerHeight;
      // Линия триггера активности: 74% от верха экрана (чтобы сверху было много места для чтения)
      const triggerY = viewportH * 0.74;

      const containerRect = containerRef.current.getBoundingClientRect();

      // Проверяем статус каждого шага относительно triggerY
      const newActive = pinRefs.current.map((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        // Пункт активен, когда его маркер поднялся выше triggerY
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

          // Координата кончика змеи (светящаяся искра)
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

    // Первичный расчет геометрии после монтирования и загрузки шрифтов
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

  // Стили смещения каждого шага по горизонтали на десктопе
  const stepLayouts = [
    'sm:ml-0 sm:mr-auto',                     // 01: Слева
    'sm:ml-auto sm:mr-4 lg:sm:mr-12',         // 02: Справа
    'sm:ml-[10%] sm:mr-auto',                 // 03: Чуть левее центра
    'sm:ml-auto sm:mr-[10%]',                 // 04: Чуть правее центра
    'sm:ml-[5%] sm:mr-auto',                  // 05: Слева
    'sm:ml-auto sm:mr-0',                     // 06: Справа
    'sm:mx-auto sm:max-w-2xl text-center',    // 07: По центру (ФИНИШ)
  ];

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden select-none">
      {/* Мягкие фоновые космические свечения */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
              ? 'Каждый этап прозрачен: от первого сообщения в Telegram до передачи доступов и запуска сайта.'
              : 'Clear milestones from the very first greeting to custom domain launch and keys handoff.'}
          </p>
        </div>

        {/* ================= КОНТЕЙНЕР МАРШРУТА С ПЛАВНОЙ ЛИНИЕЙ ================= */}
        <div ref={containerRef} className="relative w-full">
          {/* SVG ЛИНИЯ НАВИГАТОРА (ЗМЕЯ СО СВЕТОМ) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              {/* Градиент заполнения светящейся линии */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="60%" stopColor="#38bdf8" />
                <stop offset="92%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>

              {/* Мягкий фильтр неонового свечения */}
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
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
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
            )}

            {/* 2. Подсвечивающаяся змея, заполняющаяся при скролле */}
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

            {/* 3. Голова змеи: светящаяся искра на кончике заполнения */}
            {tipCoord && snakeProgress > 0.01 && (
              <g transform={`translate(${tipCoord.x}, ${tipCoord.y})`}>
                <circle r="7" fill="#ffffff" filter="url(#glowFilter)" />
                <circle r="3" fill="#22d3ee" />
              </g>
            )}
          </svg>

          {/* СПИСОК 7 ШАГОВ (БЕЗ РАМОК И БЛОКОВ, ЧИСТАЯ ТИПОГРАФИКА) */}
          <div className="space-y-20 sm:space-y-28 lg:space-y-36 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeSteps[idx];
              const isFinish = idx === 6; // Шаг 07: Запуск (Финиш)
              const layoutClass = stepLayouts[idx] || '';

              return (
                <div
                  key={idx}
                  className={`w-full max-w-lg transition-all duration-500 ease-out ${layoutClass}`}
                >
                  <div
                    className={`flex items-start gap-4 sm:gap-6 ${
                      isFinish ? 'flex-col sm:items-center text-center' : ''
                    }`}
                  >
                    {/* МАРКЕР МАРШРУТА (WAYPOINT PIN) */}
                    <div
                      ref={(el) => {
                        pinRefs.current[idx] = el;
                      }}
                      className={`relative shrink-0 flex items-center justify-center transition-all duration-500 rounded-full select-none ${
                        isFinish
                          ? 'w-14 h-14 sm:w-16 sm:h-16'
                          : 'w-11 h-11 sm:w-12 sm:h-12'
                      } ${
                        isActive
                          ? isFinish
                            ? 'bg-gradient-to-br from-amber-950 via-emerald-950 to-cyan-950 border-2 border-amber-400/90 text-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.6)] scale-110'
                            : 'bg-[#09182a] border-2 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.55)] scale-110'
                          : 'bg-[#080c14] border border-white/15 text-slate-500 scale-100 opacity-60'
                      }`}
                    >
                      {/* Пульсирующий ореол активности */}
                      {isActive && (
                        <span
                          className={`absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none ${
                            isFinish ? 'bg-amber-400' : 'bg-cyan-400'
                          }`}
                        />
                      )}

                      {/* Номер шага или победная иконка на финише */}
                      {isFinish ? (
                        <Rocket
                          className={`w-6 h-6 transition-transform duration-500 ${
                            isActive ? 'text-amber-300 rotate-12 scale-110' : 'text-slate-500'
                          }`}
                        />
                      ) : (
                        <span className="font-mono font-extrabold text-sm sm:text-base">
                          {step.number}
                        </span>
                      )}
                    </div>

                    {/* ТЕКСТОВАЯ ИНФОРМАЦИЯ ШАГА (ЧИСТАЯ ТИПОГРАФИКА БЕЗ БОКСА) */}
                    <div className="flex-1 min-w-0">
                      {/* Номер и статус */}
                      <div
                        className={`flex items-center gap-2 mb-1.5 ${
                          isFinish ? 'justify-center' : ''
                        }`}
                      >
                        <span
                          className={`text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 ${
                            isActive
                              ? isFinish
                                ? 'text-amber-400'
                                : 'text-cyan-400'
                              : 'text-slate-600'
                          }`}
                        >
                          {lang === 'ru' ? `Этап ${step.number}` : `Stage ${step.number}`}
                        </span>

                        {/* Особый бейдж победы на шаге 07 */}
                        {isFinish && (
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-all duration-500 flex items-center gap-1.5 ${
                              isActive
                                ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-amber-500/20 border border-emerald-400/60 text-emerald-300 shadow-sm shadow-emerald-500/30 animate-pulse'
                                : 'bg-white/5 border border-white/10 text-slate-500 opacity-60'
                            }`}
                          >
                            <Trophy className="w-3 h-3 text-amber-400" />
                            <span>{lang === 'ru' ? 'Финиш • Сайт в сети!' : 'Finish • Site Live!'}</span>
                          </span>
                        )}
                      </div>

                      {/* Заголовок этапа */}
                      <h3
                        className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight transition-all duration-300 ${
                          isActive
                            ? isFinish
                              ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-200 to-cyan-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                              : 'text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.title}
                      </h3>

                      {/* Понятное описание этапа */}
                      <p
                        className={`text-sm sm:text-base leading-relaxed mt-2 transition-colors duration-300 ${
                          isActive
                            ? isFinish
                              ? 'text-slate-200 max-w-xl mx-auto font-medium'
                              : 'text-slate-300'
                            : 'text-slate-600'
                        }`}
                      >
                        {step.description}
                      </p>
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
