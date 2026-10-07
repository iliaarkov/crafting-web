import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, CheckCircle } from 'lucide-react';

interface TechCardData {
  name: string;
  subtitleRu: string;
  subtitleEn: string;
  descriptionRu: string;
  descriptionEn: string;
  iconBg: string;
  renderIcon: () => React.ReactNode;
}

export const TechStack: React.FC = () => {
  const { t, lang } = useLanguage();

  const cards: TechCardData[] = [
    {
      name: 'React',
      subtitleRu: 'Быстрый и интерактивный интерфейс',
      subtitleEn: 'Fast & Interactive User Interface',
      descriptionRu: 'Обеспечивает моментальный отклик сайта без перезагрузки страниц, плавные анимации и удобную модульную структуру.',
      descriptionEn: 'Powers snappy page navigation without reloads, fluid animations, and a modern component architecture.',
      iconBg: 'bg-[#0a1524] border border-[#00d8ff]/30',
      renderIcon: () => (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6 fill-none stroke-[#00d8ff] stroke-[1.2]">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          <circle r="2" fill="#00d8ff" />
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      subtitleRu: 'Надёжность кода и защита от ошибок',
      subtitleEn: 'Strict Typing & Bug Prevention',
      descriptionRu: 'Исключает скрытые программные ошибки ещё на этапе разработки, гарантируя предсказуемую работу сайта во всех браузерах.',
      descriptionEn: 'Eliminates runtime errors during build time, guaranteeing robust stability across all devices and browsers.',
      iconBg: 'bg-[#3178c6] shadow-inner',
      renderIcon: () => (
        <span className="text-white font-extrabold font-mono text-lg tracking-tighter">
          TS
        </span>
      ),
    },
    {
      name: 'Tailwind CSS',
      subtitleRu: 'Индивидуальный дизайн и адаптивность',
      subtitleEn: 'Bespoke Design & Mobile Scaling',
      descriptionRu: 'Позволяет создавать чистую адаптивную верстку без раздутого кода — сайт идеально смотрится на смартфонах, планшетах и мониторах.',
      descriptionEn: 'Enables lightweight, custom styling without CSS bloat — your layout looks pristine across every screen size.',
      iconBg: 'bg-[#081a26] border border-[#38bdf8]/30',
      renderIcon: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#38bdf8]">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      ),
    },
    {
      name: 'Node.js',
      subtitleRu: 'Серверная логика и отправка заявок',
      subtitleEn: 'Server Logic & Lead Dispatch',
      descriptionRu: 'Отвечает за моментальную доставку заявок клиентов прямо в Telegram-бот, валидацию контактных данных и интеграции.',
      descriptionEn: 'Handles instant lead routing directly to Telegram bots, form validations, and secure webhook integrations.',
      iconBg: 'bg-[#0a2014] border border-[#22c55e]/30',
      renderIcon: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#22c55e]">
          <path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm0 2.3l6.5 3.8v7.6L12 19.5 5.5 15.7V8.1L12 4.3z" />
          <path d="M10.2 9.2h3.6v1.8h-1.8v3.8h-1.8V9.2z" fill="#22c55e" />
        </svg>
      ),
    },
    {
      name: 'PostgreSQL',
      subtitleRu: 'Безопасное хранение данных',
      subtitleEn: 'Enterprise Data Reliability',
      descriptionRu: 'Надёжно сохраняет историю заявок, каталоги услуг и пользователей с гарантией сохранности и структурированности информации.',
      descriptionEn: 'Securely stores client requests, service catalogs, and user records with automated backups and strict data integrity.',
      iconBg: 'bg-[#0a1b2d] border border-[#336791]/40',
      renderIcon: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#41b0ff]">
          <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 6.5c-4.41 0-8-1.34-8-2.5S7.59 3.5 12 3.5s8 1.34 8 2.5-3.59 2.5-8 2.5z" />
          <path d="M2 9.5c0 1.95 3.13 3.61 7.5 4.19v2.06C5.07 15.22 2 13.29 2 11V9.5zm20 0V11c0 2.29-3.07 4.22-7.5 4.75v-2.06c4.37-.58 7.5-2.24 7.5-4.19z" />
          <path d="M2 14c0 1.95 3.13 3.61 7.5 4.19v2.06C5.07 19.72 2 17.79 2 15.5V14zm20 0v1.5c0 2.29-3.07 4.22-7.5 4.75v-2.06c4.37-.58 7.5-2.24 7.5-4.19z" />
        </svg>
      ),
    },
    {
      name: 'Cloudflare и Vercel',
      subtitleRu: 'Скоростной CDN и защита 24/7',
      subtitleEn: 'Global Edge CDN & 24/7 Shield',
      descriptionRu: 'Обеспечивают моментальное открытие сайта в любой точке мира, автоматический SSL-сертификат и защиту от сбоев 24/7.',
      descriptionEn: 'Delivers sub-second page loads worldwide via global edge caching, automated SSL encryption, and high availability.',
      iconBg: 'bg-[#1a120e] border border-[#f38020]/35',
      renderIcon: () => (
        <div className="flex items-center justify-center gap-1">
          {/* Cloudflare cloud mark */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f38020]">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
          {/* Vercel triangle mark */}
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
            <path d="M12 1L24 22H0L12 1Z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section id="tech-stack" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Мягкие фоновые световые пятна */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.tools.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.tools.intro}
          </p>
        </div>

        {/* ================= СЕТКА КАРТОЧЕК КАК НА СКРИНШОТЕ ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0d121c] border border-white/[0.08] p-6 hover:bg-[#111724] hover:border-white/20 transition-all duration-200 flex flex-col justify-start group shadow-sm"
            >
              {/* 1. БРЕНДОВАЯ ИКОНКА С ФОНОМ (SQUIRCLE APP-ICON) */}
              <div
                className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 mb-4.5 shadow-md ${card.iconBg}`}
              >
                {card.renderIcon()}
              </div>

              {/* 2. НАЗВАНИЕ ТЕХНОЛОГИИ */}
              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                {card.name}
              </h3>

              {/* 3. ЖИРНЫЙ ПОДЗАГОЛОВОК (КАК НА СКРИНШОТЕ) */}
              <div className="text-[13px] font-semibold text-slate-200 mt-1 leading-snug">
                {lang === 'ru' ? card.subtitleRu : card.subtitleEn}
              </div>

              {/* 4. ПОДРОБНОЕ ОПИСАНИЕ */}
              <p className="text-xs sm:text-[13px] text-slate-400 mt-2.5 leading-relaxed">
                {lang === 'ru' ? card.descriptionRu : card.descriptionEn}
              </p>
            </div>
          ))}
        </div>

        {/* Гарантия прозрачности и передачи проекта / Trust Signature */}
        <div className="mt-10 glass-panel p-5 sm:p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 flex items-center gap-3.5 text-cyan-200 text-sm sm:text-base font-medium">
          <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{t.tools.signature}</span>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
