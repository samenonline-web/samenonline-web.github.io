'use client';

import React, { useEffect } from 'react';
import { X, MapPin, Heart, Sparkles, Check, Clock, ArrowRight, Globe } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface TemplateModalProps {
  template: WebTemplate | null;
  lang: Language;
  onClose: () => void;
  onOpenLivePreview: (template: WebTemplate) => void;
  onOpenRequestModal: (template: WebTemplate) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  template,
  lang,
  onClose,
  onOpenLivePreview,
  onOpenRequestModal,
  isBookmarked,
  onToggleBookmark,
}) => {
  useEffect(() => {
    if (!template) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [template, onClose]);

  if (!template) return null;

  const description = lang === 'nl' ? template.descriptionNl : template.description;
  const subtitle = lang === 'nl' ? template.subtitleNl : template.subtitle;
  const highlight = lang === 'nl' ? template.highlightSnippetNl : template.highlightSnippet;
  const features = lang === 'nl' ? template.featuresNl : template.features;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      
      {/* Modal Card */}
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-100 dark:border-slate-800 flex flex-col max-h-[90vh] cursor-default text-stone-900 dark:text-slate-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Banner - Warm Coral/Orange */}
        <div className="bg-orange-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${template.logoBg} flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-white/40`}>
              {template.logoText}
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full inline-block mb-1">
                {template.priceTier} Web Concept
              </span>
              <h2 className="text-2xl font-extrabold text-white">{template.name}</h2>
              <p className="text-orange-100 font-semibold text-xs mt-0.5">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-900 dark:text-slate-100">
          
          {/* Highlight Banner */}
          <div className="bg-orange-50/80 dark:bg-slate-950/80 p-4 rounded-2xl border border-orange-200/80 dark:border-slate-800">
            <h3 className="font-bold text-orange-950 dark:text-white text-sm mb-1">{subtitle}</h3>
            <p className="text-xs font-medium text-orange-800 dark:text-orange-300 flex items-center gap-1.5 mt-2">
              <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
              {highlight}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-slate-400 mb-2">
              {lang === 'nl' ? 'Over dit Template Concept' : 'About this Template Concept'}
            </h4>
            <p className="text-stone-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Features Included */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-slate-400 mb-3">
              {lang === 'nl' ? 'Inbegrepen Functionaliteiten' : 'Included Features'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-slate-200 bg-orange-50/50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-orange-100 dark:border-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-orange-50/40 dark:bg-slate-950/80 p-4 rounded-2xl border border-orange-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-stone-400 dark:text-slate-400 font-medium block">{lang === 'nl' ? 'Oplevertijd' : 'Build Time'}</span>
              <span className="font-bold text-stone-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                {template.estimatedBuildDays} {lang === 'nl' ? 'Dagen' : 'Days'}
              </span>
            </div>

            <div>
              <span className="text-stone-400 dark:text-slate-400 font-medium block">{lang === 'nl' ? 'Regio & Stijl' : 'Region & Style'}</span>
              <span className="font-bold text-stone-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                {template.city}
              </span>
            </div>

            <div>
              <span className="text-stone-400 dark:text-slate-400 font-medium block">{lang === 'nl' ? 'iDEAL Ready' : 'iDEAL Ready'}</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                {template.idealReady ? 'Ja (Mollie/Stripe)' : 'N/A'}
              </span>
            </div>

            <div>
              <span className="text-stone-400 dark:text-slate-400 font-medium block">{lang === 'nl' ? 'Meertalig' : 'Multilingual'}</span>
              <span className="font-bold text-stone-800 dark:text-slate-200 mt-0.5 block">
                {template.multilingual ? 'NL & EN' : 'NL Only'}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-orange-50/30 dark:bg-slate-950 border-t border-orange-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 transition-colors">
          <button
            onClick={() => onToggleBookmark(template.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                : 'bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-300 border-orange-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500' : ''}`} />
            <span>
              {isBookmarked
                ? (lang === 'nl' ? 'Opgeslagen' : 'Saved')
                : (lang === 'nl' ? 'Bewaren' : 'Save')}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenLivePreview(template);
              }}
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-orange-700 dark:text-orange-400 border-2 border-orange-300 dark:border-slate-700 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'nl' ? 'Bekijk Live Demo' : 'Live Demo'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenRequestModal(template);
              }}
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-orange-600/20 transition-all cursor-pointer"
            >
              <span>{lang === 'nl' ? 'Vraag Deze Template Aan' : 'Request This Template'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
