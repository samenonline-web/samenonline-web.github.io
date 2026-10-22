'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronRight,
  Sun,
  Moon,
  Flame,
  Award,
  Eye,
  Camera,
} from 'lucide-react';

interface TattooStyle {
  id: string;
  name: string;
  artist: string;
  desc: string;
  minPrice: string;
}

const TATTOO_STYLES: TattooStyle[] = [
  {
    id: 'fineline',
    name: 'Fineline & Micro-Realism',
    artist: 'Noah • @noah.fineline',
    desc: 'Uiterst verfijnde lijnen, minimalistische bloemen, portretten en subtiele belettering.',
    minPrice: 'Vanaf € 110,- (starttarief)',
  },
  {
    id: 'blackwork',
    name: 'Blackwork & Geometrisch',
    artist: 'Elena • @elena.inkt',
    desc: 'Krachtige zwarte vlakken, dotwork shading, mandalas en abstracte geometrische patronen.',
    minPrice: 'Vanaf € 140,- per uur',
  },
  {
    id: 'traditional',
    name: 'Neo-Traditional & Kleur',
    artist: 'Bram • @bram.tattoos',
    desc: 'Gedurfde lijnen, rijke kleurschakeringen, dieren en tijdloze maritieme motieven.',
    minPrice: 'Vanaf € 130,- per uur',
  },
];

export const InktEnNaaldStudio: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'Inkt & Naald Tattoo Atelier';
  const city = customCity || 'Eindhoven & Strijp-S';

  const [activeStyle, setActiveStyle] = useState<string>('fineline');
  const [intakeSuccess, setIntakeSuccess] = useState(false);
  const [intakeData, setIntakeData] = useState({
    name: '',
    email: '',
    phone: '',
    placement: 'Onderarm',
    estimatedSize: 'Klein (tot 7 cm)',
    description: '',
  });

  const activeStyleObj = TATTOO_STYLES.find((s) => s.id === activeStyle) || TATTOO_STYLES[0];

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeData.name || !intakeData.email) return;
    setIntakeSuccess(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-900 text-stone-100'}`}>
      
      {/* Demo Concept Disclaimer Bar */}
      <div className="bg-black text-stone-300 py-1.5 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Voorbeeldconcept:</strong> Tattoo & Piercing Studio website lay-out (GGD gecertificeerd & 16+ wetgeving).
        </span>
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur-md border-b border-stone-800 bg-stone-950/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
              ⚡
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block leading-none text-white">
                {brandName}
              </span>
              <span className="text-[11px] font-semibold text-stone-400">
                Custom Tattoo Studio & GGD Keurmerk • {city}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                aria-label="Toggle Dark Mode"
                className="p-2 rounded-xl border border-stone-800 bg-stone-900 text-yellow-400 hover:bg-stone-800 text-xs cursor-pointer transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={onRequestQuote}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-md transition-all cursor-pointer ${theme.primary} hover:opacity-95`}
            >
              Consult / Intake Boeken
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-950 text-red-300 border border-red-800">
              <Award className="w-4 h-4 text-red-400" />
              <span>GGD Goedgekeurd • Leeftijd 16+ (Legitimatie Verplicht)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Tijdloze Lichaamskunst & Fineline Tattoos in <span className={theme.textPrimary}>{city}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-medium leading-relaxed max-w-xl">
              Elk tattoo-ontwerp is 100% uniek en op maat getekend door onze resident artists. Vegan inkt van medische kwaliteit, steriele werkomgeving en professionele nazorg.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Vegan & Reach gecertificeerde inkt</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gratis bijwerkgeloften (touch-up)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gratis consult & ontwerpschets</span>
              </div>
            </div>
          </div>

          {/* Right Card: Intake / Consult Formulier */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl border-2 border-stone-800 bg-stone-900/90 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="font-black text-lg text-white">Custom Tattoo Aanvraag</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300">
                  Vrijblijvend
                </span>
              </div>

              {intakeSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-base text-white">Tattoo Aanvraag Ontvangen!</h4>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    Thanks {intakeData.name}! Onze studio coördinator bekijkt jouw idee en neemt binnen 48 uur contact op met een richtprijs en beschikbare data.
                  </p>
                  <button
                    onClick={() => setIntakeSuccess(false)}
                    className="text-xs font-bold text-stone-400 underline cursor-pointer mt-2"
                  >
                    Nog een idee doorgeven
                  </button>
                </div>
              ) : (
                <form onSubmit={handleIntakeSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold block mb-1 text-stone-300">Jouw Naam</label>
                      <input
                        type="text"
                        required
                        value={intakeData.name}
                        onChange={(e) => setIntakeData({ ...intakeData, name: e.target.value })}
                        placeholder="bijv. Milan"
                        className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-800 text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1 text-stone-300">E-mailadres</label>
                      <input
                        type="email"
                        required
                        value={intakeData.email}
                        onChange={(e) => setIntakeData({ ...intakeData, email: e.target.value })}
                        placeholder="milan@voorbeeld.nl"
                        className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-800 text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold block mb-1 text-stone-300">Plaatsing</label>
                      <select
                        value={intakeData.placement}
                        onChange={(e) => setIntakeData({ ...intakeData, placement: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-800 text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Onderarm">Onderarm / Binnenarm</option>
                        <option value="Bovenarm">Bovenarm / Schouder</option>
                        <option value="Ribben">Ribben / Zij</option>
                        <option value="Been">Bovenbeen / Kuit / Enkel</option>
                        <option value="Rug">Rug / Schouderblad</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1 text-stone-300">Formaat</label>
                      <select
                        value={intakeData.estimatedSize}
                        onChange={(e) => setIntakeData({ ...intakeData, estimatedSize: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-800 text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Klein (tot 7 cm)">Klein (tot 7 cm)</option>
                        <option value="Medium (7-15 cm)">Medium (7-15 cm)</option>
                        <option value="Groot (15-25 cm)">Groot (15-25 cm)</option>
                        <option value="Sleeve / Backpiece">Sleeve of rugstuk</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1 text-stone-300">Omschrijving van het Idee</label>
                    <textarea
                      rows={2}
                      value={intakeData.description}
                      onChange={(e) => setIntakeData({ ...intakeData, description: e.target.value })}
                      placeholder="bijv. Fineline bloem met geboortedatum, referentiefoto's volgen per mail..."
                      className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-800 text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                  >
                    <span>Vrijblijvende Aanvraag Versturen</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Artiesten & Stijlen Showcase */}
      <section className="py-14 px-4 sm:px-6 border-t border-stone-800 bg-stone-950/70">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-amber-500">
              Resident Artists & Stijlen
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Kies Jouw Favoriete Tattoo Stijl
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TATTOO_STYLES.map((style) => (
              <div
                key={style.id}
                className="p-6 rounded-3xl border border-stone-800 bg-stone-900/80 hover:border-stone-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-amber-400 block mb-1">
                    {style.artist}
                  </span>
                  <h3 className="text-lg font-black text-white mb-2">{style.name}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    {style.desc}
                  </p>
                </div>

                <div className="border-t border-stone-800 pt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-300">
                    {style.minPrice}
                  </span>
                  <button
                    onClick={onRequestQuote}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Boek Artist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Demo Note */}
      <footer className="py-8 px-4 text-center text-xs text-stone-500 border-t border-stone-800">
        <p>© 2026 {brandName} • Gemaakt met Samen Online Webconcepten</p>
      </footer>

    </div>
  );
};
