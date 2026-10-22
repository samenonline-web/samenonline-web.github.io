'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Smartphone,
  Monitor,
  Palette,
  ArrowRight,
  Type,
  Check,
  Sun,
  Moon,
  Building,
  MapPin,
  Share2,
  CreditCard,
  CheckCheck,
} from 'lucide-react';
import { WebTemplate, Language } from '../types/company';
import { COLOR_THEMES, ColorThemeId, FONT_STYLES, FontStyleId } from '../types/theme';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { IdealSimulatorModal } from './IdealSimulatorModal';
import Link from 'next/link';

interface LivePreviewModalProps {
  template: WebTemplate | null;
  lang: Language;
  onClose: () => void;
  onOpenRequestModal: (
    template: WebTemplate,
    theme?: string,
    font?: string,
    customData?: { templateName: string; budget: string; notes: string }
  ) => void;
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Live personalization states
  const [customBrandName, setCustomBrandName] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // iDEAL simulator state
  const [isIdealOpen, setIsIdealOpen] = useState(false);
  const [idealAmount, setIdealAmount] = useState(49.5);
  const [idealShopName, setIdealShopName] = useState('');

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

  const handleSharePreviewLink = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(`${window.location.origin}/demo/${template.id}`);
    url.searchParams.set('theme', selectedThemeId);
    url.searchParams.set('font', selectedFontId);
    if (customBrandName.trim()) url.searchParams.set('name', customBrandName.trim());
    if (customCity.trim()) url.searchParams.set('city', customCity.trim());
    if (isDarkMode) url.searchParams.set('dark', '1');

    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleOpenIdealCheckout = (amount: number, shopName: string) => {
    setIdealAmount(amount);
    setIdealShopName(shopName || template.name);
    setIsIdealOpen(true);
  };

  const handleRequestWebsite = () => {
    onClose();
    const budgetLabel =
      template.priceTier === 'Starter'
        ? 'Vanaf €50 (Starter / Snelle Setup)'
        : template.priceTier === 'Professional'
        ? '€350 - €750 (Compleet MKB Pakket)'
        : '€750 - €1.500 (Maatwerk & Webshop)';

    onOpenRequestModal(template, currentTheme.name, currentFont.name, {
      templateName: `${template.name} (${currentTheme.name})`,
      budget: budgetLabel,
      notes:
        customBrandName || customCity
          ? `Gepersonaliseerd voor: ${customBrandName || '-'} in ${customCity || '-'}. Lettertype: ${currentFont.name}.`
          : `Gekozen stijl: ${currentTheme.name}, Font: ${currentFont.name}.`,
    });
  };

  return (
    <div
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-1.5 bg-black/98 sm:bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200 cursor-pointer overscroll-none"
    >
      <div
        className="bg-stone-900 w-full sm:w-[99.5vw] max-w-[1850px] h-full sm:h-[99vh] rounded-none sm:rounded-2xl shadow-2xl overflow-hidden border border-stone-800 flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar 1: Template Info & Main Actions */}
        <div className="bg-stone-950 px-4 sm:px-6 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-white shrink-0">
          {/* Left: Template Info */}
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl ${template.logoBg} flex items-center justify-center text-white text-xs font-black shadow-xs`}
            >
              {template.logoText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block">
                  {customBrandName.trim() || template.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hidden sm:inline-block">
                  Live Aanpasbaar
                </span>
              </div>
              <span className="text-[11px] text-stone-400 font-medium hidden sm:block">
                {customCity.trim() ? `Gevestigd in ${customCity.trim()} • ` : ''}
                {template.subtitleNl || template.subtitle}
              </span>
            </div>
          </div>

          {/* Right: Fullscreen, Share Link, iDEAL Demo, Request CTA, Close */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Share Preview Link Button */}
            <button
              onClick={handleSharePreviewLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                copiedLink
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-stone-900 text-stone-200 border-stone-700 hover:bg-stone-800 hover:text-white'
              }`}
              title="Deel unieke preview link met jouw bedrijfsnaam en kleuren"
            >
              {copiedLink ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-white" />
                  <span>Link Gekopieerd!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-300" />
                  <span>Deel Preview</span>
                </>
              )}
            </button>

            {/* iDEAL Simulator Demo Trigger */}
            <button
              onClick={() => handleOpenIdealCheckout(65.0, customBrandName || template.name)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-800/80 text-xs font-extrabold transition-all cursor-pointer shadow-xs"
              title="Test de live iDEAL betaalstroom simulator"
            >
              <CreditCard className="w-3.5 h-3.5 text-purple-300" />
              <span>Test iDEAL</span>
            </button>

            {/* Orange Fullscreen Button */}
            <Link
              href={`/demo/${template.id}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-md shadow-orange-600/30 transition-all cursor-pointer"
              title="Open template in nieuw tabblad fullscreen"
            >
              <span>Fullscreen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Request Website */}
            <button
              onClick={handleRequestWebsite}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-md shadow-emerald-900/30"
            >
              <span>{lang === 'nl' ? 'Website Aanvragen' : 'Get This Website'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-rose-600 text-stone-300 hover:text-white border border-stone-700 hover:border-rose-500 transition-all cursor-pointer text-xs font-extrabold"
              title="Sluiten (ESC)"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Sluiten</span>
            </button>
          </div>
        </div>

        {/* Dedicated Live Customizer Bar: Color, Font & Realtime Business Personalization */}
        <div className="bg-stone-900/95 px-4 sm:px-6 py-2 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-white shrink-0">
          {/* Left Group: Color & Font */}
          <div className="flex flex-wrap items-center gap-4">
            {/* 1. Color Palette Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-orange-400 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-orange-400" />
                <span>Kleur:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {(['orange', 'blue', 'green', 'purple', 'dark', 'red'] as ColorThemeId[]).map((cId) => {
                  const colorConfig = COLOR_THEMES[cId];
                  const isSelected = selectedThemeId === cId;
                  const dotBg =
                    cId === 'orange'
                      ? '#ea580c'
                      : cId === 'blue'
                      ? '#0284c7'
                      : cId === 'green'
                      ? '#059669'
                      : cId === 'purple'
                      ? '#9333ea'
                      : cId === 'dark'
                      ? '#292524'
                      : '#e11d48';
                  return (
                    <button
                      key={cId}
                      onClick={() => setSelectedThemeId(cId)}
                      title={colorConfig.name}
                      className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'border-white scale-110 ring-2 ring-orange-500/50 shadow-md'
                          : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: dotBg }}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Font Style Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-amber-400 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-amber-400" />
                <span>Font:</span>
              </span>
              <div className="flex items-center gap-1 bg-stone-950 p-0.5 rounded-lg border border-stone-800 text-[11px] font-bold">
                {(['sans', 'serif', 'rounded', 'tech'] as FontStyleId[]).map((fId) => {
                  const fontConfig = FONT_STYLES[fId];
                  const isSelected = selectedFontId === fId;
                  return (
                    <button
                      key={fId}
                      onClick={() => setSelectedFontId(fId)}
                      title={`${fontConfig.name}: ${fontConfig.description}`}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
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
          </div>

          {/* Center/Right Group: Personalize Live Inputs (Bedrijfsnaam & Stad) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800">
              <Building className="w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Jouw Bedrijfsnaam..."
                value={customBrandName}
                onChange={(e) => setCustomBrandName(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none w-32 sm:w-40 font-medium"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Jouw Stad (bijv. Utrecht)..."
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none w-28 sm:w-36 font-medium"
              />
            </div>

            {/* Viewport Toggles (Desktop vs Mobile) */}
            <div className="flex items-center gap-1 bg-stone-950 p-0.5 rounded-xl border border-stone-800 text-xs font-bold">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewportMode === 'desktop'
                    ? 'bg-stone-800 text-white font-extrabold'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Desktop weergave"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-stone-800 text-white font-extrabold'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Mobiele weergave"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 hover:bg-amber-400/30'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-white'
              }`}
              title={isDarkMode ? 'Schakel naar Light mode' : 'Schakel naar Dark mode'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-300" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Canvas Area with Maximum Screen Width & overscroll-contain */}
        <div className="flex-1 bg-black overflow-y-auto overscroll-contain p-0 sm:p-1.5 flex justify-center items-start">
          <div
            className={`transition-all duration-300 ${
              isDarkMode ? 'bg-stone-950 text-white' : 'bg-white text-stone-900'
            } shadow-2xl overflow-hidden ${
              viewportMode === 'mobile'
                ? 'w-full max-w-[390px] min-h-[700px] my-4 ring-8 ring-stone-950 rounded-[44px] border border-stone-800'
                : 'w-full min-h-full rounded-none sm:rounded-xl border-x-0 sm:border border-stone-800'
            }`}
          >
            <TemplateRenderer
              templateId={template.id}
              theme={currentTheme}
              fontStyle={currentFont}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
              onRequestQuote={handleRequestWebsite}
              customBrandName={customBrandName}
              customCity={customCity}
              onOpenIdealCheckout={handleOpenIdealCheckout}
            />
          </div>
        </div>

        {/* Live iDEAL Simulator Modal */}
        <IdealSimulatorModal
          isOpen={isIdealOpen}
          amount={idealAmount}
          shopName={idealShopName}
          onClose={() => setIsIdealOpen(false)}
        />
      </div>
    </div>
  );
};
