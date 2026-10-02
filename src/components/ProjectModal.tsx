import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onDiscuss: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onDiscuss }) => {
  const { t, lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-white/15 bg-[#0b0e14]/95 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors z-10"
          aria-label={t.projects.modalClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-3">
            {project.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
        </div>

        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/10 relative bg-slate-900 group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="space-y-4 text-slate-300 leading-relaxed text-base mb-8">
          <p>{project.description}</p>
          <p>{project.p2}</p>
          {project.p3 && <p className="text-cyan-200/90 font-medium">{project.p3}</p>}
        </div>

        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 mb-8 bg-white/[0.02]">
          <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            {t.projects.modalClose}
          </button>

          <button
            onClick={() => {
              onClose();
              onDiscuss();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{lang === 'ru' ? 'Обсудить похожий проект' : 'Discuss similar project'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};