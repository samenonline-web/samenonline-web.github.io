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
  Printer,
  Calculator,
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
  const [calcSize, setCalcSize] = useState<'klein' | 'medium' | 'groot' | 'sleeve'>('medium');
  const [calcDetail, setCalcDetail] = useState<'lines' | 'shaded' | 'color'>('shaded');
  const [intakeSuccess, setIntakeSuccess] = useState(false);
  const [intakeData, setIntakeData] = useState({
    name: '',
    email: '',
    phone: '',
    placement: 'Onderarm',
    estimatedSize: 'Klein (tot 7 cm)',
    description: '',
  });

  // Tattoo Price & Duration Estimator
  const baseTattooPrice = calcSize === 'klein' ? 110 : calcSize === 'medium' ? 220 : calcSize === 'groot' ? 450 : 950;
  const detailMultiplier = calcDetail === 'lines' ? 1 : calcDetail === 'shaded' ? 1.25 : 1.5;
  const minEstPrice = Math.round(baseTattooPrice * detailMultiplier);
  const maxEstPrice = Math.round(minEstPrice * 1.3);
  const estimatedDuration =
    calcSize === 'klein'
      ? '1 - 1,5 uur'
      : calcSize === 'medium'
      ? '2 - 3,5 uur'
      : calcSize === 'groot'
      ? '4 - 6 uur'
      : 'Dagsessie / Multi-sessie';

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
            <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
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
                <div className="py-4 space-y-4">
                  <div className="text-center space-y-1.5">
                    <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-black text-base text-white">Tattoo Aanvraag Ontvangen!</h4>
                    <p className="text-xs text-stone-400 max-w-xs mx-auto">
                      Bedankt {intakeData.name}! Onze studio coördinator neemt binnen 48 uur contact op voor het intakegesprek.
                    </p>
                  </div>

                  {/* Printable Studio Intake Dossier */}
                  <div className="p-4 rounded-2xl border-2 border-dashed border-stone-700 bg-stone-950 space-y-3">
                    <div className="flex justify-between items-start border-b pb-2 border-stone-800">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                          Tattoo Intake & Dossierbon
                        </span>
                        <span className="font-black text-sm text-white">{brandName}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-stone-800 text-stone-300 px-2 py-0.5 rounded font-bold">
                        INKT-EIN-2026-X
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                      <div>
                        <span className="text-[10px] text-stone-500 block">Klant</span>
                        <span className="font-bold text-white">{intakeData.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Plaatsing & Formaat</span>
                        <span className="font-bold">{intakeData.placement} • {intakeData.estimatedSize}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Stijl</span>
                        <span className="font-bold text-amber-400">{activeStyleObj.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Studio Locatie</span>
                        <span className="font-bold">{city}</span>
                      </div>
                    </div>

                    <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-[11px] space-y-1">
                      <span className="font-bold text-amber-400 block">Richtlijnen voor de tattoo-sessie:</span>
                      <ul className="list-disc list-inside text-stone-300 text-[10px] space-y-0.5">
                        <li>Geldig legitimatiebewijs (16+ wetgeving verplicht)</li>
                        <li>Geen alcohol of bloedverdunners 24 uur vooraf</li>
                        <li>Draag comfortabele, donkere kleding die los zit</li>
                        <li>Eet een stevige maaltijd vooraf en neem wat zoets mee</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-black flex items-center justify-center gap-1.5 shadow hover:bg-amber-400 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Intakebon (PDF)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIntakeSuccess(false)}
                      className="px-3 py-2.5 rounded-xl border border-stone-700 text-stone-300 text-xs font-bold hover:bg-stone-800 cursor-pointer"
                    >
                      Nieuwe Aanvraag
                    </button>
                  </div>
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

          {/* Tattoo Richtprijs & Sessieduur Calculator */}
          <div className="mt-12 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-black text-white">Tattoo Richtprijs & Sessieduur Rekenmodule</h3>
                </div>
                <p className="text-xs text-stone-400">
                  Transparante inschatting op basis van formaat en complexiteit van de uitwerking.
                </p>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Geschatte Richtprijs:</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                  €{minEstPrice} - €{maxEstPrice}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5 font-bold">
                  ⏱️ Geschatte duur: {estimatedDuration}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
              <div>
                <label className="text-xs font-bold text-stone-300 block mb-2">1. Kies gewenst formaat:</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: 'klein', label: 'Klein (tot 7 cm)' },
                    { id: 'medium', label: 'Medium (7-15 cm)' },
                    { id: 'groot', label: 'Groot (15-25 cm)' },
                    { id: 'sleeve', label: 'Sleeve / Backpiece' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCalcSize(s.id as any)}
                      className={`py-2 px-2 text-center rounded-xl border text-[11px] transition-all cursor-pointer ${
                        calcSize === s.id
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                          : 'border-stone-700 bg-stone-800/80 text-stone-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-300 block mb-2">2. Niveau van detaillering:</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {[
                    { id: 'lines', label: 'Enkel Lijnwerk' },
                    { id: 'shaded', label: 'Shading & Dotwork' },
                    { id: 'color', label: 'Full Realism / Kleur' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setCalcDetail(d.id as any)}
                      className={`py-2 px-2 text-center rounded-xl border text-[11px] transition-all cursor-pointer ${
                        calcDetail === d.id
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                          : 'border-stone-700 bg-stone-800/80 text-stone-400 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-stone-400">
                Inclusief ontwerp, medische nazorgfolie en 1 gratis touch-up binnen 3 maanden in {city}.
              </span>
              <button
                onClick={onRequestQuote}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-white font-black text-xs shadow-md transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
              >
                Vraag Dit Concept Aan
              </button>
            </div>
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
