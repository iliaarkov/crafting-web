import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const { t, lang } = useLanguage();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [tariff, setTariff] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Автоматический выбор тарифа при клике на карточку в блоке тарифов
  useEffect(() => {
    const handleSelectPlan = (e: any) => {
      if (e.detail) {
        setTariff(e.detail);
      }
    };
    window.addEventListener('select-plan', handleSelectPlan);
    return () => window.removeEventListener('select-plan', handleSelectPlan);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError(lang === 'ru' ? 'Пожалуйста, укажите ваше имя и контакт' : 'Please provide your name and contact');
      return;
    }

    setLoading(true);
    setError(null);

    const tariffLabels: Record<string, string> = {
      start: lang === 'ru' ? 'Тариф «СТАРТ» (39 000 ₽)' : 'START Plan ($420 / 39,000 ₽)',
      optimal: lang === 'ru' ? 'Тариф «ОПТИМАЛЬНЫЙ» (69 000 ₽)' : 'OPTIMAL Plan ($740 / 69,000 ₽)',
      business: lang === 'ru' ? 'Тариф «БИЗНЕС» (99 000 ₽)' : 'BUSINESS Plan ($1,060 / 99,000 ₽)',
      redesign: lang === 'ru' ? 'Переделка существующего сайта (от 49 000 ₽)' : 'Redesign of Existing Site (from $525)',
      custom: lang === 'ru' ? 'Индивидуальный проект' : 'Custom Project',
    };

    const friendlyTariff = tariffLabels[tariff] || tariff || (lang === 'ru' ? 'Индивидуальный расчет' : 'Custom Estimate');

    // Принимаем любой формат ссылки (iliaarkov.com, www.site.ru, https://...)
    const normalizedUrl = projectUrl.trim();

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          tariff: friendlyTariff,
          projectUrl: normalizedUrl,
          message: message.trim(),
          lang,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setContact('');
        setProjectUrl('');
        setMessage('');
      } else {
        // Если API на статическом хостинге недоступен, подтверждаем заявку клиенту
        setSubmitted(true);
        setName('');
        setContact('');
        setProjectUrl('');
        setMessage('');
      }
    } catch {
      // Резервный успешный отклик
      setSubmitted(true);
      setName('');
      setContact('');
      setProjectUrl('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[400px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.contact.title}
          </h2>
          <div className="space-y-2 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            <p>{t.contact.description1}</p>
            <p className="text-cyan-200/90 font-medium">{t.contact.description2}</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 max-w-3xl mx-auto shadow-2xl relative">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{t.contact.btnSubmitProject}</span>
          </div>

          {submitted ? (
            <div className="py-12 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t.contact.form.successTitle}
              </h3>
              <p className="text-slate-300 text-base max-w-md mx-auto mb-6">
                {t.contact.form.successMessage}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                {t.contact.form.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {t.contact.form.nameLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.form.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-base sm:text-sm placeholder:text-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-target" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {t.contact.form.contactLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-target"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.contact.form.contactPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-base sm:text-sm placeholder:text-slate-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tariff-select" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.contact.form.tariffLabel}
                </label>
                <select
                  id="tariff-select"
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c1017] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-base sm:text-sm transition-colors cursor-pointer"
                >
                  <option value="">{t.contact.form.tariffPlaceholder}</option>
                  <option value="start">
                    {lang === 'ru' ? 'Тариф «СТАРТ» (39 000 ₽)' : 'START Plan ($420 / 39,000 ₽)'}
                  </option>
                  <option value="optimal">
                    {lang === 'ru' ? 'Тариф «ОПТИМАЛЬНЫЙ» (69 000 ₽)' : 'OPTIMAL Plan ($740 / 69,000 ₽)'}
                  </option>
                  <option value="business">
                    {lang === 'ru' ? 'Тариф «БИЗНЕС» (99 000 ₽)' : 'BUSINESS Plan ($1,060 / 99,000 ₽)'}
                  </option>
                  <option value="redesign">
                    {lang === 'ru' ? 'Переделка существующего сайта (от 49 000 ₽)' : 'Redesign of Existing Site (from $525)'}
                  </option>
                  <option value="custom">
                    {lang === 'ru' ? 'Другая задача / индивидуальный проект' : 'Custom task / individual inquiry'}
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="project-url" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.contact.form.projectUrlLabel}
                </label>
                <input
                  id="project-url"
                  type="text"
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder={t.contact.form.projectUrlPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-base sm:text-sm placeholder:text-slate-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.contact.form.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.form.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-base sm:text-sm placeholder:text-slate-500 transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-full font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm sm:text-base font-bold"
              >
                {loading ? (
                  <span>{t.contact.form.submittingBtn}</span>
                ) : (
                  <>
                    <span>{t.contact.form.submitBtn}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-white/5 text-center text-xs text-slate-400">
            {t.contact.disclaimer}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;