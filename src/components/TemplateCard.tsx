'use client';

import React from 'react';
import { Heart, Sparkles, Clock, Check, ArrowRight, MapPin, Globe } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface TemplateCardProps {
  template: WebTemplate;
  lang: Language;
  onOpenDetails: (template: WebTemplate) => void;
  onOpenLivePreview: (template: WebTemplate) => void;
  onOpenRequestModal: (template: WebTemplate) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  lang,
  onOpenDetails,
  onOpenLivePreview,
  onOpenRequestModal,
  isBookmarked,
  onToggleBookmark,
}) => {
  const subtitle = lang === 'nl' ? template.subtitleNl : template.subtitle;
  const highlight = lang === 'nl' ? template.highlightSnippetNl : template.highlightSnippet;
  const features = lang === 'nl' ? template.featuresNl : template.features;

  return (
    <div className="group bg-white dark:bg-slate-900/90 rounded-3xl p-6 border-2 border-orange-100/90 dark:border-slate-800 hover:border-orange-300 dark:hover:border-slate-700 hover:shadow-xl hover:shadow-orange-500/10 dark:hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between relative shadow-xs">
      
      {/* Top Header: Logo Avatar, Badges & Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Logo Avatar - strictly square, never squished by long titles */}
            <div className={`w-14 h-14 min-w-[56px] min-h-[56px] shrink-0 aspect-square rounded-2xl ${template.logoBg} flex items-center justify-center text-white font-extrabold text-xl shadow-md select-none transform group-hover:scale-105 transition-transform`}>
              {template.logoText}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-extrabold text-lg text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug">
                  {template.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 px-2.5 py-0.5 rounded-md inline-block border border-orange-200/60 dark:border-orange-800/60 shrink-0">
                  {template.priceTier} Concept
                </span>
                <span className="text-[11px] font-bold text-stone-600 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-stone-200 dark:border-slate-700 flex items-center gap-1 shrink-0">
                  Demo Concept
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => onToggleBookmark(template.id)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center ${
              isBookmarked
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                : 'bg-orange-50/50 dark:bg-slate-800/60 text-stone-400 dark:text-slate-400 border-orange-100 dark:border-slate-700 hover:text-stone-700 dark:hover:text-white'
            }`}
            title={lang === 'nl' ? 'Bewaar in favorieten' : 'Save to bookmarks'}
            aria-label={lang === 'nl' ? `Bewaar ${template.name} in favorieten` : `Bookmark ${template.name}`}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {template.badges.map((badge, idx) => (
            <span
              key={idx}
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-slate-800/80 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-slate-700"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-sm font-bold text-stone-800 dark:text-slate-200 leading-snug mb-3">
          {subtitle}
        </p>

        {/* Highlight Snippet Box */}
        {highlight && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-orange-50/80 dark:bg-slate-950/80 border border-orange-200/70 dark:border-slate-800 mb-4 text-xs font-medium text-orange-950 dark:text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="line-clamp-1">{highlight}</span>
          </div>
        )}

        {/* Features list */}
        <div className="space-y-1.5 mb-6">
          {features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-slate-300">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-4 border-t border-orange-100 dark:border-slate-800 flex flex-col gap-3">
        
        {/* Build Days & Location */}
        <div className="flex items-center justify-between text-xs text-stone-600 dark:text-slate-400 font-semibold">
          <div className="flex items-center gap-1 text-stone-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>{template.estimatedBuildDays} {lang === 'nl' ? 'dagen bouwtijd' : 'days build'}</span>
          </div>

          <div className="flex items-center gap-1 text-stone-600 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>{template.city}, {template.province}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenDetails(template)}
            className="w-full py-2.5 rounded-xl bg-orange-50/70 dark:bg-slate-800/80 hover:bg-orange-100 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold text-xs border border-orange-200/70 dark:border-slate-700 transition-colors cursor-pointer"
          >
            {lang === 'nl' ? 'Bekijk Details' : 'View Details'}
          </button>
          
          <button
            onClick={() => onOpenLivePreview(template)}
            className="w-full py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-orange-700/20 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'nl' ? 'Bekijk Template' : 'View Template'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
