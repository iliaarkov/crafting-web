import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Smartphone,
  Laptop,
  Zap,
  Check,
  Clock,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Layers,
  Lock,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

export const Advantages: React.FC = () => {
  const { t, lang } = useLanguage();

  // Состояние для интерактивного хаба (Карточка 1)
  const [activeHubTab, setActiveHubTab] = useState<'services' | 'cases' | 'contacts'>('services');

  // Состояние для превью устройства (Карточка 2)
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');

  // Состояние для таймлайна (Карточка 4)
  const [activeStep, setActiveStep] = useState<number>(1);

  // Шаги таймлайна запуска
  const timelineSteps = [
    {
      day: lang === 'ru' ? 'День 1–2' : 'Day 1–2',
      title: lang === 'ru' ? 'Бриф и структура' : 'Brief & Structure',
      desc: lang === 'ru' ? 'Собираем тексты, определяем разделы и ключевую цель сайта.' : 'Review materials, set up page hierarchy and key CTA.',
    },
    {
      day: lang === 'ru' ? 'День 3–5' : 'Day 3–5',
      title: lang === 'ru' ? 'Дизайн и макет' : 'Design & Layout',
      desc: lang === 'ru' ? 'Создаю эстетичный визуальный стиль и понятную подачу информации.' : 'Crafting aesthetics, typography and UI components.',
    },
    {
      day: lang === 'ru' ? 'День 6–9' : 'Day 6–9',
      title: lang === 'ru' ? 'Верстка и адаптив' : 'Development',
      desc: lang === 'ru' ? 'Пишу чистый код, тестирую скорость и безупречный отклик на смартфонах.' : 'Writing clean code, responsive testing and animations.',
    },
    {
      day: lang === 'ru' ? 'День 10–12' : 'Day 10–12',
      title: lang === 'ru' ? 'Запуск и домен' : 'Launch & Domain',
      desc: lang === 'ru' ? 'Подключаем ваш домен, SSL-сертификат и форму заявок в Telegram.' : 'Custom domain setup, SSL security and Telegram alerts.',
    },
  ];

  return (
    <section id="advantages" className="py-20 lg:py-28 relative border-t border-b border-white/5 overflow-hidden">
      {/* Декоративное фоновое свечение */}
      <div className="absolute top-1/4 left-1/3 w-[480px] h-[320px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[420px] h-[300px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Стандарты разработки' : 'Launch Standards'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.advantages.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {lang === 'ru'
              ? 'Прозрачные процессы, предсказуемый результат и чистый код без бюрократии больших студий.'
              : 'Transparent workflow, predictable outcome, and clean code without agency overhead.'}
          </p>
        </div>

        {/* ================= BENTO GRID 6 УНИКАЛЬНЫХ КАРТОЧЕК ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ================= КАРТОЧКА 1: УДОБНО КЛИЕНТУ (ШИРОКАЯ 2 КОЛОНКИ) ================= */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {t.advantages.items[0].title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {t.advantages.items[0].description}
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-[11px] font-medium px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 whitespace-nowrap">
                  ⚡ {lang === 'ru' ? 'Единый центр внимания' : 'All-in-one Hub'}
                </span>
              </div>

              {/* Интерактивный переключатель разделов сайта */}
              <div className="bg-[#070b13]/80 p-4 sm:p-5 rounded-2xl border border-white/5 mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-white/5">
                  <span className="text-[11px] text-slate-400 mr-1">
                    {lang === 'ru' ? 'Посетитель сразу видит:' : 'Visitor instantly explores:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveHubTab('services')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      activeHubTab === 'services'
                        ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-sm'
                        : 'bg-white/5 border border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    💼 {lang === 'ru' ? 'Услуги и цены' : 'Services & Rates'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHubTab('cases')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      activeHubTab === 'cases'
                        ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-sm'
                        : 'bg-white/5 border border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    ⭐️ {lang === 'ru' ? 'Кейсы и отзывы' : 'Cases & Proof'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveHubTab('contacts')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      activeHubTab === 'contacts'
                        ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-sm'
                        : 'bg-white/5 border border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    🚀 {lang === 'ru' ? 'Кнопка действия' : 'Direct Action'}
                  </button>
                </div>

                {/* Живое интерактивное превью выбранного блока */}
                <div className="min-h-[90px] flex items-center">
                  {activeHubTab === 'services' && (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 animate-in fade-in duration-200">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                        <div className="text-slate-400 text-[10px] mb-0.5">{lang === 'ru' ? 'Формат' : 'Tier'}</div>
                        <div className="font-semibold text-white">{lang === 'ru' ? 'Лендинг' : 'Landing'}</div>
                        <div className="text-cyan-400 font-mono text-[11px] mt-1">{lang === 'ru' ? 'от 49 000 ₽' : 'from $550'}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                        <div className="text-slate-400 text-[10px] mb-0.5">{lang === 'ru' ? 'Срок' : 'Timeline'}</div>
                        <div className="font-semibold text-white">{lang === 'ru' ? '5–12 дней' : '5–12 days'}</div>
                        <div className="text-emerald-400 text-[11px] mt-1">{lang === 'ru' ? 'Без задержек' : 'On schedule'}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                        <div className="text-slate-400 text-[10px] mb-0.5">{lang === 'ru' ? 'Условия' : 'Terms'}</div>
                        <div className="font-semibold text-white">{lang === 'ru' ? 'Всё включено' : 'All-inclusive'}</div>
                        <div className="text-slate-400 text-[11px] mt-1">{lang === 'ru' ? 'Текст + Дизайн + Код' : 'Copy + Design + Code'}</div>
                      </div>
                    </div>
                  )}

                  {activeHubTab === 'cases' && (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 animate-in fade-in duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                          98%
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {lang === 'ru' ? 'Реальные примеры вместо обещаний' : 'Tangible samples over promises'}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {lang === 'ru' ? 'Клиент кликает и изучает ваш реальный опыт за 1 минуту' : 'Prospects examine your expertise in under 1 min'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/20 shrink-0">
                        {lang === 'ru' ? 'Рост доверия' : '+High Trust'}
                      </span>
                    </div>
                  )}

                  {activeHubTab === 'contacts' && (
                    <div className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{lang === 'ru' ? 'Оставить заявку в 1 клик' : 'Direct 1-Click Inquiry'}</div>
                          <div className="text-[10px] text-slate-300">{lang === 'ru' ? 'Мгновенное уведомление прямо вам в Telegram' : 'Instant ping directly into your Telegram'}</div>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold shrink-0">
                        {lang === 'ru' ? 'Написать' : 'Message'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{lang === 'ru' ? 'Клиенту не нужно задавать 10 лишних вопросов — вся суть перед глазами' : 'Clients don’t need to ask repetitive questions — everything is clear'}</span>
            </div>
          </div>

          {/* ================= КАРТОЧКА 2: ХОРОШО ВЫГЛЯДИТ НА СМАРТФОНЕ ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                {/* Переключатель Mobile / Desktop */}
                <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeviceMode('mobile')}
                    className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                      deviceMode === 'mobile' ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' : 'hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>{lang === 'ru' ? 'Моб.' : 'Mob.'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeviceMode('desktop')}
                    className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                      deviceMode === 'desktop' ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' : 'hover:text-white'
                    }`}
                  >
                    <Laptop className="w-3 h-3" />
                    <span>ПК</span>
                  </button>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.advantages.items[1].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {t.advantages.items[1].description}
              </p>
            </div>

            {/* Визуальная миниатюра устройства */}
            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 mb-3">
              <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Google PageSpeed 99</span>
                </span>
                <span className="text-slate-400">{deviceMode === 'mobile' ? '390×844' : '1920×1080'}</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-2 w-16 bg-cyan-400/80 rounded" />
                  <div className="h-1.5 w-24 bg-white/20 rounded" />
                </div>
                <div className="px-2 py-1 rounded-md bg-white/10 text-[10px] text-cyan-300 font-mono">
                  60 FPS
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{lang === 'ru' ? 'Шрифты не ломаются, верстка не сползает' : 'Flawless touch controls and smooth scaling'}</span>
            </div>
          </div>

          {/* ================= КАРТОЧКА 3: НАПРЯМУЮ С РАЗРАБОТЧИКОМ ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.advantages.items[2].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {t.advantages.items[2].description}
              </p>
            </div>

            {/* Сравнение: Агентство vs Напрямую со мной */}
            <div className="space-y-2 mb-3">
              <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs">
                <div className="text-[10px] font-bold text-rose-300 uppercase tracking-wider mb-1">
                  {lang === 'ru' ? 'В обычных агентствах' : 'Traditional Agency'}
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">
                  {lang === 'ru' ? 'Клиент → Менеджер → Тимлид → Разработчик' : 'Client → Manager → Lead → Coder'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
                <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>{lang === 'ru' ? 'Со мной' : 'Direct with me'}</span>
                  <span className="text-[10px] text-cyan-300 font-mono">⚡ 0 посредников</span>
                </div>
                <div className="text-[11px] text-slate-200 font-medium">
                  {lang === 'ru' ? 'Клиент ⚡ Илья в Telegram (ответ за минуты)' : 'Client ⚡ Ilya in Telegram (instant replies)'}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{lang === 'ru' ? 'Никаких наценок на штат менеджеров и офис' : 'No agency markups for overhead & extra staff'}</span>
            </div>
          </div>

          {/* ================= КАРТОЧКА 4: БЫСТРЫЙ ЗАПУСК ЗА 5–12 ДНЕЙ ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.advantages.items[3].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {t.advantages.items[3].description}
              </p>
            </div>

            {/* Интерактивный таймлайн запуска */}
            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 mb-3">
              <div className="flex items-center justify-between text-xs font-semibold text-white mb-3">
                <span>{lang === 'ru' ? 'Этапы работы:' : 'Roadmap:'}</span>
                <span className="text-cyan-400 font-mono text-[11px]">
                  {timelineSteps[activeStep].day}
                </span>
              </div>

              {/* Полоска шагов */}
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {timelineSteps.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeStep === idx
                        ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50'
                        : activeStep > idx
                        ? 'bg-cyan-500/40'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    title={step.title}
                  />
                ))}
              </div>

              {/* Описание текущего шага */}
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-bold text-white mb-0.5">
                  {timelineSteps[activeStep].title}
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">
                  {timelineSteps[activeStep].desc}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'ru' ? 'Сроки закреплены в договорённости' : 'Deadlines guaranteed before work starts'}</span>
            </div>
          </div>

          {/* ================= КАРТОЧКА 5: ФИКСИРОВАННАЯ СТОИМОСТЬ ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.advantages.items[4].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {t.advantages.items[4].description}
              </p>
            </div>

            {/* Карточка прозрачности сметы */}
            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 mb-3 space-y-2">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                <span className="text-slate-300 font-medium">{lang === 'ru' ? 'Смета на старте' : 'Upfront Quote'}</span>
                <span className="text-emerald-400 font-mono font-bold">100% {lang === 'ru' ? 'Фикс' : 'Fixed'}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                <span className="text-slate-300 font-medium">{lang === 'ru' ? 'Скрытые доплаты' : 'Hidden fees'}</span>
                <span className="text-cyan-400 font-mono font-bold">0 ₽</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-0.5">
                <span className="text-slate-400 text-[11px]">{lang === 'ru' ? 'Вёрстка + Мобилка + SEO' : 'Dev + Mobile + SEO'}</span>
                <span className="text-emerald-400 text-[11px] font-semibold">{lang === 'ru' ? 'Включено' : 'Included'}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{lang === 'ru' ? 'Цена не вырастет в процессе работы' : 'Price never increases midway'}</span>
            </div>
          </div>

          {/* ================= КАРТОЧКА 6: ПОДДЕРЖКА ПОСЛЕ ЗАПУСКА ================= */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {t.advantages.items[5].title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {t.advantages.items[5].description}
              </p>
            </div>

            {/* Виджет гарантийной поддержки */}
            <div className="p-3.5 rounded-2xl bg-[#070b13]/80 border border-white/5 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">
                    {lang === 'ru' ? 'На связи в Telegram' : 'Online in Telegram'}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  {lang === 'ru' ? 'Гарантия' : 'Warranty'}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 leading-snug">
                {lang === 'ru'
                  ? 'Помогаю с техническими правками, подключением почты и домена бесплатно после релиза.'
                  : 'Free post-launch support for domain, email, and minor content adjustments.'}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{lang === 'ru' ? 'Вы не остаётесь один на один с кодом' : 'You never get left stranded with raw code'}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Advantages;