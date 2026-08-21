'use client';

import React from 'react';
import { Heart, Plus, Search, Globe } from 'lucide-react';
import { Language } from '../types/company';

interface NavbarProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenRequestModal: () => void;
  totalTemplatesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageToggle,
  onOpenRequestModal,
  totalTemplatesCount,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20 transform hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                Samen<span className="text-orange-600">Online</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                🇳🇱 Showcase
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {lang === 'nl' ? 'Website Concepts & Webdesign voor Nederland' : 'Dutch Website Concepts & Custom Design'}
            </p>
          </div>
        </div>

        {/* Search Bar Preview on Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              lang === 'nl'
                ? 'Zoek op concept of categorie...'
                : 'Search concept or category...'
            }
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-xs"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Language Switcher */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
            title={lang === 'nl' ? 'Wissel naar Engels' : 'Switch to Dutch'}
          >
            <Globe className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN'}</span>
          </button>

          {/* Request Website Button */}
          <button
            onClick={() => onOpenRequestModal()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-md shadow-orange-600/20 hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
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
