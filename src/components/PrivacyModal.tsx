import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/15 bg-[#0b0e14]/95 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors"
          aria-label={t.privacyModal.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {t.privacyModal.title}
          </h2>
        </div>

        <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-h-[60vh] overflow-y-auto pr-2">
          <p>{t.privacyModal.p1}</p>
          <p>{t.privacyModal.p2}</p>
          <p>{t.privacyModal.p3}</p>
          <p>{t.privacyModal.p4}</p>
          <p>{t.privacyModal.p5}</p>
          <p>{t.privacyModal.p6}</p>
          <p>{t.privacyModal.p7}</p>
          <p>{t.privacyModal.p8}</p>
          <p>{t.privacyModal.p9}</p>
          <p>{t.privacyModal.p10}</p>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
          >
            {t.privacyModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};