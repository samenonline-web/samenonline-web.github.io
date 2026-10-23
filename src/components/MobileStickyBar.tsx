'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Language } from '../types/company';

interface MobileStickyBarProps {
  lang: Language;
  onOpenRequestModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  lang,
  onOpenRequestModal,
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

  const handleWhatsApp = () => {
    const phone = '31622727144';
    const msg =
      lang === 'nl'
        ? 'Hallo Samen Online, ik zag jullie website en wil graag vrijblijvend advies over een nieuwe website.'
        : 'Hello Samen Online, I saw your website and would like free advice on a new website.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
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
            onClick={handleWhatsApp}
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer"
            title="Chat via WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
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
