import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectModal, type ProjectData } from './ProjectModal';
import { ArrowUpRight, Check, Eye, ExternalLink } from 'lucide-react';

export const Projects: React.FC = () => {
  const { t, lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Сопоставление с удобными картинками в public/projects/
  const cleanImageMap: Record<string, string> = {
    'specialist-portfolio': '/projects/portfolio.jpg',
    'nonprofit-redesign': '/projects/nonprofit.jpg',
    'wine-coop': '/projects/wine-coop.jpg',
    'driving-center': '/projects/driving-center.jpg',
  };

  const projects = t.projects.items || [];

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Мягкие фоновые световые пятна */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[350px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-14 sm:mb-16">
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

        {/* ================= СТОПКА КАРТОЧЕК ПРОЕКТОВ (CARD STACKING DECK) ================= */}
        <div className="relative pb-16">
          {projects.map((project, idx) => {
            const projectImg = cleanImageMap[project.id] || project.image;
            // Смещение верхней границы для каждой следующей карты в стопке
            // На мобилках: 80px хедера + 18px за каждый проект
            // На десктопе: 84px хедера + 26px за каждый проект
            const stickyTop = isMobile ? 80 + idx * 18 : 84 + idx * 26;

            return (
              <div
                key={project.id}
                style={{ top: `${stickyTop}px` }}
                className="sticky rounded-[26px] sm:rounded-[30px] bg-[#090d16] border border-white/[0.12] p-5 sm:p-7 lg:p-8 shadow-[0_-14px_35px_rgba(0,0,0,0.85),0_20px_45px_rgba(0,0,0,0.85)] mb-14 sm:mb-20 lg:mb-24 last:mb-0 transition-transform duration-300"
              >
                {/* 
                  1. ВЕРХНИЙ ИНДЕКСНЫЙ ЯРЛЫК (ФИРМЕННАЯ ВЕРХНЯЯ ПОЛОСКА СТОПКИ):
                  Остаётся видимой, когда следующая карта ложится поверх!
                */}
                <div className="flex items-center justify-between pb-3.5 mb-5 sm:mb-6 border-b border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 shadow-sm shadow-cyan-400/50" />
                    <span className="font-bold text-cyan-300 shrink-0">
                      0{idx + 1} / 0{projects.length}
                    </span>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="text-slate-200 font-semibold truncate hidden sm:inline">
                      {project.title}
                    </span>
                  </div>

                  <span className="text-[11px] px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shrink-0 whitespace-nowrap">
                    {project.tag}
                  </span>
                </div>

                {/* 2. ОСНОВНОЙ КОНТЕНТ КАРТОЧКИ: ШИРОКИЙ 2-КОЛОНОЧНЫЙ WIDESCREEN НА ДЕСКТОПЕ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* ЛЕВАЯ ЧАСТЬ: ИНТЕРАКТИВНЫЙ БРАУЗЕРНЫЙ МОКАП */}
                  <div className="lg:col-span-7">
                    <div
                      className="group/img relative rounded-2xl overflow-hidden border border-white/10 bg-[#060a12] shadow-xl cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Шапка браузерного окна */}
                      <div className="px-3.5 py-2.5 bg-[#0e1422] border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono bg-black/40 px-2.5 py-0.5 rounded-md border border-white/5 truncate max-w-[180px]">
                          https://{project.id}.com
                        </div>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </div>

                      {/* Обложка проекта */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={projectImg}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
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

                  {/* ПРАВАЯ ЧАСТЬ: ИНФОРМАЦИЯ, СПИСОК РАБОТ И ДЕЙСТВИЕ */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Что сделано (список ключевых преимуществ) */}
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

                    {/* Кнопка просмотра кейса */}
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

      {/* Модальное окно просмотра проекта со слайдером */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscuss={handleDiscuss}
      />
    </section>
  );
};

export default Projects;
