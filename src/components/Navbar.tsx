'use client';

import React from 'react';
import { Heart, Plus, Search, Globe, Moon, Sun } from 'lucide-react';
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
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b-2 border-orange-100/80 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
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
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl select-none"
          title={lang === 'nl' ? 'Scroll naar boven' : 'Scroll to top'}
          aria-label={lang === 'nl' ? 'Samen Online home - Terug naar boven' : 'Samen Online home - Scroll to top'}
        >
          <div className="w-11 h-11 rounded-2xl bg-orange-700 flex items-center justify-center text-white shadow-md shadow-orange-700/20 transform group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-stone-900 dark:text-white group-hover:text-stone-950 dark:group-hover:text-slate-100 font-sans transition-colors">
                Samen<span className="text-orange-700 dark:text-orange-500">Online</span>
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-slate-400 font-medium hidden sm:block">
              {lang === 'nl' ? 'Website Concepts & Webdesign voor Nederland' : 'Dutch Website Concepts & Custom Design'}
            </p>
          </div>
        </button>

        {/* Search Bar Preview on Desktop */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const element = document.getElementById('filter-section') || document.getElementById('templates-section');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="hidden md:flex flex-1 max-w-md mx-4 relative items-center"
        >
          <Search className="w-4 h-4 text-orange-500 absolute left-3.5 pointer-events-none" />
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
            className="w-full pl-10 pr-4 py-2 bg-orange-50/50 dark:bg-slate-900 border border-orange-200/80 dark:border-slate-800 rounded-full text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-2xs"
          />
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Language Switcher (Segmented Control - Cross-Platform Clean) */}
          <div
            role="group"
            aria-label={lang === 'nl' ? 'Taalkeuze' : 'Language selection'}
            className="flex items-center p-0.5 rounded-xl bg-orange-50/70 dark:bg-slate-900 border border-orange-200/80 dark:border-slate-800 text-xs font-bold shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-orange-700 dark:text-orange-400 ml-1.5 mr-1 pointer-events-none hidden sm:block" />
            <button
              type="button"
              onClick={() => lang !== 'nl' && onLanguageToggle()}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer min-h-[36px] ${
                lang === 'nl'
                  ? 'bg-orange-700 text-white shadow-xs font-extrabold'
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
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer min-h-[36px] ${
                lang === 'en'
                  ? 'bg-orange-700 text-white shadow-xs font-extrabold'
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

          {/* Request Website Button */}
          <button
            onClick={() => onOpenRequestModal()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold text-sm shadow-md shadow-orange-700/20 hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">
              {lang === 'nl' ? 'Website Aanvragen' : 'Request Website'}
            </span>
            <span className="sm:hidden">{lang === 'nl' ? 'Aanvragen' : 'Request'}</span>
          </button>

        </div>
      </div>
    </header>
  );
};
