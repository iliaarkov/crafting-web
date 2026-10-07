import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  FileText,
  HelpCircle,
  FolderHeart,
  ArrowRightCircle,
  Building2,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const Solutions: React.FC = () => {
  const { t, lang } = useLanguage();

  // 6 карточек решений сайта: сетка 3x2 на ПК, 2x3 на планшетах, 1x6 на мобильных
  const solutions = [
    {
      icon: FileText,
      badgeRu: 'Без долгих переписок о ценах',
      badgeEn: 'Zero DMs about pricing',
      titleRu: 'Прозрачные цены и условия на сайте',
      titleEn: 'Clear pricing and service tiers',
      descRu: 'Клиент самостоятельно знакомится с форматами работы, составом и актуальной стоимостью в один клик. Больше не нужно каждому отправлять прайс в личные сообщения.',
      descEn: 'Clients explore packages, deliverables, and transparent rates in seconds. No more sending PDF price lists in repetitive DMs.',
    },
    {
      icon: HelpCircle,
      badgeRu: 'Экономия времени',
      badgeEn: 'Time savings',
      titleRu: 'Ответы на ключевые вопросы заранее',
      titleEn: 'Pre-answering key client questions',
      descRu: 'Сайт заранее закрывает частые вопросы о сроках, порядке работы и условиях до первого контакта. Клиенты приходят на диалог уже подготовленными и лояльными.',
      descEn: 'The site handles frequent questions about process, deadlines, and deliverables upfront, saving you 4+ hours every week.',
    },
    {
      icon: FolderHeart,
      badgeRu: 'Кейсы всегда под рукой',
      badgeEn: 'Portfolio always accessible',
      titleRu: 'Единая витрина ваших лучших работ',
      titleEn: 'A unified showcase of your best work',
      descRu: 'Профессиональная витрина проектов по одной постоянной ссылке. Работы не тонут в ленте личных сторис и соцсетей, а наглядно подтверждают ваш реальный уровень.',
      descEn: 'A structured portfolio link that immediately showcases your real expertise without getting buried in casual social feeds.',
    },
    {
      icon: ArrowRightCircle,
      badgeRu: 'Быстрый заказ в 1 клик',
      badgeEn: '1-click direct booking',
      titleRu: 'Понятный следующий шаг без барьеров',
      titleEn: 'Frictionless next step for the client',
      descRu: 'Прямое целевое действие: быстрая запись в Telegram, WhatsApp или отправка заявки за 20 секунд. Клиент не путается в профиле и делает заказ сразу.',
      descEn: 'Clear call-to-action: fast direct booking via Telegram, WhatsApp, or a simple form in 20 seconds. Zero client friction.',
    },
    {
      icon: Building2,
      badgeRu: 'Высокое доверие и статус',
      badgeEn: 'High trust & authority',
      titleRu: 'Солидный статус и собственный домен',
      titleEn: 'Custom domain & solid reputation',
      descRu: 'Собственный сайт с уникальным адресом и SSL-защитой подтверждает надёжность, выгодно выделяет на фоне конкурентов и повышает средний чек.',
      descEn: 'A dedicated domain with SSL encryption proves you run an established, trustworthy business and commands higher client fees.',
    },
    {
      icon: ShieldAlert,
      badgeRu: '100% независимость 24/7',
      badgeEn: '100% independence 24/7',
      titleRu: 'Вы не зависите только от социальной сети',
      titleEn: 'Independent from social platforms',
      descRu: 'Сайт остаётся вашей собственной независимой площадкой, доступной 24/7 по постоянному адресу. Ссылку можно использовать в био, Telegram, рекламе, визитках и поиске.',
      descEn: 'Your website remains your sovereign platform, live 24/7. Works seamlessly with Telegram, search engines, offline QR codes, and ads.',
    },
  ];

  return (
    <section id="solutions" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Декоративное фоновое свечение */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[350px] bg-indigo-600/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.header.nav.solutions}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 text-balance">
            {t.solutions.title}
          </h2>
          <div className="space-y-2 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>{t.solutions.intro1}</p>
            <p className="text-cyan-200/90 font-medium">{t.solutions.intro2}</p>
          </div>
        </div>

        {/* ================= СЕТКА 6 КАРТОЧЕК: 3 НА 2 НА ПК, 2 НА 3 НА ПЛАНШЕТАХ, 1 НА 6 НА ТЕЛЕФОНАХ ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-white/10 bg-[#090d16]/85 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-400/40 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)] transition-all duration-300 overflow-hidden cursor-default select-none"
              >
                {/* Внутреннее свечение при наведении */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-400/20 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Верхняя строка: Иконка и увеличенный мини-заголовок (бейдж) */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 group-hover:border-cyan-400/40 transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Увеличенный мини-заголовок */}
                    <span className="text-xs sm:text-[13px] font-bold px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 whitespace-nowrap shadow-sm">
                      {lang === 'ru' ? item.badgeRu : item.badgeEn}
                    </span>
                  </div>

                  {/* Основной заголовок карточки */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-cyan-200 transition-colors leading-snug">
                    {lang === 'ru' ? item.titleRu : item.titleEn}
                  </h3>

                  {/* Описание решения */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {lang === 'ru' ? item.descRu : item.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;