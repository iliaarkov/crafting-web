import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCms } from '../context/CmsContext';
import { Send, MessageSquare, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const { t, lang } = useLanguage();
  const { submitLead } = useCms();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [tariff, setTariff] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError(lang === 'ru' ? 'Пожалуйста, укажите ваше имя и контакт' : 'Please provide your name and contact');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await submitLead({
        name,
        contact,
        tariff: tariff || (lang === 'ru' ? 'Индивидуальный расчет' : 'Custom Estimate'),
        projectUrl,
        message,
        lang,
      });

      if (res.success) {
        setSubmitted(true);
        setName('');
        setContact('');
        setProjectUrl('');
        setMessage('');
      } else {
        setError(res.message || t.contact.form.errorMessage);
      }
    } catch {
      setError(t.contact.form.errorMessage);
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

        {/* Прямая связь в Telegram */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="https://t.me/arkovilya"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white bg-[#229ED9] hover:bg-[#1e8ec3] shadow-lg shadow-[#229ED9]/25 hover:shadow-[#229ED9]/40 transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>{t.contact.btnTelegram}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Форма заявки */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 max-w-3xl mx-auto shadow-2xl relative">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
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
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                {t.contact.form.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {t.contact.form.nameLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.form.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {t.contact.form.contactLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.contact.form.contactPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.contact.form.tariffLabel}
                </label>
                <select
                  id="tariff-select"
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c1017] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm transition-colors"
                >
                  <option value="">{t.contact.form.tariffPlaceholder}</option>
                  <option value="СТАРТ — Сайт-визитка (39 000 ₽)">
                    {lang === 'ru' ? 'Тариф «СТАРТ» (39 000 ₽)' : 'START Plan ($420 / 39,000 ₽)'}
                  </option>
                  <option value="ОПТИМАЛЬНЫЙ — Для эксперта или бизнеса (69 000 ₽)">
                    {lang === 'ru' ? 'Тариф «ОПТИМАЛЬНЫЙ» (69 000 ₽)' : 'OPTIMAL Plan ($740 / 69,000 ₽)'}
                  </option>
                  <option value="БИЗНЕС — С базой данных и админ-панелью (99 000 ₽)">
                    {lang === 'ru' ? 'Тариф «БИЗНЕС» (99 000 ₽)' : 'BUSINESS Plan ($1,060 / 99,000 ₽)'}
                  </option>
                  <option value="Переделка существующего сайта (от 49 000 ₽)">
                    {lang === 'ru' ? 'Переделка существующего сайта (от 49 000 ₽)' : 'Redesign of Existing Site (from $525)'}
                  </option>
                  <option value="Индивидуальный проект">
                    {lang === 'ru' ? 'Другая задача / индивидуальный проект' : 'Custom task / individual inquiry'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.contact.form.projectUrlLabel}
                </label>
                <input
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder={t.contact.form.projectUrlPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t.contact.form.messageLabel}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.form.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-colors resize-y"
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