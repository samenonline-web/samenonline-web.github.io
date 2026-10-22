'use client';

import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Smartphone, Monitor, Palette, ArrowRight, Type, Check } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';
import { COLOR_THEMES, ColorThemeId, FONT_STYLES, FontStyleId } from '../types/theme';
import { TemplateRenderer } from './templates/TemplateRenderer';
import Link from 'next/link';

interface LivePreviewModalProps {
  template: WebTemplate | null;
  lang: Language;
  onClose: () => void;
  onOpenRequestModal: (template: WebTemplate) => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  template,
  lang,
  onClose,
  onOpenRequestModal,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<ColorThemeId>('orange');
  const [selectedFontId, setSelectedFontId] = useState<FontStyleId>('sans');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (!template) return;
    
    // Freeze main site scrolling completely while preview modal is open
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [template, onClose]);

  if (!template) return null;

  const currentTheme = COLOR_THEMES[selectedThemeId];
  const currentFont = FONT_STYLES[selectedFontId];

  return (
    <div
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-1.5 bg-black/98 sm:bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 cursor-pointer overscroll-none"
    >
      <div
        className="bg-stone-900 w-full sm:w-[99.5vw] max-w-[1780px] h-full sm:h-[99vh] rounded-none sm:rounded-2xl shadow-2xl overflow-hidden border border-stone-800 flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar 1: Template Info & Main Actions */}
        <div className="bg-stone-950 px-4 sm:px-6 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-white shrink-0">
          
          {/* Left: Template Info */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${template.logoBg} flex items-center justify-center text-white text-xs font-black shadow-xs`}>
              {template.logoText}
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block">{template.name}</span>
              <span className="text-[11px] text-stone-400 font-medium hidden sm:block">
                {template.subtitleNl || template.subtitle}
              </span>
            </div>
          </div>

          {/* Right: Fullscreen (Orange), Request, Close with text */}
          <div className="flex items-center gap-2.5">
            {/* Orange Fullscreen Button */}
            <Link
              href={`/demo/${template.id}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-md shadow-orange-600/30 transition-all cursor-pointer"
              title="Open template in nieuw tabblad fullscreen"
            >
              <span>Fullscreen Openen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                onClose();
                onOpenRequestModal(template);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{lang === 'nl' ? 'Website Aanvragen' : 'Get This Website'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Close button with clear text & icon */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-rose-600 text-stone-300 hover:text-white border border-stone-700 hover:border-rose-500 transition-all cursor-pointer text-xs font-extrabold"
              title="Sluiten (ESC)"
            >
              <X className="w-4 h-4" />
              <span>Sluiten</span>
            </button>
          </div>

        </div>

        {/* Dedicated Live Customizer Bar: Color & Font Choice in Full View */}
        <div className="bg-stone-900/95 px-4 sm:px-6 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-white shrink-0">
          
          {/* 1. Color Palette Switcher */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-orange-400">
              <Palette className="w-4 h-4 text-orange-400" />
              <span>Huisstijl Kleur:</span>
            </div>
            <div className="flex items-center gap-2">
              {(['orange', 'blue', 'green', 'purple', 'dark', 'red'] as ColorThemeId[]).map((cId) => {
                const colorConfig = COLOR_THEMES[cId];
                const isSelected = selectedThemeId === cId;
                const dotBg = cId === 'orange' ? '#ea580c' : cId === 'blue' ? '#0284c7' : cId === 'green' ? '#059669' : cId === 'purple' ? '#9333ea' : cId === 'dark' ? '#292524' : '#e11d48';
                return (
                  <button
                    key={cId}
                    onClick={() => setSelectedThemeId(cId)}
                    title={colorConfig.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                      isSelected ? 'border-white scale-110 ring-2 ring-orange-500/50 shadow-md' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: dotBg }}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Font Style Selector - Prominent & Highly Visible */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-400">
              <Type className="w-4 h-4 text-amber-400" />
              <span>Lettertype (Font):</span>
            </div>
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs font-bold">
              {(['sans', 'serif', 'rounded', 'tech'] as FontStyleId[]).map((fId) => {
                const fontConfig = FONT_STYLES[fId];
                const isSelected = selectedFontId === fId;
                return (
                  <button
                    key={fId}
                    onClick={() => setSelectedFontId(fId)}
                    title={`${fontConfig.name}: ${fontConfig.description}`}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-orange-600 text-white font-black shadow-xs'
                        : 'text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <span>{fontConfig.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Viewport Toggles (Desktop vs Mobile) */}
          <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs font-bold">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === 'desktop' ? 'bg-stone-800 text-white font-extrabold' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === 'mobile' ? 'bg-stone-800 text-white font-extrabold' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobiel</span>
            </button>
          </div>

        </div>

        {/* Live Canvas Area with Maximum Screen Width & overscroll-contain */}
        <div className="flex-1 bg-black overflow-y-auto overscroll-contain p-0 sm:p-1.5 flex justify-center items-start">
          <div
            className={`transition-all duration-300 bg-white shadow-2xl overflow-hidden ${
              viewportMode === 'mobile'
                ? 'w-full max-w-[390px] min-h-[700px] my-4 ring-8 ring-stone-950 rounded-[44px] border border-stone-800'
                : 'w-full min-h-full rounded-none sm:rounded-xl border-x-0 sm:border border-stone-200'
            }`}
          >
            <TemplateRenderer
              templateId={template.id}
              theme={currentTheme}
              fontStyle={currentFont}
              onRequestQuote={() => {
                onClose();
                onOpenRequestModal(template);
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
