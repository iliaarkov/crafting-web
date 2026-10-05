import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { Check, X, Code2, GraduationCap, Users2, Sparkles, UserCheck } from 'lucide-react';

export const About: React.FC = () => {
  const { t, lang } = useLanguage();
  const { cmsContent } = useCms();
  const [imgError, setImgError] = useState(false);

  const photoSrc = cmsContent.aboutPhotoUrl || '/images/ilya.jpg';
  const photoScale = cmsContent.aboutPhotoScale || 1;
  const photoPosX = cmsContent.aboutPhotoPositionX ?? 50;
  const photoPosY = cmsContent.aboutPhotoPositionY ?? 50;

  const p1Text = lang === 'ru'
    ? (cmsContent.aboutP1Ru || t.about.p1)
    : (cmsContent.aboutP1En || t.about.p1);

  const p2Text = lang === 'ru'
    ? (cmsContent.aboutP2Ru || t.about.p2)
    : (cmsContent.aboutP2En || t.about.p2);

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            {t.header.nav.about}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.about.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Фото и кадрирование */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none -z-10" />

            <div className="w-full flex flex-col items-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-2xl shadow-cyan-950/50 mb-5 bg-[#090d14] group-hover:border-cyan-400/60 transition-colors">
                {!imgError ? (
                  <img
                    key={photoSrc}
                    src={photoSrc}
                    alt={lang === 'ru' ? 'Илья Арьков — Веб-разработчик' : 'Ilia Arkov — Web Developer'}
                    onError={() => setImgError(true)}
                    style={{
                      transform: `scale(${photoScale})`,
                      objectPosition: `${photoPosX}% ${photoPosY}%`,
                    }}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950/80 via-[#0a0f18] to-slate-900 text-cyan-300 p-4">
                    <UserCheck className="w-16 h-16 text-cyan-400/80 mb-2" />
                    <span className="text-xs font-semibold text-slate-300">
                      {lang === 'ru' ? 'Илья Арьков' : 'Ilia Arkov'}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">/images/ilya.jpg</span>
                  </div>
                )}

                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/75 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{lang === 'ru' ? 'Доступен для проектов' : 'Available for projects'}</span>
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                {lang === 'ru' ? 'Илья Арьков' : 'Ilia Arkov'}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-cyan-300 mb-4">
                {lang === 'ru' ? 'Веб-разработчик сайтов' : 'Web Developer'}
              </p>
            </div>

            <div className="w-full pt-4 border-t border-white/5 space-y-2 text-left">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{lang === 'ru' ? 'Профильное высшее IT-образование' : 'University Degree in Computer Science'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{lang === 'ru' ? 'Прямая связь без посредников' : '1-on-1 direct collaboration'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex-1 flex flex-col justify-between">
              <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
                <p>{p1Text}</p>
                <p className="text-slate-400">{p2Text}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-cyan-300 text-sm font-medium">
                <Users2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>{t.about.directComm}</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1017]/80 to-[#0e1624]/80">
              <div className="flex items-center gap-2 text-white font-semibold text-base mb-4">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <h3>{t.about.canIncludeTitle}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.about.canIncludeList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 bg-[#091214]/60">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg mb-6">
              <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <h3>{t.about.whoIsItForTitle}</h3>
            </div>
            <ul className="space-y-3.5">
              {t.about.whoIsItForList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#120f12]/40">
            <div className="flex items-center gap-2.5 text-rose-400/90 font-bold text-lg mb-6">
              <div className="w-7 h-7 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <X className="w-4 h-4 text-rose-400" />
              </div>
              <h3>{t.about.whoIsNotForTitle}</h3>
            </div>
            <ul className="space-y-3.5">
              {t.about.whoIsNotForList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;