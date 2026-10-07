import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UserCheck, Clock, ShieldCheck, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';

export const Guarantees: React.FC = () => {
  const { lang } = useLanguage();

  const items = [
    {
      icon: UserCheck,
      titleRu: 'Напрямую с разработчиком',
      titleEn: 'Direct with Developer',
      badgeRu: 'Без посредников',
      badgeEn: 'No Middlemen',
      descRu: 'Вы общаетесь напрямую со мной – без испорченного телефона, менеджеров и бюрократии. Любые вопросы и правки внедряются оперативно.',
      descEn: 'Direct communication with the engineer building your site. No agency telephone game – instant clarity on every detail.',
    },
    {
      icon: Clock,
      titleRu: 'Быстрый запуск за 5–12 дней',
      titleEn: 'Fast 5–12 Day Launch',
      badgeRu: 'Точно в срок',
      badgeEn: 'Strict Deadlines',
      descRu: 'Чёткий согласованный план и готовый рабочий сайт в сети точно в оговорённый срок, без затягивания на месяцы.',
      descEn: 'A clear agreed roadmap and a live production site on schedule, without dragging projects out for months.',
    },
    {
      icon: ShieldCheck,
      titleRu: '100% фиксированная цена',
      titleEn: '100% Fixed Quote',
      badgeRu: 'Без скрытых доплат',
      badgeEn: 'Zero Hidden Fees',
      descRu: 'Состав работ и стоимость утверждаются до старта и не меняются. Никаких платных правок или растущих смет.',
      descEn: 'The scope of work and final price are locked in prior to kickoff. No surprise invoices or scope-creep price hikes.',
    },
    {
      icon: Headphones,
      titleRu: 'Поддержка после запуска',
      titleEn: 'Post-Launch Care',
      badgeRu: 'Гарантия и помощь',
      badgeEn: 'Free Warranty',
      descRu: 'Бесплатное техническое сопровождение после релиза. Я остаюсь на связи, помогаю с настройками и отвечаю на вопросы.',
      descEn: 'Complimentary technical warranty after release. I stay available to help with configurations and questions.',
    },
  ];

  return (
    <section id="guarantees" className="py-20 lg:py-24 relative overflow-hidden">
      {/* Мягкие фоновые световые пятна */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Гарантии сотрудничества' : 'Collaboration Guarantees'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {lang === 'ru' ? 'Всё для спокойного и надёжного запуска' : 'Everything for a smooth & reliable launch'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {lang === 'ru'
              ? 'Прозрачные условия без агентской наценки, срывов сроков и передачи проекта третьим лицам.'
              : 'Transparent workflow without agency markups, missed deadlines, or outsourcing.'}
          </p>
        </div>

        {/* ================= 4 БЛОКА ГАРАНТИЙ: 1 СТРОКА НА ПК, 2 НА 2 НА ПЛАНШЕТАХ, 1 НА ТЕЛЕФОНАХ ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/10 bg-[#080d17]/85 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-400/40 hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.15)] transition-all duration-300 cursor-default select-none overflow-hidden"
              >
                {/* Мягкое свечение в углу при наведении */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 blur-xl rounded-full group-hover:bg-cyan-400/20 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Верхняя часть: Иконка + бейдж */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 group-hover:border-cyan-400/40 transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                      {lang === 'ru' ? item.badgeRu : item.badgeEn}
                    </span>
                  </div>

                  {/* Заголовок */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors leading-snug">
                    {lang === 'ru' ? item.titleRu : item.titleEn}
                  </h3>

                  {/* Описание (только чистое решение, без проблем и красного) */}
                  <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
                    {lang === 'ru' ? item.descRu : item.descEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
