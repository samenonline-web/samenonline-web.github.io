'use client';

import React, { useState } from 'react';
import { MapPin, Search, Sparkles, CheckCircle2, ArrowRight, Gauge, Globe } from 'lucide-react';
import { Language } from '../types/company';

interface LocalSeoRankCheckerProps {
  lang: Language;
  onOpenLocalRequest: (city: string, niche: string) => void;
}

export const LocalSeoRankChecker: React.FC<LocalSeoRankCheckerProps> = ({
  lang,
  onOpenLocalRequest,
}) => {
  const [selectedCity, setSelectedCity] = useState('Utrecht');
  const [selectedNiche, setSelectedNiche] = useState('Schilder & Onderhoud');

  const CITIES = [
    'Utrecht',
    'Amsterdam',
    'Rotterdam',
    'Den Haag',
    'Eindhoven',
    'Tilburg',
    'Groningen',
    'Almere',
    'Breda',
    'Nijmegen',
    'Amersfoort',
    'Arnhem',
  ];

  const NICHES = [
    { name: 'Schilder & Onderhoud', searchVol: 920 },
    { name: 'Aannemer & Verbouwingen', searchVol: 1150 },
    { name: 'Loodgieter & Installatie', searchVol: 1400 },
    { name: 'Horeca, Café & Restaurant', searchVol: 2800 },
    { name: 'Boekhouder & Fiscaal Advies', searchVol: 740 },
    { name: 'Fysiotherapie & Zorgpraktijk', searchVol: 1300 },
    { name: 'Kapper & Schoonheidssalon', searchVol: 1650 },
    { name: 'Rijschool & Instructeur', searchVol: 880 },
  ];

  const currentNicheObj = NICHES.find((n) => n.name === selectedNiche) || NICHES[0];

  return (
    <div id="lokale-seo-check" className="my-6 scroll-mt-24">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-blue-950/60 text-orange-800 dark:text-blue-300 border border-orange-200 dark:border-blue-800/60 text-xs font-black uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-orange-600 dark:text-blue-400" />
            <span>{lang === 'nl' ? 'Lokale Google Vindbaarheid Scan' : 'Local SEO Performance Audit'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            {lang === 'nl'
              ? 'Hoe Scoort Jouw Branche in Google in Jouw Regio?'
              : 'How Well Can You Rank in Google in Your Area?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium">
            Kies jouw stad en branche om direct te zien hoeveel potentiële klanten maandelijks naar jouw diensten zoeken.
          </p>
        </div>

        {/* Dropdowns */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-1">
              Selecteer Jouw Gemeente / Stad:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-700 text-xs font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  📍 {c} & omgeving
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-1">
              Selecteer Jouw Vakgebied:
            </label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-700 text-xs font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              {NICHES.map((n) => (
                <option key={n.name} value={n.name}>
                  🛠️ {n.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Audit Results Card */}
        <div className="bg-gradient-to-r from-orange-50/80 via-white to-amber-50/80 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-800/80 p-6 sm:p-8 rounded-2xl border-2 border-orange-200/90 dark:border-slate-700 max-w-4xl mx-auto shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Metric 1 */}
            <div className="text-center md:text-left space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
                Lokaal Zoekvolume per Maand:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-orange-700 dark:text-blue-400">
                ~{currentNicheObj.searchVol.toLocaleString('nl-NL')}+
              </div>
              <p className="text-[11px] text-stone-600 dark:text-slate-300 font-medium">
                Zoekopdrachten naar &quot;{selectedNiche}&quot; in {selectedCity}.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="text-center md:text-left space-y-1 border-t md:border-t-0 md:border-l border-stone-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
                Samen Online Snelheidsvoordeel:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center md:justify-start gap-1">
                <Gauge className="w-7 h-7" />
                <span>0.3s</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-slate-300 font-medium">
                100/100 Core Web Vitals (verslaat 92% van WordPress sites).
              </p>
            </div>

            {/* CTA */}
            <div className="border-t md:border-t-0 md:border-l border-stone-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
              <button
                type="button"
                onClick={() => onOpenLocalRequest(selectedCity, selectedNiche)}
                className="w-full py-3 px-4 rounded-xl bg-orange-700 hover:bg-orange-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-700/20 transition-all cursor-pointer"
              >
                <span>Word #1 in {selectedCity}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-center text-stone-500 dark:text-slate-400 font-semibold mt-2">
                Inclusief Schema.org LocalBusiness & Maps
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
