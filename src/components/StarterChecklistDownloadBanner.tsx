'use client';

import React from 'react';
import { Download, CheckSquare, Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../types/company';

interface StarterChecklistDownloadBannerProps {
  lang: Language;
  onOpenChecklistModal: () => void;
}

export const StarterChecklistDownloadBanner: React.FC<StarterChecklistDownloadBannerProps> = ({
  lang,
  onOpenChecklistModal,
}) => {
  return (
    <div className="my-6 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 transition-colors">
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md">
          <CheckSquare className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-500/30">
            Gratis Download
          </span>
          <h3 className="text-base sm:text-lg font-black text-white mt-1">
            {lang === 'nl'
              ? 'De Complete Website Starter Checklist (2026 Editie)'
              : 'The Complete Website Starter Checklist (2026 Edition)'}
          </h3>
          <p className="text-xs text-stone-300 font-medium">
            De 10 gouden regels voor een winnende bedrijfswebsite. Direct in te zien of te printen.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenChecklistModal}
        className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-orange-600/30 transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
      >
        <Download className="w-4 h-4" />
        <span>Bekijk Gratis Checklist</span>
      </button>
    </div>
  );
};
