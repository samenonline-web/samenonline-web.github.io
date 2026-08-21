'use client';

import React from 'react';
import { Heart, Sparkles, Clock, Check, ArrowRight, MapPin } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface TemplateCardProps {
  template: WebTemplate;
  lang: Language;
  onOpenDetails: (template: WebTemplate) => void;
  onOpenRequestModal: (template: WebTemplate) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  lang,
  onOpenDetails,
  onOpenRequestModal,
  isBookmarked,
  onToggleBookmark,
}) => {
  const subtitle = lang === 'nl' ? template.subtitleNl : template.subtitle;
  const highlight = lang === 'nl' ? template.highlightSnippetNl : template.highlightSnippet;
  const features = lang === 'nl' ? template.featuresNl : template.features;

  return (
    <div className="group bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top Header: Logo Avatar, Badges & Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          
          <div className="flex items-center gap-3">
            {/* Logo Avatar */}
            <div className={`w-14 h-14 rounded-2xl ${template.logoBg} flex items-center justify-center text-white font-extrabold text-xl shadow-md transform group-hover:scale-105 transition-transform`}>
              {template.logoText}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-orange-600 transition-colors">
                  {template.name}
                </h3>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                {template.priceTier} Concept
              </span>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(template.id)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
            }`}
            title={lang === 'nl' ? 'Bewaar in favorieten' : 'Save to bookmarks'}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {template.badges.map((badge, idx) => (
            <span
              key={idx}
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-sm font-semibold text-slate-800 leading-snug mb-3">
          {subtitle}
        </p>

        {/* Highlight Snippet Box */}
        {highlight && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-orange-50/80 border border-orange-100 mb-4 text-xs font-medium text-orange-950">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="line-clamp-1">{highlight}</span>
          </div>
        )}

        {/* Features list */}
        <div className="space-y-1.5 mb-6">
          {features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
        
        {/* Build Days & Location */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
          <div className="flex items-center gap-1 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>{template.estimatedBuildDays} {lang === 'nl' ? 'dagen bouwtijd' : 'days build'}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>{template.city}, {template.province}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenDetails(template)}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            {lang === 'nl' ? 'Bekijk Details' : 'View Details'}
          </button>
          
          <button
            onClick={() => onOpenRequestModal(template)}
            className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <span>{lang === 'nl' ? 'Offerte' : 'Get Quote'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
