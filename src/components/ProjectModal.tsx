import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SmartImage } from './SmartImage';
import { X, Check, ArrowRight } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  tag: string;
  description: string;
  p2: string;
  p3?: string;
  whatDoneTitle: string;
  whatDoneList: string[];
  btnText: string;
  image: string;
  images?: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onDiscuss: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onDiscuss }) => {
  const { t, lang } = useLanguage();

  // Чистые пути к изображениям в public/projects/
  const cleanImageMap: Record<string, string[]> = {
    'specialist-portfolio': [
      '/projects/portfolio.jpg',
      '/projects/portfolio-1.jpg',
      '/projects/portfolio-2.jpg',
      '/projects/portfolio-3.jpg',
      '/projects/portfolio-4.jpg',
      '/projects/portfolio-5.jpg',
      '/projects/portfolio-6.jpg',
      '/projects/portfolio-mobile.jpg',
    ],
    'nonprofit-redesign': [
      '/projects/nonprofit.jpg',
      '/projects/nonprofit-1.jpg',
    ],
    'wine-coop': [
      '/projects/wine-coop.jpg',
      '/projects/wine-coop-1.jpg',
    ],
    'driving-center': [
      '/projects/driving-center.jpg',
      '/projects/driving-center-1.jpg',
    ],
  };

  // Список всех изображений для карусели:
  // Если в проекте явно передан массив без старых путей /src/assets/images/, используем его, иначе cleanImageMap
  const rawImages = project
    ? (project.images && project.images.length > 0 && !project.images.some(img => img.includes('/src/assets/images/')))
      ? project.images
      : cleanImageMap[project.id] || (project.images && project.images.length > 0 ? project.images : [project.image])
    : [];

  const N = rawImages.length;
  const hasMultiple = N > 1;

  // Бесконечный массив слайдов: [last, ...all, first] для плавного цикличного перелистывания
  const slides = hasMultiple ? [rawImages[N - 1], ...rawImages, rawImages[0]] : rawImages;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  // Состояние перетаскивания (Instagram-style smooth drag)
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartXRef = useRef<number | null>(null);
  const isPointerDownRef = useRef<boolean>(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Сброс индекса при открытии нового проекта
  useEffect(() => {
    if (project) {
      setCurrentIndex(1);
      setIsTransitioning(false);
      setDragOffset(0);
      setIsDragging(false);
      setTimerKey((k) => k + 1);
      const tId = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(tId);
    }
  }, [project]);

  const goToNext = useCallback(() => {
    if (!hasMultiple) return;
    setIsTransitioning(true);
    setDragOffset(0);
    setCurrentIndex((prev) => prev + 1);
    setTimerKey((k) => k + 1);
  }, [hasMultiple]);

  const goToPrev = useCallback(() => {
    if (!hasMultiple) return;
    setIsTransitioning(true);
    setDragOffset(0);
    setCurrentIndex((prev) => prev - 1);
    setTimerKey((k) => k + 1);
  }, [hasMultiple]);

  const jumpToSlide = (idx: number) => {
    setIsTransitioning(true);
    setDragOffset(0);
    setCurrentIndex(idx + 1);
    setTimerKey((k) => k + 1);
  };

  // Закрытие по Escape и стрелки клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (hasMultiple) {
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrev();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, hasMultiple, goToNext, goToPrev]);

  // Автоперелистывание раз в 7 секунд (только если не тянем руками)
  useEffect(() => {
    if (!hasMultiple || !project || isDragging) return;
    const interval = setInterval(() => {
      goToNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [hasMultiple, project, isDragging, timerKey, goToNext]);

  // Бесшовный бесконечный цикл при завершении transition
  const handleTransitionEnd = () => {
    if (!hasMultiple) return;
    if (currentIndex === N + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(N);
    }
  };

  // ================= INSTAGRAM-STYLE SMOOTH POINTER DRAG =================
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;
    isPointerDownRef.current = true;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);
    setIsTransitioning(false); // Отключаем CSS-анимацию, чтобы слайды следовали за курсором 1:1
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || dragStartXRef.current === null) return;
    const currentX = e.clientX;
    const diff = currentX - dragStartXRef.current;
    // Тянем влево (diff < 0) -> лента смещается влево, показывая следующее фото
    // Тянем вправо (diff > 0) -> лента смещается вправо, показывая предыдущее фото
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {
      // Игнорируем
    }

    const currentDiff = dragOffset;

    // Включаем плавный transition для доводки слайда
    setIsTransitioning(true);

    // Порог свайпа: 50px
    if (currentDiff < -50) {
      // Потянули влево -> переход к следующему фото (в ту же сторону!)
      goToNext();
    } else if (currentDiff > 50) {
      // Потянули вправо -> переход к предыдущему фото (в ту же сторону!)
      goToPrev();
    } else {
      // Если потянули слабо (< 50px) — пружиним обратно на текущий слайд
      setDragOffset(0);
    }

    dragStartXRef.current = null;
  };

  if (!project) return null;

  // Индекс активной точки (от 0 до N - 1)
  const activeDotIndex = hasMultiple ? (currentIndex - 1 + N) % N : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl border border-white/15 bg-[#0b0e14]/98 shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors z-20 cursor-pointer"
          aria-label={t.projects.modalClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Заголовок проекта */}
        <div className="mb-6 pr-12">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-3">
            {project.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
        </div>

        {/* ================= СЛАЙДЕР С ЖИВЫМ ПЕРЕТАСКИВАНИЕМ (INSTAGRAM-STYLE) ================= */}
        <div
          ref={carouselContainerRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-slate-950 select-none group touch-pan-y"
        >
          {hasMultiple ? (
            <div
              className="w-full h-full relative cursor-ew-resize"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* ЛЕНТА СЛАЙДОВ С ТОЧНЫМ СЛЕДОВАНИЕМ ЗА КУРСОРОМ */}
              <div
                className="flex w-full h-full"
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                  transition: isTransitioning
                    ? 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((imgSrc, sIdx) => (
                  <div key={sIdx} className="w-full h-full shrink-0 relative">
                    <SmartImage
                      src={imgSrc}
                      alt={`${project.title} - фото ${sIdx}`}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable={false}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Подсказка при наведении на ПК */}
              <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-slate-300 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span>↔</span>
                <span>{lang === 'ru' ? 'Тяните мышкой для листания' : 'Drag to slide'}</span>
              </div>

              {/* Точки-индикаторы и прогресс-бар внизу */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {rawImages.map((_, dotIdx) => {
                  const isActive = dotIdx === activeDotIndex;
                  return (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => jumpToSlide(dotIdx)}
                      className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                        isActive ? 'w-8 bg-white/20' : 'w-2 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Слайд ${dotIdx + 1}`}
                    >
                      {isActive && (
                        <div
                          key={timerKey}
                          className="h-full bg-cyan-400 rounded-full"
                          style={{
                            animation: !isDragging ? 'fillProgress 7s linear forwards' : 'none',
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Описание проекта */}
        <div className="space-y-4 text-slate-300 leading-relaxed text-base mb-8">
          <p>{project.description}</p>
          <p>{project.p2}</p>
          {project.p3 && <p className="text-cyan-200/90 font-medium">{project.p3}</p>}
        </div>

        {/* Что реализовано */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 mb-8 bg-white/[0.02]">
          <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            {project.whatDoneTitle}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.whatDoneList.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Нижние кнопки */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {t.projects.modalClose}
          </button>

          <button
            onClick={() => {
              onClose();
              onDiscuss();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{lang === 'ru' ? 'Обсудить похожий проект' : 'Discuss similar project'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;