import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  XCircle,
  Smartphone,
  Send,
  Lock,
  Globe,
  Layers,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, lang } = useLanguage();

  // Состояние 3D-параллакса от мыши (ПК) или гироскопа (смартфоны)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hasGyroscope, setHasGyroscope] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      const offsetTop = elem.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // 1. Интерактивный 3D-параллакс: курсор на ПК + гироскоп на мобильных
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const updateInterpolatedTilt = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setTilt({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateInterpolatedTilt);
    };

    animationFrameId = requestAnimationFrame(updateInterpolatedTilt);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      targetX = Math.max(-1, Math.min(1, x)) * 12;
      targetY = Math.max(-1, Math.min(1, y)) * 12;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        setHasGyroscope(true);
        const clampedGamma = Math.max(-35, Math.min(35, e.gamma));
        const clampedBeta = Math.max(-35, Math.min(35, e.beta - 45));
        targetX = (clampedGamma / 35) * 10;
        targetY = (clampedBeta / 35) * 10;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, []);

  // 2. Интерактивная фоновая цифровая паутина / созвездие на Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = width < 768 ? 28 : 55;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 0.8,
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width < 768 ? 95 : 140;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[94vh] flex flex-col items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-28 overflow-hidden select-none"
    >
      {/* 1. Живой интерактивный Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      />

      {/* 2. Атмосферные градиенты с параллаксом */}
      <div
        className="absolute top-1/4 left-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/20 via-sky-500/15 to-blue-700/10 blur-[140px] rounded-full pointer-events-none -z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(-50%, -50%) translate3d(${tilt.x * -1.5}px, ${tilt.y * -1.5}px, 0)`,
        }}
      />
      <div
        className="absolute top-1/3 right-5 w-[380px] h-[380px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none -z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${tilt.x * 1.8}px, ${tilt.y * 1.8}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-10 left-5 w-[420px] h-[420px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${tilt.x * -1.2}px, ${tilt.y * -1.2}px, 0)`,
        }}
      />

      {/* 3. Фоновая декоративная сетка */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1.2px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full text-center">
        {/* Статус / Бейдж */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/40 hover:border-cyan-400/50 transition-colors">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Главный заголовок H1 с акцентом */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.14] sm:leading-[1.12] mb-5 max-w-4xl mx-auto text-balance">
          {lang === 'ru' ? (
            <>
              Сайт, который объясняет{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300">
                ваши услуги за вас
              </span>
            </>
          ) : (
            <>
              A website that explains{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300">
                your services for you
              </span>
            </>
          )}
        </h1>

        {/* Короткий, цепляющий лид */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 text-balance font-normal">
          {t.hero.description}
        </p>

        {/* Кнопки призыва к действию */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.hero.ctaSecondary}</span>
          </a>

          <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full text-xs font-medium text-slate-400 border border-white/5 bg-white/[0.02]">
            <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{t.hero.priceTag}</span>
          </div>
        </div>

        {/* 4. ИНТЕРАКТИВНЫЙ 3D-МАКЕТ ИНТЕРФЕЙСА */}
        <div
          className="relative max-w-4xl mx-auto mb-16 perspective-[1200px]"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y * -0.65}deg) rotateY(${tilt.x * 0.65}deg)`,
            transition: 'transform 100ms ease-out',
          }}
        >
          {/* Плавающий бейдж: Заявка в Telegram (слева сверху) */}
          <div
            className="hidden md:flex absolute -top-5 -left-6 z-20 items-center gap-2.5 px-4 py-2 rounded-2xl glass-panel border border-cyan-500/30 bg-[#090e17]/90 shadow-2xl text-xs font-semibold text-white shadow-cyan-950/60"
            style={{
              transform: `translate3d(${tilt.x * 1.5}px, ${tilt.y * 1.5}px, 20px)`,
            }}
          >
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Send className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[11px] text-cyan-300 font-bold">
                {lang === 'ru' ? 'Новая заявка!' : 'New Lead!'}
              </div>
              <div className="text-[10px] text-slate-400">
                {lang === 'ru' ? 'Прямо в Telegram' : 'Direct to Telegram'}
              </div>
            </div>
          </div>

          {/* Плавающий бейдж: Мобильный адаптив (справа снизу) */}
          <div
            className="hidden md:flex absolute -bottom-5 -right-6 z-20 items-center gap-2.5 px-4 py-2 rounded-2xl glass-panel border border-emerald-500/30 bg-[#090e17]/90 shadow-2xl text-xs font-semibold text-white shadow-emerald-950/60"
            style={{
              transform: `translate3d(${tilt.x * -1.4}px, ${tilt.y * -1.4}px, 20px)`,
            }}
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[11px] text-emerald-300 font-bold">100% Mobile Ready</div>
              <div className="text-[10px] text-slate-400">
                {lang === 'ru' ? 'Быстро на смартфонах' : 'Ultra-fast loading'}
              </div>
            </div>
          </div>

          {/* Стеклянное окно веб-интерфейса */}
          <div className="glass-panel rounded-3xl border border-white/15 bg-[#090d15]/95 shadow-2xl overflow-hidden text-left relative group">
            {/* Оконная панель браузера */}
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-[#0b101a]/90">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>

              {/* URL строка */}
              <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] text-slate-400 font-mono">
                <Lock className="w-2.5 h-2.5 text-cyan-400" />
                <span>iliaarkov.com / your-website</span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Online</span>
              </div>
            </div>

            {/* Содержимое окна: сравнение Было vs Стало */}
            <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Левый блок: Проблема рутины */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-rose-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-3">
                    <XCircle className="w-4 h-4" />
                    <span>{lang === 'ru' ? 'Было (без сайта)' : 'Before (No website)'}</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400/80 font-mono mt-0.5">•</span>
                      <span>
                        {lang === 'ru'
                          ? 'Каждый раз скидывать прайсы в PDF или расписывать цены вручную'
                          : 'Sending bulky price PDFs or typing prices manually every time'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400/80 font-mono mt-0.5">•</span>
                      <span>
                        {lang === 'ru'
                          ? 'Отвечать на одни и те же вопросы о портфолио, сроках и условиях'
                          : 'Repeatedly answering identical questions about work samples and timing'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400/80 font-mono mt-0.5">•</span>
                      <span>
                        {lang === 'ru'
                          ? 'Клиенты теряются в долгих переписках в мессенджерах'
                          : 'Potential clients drop off during slow message exchanges'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-500/10 text-[11px] text-rose-300/80 italic">
                  {lang === 'ru' ? 'Рутина и потеря клиентов' : 'Routine and lost opportunities'}
                </div>
              </div>

              {/* Правый блок: Решение с новым сайтом */}
              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-400/40 flex flex-col justify-between shadow-lg shadow-cyan-950/30">
                <div>
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'ru' ? 'Стало (с вашим сайтом)' : 'After (With your website)'}</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-white">
                          {lang === 'ru' ? 'Одна ссылка' : 'One link'}
                        </strong>{' '}
                        {lang === 'ru'
                          ? 'в шапке профиля или визитке — всё понятно за 1 минуту'
                          : 'in your bio or card — everything is clear in 60 seconds'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>
                        {lang === 'ru'
                          ? 'Услуги, честные цены и примеры работ разложены по полочкам'
                          : 'Services, transparent rates, and portfolio structured neatly'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>
                        {lang === 'ru'
                          ? 'Клиент оставляет заявку в 1 клик, а вы получаете уведомление в Telegram'
                          : 'Clients submit inquiries in 1 click, sent straight to your Telegram'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[11px] text-cyan-300 font-medium">
                  <span>{t.hero.subDescription2}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
              </div>
            </div>

            {/* Подсказка внизу окна */}
            <div className="px-6 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {hasGyroscope
                    ? (lang === 'ru' ? 'Наклоняйте смартфон для параллакса' : 'Tilt your phone for 3D parallax')
                    : (lang === 'ru' ? 'Двигайте курсором мыши для 3D-эффекта' : 'Move cursor for 3D parallax')}
                </span>
              </div>
              <span className="text-cyan-400 font-mono text-[10px]">
                React &bull; TypeScript &bull; Tailwind
              </span>
            </div>
          </div>
        </div>

        {/* 5. Три карточки ключевых преимуществ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-white/10 hover:border-cyan-500/30 transition-all hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-extrabold text-base">{t.hero.metrics.days}</div>
              <div className="text-xs text-slate-400">{t.hero.metrics.daysLabel}</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-white/10 hover:border-cyan-500/30 transition-all hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-extrabold text-base">{t.hero.metrics.price}</div>
              <div className="text-xs text-slate-400">{t.hero.metrics.priceLabel}</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-white/10 hover:border-cyan-500/30 transition-all hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-extrabold text-base">{t.hero.metrics.direct}</div>
              <div className="text-xs text-slate-400">{t.hero.metrics.directLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;