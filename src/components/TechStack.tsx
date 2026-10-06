import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

interface TechNode {
  name: string;
  description: string;
  // Позиции в процентах для десктопа
  desktopPos: { x: number; y: number };
  // Позиции в процентах для мобильных устройств
  mobilePos: { x: number; y: number };
  size: number; // диаметр в px на десктопе
  morphClass: string;
  floatClass: string;
}

export const TechStack: React.FC = () => {
  const { t, lang } = useLanguage();

  // Состояние активного пузыря (для hover на десктопе и клика/тапа на мобилках)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Определение мобильного экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Список технологий и координаты для органичного созвездия
  const techNodes: TechNode[] = [
    {
      name: t.tools.items[0]?.name || 'React',
      description: t.tools.items[0]?.description || '',
      desktopPos: { x: 20, y: 30 },
      mobilePos: { x: 30, y: 15 },
      size: 180,
      morphClass: 'morph-1',
      floatClass: 'float-1',
    },
    {
      name: t.tools.items[1]?.name || 'TypeScript',
      description: t.tools.items[1]?.description || '',
      desktopPos: { x: 50, y: 20 },
      mobilePos: { x: 70, y: 28 },
      size: 195,
      morphClass: 'morph-2',
      floatClass: 'float-2',
    },
    {
      name: t.tools.items[2]?.name || 'Tailwind CSS',
      description: t.tools.items[2]?.description || '',
      desktopPos: { x: 80, y: 32 },
      mobilePos: { x: 30, y: 46 },
      size: 185,
      morphClass: 'morph-3',
      floatClass: 'float-3',
    },
    {
      name: t.tools.items[3]?.name || 'Node.js',
      description: t.tools.items[3]?.description || '',
      desktopPos: { x: 24, y: 72 },
      mobilePos: { x: 72, y: 60 },
      size: 180,
      morphClass: 'morph-2',
      floatClass: 'float-4',
    },
    {
      name: t.tools.items[4]?.name || 'PostgreSQL',
      description: t.tools.items[4]?.description || '',
      desktopPos: { x: 52, y: 80 },
      mobilePos: { x: 30, y: 78 },
      size: 190,
      morphClass: 'morph-1',
      floatClass: 'float-2',
    },
    {
      name: t.tools.items[5]?.name || 'Cloudflare и Vercel',
      description: t.tools.items[5]?.description || '',
      desktopPos: { x: 78, y: 70 },
      mobilePos: { x: 70, y: 90 },
      size: 205,
      morphClass: 'morph-3',
      floatClass: 'float-1',
    },
  ];

  // Связи между пузырями (пары индексов)
  const connections: [number, number][] = [
    [0, 1], // React <-> TypeScript
    [1, 2], // TypeScript <-> Tailwind CSS
    [0, 3], // React <-> Node.js
    [1, 4], // TypeScript <-> PostgreSQL
    [2, 5], // Tailwind <-> Cloudflare/Vercel
    [3, 4], // Node.js <-> PostgreSQL
    [4, 5], // PostgreSQL <-> Cloudflare/Vercel
    [0, 2], // React <-> Tailwind CSS (верхняя диагональ)
  ];

  const handleBubbleClick = (idx: number) => {
    setTappedIdx(tappedIdx === idx ? null : idx);
  };

  return (
    <section id="tech-stack" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Стили для морфинга периметра и плавного парения пузырей */}
      <style>{`
        @keyframes bubbleMorph1 {
          0%, 100% { border-radius: 62% 38% 46% 54% / 58% 42% 58% 42%; }
          33% { border-radius: 44% 56% 36% 64% / 48% 62% 38% 52%; }
          66% { border-radius: 54% 46% 62% 38% / 36% 52% 48% 64%; }
        }
        @keyframes bubbleMorph2 {
          0%, 100% { border-radius: 48% 52% 64% 36% / 42% 58% 42% 58%; }
          33% { border-radius: 60% 40% 48% 52% / 54% 46% 64% 36%; }
          66% { border-radius: 38% 62% 38% 62% / 62% 38% 48% 52%; }
        }
        @keyframes bubbleMorph3 {
          0%, 100% { border-radius: 56% 44% 42% 58% / 46% 54% 46% 54%; }
          33% { border-radius: 42% 58% 62% 38% / 60% 40% 58% 42%; }
          66% { border-radius: 64% 36% 48% 52% / 38% 62% 42% 58%; }
        }

        /* Медленное парение пузырей в пространстве */
        @keyframes bubbleFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(7px, -9px); }
        }
        @keyframes bubbleFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-8px, 8px); }
        }
        @keyframes bubbleFloat3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(9px, 6px); }
        }
        @keyframes bubbleFloat4 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-6px, -8px); }
        }

        /* Еле заметное микро-движение при наведении (чтобы пузырь не убегал под курсором) */
        @keyframes bubbleFloatHover {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(1px, -1.5px); }
        }

        .morph-1 { animation: bubbleMorph1 8s ease-in-out infinite; }
        .morph-2 { animation: bubbleMorph2 9.5s ease-in-out infinite; }
        .morph-3 { animation: bubbleMorph3 8.8s ease-in-out infinite; }

        .float-1 { animation: bubbleFloat1 7s ease-in-out infinite; }
        .float-2 { animation: bubbleFloat2 8.5s ease-in-out infinite; }
        .float-3 { animation: bubbleFloat3 9s ease-in-out infinite; }
        .float-4 { animation: bubbleFloat4 7.8s ease-in-out infinite; }

        .float-hovered {
          animation: bubbleFloatHover 5s ease-in-out infinite !important;
        }
      `}</style>

      {/* Фоновые космические пятна */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.tools.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.tools.intro}
          </p>

          {/* Подсказка для мобильных устройств */}
          <div className="mt-3 flex items-center gap-2 text-xs text-cyan-300/80 sm:hidden">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{lang === 'ru' ? 'Нажмите на пузырь, чтобы прочитать описание' : 'Tap any bubble to read details'}</span>
          </div>
        </div>

        {/* ================= ХОЛСТ СО СВЯЗЯМИ И МЫЛЬНЫМИ ПУЗЫРЯМИ ================= */}
        <div className="relative w-full h-[580px] sm:h-[500px] lg:h-[540px] my-6 rounded-3xl bg-[#04070e]/60 border border-white/5 backdrop-blur-md overflow-hidden">
          
          {/* СЕТКА СВЯЗЕЙ (SVG ЛИНИИ МЕЖДУ ПУЗЫРЯМИ) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {connections.map(([fromIdx, toIdx], cIdx) => {
              const nodeA = techNodes[fromIdx];
              const nodeB = techNodes[toIdx];
              const posA = isMobile ? nodeA.mobilePos : nodeA.desktopPos;
              const posB = isMobile ? nodeB.mobilePos : nodeB.desktopPos;

              const isHighlighted =
                hoveredIdx === fromIdx ||
                hoveredIdx === toIdx ||
                tappedIdx === fromIdx ||
                tappedIdx === toIdx;

              return (
                <line
                  key={cIdx}
                  x1={`${posA.x}%`}
                  y1={`${posA.y}%`}
                  x2={`${posB.x}%`}
                  y2={`${posB.y}%`}
                  stroke={isHighlighted ? 'url(#activeLineGrad)' : 'url(#lineGrad)'}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  strokeDasharray={isHighlighted ? 'none' : '4 4'}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* ПЛАВАЮЩИЕ МЫЛЬНЫЕ ПУЗЫРИ С ТЕХНОЛОГИЯМИ */}
          {techNodes.map((node, idx) => {
            const pos = isMobile ? node.mobilePos : node.desktopPos;
            const isHovered = hoveredIdx === idx;
            const isActive = tappedIdx === idx;
            const isEngaged = isHovered || isActive;

            // Размеры пузыря (на мобильных чуть компактнее, чтобы не перекрывать друг друга)
            const bubbleSize = isMobile ? 135 : node.size;

            return (
              <div
                key={idx}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: `${bubbleSize}px`,
                  height: `${bubbleSize}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute select-none cursor-pointer transition-transform duration-300 ${
                  isEngaged ? 'z-30 scale-105' : 'z-10'
                }`}
                onMouseEnter={() => !isMobile && setHoveredIdx(idx)}
                onMouseLeave={() => !isMobile && setHoveredIdx(null)}
                onClick={() => handleBubbleClick(idx)}
              >
                {/* 
                  ВНЕШНИЙ КОНТЕЙНЕР ПАРЕНИЯ:
                  Когда курсор наведен, переключается на float-hovered (микро-смещение в 1px),
                  чтобы пузырь не уплывал из-под мышки
                */}
                <div
                  className={`w-full h-full ${
                    isEngaged ? 'float-hovered' : node.floatClass
                  }`}
                >
                  {/* 
                    САМ ПУЗЫРЬ С ПЛАВАЮЩИМ МОРФИНГ-ПЕРИМЕТРОМ:
                    Стеклянный перелив, неоновый контур, внутренний блик мыльного пузыря
                  */}
                  <div
                    className={`relative w-full h-full ${node.morphClass} transition-colors duration-500 flex items-center justify-center p-3 sm:p-4 text-center overflow-hidden backdrop-blur-md shadow-lg ${
                      isEngaged
                        ? 'bg-gradient-to-br from-cyan-950/90 via-slate-900/95 to-indigo-950/90 border-2 border-cyan-300/80 shadow-[0_0_35px_rgba(34,211,238,0.35)]'
                        : 'bg-gradient-to-br from-cyan-500/10 via-slate-900/70 to-indigo-500/15 border border-cyan-400/35 hover:border-cyan-300/60 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                    }`}
                  >
                    {/* Блик на поверхности мыльного пузыря (сверху-слева) */}
                    <div className="absolute top-2.5 left-4 w-7 h-3 rounded-full bg-white/25 blur-[1px] -rotate-45 pointer-events-none" />
                    <div className="absolute bottom-2.5 right-4 w-5 h-2 rounded-full bg-cyan-400/20 blur-[1px] -rotate-45 pointer-events-none" />

                    {/* 1. НАЗВАНИЕ ТЕХНОЛОГИИ (плавно исчезает при наведении/клике) */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-all duration-300 ${
                        isEngaged
                          ? 'opacity-0 scale-90 pointer-events-none'
                          : 'opacity-100 scale-100'
                      }`}
                    >
                      <span className="font-mono text-cyan-300 font-extrabold text-sm sm:text-base lg:text-lg tracking-wide drop-shadow-md">
                        {node.name}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold opacity-75">
                        {lang === 'ru' ? 'Подробнее' : 'Details'}
                      </span>
                    </div>

                    {/* 2. ОПИСАНИЕ ТЕХНОЛОГИИ (плавно появляется на месте названия) */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
                        isEngaged
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-110 pointer-events-none'
                      }`}
                    >
                      <p className="text-[11px] sm:text-xs text-slate-100 font-medium leading-snug drop-shadow-sm line-clamp-4">
                        {node.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Гарантия прозрачности технологий / Trust Signature */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 flex items-center gap-3.5 text-cyan-200 text-sm sm:text-base font-medium">
          <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{t.tools.signature}</span>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
