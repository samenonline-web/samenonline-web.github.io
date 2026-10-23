'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Smartphone, 
  Monitor, 
  Copy, 
  Check, 
  Sparkles, 
  Star, 
  Globe, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';

interface GoogleSnippetPreviewerProps {
  onRequestQuote?: () => void;
}

export default function GoogleSnippetPreviewer({ onRequestQuote }: GoogleSnippetPreviewerProps) {
  const [businessName, setBusinessName] = useState('Schildersbedrijf Van Dijk');
  const [city, setCity] = useState('Utrecht');
  const [service, setService] = useState('Schilderwerk & Kozijnen');
  const [customDescription, setCustomDescription] = useState('');
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [copied, setCopied] = useState(false);

  // Auto-generate realistic SEO title & description
  const cleanName = businessName.trim() || 'Jouw Bedrijf';
  const cleanCity = city.trim() || 'Nederland';
  const cleanService = service.trim() || 'Vakkundige Diensten';

  const generatedTitle = `${cleanService} ${cleanCity} | ${cleanName}`;
  const defaultDesc = `Op zoek naar ${cleanService.toLowerCase()} in ${cleanCity}? ${cleanName} levert betrouwbaar vakwerk met garantie. Vraag vandaag binnen 2 minuten een gratis offerte aan!`;
  const activeDesc = customDescription.trim() ? customDescription : defaultDesc;

  // Slugified URL
  const domainSlug = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const displayUrl = `https://www.${domainSlug || 'jouwbedrijf'}.nl`;
  const breadcrumb = ` › ${cleanCity.toLowerCase()} › ${cleanService.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  // Length checks
  const titleLength = generatedTitle.length;
  const descLength = activeDesc.length;
  const isTitleIdeal = titleLength >= 40 && titleLength <= 60;
  const isDescIdeal = descLength >= 120 && descLength <= 160;

  const handleCopyTags = () => {
    const code = `<title>${generatedTitle}</title>\n<meta name="description" content="${activeDesc}" />\n<link rel="canonical" href="${displayUrl}" />`;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="google-snippet-previewer" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/70 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Search className="w-3.5 h-3.5" />
          <span>SEO & Google Previewer 2.0</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Hoe Ziet Jouw Bedrijf Eruit in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500">
            Google Zoekresultaten?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Met onze Next.js architectuur krijgt jouw website automatisch geldige Schema.org data, 
          5-sterren review rich snippets en razendsnelle laadtijden. Vul je gegevens in en zie direct het live resultaat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs & Customizer (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Jouw Bedrijfsgegevens</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">Live preview update</span>
          </div>

          {/* Bedrijfsnaam */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Bedrijfsnaam
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Bijv. Van Dijk Timmerwerken"
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stad & Dienst in 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Stad / Vestigingsplaats
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Bijv. Utrecht"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Voornaamste Dienst
              </label>
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="Bijv. Dakkapel & Aanbouw"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Meta Description Customizer */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Google Zoekomschrijving (Snippet)
              </label>
              <span
                className={`text-[10px] font-mono font-bold ${
                  isDescIdeal
                    ? 'text-emerald-500'
                    : descLength > 160
                    ? 'text-amber-500'
                    : 'text-slate-400'
                }`}
              >
                {descLength} / 160 tekens
              </span>
            </div>
            <textarea
              rows={3}
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder={defaultDesc}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Laat leeg voor de automatisch geoptimaliseerde Google snippet tekst.
            </p>
          </div>

          {/* SEO Health Indicator Badges */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                SEO Title Lengte:
              </span>
              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                  isTitleIdeal
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                }`}
              >
                {titleLength} tekens {isTitleIdeal ? '✓ Perfect' : '(ideaal: 50-60)'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Schema.org Rich Snippet:
              </span>
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[11px] px-2 py-0.5 rounded-full">
                LocalBusiness + ReviewStars
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleCopyTags}
              className="flex-1 py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Gekopieerd!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopieer Meta Tags</span>
                </>
              )}
            </button>

            {onRequestQuote && (
              <button
                onClick={onRequestQuote}
                className="py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Website Aanvragen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Preview Card: Realistic Google Result (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Device Switcher */}
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Live Google SERP Simulatie
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobiel</span>
              </button>

              <button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
            </div>
          </div>

          {/* Google Search Result Card */}
          <div className="bg-white rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md transition-all text-slate-900 font-sans">
            {/* Google Search Bar Mock */}
            <div className="mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-blue-600 font-black text-sm">
                G
              </div>
              <div className="flex-1 bg-slate-50 rounded-full px-4 py-2 text-xs text-slate-600 flex items-center justify-between border border-slate-200">
                <span className="font-medium truncate">
                  {cleanService.toLowerCase()} {cleanCity.toLowerCase()}
                </span>
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            </div>

            {/* URL Breadcrumb + Favicon */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {cleanName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-slate-800 truncate">{cleanName}</span>
                <span className="text-[11px] text-slate-500 font-mono truncate">
                  {displayUrl}
                  <span className="text-slate-400">{breadcrumb}</span>
                </span>
              </div>
            </div>

            {/* Clickable Blue Title */}
            <h3
              className={`font-semibold hover:underline cursor-pointer leading-snug mb-2 ${
                viewMode === 'mobile'
                  ? 'text-lg text-[#1967d2]'
                  : 'text-xl text-[#1a0dab]'
              }`}
            >
              {generatedTitle}
            </h3>

            {/* 5-Star Rating Rich Snippet */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-800">4,9</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">Beoordeling: 4,9 · 38 reviews</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                Geverifieerd
              </span>
            </div>

            {/* Meta Description Snippet */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              <span className="font-bold text-slate-800">{cleanCity}</span> — {activeDesc}
            </p>

            {/* Sitelinks Mini Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-xs font-semibold text-blue-600 hover:underline block cursor-pointer">
                  Tarieven & Richtprijzen
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1">
                  Transparante all-in prijzen zonder verrassingen achteraf.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-xs font-semibold text-blue-600 hover:underline block cursor-pointer">
                  Werkwijze & Garantie
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1">
                  Binnen 5 werkdagen online met 100% eigendomsoverdracht.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-xs font-semibold text-blue-600 hover:underline block cursor-pointer">
                  Gerealiseerde Projecten
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1">
                  Bekijk recente voorbeelden en reviews uit {cleanCity}.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                <span className="text-xs font-semibold text-blue-600 hover:underline block cursor-pointer">
                  Direct Contact & Offerte
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1">
                  Gratis offerte binnen 2 minuten via WhatsApp of formulier.
                </span>
              </div>
            </div>

            {/* Technical Superiority Callout */}
            <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900 font-medium">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Google Lighthouse Score: 100/100 (0.4s laadtijd op 4G)</span>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                Top 1% Nederland
              </span>
            </div>
          </div>

          {/* Explanation Tip */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p>
              <strong>Waarom dit belangrijk is:</strong> Websites met complete rich snippets en 5-sterren beoordelingen 
              behalen tot <strong>35% hogere doorklikratio&apos;s (CTR)</strong> in Google dan standaard blauwe linkjes. 
              Bij Samen Online zit deze SEO-structuur standaard in elk pakket inbegrepen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
