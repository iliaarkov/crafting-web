import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  FileText,
  HelpCircle,
  FolderHeart,
  ArrowRightCircle,
  Building2,
  ShieldAlert,
  Check,
  Send,
  Lock,
  Sparkles,
  QrCode,
  Share2,
  Search,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const Solutions: React.FC = () => {
  const { t, lang } = useLanguage();

  // Состояние для калькулятора тарифов (Карточка 1)
  const [selectedTier, setSelectedTier] = useState<number>(1);

  // Состояние для мини-FAQ (Карточка 2)
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Состояние для формы заявки в 1 клик (Карточка 4)
  const [ctaSent, setCtaSent] = useState(false);
  const [ctaInput, setCtaInput] = useState('');

  const tiers = [
    {
      name: lang === 'ru' ? 'Визитка' : 'One-Pager',
      price: lang === 'ru' ? '12 000 ₽' : '$150',
      time: lang === 'ru' ? '2-3 дня' : '2-3 days',
      features: lang === 'ru' ? 'О себе, прайс, контакты' : 'Bio, pricing, contacts',
    },
    {
      name: lang === 'ru' ? 'Лендинг' : 'Landing',
      price: lang === 'ru' ? '17 000 ₽' : '$220',
      time: lang === 'ru' ? '3-5 дней' : '3-5 days',
      features: lang === 'ru' ? 'Портфолио, отзывы, заявки' : 'Portfolio, reviews, forms',
    },
    {
      name: lang === 'ru' ? 'Сайт-каталог' : 'Catalog Site',
      price: lang === 'ru' ? '24 000 ₽' : '$310',
      time: lang === 'ru' ? '5-7 дней' : '5-7 days',
      features: lang === 'ru' ? 'Каталог услуг, фильтры, FAQ' : 'Services, filters, FAQ',
    },
  ];

  const faqItems = [
    {
      q: lang === 'ru' ? '«А сколько ждать готовности?»' : '«How long does it take?»',
      a: lang === 'ru' ? 'От 2 до 5 дней. Без срывов сроков и бесконечных созвонов.' : '2 to 5 days. No delays or endless calls.',
    },
    {
      q: lang === 'ru' ? '«Что нужно от меня?»' : '«What do you need from me?»',
      a: lang === 'ru' ? 'Только текст о себе и прайс. Дизайн и структуру я беру на себя.' : 'Just your bio and pricing. I handle the rest.',
    },
    {
      q: lang === 'ru' ? '«А сайт будет открываться с телефона?»' : '«Will it work on phones?»',
      a: lang === 'ru' ? 'Да, 100% мобильный адаптив с моментальной загрузкой.' : 'Yes, 100% mobile-ready with instant load.',
    },
  ];

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCtaSent(true);
    setTimeout(() => {
      setCtaSent(false);
      setCtaInput('');
    }, 3500);
  };

  return (
    <section id="solutions" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Декоративное фоновое свечение */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
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

        {/* ================= BENTO GRID УНИКАЛЬНЫХ ИНТЕРФЕЙСНЫХ БЛОКОВ ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ================= КАРТОЧКА 1: КАЛЬКУЛЯТОР ТАРИФОВ (ШИРОКАЯ 2 КОЛОНКИ) ================= */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {t.solutions.items[0].title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t.solutions.items[0].description}
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[11px] font-medium px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 whitespace-nowrap">
                ⚡ {lang === 'ru' ? 'Интерактивный прайс на сайте' : 'Interactive price preview'}
              </span>
            </div>

            {/* Интерактивный мини-селектор цен */}
            <div className="bg-[#070b13]/80 p-4 sm:p-5 rounded-2xl border border-white/5 mb-4">
              <div className="text-xs text-slate-400 font-medium mb-3 flex items-center justify-between">
                <span>{lang === 'ru' ? 'Выберите формат услуги:' : 'Select service tier:'}</span>
                <span className="text-cyan-400 font-mono text-[11px]">
                  {lang === 'ru' ? 'Прозрачные условия' : 'Transparent rates'}
                </span>
              </div>

              {/* Переключатели тарифов */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {tiers.map((tier, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTier(idx)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedTier === idx
                        ? 'bg-cyan-500/15 border-cyan-400/60 shadow-lg shadow-cyan-950/50'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="text-[11px] font-medium text-slate-400 mb-0.5">{tier.name}</div>
                    <div className="text-sm sm:text-base font-extrabold text-white">{tier.price}</div>
                  </button>
                ))}
              </div>

              {/* Детали выбранного тарифа */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-white/5 gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{tiers[selectedTier].features}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'ru' ? 'Срок:' : 'Time:'} <strong className="text-white">{tiers[selectedTier].time}</strong></span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{lang === 'ru' ? 'Вместо того чтобы искать и слать PDF в личку — клиент сам выбирает нужный пакет' : 'Instead of PDF price lists, clients choose the right tier in seconds'}</span>
            </div>
          </div>

          {/* ================= КАРТОЧКА 2: МЕНЬШЕ ОДИНАКОВЫХ ВОПРОСОВ (МИНИ-ЧАТ FAQ) ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.solutions.items[1].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                {t.solutions.items[1].description}
              </p>
            </div>

            {/* Интерактивный мини-чат с готовыми ответами */}
            <div className="space-y-2.5">
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeFaq === idx
                      ? 'bg-cyan-950/40 border-cyan-500/30 text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-300 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium">
                    <span>{item.q}</span>
                    <span className="text-cyan-400 font-mono text-[10px]">
                      {activeFaq === idx ? '▲' : '▼'}
                    </span>
                  </div>
                  {activeFaq === idx && (
                    <div className="mt-2 pt-2 border-t border-cyan-500/20 text-slate-300 text-[11px] leading-relaxed flex items-start gap-1.5">
                      <span className="text-cyan-400 shrink-0">↳</span>
                      <span>{item.a}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'ru' ? 'Экономит до 4 часов переписок в неделю' : 'Saves up to 4h of repetitive chats/week'}</span>
            </div>
          </div>

          {/* ================= КАРТОЧКА 3: РАБОТЫ СОБРАНЫ В ОДНОМ МЕСТЕ (ВИТРИНА КЕЙСОВ) ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <FolderHeart className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.solutions.items[2].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                {t.solutions.items[2].description}
              </p>
            </div>

            {/* Мини-витрина портфолио */}
            <div className="space-y-2 mb-2">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-semibold text-white">
                    {lang === 'ru' ? 'Сайт для автошколы' : 'Driving School Website'}
                  </span>
                </div>
                <span className="text-[10px] text-cyan-300 font-mono bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  {lang === 'ru' ? 'Запущен' : 'Live'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-xs font-semibold text-white">
                    {lang === 'ru' ? 'Винный кооператив' : 'Wine Cooperative'}
                  </span>
                </div>
                <span className="text-[10px] text-purple-300 font-mono bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-500/20">
                  {lang === 'ru' ? 'Конверсия 8%' : '8% Conv.'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-white">
                    {lang === 'ru' ? 'Портфолио специалиста' : 'Expert Portfolio'}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {lang === 'ru' ? 'Одна ссылка' : 'One Link'}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400">
              {lang === 'ru' ? 'Работы не тонут в ленте личных сторис' : 'Work samples never get lost in casual posts'}
            </div>
          </div>

          {/* ================= КАРТОЧКА 4: ПОНЯТНЫЙ СЛЕДУЮЩИЙ ШАГ ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <ArrowRightCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.solutions.items[3].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                {t.solutions.items[3].description}
              </p>
            </div>

            {/* Живая форма заявки */}
            <div className="bg-[#070b13]/80 p-3.5 rounded-2xl border border-white/5 mb-3">
              <div className="text-[11px] text-slate-400 mb-2 font-medium">
                {lang === 'ru' ? 'Тест прямого действия клиента:' : 'Test client action flow:'}
              </div>

              {ctaSent ? (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'ru' ? 'Заявка мгновенно в вашем Telegram!' : 'Lead sent straight to your Telegram!'}</span>
                </div>
              ) : (
                <form onSubmit={handleCtaSubmit} className="space-y-2">
                  <input
                    type="text"
                    value={ctaInput}
                    onChange={(e) => setCtaInput(e.target.value)}
                    placeholder={lang === 'ru' ? '@username или телефон' : '@username or phone'}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'ru' ? 'Записаться в 1 клик' : 'Book in 1 Click'}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="text-[11px] text-slate-400">
              {lang === 'ru' ? 'Путь от просмотра до заявки — меньше 30 секунд' : 'From browsing to inquiry in under 30s'}
            </div>
          </div>

          {/* ================= КАРТОЧКА 5: БОЛЕЕ ОФОРМЛЕННАЯ ПОДАЧА БИЗНЕСА ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.solutions.items[4].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                {t.solutions.items[4].description}
              </p>
            </div>

            {/* Карточка домена и SSL */}
            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 mb-3 space-y-2.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-cyan-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>your-brand.ru</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300 px-1">
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'ru' ? 'Официальный адрес' : 'Custom Domain'}</span>
                </span>
                <span className="text-slate-500">SSL 256-bit</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              {lang === 'ru' ? 'Клиенты воспринимают вас как стабильный сервис' : 'Clients perceive you as an organized service'}
            </div>
          </div>

          {/* ================= КАРТОЧКА 6: НЕЗАВИСИМОСТЬ ОТ БЛОКИРОВОК (ОМНИКАНАЛЬНЫЙ ХАБ - 3 КОЛОНКИ) ================= */}
          <div className="lg:col-span-3 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {t.solutions.items[5].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                    {t.solutions.items[5].description}
                  </p>
                </div>
              </div>
              <span className="self-start lg:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'ru' ? 'Работает без VPN и блокировок 24/7' : 'Works 24/7 without VPN'}</span>
              </span>
            </div>

            {/* Схема распределения трафика */}
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
        </div>
      </div>
    </section>
  );
};

export default Solutions;