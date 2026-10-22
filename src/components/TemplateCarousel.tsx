'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Check, ArrowRight, Clock, Star, Globe } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface TemplateCarouselProps {
  templates: WebTemplate[];
  lang: Language;
  onOpenDetails: (template: WebTemplate) => void;
  onOpenLivePreview: (template: WebTemplate) => void;
  onOpenRequestModal: (template?: WebTemplate) => void;
  isPaused?: boolean;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  templates,
  lang,
  onOpenDetails,
  onOpenLivePreview,
  onOpenRequestModal,
  isPaused = false,
}) => {
  const featuredTemplates = templates.filter((t) => t.isFeatured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoPlay || isPaused || featuredTemplates.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTemplates.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, isPaused, featuredTemplates.length]);

  if (featuredTemplates.length === 0) return null;

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + featuredTemplates.length) % featuredTemplates.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % featuredTemplates.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      
      {/* Outer Card: Bright, Friendly White Card with Warm Orange Border */}
      <div 
        className="relative rounded-3xl overflow-hidden shadow-xl shadow-orange-500/5 dark:shadow-indigo-500/5 border-2 border-orange-100 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 transition-colors"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Carousel Track Container */}
        <div className="relative z-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredTemplates.map((template) => {
              const subtitle = lang === 'nl' ? template.subtitleNl : template.subtitle;
              const description = lang === 'nl' ? template.descriptionNl : template.description;
              const highlight = lang === 'nl' ? template.highlightSnippetNl : template.highlightSnippet;
              const features = lang === 'nl' ? template.featuresNl : template.features;

              return (
                <div
                  key={template.id}
                  className="w-full shrink-0 flex-none p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/90 transition-colors"
                >
                  
                  {/* Left Column: Info & Copy */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    
                    {/* Top Pill Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-extrabold border border-orange-200 dark:border-orange-800/60">
                        <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                        {lang === 'nl' ? 'Uitgelicht Concept' : 'Featured Concept'}
                      </span>

                      {template.badges.map((badge, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-amber-50 dark:bg-slate-800/80 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200/80 dark:border-slate-700">
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
                        {template.name}
                      </h2>
                      <p className="text-lg font-bold text-orange-700 dark:text-orange-400">
                        {subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-xl">
                      {description}
                    </p>

                    {/* Feature Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-orange-50/60 dark:bg-slate-800/80 px-3.5 py-2.5 rounded-xl border border-orange-100 dark:border-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4">
                      <button
                        onClick={() => onOpenLivePreview(template)}
                        className="px-6 py-3.5 rounded-2xl bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-sm shadow-md shadow-orange-700/20 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                      >
                        <Globe className="w-4 h-4" />
                        <span>{lang === 'nl' ? 'Bekijk Live Template' : 'View Live Template'}</span>
                      </button>

                      <button
                        onClick={() => onOpenDetails(template)}
                        className="px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold text-sm border-2 border-orange-200 dark:border-slate-700 transition-colors cursor-pointer"
                      >
                        {lang === 'nl' ? 'Bekijk Details' : 'View Details'}
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Visual Mockup Preview */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    
                    {/* Mockup Card Frame */}
                    <div className="w-full bg-white dark:bg-slate-950 border-2 border-orange-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-orange-500/5 dark:shadow-black/40 relative transform hover:scale-102 transition-transform">
                      
                      {/* Fake Browser Window Header */}
                      <div className="flex items-center justify-between pb-3 mb-5 border-b border-orange-100 dark:border-slate-800 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                        </div>
                        <span className="font-mono text-[11px] text-orange-950 dark:text-slate-200 bg-orange-50 dark:bg-slate-900 px-3 py-1 rounded-full border border-orange-200/80 dark:border-slate-800 font-bold">
                          https://{template.id}.samenonline.nl
                        </span>
                      </div>

                      {/* Mockup Screen Content */}
                      <div className="space-y-4 text-left">
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-2xl ${template.logoBg} flex items-center justify-center text-white font-extrabold text-base shadow-md`}>
                              {template.logoText}
                            </div>
                            <div>
                              <p className="font-bold text-base text-slate-900 dark:text-white">{template.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{template.city}, {template.province}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            ⚡ {template.priceTier}
                          </span>
                        </div>

                        {/* Highlight Banner */}
                        <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-slate-900/80 border border-orange-200/80 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium">
                          <span className="font-bold text-orange-700 dark:text-orange-400 block mb-0.5">
                            {lang === 'nl' ? 'Highlights:' : 'Highlights:'}
                          </span>
                          {highlight}
                        </div>

                        {/* Specs Pill row */}
                        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-orange-100 dark:border-slate-800 font-semibold">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span>{template.estimatedBuildDays} {lang === 'nl' ? 'dagen oplevertijd' : 'days build time'}</span>
                          </div>

                          <div className="flex items-center gap-1 font-bold text-xs text-stone-600 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-stone-200 dark:border-slate-700">
                            <span>{lang === 'nl' ? 'Voorbeeld Lay-out' : 'Showcase Layout'}</span>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Footer Navigation Bar */}
        <div className="relative z-20 px-6 py-4 bg-orange-50/50 dark:bg-slate-950/80 border-t border-orange-100 dark:border-slate-800 flex items-center justify-between transition-colors">
          
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 hover:text-orange-700 dark:hover:text-white transition-all border border-orange-200 dark:border-slate-700 shadow-xs cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Vorige template"
            aria-label="Vorige template"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator with accessible touch targets (min 44x44px target area) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {featuredTemplates.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(idx);
                }}
                className="p-2 sm:p-2.5 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-full min-w-[36px] min-h-[36px]"
                title={tmpl.name}
                aria-label={lang === 'nl' ? `Toon slide ${idx + 1}: ${tmpl.name}` : `Show slide ${idx + 1}: ${tmpl.name}`}
              >
                <span
                  className={`h-2.5 rounded-full transition-all duration-500 block ${
                    idx === currentIndex
                      ? 'w-8 bg-orange-700 shadow-md shadow-orange-700/30'
                      : 'w-2.5 bg-stone-300 dark:bg-slate-700 hover:bg-orange-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 hover:text-orange-700 dark:hover:text-white transition-all border border-orange-200 dark:border-slate-700 shadow-xs cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Volgende template"
            aria-label="Volgende template"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>

    </section>
  );
};
