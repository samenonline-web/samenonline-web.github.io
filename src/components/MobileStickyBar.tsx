'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { Language } from '../types/company';

interface MobileStickyBarProps {
  lang: Language;
  onOpenRequestModal: () => void;
  onOpenQuestionnaire?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  lang,
  onOpenRequestModal,
  onOpenQuestionnaire,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuestionnaire = () => {
    if (onOpenQuestionnaire) {
      onOpenQuestionnaire();
    } else {
      const el = document.getElementById('website-vragenlijst');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label={lang === 'nl' ? 'Snelle mobiele acties' : 'Quick mobile actions'}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-orange-200/90 dark:border-slate-800 px-4 py-2.5 shadow-2xl transition-all duration-300 transform translate-y-0"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left value hook */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-xs font-black text-stone-900 dark:text-white truncate">
              Vanaf €75 all-in
            </span>
          </div>
          <div className="text-[10px] text-stone-500 dark:text-slate-400 font-semibold truncate">
            {lang === 'nl' ? '2–5 dagen live • 100% eigendom' : '2–5 days live • 100% ownership'}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleOpenQuestionnaire}
            aria-label={lang === 'nl' ? 'Open Keuzehulp Vragenlijst' : 'Open Website Questionnaire'}
            className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
            title="Keuzehulp Vragenlijst"
          >
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{lang === 'nl' ? 'Keuzehulp' : 'Quiz'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenRequestModal}
            className="px-4 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-orange-700/30 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>{lang === 'nl' ? 'Aanvragen' : 'Start Project'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
