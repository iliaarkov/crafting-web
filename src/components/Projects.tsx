import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { ProjectModal, type ProjectData } from './ProjectModal';
import { ArrowUpRight, Check, Eye } from 'lucide-react';

export const Projects: React.FC = () => {
  const { t, lang } = useLanguage();
  const { cmsContent } = useCms();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

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

  const customProjectsData: ProjectData[] = (cmsContent.customProjects || []).map((cp) => ({
    id: cp.id,
    title: lang === 'ru' ? cp.titleRu : cp.titleEn,
    tag: lang === 'ru' ? cp.tagRu : cp.tagEn,
    description: lang === 'ru' ? cp.descRu : cp.descEn,
    p2: lang === 'ru' ? cp.p2Ru : cp.p2En,
    p3: lang === 'ru' ? cp.p3Ru : cp.p3En,
    whatDoneTitle: lang === 'ru' ? 'Что сделано:' : 'What was delivered:',
    whatDoneList: (lang === 'ru' ? cp.whatDoneRu : cp.whatDoneEn) || [],
    btnText: lang === 'ru' ? 'Посмотреть проект' : 'View Project',
    image: cp.image,
    images: cp.images && cp.images.length > 0 ? cp.images : [cp.image],
  }));

  const allProjects: ProjectData[] = [...customProjectsData, ...t.projects.items];

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300"
            >
              <div>
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-400 text-slate-950 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.projects.btnViewScreens}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="text-xs font-medium text-cyan-400 mb-2">
                    {project.tag}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {project.whatDoneList.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-cyan-500/30"
                >
                  <span>{project.btnText}</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
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