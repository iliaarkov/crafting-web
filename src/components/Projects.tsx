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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [trackHeight, setTrackHeight] = useState<number>(3000);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stickyStageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Кешированные высоты карточек для предотвращения layout thrashing на мобильных
  const cardHeightsRef = useRef<number[]>([]);
  const lastWidthRef = useRef<number>(0);

  // Сопоставление с удобными картинками в public/projects/
  const cleanImageMap: Record<string, string> = {
    'specialist-portfolio': '/projects/portfolio.jpg',
    'nonprofit-redesign': '/projects/nonprofit.jpg',
    'wine-coop': '/projects/wine-coop.jpg',
    'driving-center': '/projects/driving-center.jpg',
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

  // Измерение высоты карточек (вызывается только при монтировании и изменении ширины)
  const measureCardHeights = useCallback((): number[] => {
    const isMob = window.innerWidth < 1024;
    const heights = cardRefs.current.map((el) => {
      if (el && el.offsetHeight > 0) {
        return el.offsetHeight;
      }
      return isMob ? 620 : 560;
    });
    cardHeightsRef.current = heights;
    return heights;
  }, []);

  // Расчет целевых положений карточек в стопке с проверкой нижней границы
  const computeStepStates = useCallback(
    (cardHeights: number[], viewportH: number, isMobileView: boolean): StepState[] => {
      if (N === 0) return [];

      const baseTop = isMobileView ? 68 : 82;
      const gap = isMobileView ? 12 : 16;
      const bottomPadding = isMobileView ? 16 : 24;
      const maxBottom = viewportH - bottomPadding;

      const states: StepState[] = [];

      // Шаг 0 (только первая карточка):
      const h0 = cardHeights[0] || (isMobileView ? 620 : 560);
      const initialTop0 = Math.min(baseTop, maxBottom - h0);
      const currentTops = [initialTop0];
      states.push({ cardTops: [...currentTops] });

      // Шаги от 1 до N - 1:
      for (let i = 1; i < N; i++) {
        const hi = cardHeights[i] || (isMobileView ? 620 : 560);
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

  // Обновление положений всех карточек при скролле (прямой GPU-апдейт через translate3d без layout thrashing)
  const updateCardPositions = useCallback(() => {
    if (!trackRef.current || N === 0) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const isMobileView = window.innerWidth < 1024;

    const distPerCard = Math.round(isMobileView ? viewportH * 0.75 : viewportH * 0.8);
    const bufferDist = Math.round(isMobileView ? viewportH * 0.45 : viewportH * 0.5);
    const totalScrollDist = Math.max(0, (N - 1) * distPerCard + bufferDist);

    // Используем кешированные высоты карточек — ни в коем случае не дергаем el.offsetHeight во время скролла!
    let heights = cardHeightsRef.current;
    if (!heights || heights.length !== N || heights.some((h) => h === 0)) {
      heights = measureCardHeights();
    }

    const states = computeStepStates(heights, viewportH, isMobileView);
    if (!states.length) return;

    const scrollOffset = Math.max(0, -trackRect.top);
    const clampedOffset = Math.min(scrollOffset, totalScrollDist);

    const newY: number[] = new Array(N).fill(0);

    if (N === 1) {
      newY[0] = states[0].cardTops[0];
    } else if (clampedOffset <= 0) {
      // Выше начала трека: первая карточка на месте, остальные спрятаны ниже экрана
      newY[0] = states[0].cardTops[0];
      for (let m = 1; m < N; m++) {
        newY[m] = viewportH + 40 + (m - 1) * 60;
      }
    } else if (clampedOffset >= (N - 1) * distPerCard) {
      // Последний шаг завершен (буфер просмотра): все карточки зафиксированы в финальной стопке
      for (let j = 0; j < N; j++) {
        newY[j] = states[N - 1].cardTops[j];
      }
    } else {
      // Непрерывный математический расчет активного шага перехода (currentStep от 1 до N - 1)
      const currentStep = Math.min(
        N - 1,
        Math.floor(clampedOffset / distPerCard) + 1
      );
      const start = (currentStep - 1) * distPerCard;
      const p = Math.max(0, Math.min(1, (clampedOffset - start) / distPerCard));

      // Карточки 0..currentStep-1: плавно интерполируют между states[currentStep-1] и states[currentStep]
      for (let j = 0; j < currentStep; j++) {
        const fromY = states[currentStep - 1].cardTops[j];
        const toY = states[currentStep].cardTops[j];
        newY[j] = fromY + p * (toY - fromY);
      }

      // Карточка currentStep: плавно выплывает снизу к своему месту
      const entryStart = viewportH + 30;
      const targetTop = states[currentStep].cardTops[currentStep];
      newY[currentStep] = (1 - p) * entryStart + p * targetTop;

      // Карточки дальше (m > currentStep): ждут за пределами экрана
      for (let m = currentStep + 1; m < N; m++) {
        newY[m] = viewportH + 30 + (m - currentStep) * 60;
      }
    }

    // Применяем вычисленные координаты напрямую в DOM с аппаратным ускорением GPU
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i];
      if (el) {
        el.style.transform = `translate3d(0, ${Math.round(newY[i])}px, 0)`;
      }
    }
  }, [N, computeStepStates, measureCardHeights]);

  // Слушатели событий и защита от постоянных ре-рендеров при смене размера тулбара iOS
  useEffect(() => {
    lastWidthRef.current = window.innerWidth;
    measureCardHeights();

    const updateTrackDimensions = () => {
      const isMob = window.innerWidth < 1024;
      setIsMobile(isMob);
      const viewportH = window.innerHeight;
      const distPerCard = Math.round(isMob ? viewportH * 0.75 : viewportH * 0.8);
      const bufferDist = Math.round(isMob ? viewportH * 0.45 : viewportH * 0.5);
      const totalScrollDist = Math.max(0, (N - 1) * distPerCard + bufferDist);
      const newHeight = totalScrollDist + viewportH;

      setTrackHeight(newHeight);
      measureCardHeights();
      updateCardPositions();
    };

    updateTrackDimensions();

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // КРИТИЧЕСКИ ВАЖНО ДЛЯ IPHONE / SAFARI / CHROME:
      // При скролле вверх/вниз в мобильных браузерах адресная строка сворачивается/разворачивается,
      // вызывая событие resize с изменением ТОЛЬКО innerHeight.
      // Если innerWidth не изменился — НЕ пересчитываем trackHeight и НЕ вызываем setTrackHeight,
      // так как это вызывает React re-render, перезагрузку блока и сброс скролла!
      if (currentWidth === lastWidthRef.current) {
        updateCardPositions();
        return;
      }
      lastWidthRef.current = currentWidth;
      updateTrackDimensions();
    };

    window.addEventListener('resize', handleResize);

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateCardPositions();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Первичный вызов для мгновенной расстановки карточек
    const timer = setTimeout(() => {
      measureCardHeights();
      updateCardPositions();
    }, 60);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [N, measureCardHeights, updateCardPositions]);

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      {/* Мягкие фоновые пятна изолированы в отдельном контейнере */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[350px] bg-indigo-500/5 blur-[140px] rounded-full" />
      </div>

      {/* Заголовок секции */}
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

      {/* ================= СТОПКА КАРТОЧЕК ПРОЕКТОВ (CARD STACKING DECK) ================= */}
      {/* Scroll track: задает достаточную высоту для пролистывания каждого проекта */}
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${trackHeight}px` }}
      >
        {/* Sticky-контейнер: фиксируется на экране во время пролистывания стопки с 100dvh */}
        <div
          ref={stickyStageRef}
          className="sticky top-0 h-[100dvh] min-h-screen w-full overflow-visible pointer-events-none"
        >
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative h-full">
            {projects.map((project, idx) => {
              const projectImg = cleanImageMap[project.id] || project.image;
              const zIndex = 10 + idx;

              // Начальное положение до гидратации:
              const defaultTop = idx === 0 ? (isMobile ? 68 : 82) : 1200 + idx * 80;

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
                  className="absolute inset-x-4 sm:inset-x-6 pointer-events-auto rounded-[26px] sm:rounded-[30px] bg-[#090d16] border border-white/[0.12] border-t-cyan-400/30 p-5 sm:p-7 lg:p-8 shadow-[0_-18px_40px_rgba(0,0,0,0.88),0_25px_50px_rgba(0,0,0,0.85)] will-change-transform [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                >
                  {/* 
                    1. ВЕРХНИЙ ИНДЕКСНЫЙ ЯРЛЫК (ФОЛДЕР-ПОЛОСКА):
                    Остаётся виден сверху, когда следующий проект наезжает на него в стопке
                  */}
                  <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-white/10 text-xs font-mono">
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

                  {/* 2. КОНТЕНТ КАРТОЧКИ: WIDESCREEN НА ДЕСКТОПЕ, СТРОЙНЫЙ НА СМАРТФОНЕ */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* МОКАП БРАУЗЕРНОГО ОКНА С ПРОЕКТОМ */}
                    <div className="lg:col-span-7">
                      <div
                        className="group/img relative rounded-2xl overflow-hidden border border-white/10 bg-[#060a12] shadow-xl cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        {/* Шапка окна браузера */}
                        <div className="px-3.5 py-2.5 bg-[#0e1422] border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono bg-black/40 px-2.5 py-0.5 rounded-md border border-white/5 truncate max-w-[220px]">
                            {project.id === 'specialist-portfolio'
                              ? 'https://elizaveta-portfolio-beta.vercel.app'
                              : `https://${project.id}.com`}
                          </div>
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </div>

                        {/* Обложка проекта */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                          <SmartImage
                            src={projectImg}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                            onLoad={() => {
                              measureCardHeights();
                              updateCardPositions();
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-60" />

                          {/* Кнопка-бейдж быстрого просмотра экранов */}
                          <div className="absolute bottom-3.5 right-3.5 opacity-90 group-hover/img:opacity-100 transition-opacity">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20">
                              <Eye className="w-3.5 h-3.5" />
                              <span>{t.projects.btnViewScreens}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ТЕКСТОВАЯ ИНФОРМАЦИЯ И ЧЕК-ЛИСТ */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {/* Что сделано */}
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

                      {/* Кнопка открытия кейса */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-full py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
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

      {/* Модальное окно просмотра проекта */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscuss={handleDiscuss}
      />
    </section>
  );
};

export default Projects;