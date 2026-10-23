'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Plus, 
  Search, 
  Globe, 
  Moon, 
  Sun, 
  ChevronDown, 
  LayoutGrid, 
  Zap, 
  Calculator, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Language } from '../types/company';

interface NavbarProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenRequestModal: () => void;
  totalTemplatesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageToggle,
  onOpenRequestModal,
  totalTemplatesCount,
  searchQuery,
  onSearchChange,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsNavDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsNavDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleScrollTo = (targetId: string) => {
    setIsNavDropdownOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navMenuItems = [
    {
      id: 'templates-section',
      icon: LayoutGrid,
      iconColor: 'text-orange-500',
      titleNl: 'Website Concepten',
      titleEn: 'Website Templates',
      descNl: `${totalTemplatesCount} interactieve concepten met filters`,
      descEn: `${totalTemplatesCount} interactive industry concepts`,
      badge: `${totalTemplatesCount}`,
    },
    {
      id: 'waarom-nextjs',
      icon: Zap,
      iconColor: 'text-amber-500',
      titleNl: 'Waarom Next.js?',
      titleEn: 'Why Next.js?',
      descNl: 'Speed quickscan, CMS vergelijker & voor/na',
      descEn: 'Speed test, CMS comparison & before/after',
      badge: '100/100',
    },
    {
      id: 'pakketten',
      icon: Calculator,
      iconColor: 'text-emerald-500',
      titleNl: 'Tarieven & Pakketten',
      titleEn: 'Pricing & Packages',
      descNl: 'Vaste prijzen & 60-sec investering calculator',
      descEn: 'Fixed rates & 60-sec cost calculator',
      badge: 'Vanaf €75',
    },
    {
      id: 'hoe-het-werkt',
      icon: CheckCircle2,
      iconColor: 'text-blue-500',
      titleNl: 'Werkwijze & Checklist',
      titleEn: 'Process & Checklist',
      descNl: '4-stappenplan & wat jij zelf aanlevert',
      descEn: '4-step workflow & what you provide',
      badge: '4 Stappen',
    },
    {
      id: 'garanties',
      icon: ShieldCheck,
      iconColor: 'text-violet-500',
      titleNl: 'Samen Online Zekerheden',
      titleEn: 'Our Guarantees',
      descNl: '4 garanties, privacy-proof & 100% eigenaarschap',
      descEn: '4 hard guarantees & 100% IP ownership',
      badge: '100% Safe',
    },
    {
      id: 'faq-section',
      icon: HelpCircle,
      iconColor: 'text-rose-500',
      titleNl: 'Veelgestelde Vragen & Over Ons',
      titleEn: 'FAQ & About Us',
      descNl: 'Eerlijke antwoorden voor Nederlandse MKB/ZZP',
      descEn: 'Clear answers for Dutch businesses',
      badge: 'FAQ',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b-2 border-orange-100/80 dark:border-slate-800/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 overflow-x-clip sm:overflow-visible">
        
        {/* Brand Logo & Name - Clickable to scroll to top */}
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              if (window.location.pathname !== '/' && window.location.pathname !== '') {
                window.location.href = '/';
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl select-none shrink-0"
          title={lang === 'nl' ? 'Scroll naar boven' : 'Scroll to top'}
          aria-label={lang === 'nl' ? 'Samen Online home - Terug naar boven' : 'Samen Online home - Scroll to top'}
        >
          <div className="w-11 h-11 shrink-0 aspect-square rounded-2xl bg-orange-700 dark:bg-blue-600 flex items-center justify-center text-white shadow-md shadow-orange-700/20 dark:shadow-blue-600/30 transform group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-stone-900 dark:text-white group-hover:text-stone-950 dark:group-hover:text-slate-100 font-sans transition-colors">
                Samen<span className="text-orange-700 dark:text-blue-400">Online</span>
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-slate-400 font-medium hidden sm:block">
              {lang === 'nl' ? 'Website Concepts & Webdesign voor Nederland' : 'Dutch Website Concepts & Custom Design'}
            </p>
          </div>
        </button>

        {/* Dropdown Navigation Menu for all key sections */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsNavDropdownOpen((prev) => !prev)}
            aria-expanded={isNavDropdownOpen}
            aria-haspopup="true"
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer border shadow-2xs select-none ${
              isNavDropdownOpen
                ? 'bg-orange-700 dark:bg-blue-600 text-white border-orange-700 dark:border-blue-600 shadow-sm'
                : 'bg-orange-50/80 dark:bg-slate-900 text-stone-800 dark:text-slate-200 border-orange-200/80 dark:border-slate-800 hover:bg-orange-100 dark:hover:bg-slate-800'
            }`}
            title={lang === 'nl' ? 'Snel naar een belangrijk onderdeel van de site' : 'Jump to section'}
          >
            <Sparkles className="w-4 h-4 text-orange-500 dark:text-blue-400" />
            <span className="hidden md:inline">
              {lang === 'nl' ? 'Snel naar' : 'Jump to'}
            </span>
            <span className="md:hidden">
              {lang === 'nl' ? 'Menu' : 'Menu'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isNavDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu Panel */}
          {isNavDropdownOpen && (
            <div 
              role="menu"
              className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 sm:w-96 p-2 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-orange-200 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-3 py-2 border-b border-orange-100 dark:border-slate-800/80 mb-1 flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-800 dark:text-blue-400">
                  {lang === 'nl' ? 'Belangrijke onderdelen' : 'Quick Navigation'}
                </span>
                <span className="text-[10px] text-stone-500 dark:text-slate-400">
                  {lang === 'nl' ? 'Klik om direct te scrollen' : 'Click to jump'}
                </span>
              </div>

              <div className="space-y-1">
                {navMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleScrollTo(item.id)}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-blue-950/40 text-left transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100/70 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Icon className={`w-4 h-4 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {lang === 'nl' ? item.titleNl : item.titleEn}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-slate-400 font-medium leading-tight mt-0.5">
                          {lang === 'nl' ? item.descNl : item.descEn}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar Preview on Desktop */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const element = document.getElementById('filter-section') || document.getElementById('templates-section');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="hidden lg:flex flex-1 max-w-xs xl:max-w-md mx-2 relative items-center"
        >
          <Search className="w-4 h-4 text-orange-500 dark:text-blue-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            aria-label={lang === 'nl' ? 'Zoek concept of categorie' : 'Search concept or category'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              lang === 'nl'
                ? 'Zoek op concept of categorie...'
                : 'Search concept or category...'
            }
            className="w-full pl-10 pr-4 py-2 bg-orange-50/50 dark:bg-slate-900 border border-orange-200/80 dark:border-slate-800 rounded-full text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-500 focus:border-transparent transition-all shadow-2xs"
          />
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Language Switcher (Segmented Control - Cross-Platform Clean) */}
          <div
            role="group"
            aria-label={lang === 'nl' ? 'Taalkeuze' : 'Language selection'}
            className="flex items-center p-0.5 rounded-xl bg-orange-50/70 dark:bg-slate-900 border border-orange-200/80 dark:border-slate-800 text-xs font-bold shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-orange-700 dark:text-blue-400 ml-1.5 mr-1 pointer-events-none hidden sm:block" />
            <button
              type="button"
              onClick={() => lang !== 'nl' && onLanguageToggle()}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer min-h-[36px] ${
                lang === 'nl'
                  ? 'bg-orange-700 dark:bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-orange-100/60 dark:hover:bg-slate-800'
              }`}
              title="Nederlands"
              aria-pressed={lang === 'nl'}
            >
              NL
            </button>
            <button
              type="button"
              onClick={() => lang !== 'en' && onLanguageToggle()}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer min-h-[36px] ${
                lang === 'en'
                  ? 'bg-orange-700 dark:bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-orange-100/60 dark:hover:bg-slate-800'
              }`}
              title="English"
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>

          {/* Dark / Light Mode Switcher */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="flex items-center justify-center w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl text-stone-700 dark:text-slate-200 bg-orange-50/50 dark:bg-slate-900 border border-orange-200/80 dark:border-slate-800 hover:bg-orange-100/70 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
              title={isDarkMode ? (lang === 'nl' ? 'Schakel naar Lichte Modus' : 'Switch to Light Mode') : (lang === 'nl' ? 'Schakel naar Donkere Modus' : 'Switch to Dark Mode')}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>
          )}

          {/* Request Website Button - visible on sm and up; on mobile the sticky bottom bar handles direct requests */}
          <button
            onClick={() => onOpenRequestModal()}
            className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-700/20 hover:shadow-lg transition-all transform active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>
              {lang === 'nl' ? 'Website Aanvragen' : 'Request Website'}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};
