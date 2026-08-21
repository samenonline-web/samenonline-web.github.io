'use client';

import React from 'react';
import { X, MapPin, Heart, Sparkles, Check, Clock, ArrowRight } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface TemplateModalProps {
  template: WebTemplate | null;
  lang: Language;
  onClose: () => void;
  onOpenRequestModal: (template: WebTemplate) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  template,
  lang,
  onClose,
  onOpenRequestModal,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!template) return null;

  const description = lang === 'nl' ? template.descriptionNl : template.description;
  const subtitle = lang === 'nl' ? template.subtitleNl : template.subtitle;
  const highlight = lang === 'nl' ? template.highlightSnippetNl : template.highlightSnippet;
  const features = lang === 'nl' ? template.featuresNl : template.features;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Banner - Solid Dark Slate */}
        <div className="bg-slate-900 p-6 text-white relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${template.logoBg} flex items-center justify-center text-white font-black text-2xl shadow-lg border border-slate-700`}>
              {template.logoText}
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-orange-600/20 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full inline-block mb-1">
                {template.priceTier} Web Concept
              </span>
              <h2 className="text-2xl font-extrabold text-white">{template.name}</h2>
              <p className="text-slate-400 font-semibold text-xs mt-0.5">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Highlight Banner */}
          <div className="bg-orange-50/80 p-4 rounded-2xl border border-orange-100">
            <h3 className="font-bold text-orange-950 text-sm mb-1">{subtitle}</h3>
            <p className="text-xs font-medium text-orange-800 flex items-center gap-1.5 mt-2">
              <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
              {highlight}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {lang === 'nl' ? 'Over dit Template Concept' : 'About this Template Concept'}
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Features Included */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {lang === 'nl' ? 'Inbegrepen Functionaliteiten' : 'Included Features'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">{lang === 'nl' ? 'Oplevertijd' : 'Build Time'}</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                {template.estimatedBuildDays} {lang === 'nl' ? 'Dagen' : 'Days'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">{lang === 'nl' ? 'Regio & Stijl' : 'Region & Style'}</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                {template.city}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">{lang === 'nl' ? 'iDEAL Ready' : 'iDEAL Ready'}</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">
                {template.idealReady ? 'Ja (Mollie/Stripe)' : 'N/A'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">{lang === 'nl' ? 'Meertalig' : 'Multilingual'}</span>
              <span className="font-bold text-slate-800 mt-0.5 block">
                {template.multilingual ? 'NL & EN' : 'NL Only'}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleBookmark(template.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500' : ''}`} />
            <span>
              {isBookmarked
                ? (lang === 'nl' ? 'Opgeslagen' : 'Saved')
                : (lang === 'nl' ? 'Bewaren' : 'Save')}
            </span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRequestModal(template);
            }}
            className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-md shadow-orange-600/20 transition-all cursor-pointer"
          >
            <span>{lang === 'nl' ? 'Vraag Deze Template Aan' : 'Request This Template'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
