'use client';

import React from 'react';
import { Sparkles, Building, RotateCcw, Check } from 'lucide-react';
import { Language } from '../types/company';

export interface BrandColorOption {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
  ringClass: string;
}

export const BRAND_COLORS: BrandColorOption[] = [
  { id: 'orange', name: 'Samen Oranje', hex: '#ea580c', bgClass: 'bg-orange-600', ringClass: 'ring-orange-500' },
  { id: 'blue', name: 'Kobalt Blauw', hex: '#2563eb', bgClass: 'bg-blue-600', ringClass: 'ring-blue-500' },
  { id: 'green', name: 'Smaragd Groen', hex: '#059669', bgClass: 'bg-emerald-600', ringClass: 'ring-emerald-500' },
  { id: 'purple', name: 'Royal Paars', hex: '#7c3aed', bgClass: 'bg-purple-600', ringClass: 'ring-purple-500' },
  { id: 'red', name: 'Bordeaux Rood', hex: '#dc2626', bgClass: 'bg-rose-600', ringClass: 'ring-rose-500' },
  { id: 'dark', name: 'Antraciet / Zwart', hex: '#1e293b', bgClass: 'bg-slate-800', ringClass: 'ring-slate-700' },
];

interface LiveBrandingBarProps {
  lang: Language;
  customBrandName: string;
  onBrandNameChange: (name: string) => void;
  selectedColorId: string;
  onColorChange: (colorId: string) => void;
  onReset: () => void;
}

export const LiveBrandingBar: React.FC<LiveBrandingBarProps> = ({
  lang,
  customBrandName,
  onBrandNameChange,
  selectedColorId,
  onColorChange,
  onReset,
}) => {
  const isCustomized = Boolean(customBrandName.trim() || selectedColorId !== 'orange');

  return (
    <div className="relative mb-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs transition-all">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left title & explanation */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-blue-950/80 text-orange-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wider">
                {lang === 'nl' ? 'Live Huisstijl Simulator' : 'Live Brand Simulator'}
              </span>
              <span className="text-[10px] font-bold text-orange-700 dark:text-blue-300 bg-orange-100 dark:bg-blue-950/80 px-2 py-0.2 rounded-full">
                {lang === 'nl' ? 'Realtime Preview' : 'Realtime'}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
              {lang === 'nl'
                ? 'Vul jouw bedrijfsnaam in en kies je huiskleur. Alle sjablonen passen zich direct live aan!'
                : 'Enter your company name & pick your brand color to preview templates in your style!'}
            </p>
          </div>
        </div>

        {/* Right controls: Name input + Color swatches */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Company Name Input */}
          <div className="relative flex-1 sm:w-60 min-w-[200px]">
            <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={customBrandName}
              onChange={(e) => onBrandNameChange(e.target.value)}
              placeholder={lang === 'nl' ? 'Bijv. Bakkerij Jansen...' : 'E.g. Acme Studio...'}
              maxLength={40}
              className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500 shadow-2xs"
            />
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-orange-100 dark:border-slate-700">
            {BRAND_COLORS.map((col) => {
              const isSelected = selectedColorId === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => onColorChange(col.id)}
                  title={col.name}
                  aria-label={col.name}
                  className={`w-6 h-6 rounded-lg ${col.bgClass} flex items-center justify-center transition-transform cursor-pointer ${
                    isSelected ? 'scale-110 ring-2 ring-offset-1 ' + col.ringClass : 'opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {/* Reset button if customized */}
          {isCustomized && (
            <button
              type="button"
              onClick={onReset}
              className="px-2.5 py-2 rounded-xl text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white text-xs font-bold flex items-center gap-1 hover:bg-orange-100/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={lang === 'nl' ? 'Herstel standaard weergave' : 'Reset view'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'nl' ? 'Herstel' : 'Reset'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
