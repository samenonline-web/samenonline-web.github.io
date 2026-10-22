'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Palette,
  ArrowRight,
  Type,
  Sun,
  Moon,
  Building,
  MapPin,
  Share2,
  CheckCheck,
  CreditCard,
} from 'lucide-react';
import { WebTemplate } from '../../../src/types/company';
import { COLOR_THEMES, ColorThemeId, FONT_STYLES, FontStyleId } from '../../../src/types/theme';
import { TemplateRenderer } from '../../../src/components/templates/TemplateRenderer';
import { RequestWebsiteModal } from '../../../src/components/RequestWebsiteModal';
import { IdealSimulatorModal } from '../../../src/components/IdealSimulatorModal';

interface DemoClientViewProps {
  template: WebTemplate;
}

export const DemoClientView: React.FC<DemoClientViewProps> = ({ template }) => {
  const [selectedThemeId, setSelectedThemeId] = useState<ColorThemeId>('orange');
  const [selectedFontId, setSelectedFontId] = useState<FontStyleId>('sans');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Live personalization states
  const [customBrandName, setCustomBrandName] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // iDEAL simulator state
  const [isIdealOpen, setIsIdealOpen] = useState(false);
  const [idealAmount, setIdealAmount] = useState(49.5);
  const [idealShopName, setIdealShopName] = useState('');

  // Read URL search params on mount (supports shared personalized preview links)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const themeParam = params.get('theme') as ColorThemeId | null;
      const fontParam = params.get('font') as FontStyleId | null;
      const nameParam = params.get('name');
      const cityParam = params.get('city');
      const darkParam = params.get('dark');

      if (themeParam && COLOR_THEMES[themeParam]) setSelectedThemeId(themeParam);
      if (fontParam && FONT_STYLES[fontParam]) setSelectedFontId(fontParam);
      if (nameParam) setCustomBrandName(nameParam);
      if (cityParam) setCustomCity(cityParam);
      if (darkParam === '1' || darkParam === 'true') setIsDarkMode(true);
    }
  }, []);

  const currentTheme = COLOR_THEMES[selectedThemeId];
  const currentFont = FONT_STYLES[selectedFontId];

  const handleSharePreviewLink = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
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

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      {/* Floating Top Control Bar */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Back Link & Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Terug naar Samen Online</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 border-l border-stone-700 pl-3">
            <span className="font-extrabold text-sm text-white">
              {customBrandName.trim() || template.name}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ● Fictief Demo Concept
            </span>
          </div>
        </div>

        {/* Center: Live Brand Color & Font Switcher + Personalize Inputs */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Color Switcher */}
          <div className="flex items-center gap-2 bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800 text-xs font-bold">
            <span className="text-stone-400 flex items-center gap-1 hidden sm:flex">
              <Palette className="w-3.5 h-3.5 text-stone-400" />
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
                    className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                      isSelected
                        ? 'border-white scale-115 ring-2 ring-white/30'
                        : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: dotBg }}
                  />
                );
              })}
            </div>
          </div>

          {/* Font Switcher */}
          <div className="flex items-center gap-1.5 bg-stone-950 px-2 py-1 rounded-xl border border-stone-800 text-xs font-bold">
            <span className="text-stone-400 flex items-center gap-1 hidden sm:flex">
              <Type className="w-3.5 h-3.5 text-stone-400" />
              <span>Font:</span>
            </span>
            <div className="flex items-center gap-1">
              {(['sans', 'serif', 'rounded', 'tech'] as FontStyleId[]).map((fId) => {
                const fontConfig = FONT_STYLES[fId];
                const isSelected = selectedFontId === fId;
                return (
                  <button
                    key={fId}
                    onClick={() => setSelectedFontId(fId)}
                    title={`${fontConfig.name}: ${fontConfig.description}`}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600 text-white font-extrabold shadow-2xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {fontConfig.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Realtime Personalization Inputs */}
          <div className="hidden lg:flex items-center gap-1.5 bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800">
            <Building className="w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Jouw Bedrijfsnaam..."
              value={customBrandName}
              onChange={(e) => setCustomBrandName(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none w-32 font-medium"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1.5 bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Jouw Stad..."
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none w-24 font-medium"
            />
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
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

        {/* Action Buttons: Share, iDEAL Demo & Request CTA */}
        <div className="flex items-center gap-2">
          {/* Share Preview Link */}
          <button
            onClick={handleSharePreviewLink}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              copiedLink
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700 hover:text-white'
            }`}
            title="Kopieer deelbare live demo link"
          >
            {copiedLink ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-white" />
                <span>Gekopieerd!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-stone-300" />
                <span className="hidden sm:inline">Deel Preview</span>
              </>
            )}
          </button>

          {/* Test iDEAL */}
          <button
            onClick={() => handleOpenIdealCheckout(79.0, customBrandName || template.name)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-800/80 text-xs font-extrabold transition-all cursor-pointer shadow-xs"
            title="Test de live iDEAL betaalstroom simulator"
          >
            <CreditCard className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">Test iDEAL</span>
          </button>

          {/* Request Button */}
          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Website Aanvragen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Fullscreen Template Canvas */}
      <main className={`flex-1 ${isDarkMode ? 'bg-stone-950 text-white' : 'bg-white'}`}>
        <TemplateRenderer
          templateId={template.id}
          theme={currentTheme}
          fontStyle={currentFont}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
          onRequestQuote={() => setIsRequestModalOpen(true)}
          customBrandName={customBrandName}
          customCity={customCity}
          onOpenIdealCheckout={handleOpenIdealCheckout}
        />
      </main>

      {/* Request Modal */}
      <RequestWebsiteModal
        isOpen={isRequestModalOpen}
        selectedTemplate={template}
        lang="nl"
        preferredTheme={currentTheme.name}
        preferredFont={currentFont.name}
        initialCustomData={{
          templateName: `${template.name} (${currentTheme.name})`,
          budget:
            template.priceTier === 'Starter'
              ? 'Vanaf €50 (Starter / Snelle Setup)'
              : template.priceTier === 'Professional'
              ? '€350 - €750 (Compleet MKB Pakket)'
              : '€750 - €1.500 (Maatwerk & Webshop)',
          notes:
            customBrandName || customCity
              ? `Aanvraag voor: ${customBrandName || '-'} in ${customCity || '-'}. Gekozen stijl: ${currentTheme.name}, Font: ${currentFont.name}.`
              : `Gekozen stijl: ${currentTheme.name}, Font: ${currentFont.name}.`,
        }}
        onClose={() => setIsRequestModalOpen(false)}
      />

      {/* iDEAL Simulator Modal */}
      <IdealSimulatorModal
        isOpen={isIdealOpen}
        amount={idealAmount}
        shopName={idealShopName}
        onClose={() => setIsIdealOpen(false)}
      />
    </div>
  );
};
