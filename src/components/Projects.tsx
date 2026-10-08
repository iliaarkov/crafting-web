import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectModal, type ProjectData } from './ProjectModal';
import { SmartImage } from './SmartImage';
import { ArrowUpRight, Check, Eye, ExternalLink } from 'lucide-react';

interface StepState {
  cardTops: number[];
}

export const Projects: React.FC = () => {
  const { t, lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [trackHeight, setTrackHeight] = useState<number>(3000);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardHeightsRef = useRef<number[]>([]);
  const lastWidthRef = useRef<number>(0);

  // Сопоставление с картинками в public/projects/ (поддерживает любые расширения через SmartImage)
  const cleanImageMap: Record<string, string> = {
    'specialist-portfolio': '/projects/portfolio.jpg',
    'nonprofit-redesign': '/projects/nonprofit.png',
    'wine-coop': '/projects/intuitivo.png',
    'driving-center': '/projects/driftet.png',
  };

  const projects = t.projects.items || [];
  const N = projects.length;

  const handleDiscuss = () => {
    const elem = document.querySelector('#contact');
    if (elem) {
      const offsetTop = elem.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Измерение высоты карточек только для десктопа
  const measureCardHeights = useCallback((): number[] => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return [];
    const heights = cardRefs.current.map((el) => {
      if (el && el.offsetHeight > 0) {
        return el.offsetHeight;
      }
      return 560;
    });
    cardHeightsRef.current = heights;
    return heights;
  }, []);

  // Расчет целевых положений карточек в стопке на десктопе
  const computeStepStates = useCallback(
    (cardHeights: number[], viewportH: number): StepState[] => {
      if (N === 0) return [];

      const baseTop = 82;
      const gap = 16;
      const bottomPadding = 24;
      const maxBottom = viewportH - bottomPadding;

      const states: StepState[] = [];

      const h0 = cardHeights[0] || 560;
      const initialTop0 = Math.min(baseTop, maxBottom - h0);
      const currentTops = [initialTop0];
      states.push({ cardTops: [...currentTops] });

      for (let i = 1; i < N; i++) {
        const hi = cardHeights[i] || 560;
        const candTop = currentTops[i - 1] + gap;
        const candBottom = candTop + hi;

        if (candBottom <= maxBottom) {
          currentTops.push(candTop);
        } else {
          const diff = candBottom - maxBottom;
          for (let j = 0; j < i; j++) {
            currentTops[j] -= diff;
          }
          currentTops.push(candTop - diff);
        }
        states.push({ cardTops: [...currentTops] });
      }

      return states;
    },
    [N]
  );

  // Обновление позиций карточек при скролле ТОЛЬКО НА ДЕСКТОПЕ
  const updateDesktopPositions = useCallback(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024 || !trackRef.current || N === 0) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const viewportH = window.innerHeight;

    const distPerCard = Math.round(viewportH * 0.8);
    const bufferDist = Math.round(viewportH * 0.5);
    const totalScrollDist = Math.max(0, (N - 1) * distPerCard + bufferDist);

    let heights = cardHeightsRef.current;
    if (!heights || heights.length !== N || heights.some((h) => h === 0)) {
      heights = measureCardHeights();
    }

    const states = computeStepStates(heights, viewportH);
    if (!states.length) return;

    const scrollOffset = Math.max(0, -trackRect.top);
    const clampedOffset = Math.min(scrollOffset, totalScrollDist);

    const newY: number[] = new Array(N).fill(0);

    if (N === 1) {
      newY[0] = states[0].cardTops[0];
    } else if (clampedOffset <= 0) {
      newY[0] = states[0].cardTops[0];
      for (let m = 1; m < N; m++) {
        newY[m] = viewportH + 40 + (m - 1) * 60;
      }
    } else if (clampedOffset >= (N - 1) * distPerCard) {
      for (let j = 0; j < N; j++) {
        newY[j] = states[N - 1].cardTops[j];
      }
    } else {
      const currentStep = Math.min(N - 1, Math.floor(clampedOffset / distPerCard) + 1);
      const start = (currentStep - 1) * distPerCard;
      const p = Math.max(0, Math.min(1, (clampedOffset - start) / distPerCard));

      for (let j = 0; j < currentStep; j++) {
        const fromY = states[currentStep - 1].cardTops[j];
        const toY = states[currentStep].cardTops[j];
        newY[j] = fromY + p * (toY - fromY);
      }

      const entryStart = viewportH + 30;
      const targetTop = states[currentStep].cardTops[currentStep];
      newY[currentStep] = (1 - p) * entryStart + p * targetTop;

      for (let m = currentStep + 1; m < N; m++) {
        newY[m] = viewportH + 30 + (m - currentStep) * 60;
      }
    }

    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i];
      if (el) {
        el.style.transform = `translate3d(0, ${Math.round(newY[i])}px, 0)`;
      }
    }
  }, [N, computeStepStates, measureCardHeights]);

  // Слушатель скролла: работает ИСКЛЮЧИТЕЛЬНО на экранах от 1024px
  useEffect(() => {
    lastWidthRef.current = window.innerWidth;

    const setupDesktop = () => {
      if (window.innerWidth < 1024) return;
      const viewportH = window.innerHeight;
      const distPerCard = Math.round(viewportH * 0.8);
      const bufferDist = Math.round(viewportH * 0.5);
      const totalScrollDist = Math.max(0, (N - 1) * distPerCard + bufferDist);
      setTrackHeight(totalScrollDist + viewportH);
      measureCardHeights();
      updateDesktopPositions();
    };

    setupDesktop();

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth < 1024) return;
      if (currentWidth === lastWidthRef.current) {
        updateDesktopPositions();
        return;
      }
      lastWidthRef.current = currentWidth;
      setupDesktop();
    };

    window.addEventListener('resize', handleResize);

    let rafId: number | null = null;
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateDesktopPositions();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        measureCardHeights();
        updateDesktopPositions();
      }
    }, 60);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [N, measureCardHeights, updateDesktopPositions]);

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[350px] bg-indigo-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            {t.projects.preTitle}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.projects.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.projects.description}
          </p>
        </div>
      </div>

      {/* ================= 1. МОБИЛЬНАЯ ВЕРСИЯ (АППАРАТНЫЙ CSS STICKY БЕЗ JS) ================= */}
      <div className="block lg:hidden max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {projects.map((project, idx) => {
          const projectImg = cleanImageMap[project.id] || project.image;
          const stickyTop = 64 + idx * 12;
          const zIndex = 10 + idx;

          return (
            <div
              key={project.id}
              style={{
                top: `${stickyTop}px`,
                zIndex,
              }}
              className="sticky rounded-[24px] bg-[#090d16] border border-white/[0.12] border-t-cyan-400/30 p-5 shadow-[0_-12px_30px_rgba(0,0,0,0.85),0_20px_45px_rgba(0,0,0,0.85)]"
            >
              {/* Верхняя фолдер-полоска */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 shadow-sm shadow-cyan-400/50" />
                  <span className="font-bold text-cyan-300 shrink-0">
                    0{idx + 1} / 0{projects.length}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-200 font-semibold truncate">
                    {project.title}
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 shrink-0 whitespace-nowrap">
                  {project.tag}
                </span>
              </div>

              {/* Мокап браузера */}
              <div
                className="group/img relative rounded-2xl overflow-hidden border border-white/10 bg-[#060a12] shadow-xl cursor-pointer mb-5"
                onClick={() => setSelectedProject(project)}
              >
                <div className="px-3.5 py-2 bg-[#0e1422] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <SmartImage
                    src={projectImg}
                    alt={project.title}
                    className="w-full h-full object-cover active:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 right-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-400 text-slate-950 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.projects.btnViewScreens}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Описание и кнопка */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="space-y-1.5 mb-4 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {project.whatDoneTitle || (lang === 'ru' ? 'Что сделано:' : 'Key features:')}
                  </div>
                  {project.whatDoneList.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20 active:scale-[0.99]"
                >
                  <span>{project.btnText}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= 2. ДЕСКТОПНАЯ ВЕРСИЯ (PINNED DECK ДЛЯ ШИРОКИХ ЭКРАНОВ) ================= */}
      <div
        ref={trackRef}
        className="hidden lg:block relative"
        style={{ height: `${trackHeight}px` }}
      >
        <div className="sticky top-0 h-[100dvh] min-h-screen w-full overflow-visible pointer-events-none">
          <div className="w-full max-w-6xl mx-auto px-6 relative h-full">
            {projects.map((project, idx) => {
              const projectImg = cleanImageMap[project.id] || project.image;
              const zIndex = 10 + idx;
              const defaultTop = idx === 0 ? 82 : 1200 + idx * 80;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  style={{
                    transform: `translate3d(0, ${defaultTop}px, 0)`,
                    zIndex,
                  }}
                  className="absolute inset-x-6 pointer-events-auto rounded-[30px] bg-[#090d16] border border-white/[0.12] border-t-cyan-400/30 p-8 shadow-[0_-18px_40px_rgba(0,0,0,0.88),0_25px_50px_rgba(0,0,0,0.85)] will-change-transform [backface-visibility:hidden]"
                >
                  {/* Верхний ярлык */}
                  <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 shadow-sm shadow-cyan-400/50" />
                      <span className="font-bold text-cyan-300 shrink-0">
                        0{idx + 1} / 0{projects.length}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-200 font-semibold truncate">
                        {project.title}
                      </span>
                    </div>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 shrink-0 whitespace-nowrap">
                      {project.tag}
                    </span>
                  </div>

                  {/* Контент карточки */}
                  <div className="grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-7">
                      <div
                        className="group/img relative rounded-2xl overflow-hidden border border-white/10 bg-[#060a12] shadow-xl cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="px-3.5 py-2.5 bg-[#0e1422] border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </div>

                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                          <SmartImage
                            src={projectImg}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            onLoad={() => {
                              measureCardHeights();
                              updateDesktopPositions();
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-60" />
                          <div className="absolute bottom-3.5 right-3.5 opacity-90 group-hover/img:opacity-100 transition-opacity">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20">
                              <Eye className="w-3.5 h-3.5" />
                              <span>{t.projects.btnViewScreens}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2.5 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-5">
                          {project.description}
                        </p>

                        <div className="space-y-2 mb-6 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            {project.whatDoneTitle || (lang === 'ru' ? 'Что сделано:' : 'Key features:')}
                          </div>
                          {project.whatDoneList.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-full py-3 px-5 rounded-xl text-sm font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
                      >
                        <span>{project.btnText}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-950" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscuss={handleDiscuss}
      />
    </section>
  );
};

export default Projects;