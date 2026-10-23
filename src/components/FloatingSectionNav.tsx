'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  Zap,
  Calculator,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  Compass,
} from 'lucide-react';
import { Language } from '../types/company';

interface FloatingSectionNavProps {
  lang: Language;
  totalTemplatesCount: number;
}

interface SectionItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  titleNl: string;
  titleEn: string;
  badge?: string;
}

export const FloatingSectionNav: React.FC<FloatingSectionNavProps> = ({
  lang,
  totalTemplatesCount,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('templates-section');
  const menuRef = useRef<HTMLDivElement>(null);

  const sections: SectionItem[] = [
    {
      id: 'templates-section',
      icon: LayoutGrid,
      iconColor: 'text-orange-500',
      titleNl: 'Website Concepten',
      titleEn: 'Website Templates',
      badge: `${totalTemplatesCount}`,
    },
    {
      id: 'waarom-nextjs',
      icon: Zap,
      iconColor: 'text-amber-500',
      titleNl: 'Waarom Next.js?',
      titleEn: 'Why Next.js?',
      badge: '99/100',
    },
    {
      id: 'pakketten',
      icon: Calculator,
      iconColor: 'text-emerald-500',
      titleNl: 'Tarieven & Calculators',
      titleEn: 'Rates & Calculators',
      badge: 'Vanaf €75',
    },
    {
      id: 'hoe-het-werkt',
      icon: CheckCircle2,
      iconColor: 'text-blue-500',
      titleNl: 'Werkwijze & Checklist',
      titleEn: 'Process & Checklist',
      badge: '4 Stappen',
    },
    {
      id: 'garanties',
      icon: ShieldCheck,
      iconColor: 'text-violet-500',
      titleNl: '4 Harde Zekerheden',
      titleEn: 'Our Guarantees',
      badge: '100% Veilig',
    },
    {
      id: 'faq-section',
      icon: HelpCircle,
      iconColor: 'text-rose-500',
      titleNl: 'Veelgestelde Vragen',
      titleEn: 'FAQ & About Us',
      badge: 'FAQ',
    },
  ];

  // Track scroll position to show/hide dock and determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);

      // Determine active section based on proximity to viewport
      const scrollPosition = scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleScrollTo = (targetId: string) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  const currentItem = sections.find((s) => s.id === activeSection) || sections[0];
  const CurrentIcon = currentItem.icon;

  return (
    <div
      ref={menuRef}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
    >
      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div
          role="menu"
          aria-label={lang === 'nl' ? 'Sectie dropdown menu' : 'Section dropdown menu'}
          className="w-72 sm:w-80 p-2 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-2 border-orange-200 dark:border-slate-800 shadow-2xl mb-2 animate-in fade-in zoom-in-95 duration-150 transition-colors"
        >
          <div className="px-3 py-2 border-b border-orange-100 dark:border-slate-800/80 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-800 dark:text-orange-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-orange-600" />
              <span>{lang === 'nl' ? 'Snel naar sectie' : 'Jump to section'}</span>
            </span>
            <span className="text-[10px] text-stone-500 dark:text-slate-400 font-medium">
              {lang === 'nl' ? 'Geen scroll nodig' : 'Instant jump'}
            </span>
          </div>

          <div className="space-y-1">
            {sections.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeSection;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  onClick={() => handleScrollTo(item.id)}
                  className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-100/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-200 font-black shadow-2xs'
                      : 'hover:bg-orange-50/80 dark:hover:bg-slate-900 text-stone-700 dark:text-slate-300 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs truncate">
                      {lang === 'nl' ? item.titleNl : item.titleEn}
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                        isActive
                          ? 'bg-orange-600 text-white'
                          : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400 border border-stone-200 dark:border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-2 border-orange-200 dark:border-slate-800 shadow-xl shadow-orange-700/10 transition-all">
        {/* Active Section & Dropdown Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          title={lang === 'nl' ? 'Open sectiemenu' : 'Open section menu'}
          className={`flex items-center gap-2 pl-3 pr-2.5 py-2 rounded-full text-xs font-black transition-all cursor-pointer select-none ${
            isOpen
              ? 'bg-orange-700 text-white shadow-sm'
              : 'bg-orange-50/90 dark:bg-slate-900 text-stone-900 dark:text-white hover:bg-orange-100 dark:hover:bg-slate-800'
          }`}
        >
          <CurrentIcon className={`w-4 h-4 ${isOpen ? 'text-white' : currentItem.iconColor}`} />
          <span className="max-w-[120px] sm:max-w-[150px] truncate text-left">
            {lang === 'nl' ? currentItem.titleNl : currentItem.titleEn}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-white' : 'text-stone-500'
            }`}
          />
        </button>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          title={lang === 'nl' ? 'Terug naar boven' : 'Back to top'}
          aria-label={lang === 'nl' ? 'Terug naar boven' : 'Back to top'}
          className="w-8 h-8 rounded-full bg-stone-100 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 flex items-center justify-center transition-all cursor-pointer shrink-0 border border-stone-200 dark:border-slate-700"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
