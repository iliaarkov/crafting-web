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
  QrCode,
  Share2,
  Search,
  MessageCircle,
  UserCheck,
  Clock,
  ShieldCheck,
  Headphones,
  Smartphone,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const Solutions: React.FC = () => {
  const { t, lang } = useLanguage();

  // Данные карточек "Проблема → Решение"
  const problemSolutions = [
    {
      icon: FileText,
      problemRu: 'Клиентам приходится писать в личку и ждать ответа ради базовой цены, а многие уходят молча к конкурентам.',
      problemEn: 'Clients have to DM and wait for basic price lists; many leave silently without inquiring.',
      solutionTitleRu: 'Прозрачные цены и условия на сайте',
      solutionTitleEn: 'Clear pricing and service tiers on the site',
      solutionDescRu: 'Клиент самостоятельно знакомится с форматами работы, составом и актуальной стоимостью в один клик.',
      solutionDescEn: 'Clients easily explore your packages, deliverables, and transparent rates in seconds.',
      badgeRu: 'Без долгих переписок о ценах',
      badgeEn: 'Zero back-and-forth about rates',
    },
    {
      icon: HelpCircle,
      problemRu: 'Каждый день одни и те же вопросы в переписках: «какие сроки?», «что нужно подготовить?», «как платить?».',
      problemEn: 'Answering repetitive DMs every day: "what are the deadlines?", "what should I provide?", "how do we pay?".',
      solutionTitleRu: 'Ответы на ключевые вопросы заранее',
      solutionTitleEn: 'Pre-answering key client questions',
      solutionDescRu: 'Сайт снимает частые возражения и сомнения до первого контакта, экономя вам до 4–5 часов в неделю.',
      solutionDescEn: 'The site handles frequent objections and questions upfront, saving you 4–5 hours weekly.',
      badgeRu: 'Экономия 4+ часов в неделю',
      badgeEn: 'Saves 4+ hours per week',
    },
    {
      icon: FolderHeart,
      problemRu: 'Примеры работ разбросаны по разным соцсетям и постам, а лучшие кейсы тонут в ленте личных историй.',
      problemEn: 'Portfolio samples are scattered across feeds and chats, drowning beneath casual personal posts.',
      solutionTitleRu: 'Единая витрина ваших лучших работ',
      solutionTitleEn: 'A unified showcase of your best work',
      solutionDescRu: 'Профессиональная витрина кейсов по одной постоянной ссылке, наглядно демонстрирующая ваш уровень.',
      solutionDescEn: 'A dedicated, structured portfolio link that immediately demonstrates your real expertise.',
      badgeRu: 'Кейсы всегда под рукой',
      badgeEn: 'Structured case studies',
    },
    {
      icon: ArrowRightCircle,
      problemRu: 'Клиент заинтересовался в соцсетях, но не понимает, куда нажать и как быстро сделать заказ.',
      problemEn: 'A client is interested but gets confused about where to click or how to order quickly.',
      solutionTitleRu: 'Понятный следующий шаг без барьеров',
      solutionTitleEn: 'Frictionless next step for the client',
      solutionDescRu: 'Прямое целевое действие: быстрая запись в Telegram, WhatsApp или отправка заявки за 20 секунд.',
      solutionDescEn: 'Clear call-to-action: fast direct booking via Telegram, WhatsApp, or a simple form in 20 seconds.',
      badgeRu: 'Заявка меньше чем за 30 сек',
      badgeEn: 'Booking in under 30s',
    },
    {
      icon: Building2,
      problemRu: 'Профиль в соцсетях не формирует достаточного доверия при продаже дорогих услуг или B2B-контрактов.',
      problemEn: 'A basic social profile lacks authority when pitching high-ticket services or B2B contracts.',
      solutionTitleRu: 'Солидный статус и собственный домен',
      solutionTitleEn: 'Professional domain & SSL reputation',
      solutionDescRu: 'Собственный сайт с уникальным адресом и SSL-защитой подтверждает надёжность и повышает средний чек.',
      solutionDescEn: 'A dedicated domain with SSL encryption proves you run an established, trustworthy business.',
      badgeRu: 'Высокое доверие клиентов',
      badgeEn: 'High client trust & authority',
    },
  ];

  // Стандарты запуска (перенесённые из блока Advantages)
  const standards = [
    {
      icon: UserCheck,
      titleRu: 'Напрямую с разработчиком',
      titleEn: 'Direct Developer Contact',
      problemRu: 'Без «испорченного телефона» и долгих согласований через менеджеров агентств.',
      problemEn: 'No agency middlemen or distorted messages across endless account managers.',
      solutionRu: 'Вы общаетесь напрямую со мной — любые вопросы и идеи внедряются оперативно.',
      solutionEn: 'You talk directly with the engineer building your site — immediate clarity and quick edits.',
    },
    {
      icon: Clock,
      titleRu: 'Быстрый запуск за 5–12 дней',
      titleEn: 'Swift 5–12 Day Launch',
      problemRu: 'Разработка не затягивается на месяцы из-за раздутой бюрократии.',
      problemEn: 'Development never drags on for months due to unnecessary corporate bureaucracy.',
      solutionRu: 'Чёткий согласованный план и готовый рабочий сайт в сети точно в оговорённый срок.',
      solutionEn: 'A streamlined roadmap and a production-ready website live right on schedule.',
    },
    {
      icon: ShieldCheck,
      titleRu: '100% фиксированная цена',
      titleEn: '100% Fixed Quote',
      problemRu: 'Никаких скрытых платежей, платных правок и растущих смет в процессе разработки.',
      problemEn: 'Zero hidden fees, surprise hourly invoices, or sudden scope-creep price hikes.',
      solutionRu: 'Состав работ и финальная стоимость фиксируются до старта и не меняются.',
      solutionEn: 'Deliverables and the total cost are locked in before kickoff and stay unchanged.',
    },
    {
      icon: Headphones,
      titleRu: 'Поддержка после запуска',
      titleEn: 'Post-Launch Care',
      problemRu: 'Исполнитель сдал сайт и пропал, оставив вас один на один с вопросами.',
      problemEn: 'Freelancers hand over files and vanish, leaving you stranded with questions.',
      solutionRu: 'Бесплатное сопровождение после релиза: подскажу по настройкам и поддержу.',
      solutionEn: 'Complimentary post-release warranty: prompt answers and help with all technical details.',
    },
    {
      icon: Smartphone,
      titleRu: 'Идеально на смартфонах',
      titleEn: 'Pixel-Perfect Mobile',
      problemRu: 'Большинство шаблонных сайтов криво отображаются на смартфонах клиентов.',
      problemEn: 'Most template sites look cluttered or broken on modern smartphones.',
      solutionRu: 'Адаптивная верстка, плавная анимация и моментальная скорость на любом телефоне.',
      solutionEn: 'Fluid responsive layout, smooth animations, and instant page speeds on all devices.',
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

        {/* ================= СЕТКА КАРТОЧЕК: ПРОБЛЕМА → РЕШЕНИЕ ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {problemSolutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-white/10 bg-[#090d16]/85 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-400/40 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)] transition-all duration-300 overflow-hidden cursor-default select-none"
              >
                {/* Внутреннее свечение при наведении */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-400/20 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Иконка карточки и бейдж выгоды */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 group-hover:border-cyan-400/40 transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 whitespace-nowrap">
                      {lang === 'ru' ? item.badgeRu : item.badgeEn}
                    </span>
                  </div>

                  {/* 1. БЛОК: ПРОБЛЕМА (ЧТО МЕШАЕТ СЕЙЧАС) */}
                  <div className="mb-4 p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span>{lang === 'ru' ? 'Проблема' : 'Pain Point'}</span>
                    </div>
                    <p className="text-rose-200/80 leading-relaxed text-[12px] sm:text-[13px]">
                      {lang === 'ru' ? item.problemRu : item.problemEn}
                    </p>
                  </div>

                  {/* 2. СТРЕЛКА-ПЕРЕХОД: РЕШЕНИЕ */}
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>{lang === 'ru' ? 'Решение сайта' : 'Website Solution'}</span>
                  </div>

                  {/* Заголовок решения */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors leading-snug">
                    {lang === 'ru' ? item.solutionTitleRu : item.solutionTitleEn}
                  </h3>

                  {/* Описание решения */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {lang === 'ru' ? item.solutionDescRu : item.solutionDescEn}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{lang === 'ru' ? 'Решено раз и навсегда' : 'Solved permanently'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= КАРТОЧКА 6: НЕЗАВИСИМОСТЬ ОТ СОЦИАЛЬНЫХ СЕТЕЙ (СОХРАНЕНА КАК ЕСТЬ) ================= */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300 mb-14 shadow-lg cursor-default select-none">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {t.solutions.items[5].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
                  {t.solutions.items[5].description}
                </p>
              </div>
            </div>
            <span className="self-start lg:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === 'ru' ? 'Работает 24/7' : 'Works 24/7'}</span>
            </span>
          </div>

          {/* Схема распределения трафика (Омниканальный хаб) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 flex flex-col items-center text-center hover:border-cyan-500/30 transition-all">
              <QrCode className="w-6 h-6 text-cyan-400 mb-2" />
              <span className="text-xs font-bold text-white mb-0.5">
                {lang === 'ru' ? 'Визитки и QR' : 'QR & Cards'}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === 'ru' ? 'На встречах и оффлайн' : 'Offline networking'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 flex flex-col items-center text-center hover:border-cyan-500/30 transition-all">
              <MessageCircle className="w-6 h-6 text-sky-400 mb-2" />
              <span className="text-xs font-bold text-white mb-0.5">
                {lang === 'ru' ? 'Telegram и био' : 'Telegram & Bio'}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === 'ru' ? 'Одна ссылка в шапке' : 'Single link in profile'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 flex flex-col items-center text-center hover:border-cyan-500/30 transition-all">
              <Search className="w-6 h-6 text-emerald-400 mb-2" />
              <span className="text-xs font-bold text-white mb-0.5">
                {lang === 'ru' ? 'Поиск Яндекс/Google' : 'Search Engines'}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === 'ru' ? 'SEO-индексация' : 'SEO indexing'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 flex flex-col items-center text-center hover:border-cyan-500/30 transition-all">
              <Share2 className="w-6 h-6 text-purple-400 mb-2" />
              <span className="text-xs font-bold text-white mb-0.5">
                {lang === 'ru' ? 'Реклама и партнёры' : 'Ads & Partners'}
              </span>
              <span className="text-[10px] text-slate-400">
                {lang === 'ru' ? 'Прямой трафик' : 'Direct landing page'}
              </span>
            </div>
          </div>
        </div>

        {/* ================= ОБЪЕДИНЕННЫЙ МИНИ-БЛОК: СТАНДАРТЫ И ГАРАНТИИ ЗАПУСКА ================= */}
        <div className="rounded-3xl border border-white/10 bg-[#080d17]/80 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden cursor-default select-none">
          {/* Верхняя шапка блока гарантий */}
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ru' ? 'Гарантии сотрудничества' : 'Launch Standards & Guarantees'}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {lang === 'ru' ? 'Всё для спокойного и быстрого запуска' : 'Everything for a smooth & reliable launch'}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === 'ru'
                ? 'Процесс выстроен так, чтобы вы получили готовый результат без скрытых переплат, сорванных сроков и потери времени.'
                : 'Streamlined development ensuring you launch without delays, unexpected budget spikes, or wasted time.'}
            </p>
          </div>

          {/* 5 компактных мини-блоков гарантий */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {standards.map((st, sIdx) => {
              const StIcon = st.icon;
              return (
                <div
                  key={sIdx}
                  className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 sm:p-5 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 transition-all shrink-0">
                        <StIcon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {lang === 'ru' ? st.titleRu : st.titleEn}
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs">
                      {/* Без агентской бюрократии */}
                      <div className="text-rose-300/80 bg-rose-950/20 px-2.5 py-1.5 rounded-lg border border-rose-500/10 leading-snug">
                        <span className="font-semibold text-rose-400 mr-1.5">✕</span>
                        {lang === 'ru' ? st.problemRu : st.problemEn}
                      </div>
                      {/* Реальное решение */}
                      <div className="text-slate-300 leading-relaxed px-1">
                        <span className="text-emerald-400 font-semibold mr-1.5">✓</span>
                        {lang === 'ru' ? st.solutionRu : st.solutionEn}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
