'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Sun,
  Check,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Star,
  Moon,
  BatteryCharging,
  MapPin,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const ZonnePionierSolar: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [panelCount, setPanelCount] = useState(12);
  const [roofType, setRoofType] = useState<'schuin' | 'plat'>('schuin');
  const [includeBattery, setIncludeBattery] = useState(true);
  const [houseType, setHouseType] = useState<'tussen' | 'hoek' | 'vrijstaand'>('hoek');
  const [postcode, setPostcode] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const runDakscan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode) return;
    const clean = postcode.replace(/\s+/g, '');
    const num = parseInt(clean.substring(0, 4), 10);
    if (!isNaN(num) && num >= 1000 && num <= 9999) {
      setScanResult(
        `✅ Dakscan Voltooid voor postcode ${num}: Jouw dakoriëntatie is gunstig (Zuidoost / Zuidwest). Geschikt voor minimaal ${houseType === 'vrijstaand' ? 18 : houseType === 'hoek' ? 14 : 10} zonnepanelen!`
      );
      showToast('Dakscan berekend met succes!');
    } else {
      setScanResult('Voer een geldige 4-cijferige postcode in.');
    }
  };

  const yearlyKwh = panelCount * 420;
  const yearlyEuro = Math.round(yearlyKwh * 0.29 + (includeBattery ? 280 : 0));
  const baseInvestment = panelCount * 440;
  const batteryInvestment = includeBattery ? 3400 : 0;
  const totalInvestment = baseInvestment + batteryInvestment;
  const paybackYears = (totalInvestment / yearlyEuro).toFixed(1);

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-amber-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <Sun className="w-3.5 h-3.5 text-amber-200" />
        <span>Erkend Installateur Zonnekeur & InstallQ • Montage binnen 14 dagen in heel Nederland</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            ZP
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">ZonnePionier Solar</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Arnhem & Utrecht • Erkende Zonne-installaties</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#calculator" className="hover:text-stone-900">Dakscan Calculator</a>
          <a href="#stappen" className="hover:text-stone-900">Werkwijze</a>
          <a href="#garanties" className="hover:text-stone-900">25 Jaar Garantie</a>
          <a href="#reviews" className="hover:text-stone-900">Klantervaringen</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200 flex items-center gap-1.5"
              title={isDarkMode ? 'Lichte Modus' : 'Donkere Modus'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
              <span className="hidden sm:inline text-xs font-bold">{isDarkMode ? 'Licht' : 'Donker'}</span>
            </button>
          )}

          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Gratis Dakscan Aanvragen
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-100/30 via-stone-50 to-white py-12 sm:py-20 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Scope 12 Veilig Gekeurd • 0% BTW op Zonnepanelen & Batterijen</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Bespaar direct op je energierekening met <span className={theme.textPrimary}>glas-glas zonnepanelen</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Geen onderaannemers, maar eigen VCA-gecertificeerde monteurs. Compleet geïnstalleerd met Enphase micro-omvormers en slimme thuisbatterij.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="#calculator"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
            >
              <Calculator className="w-4 h-4" />
              <span>Bereken Jouw Dakopbrengst</span>
            </a>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Vraag Deze Template Aan
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span className="text-stone-800 font-extrabold">🏆 25 Jaar Fabrieksgarantie</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">⚡ Enphase & SolarEdge Partner</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">☀️ Vakkundige Installatie Binnen 3 Weken</span>
          </div>
        </div>
      </section>

      {/* Solar & Battery Simulator */}
      <section id="calculator" className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Directe Dakscan Simulator</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              Bereken realtime stroomopbrengst, terugverdientijd en thuisbatterij voordeel
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Postcode Form */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <label className="text-xs font-black text-stone-700 block mb-2">Check jouw postcode voor zonpotentie:</label>
                <form onSubmit={runDakscan} className="flex gap-2">
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Bijv. 6811 CD"
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-bold uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black cursor-pointer shadow-xs`}
                  >
                    Scan Dak
                  </button>
                </form>
                {scanResult && (
                  <p className="text-xs text-emerald-800 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mt-2">
                    {scanResult}
                  </p>
                )}
              </div>

              {/* Roof Type */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <label className="text-xs font-black text-stone-700 block mb-2">Daktype & Montage:</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setRoofType('schuin')}
                    className={`py-2 rounded-xl border transition-all cursor-pointer ${
                      roofType === 'schuin' ? `${theme.primary} text-white border-transparent shadow-xs` : 'bg-white border-stone-300 text-stone-700'
                    }`}
                  >
                    Schuin Dak (Pannendak)
                  </button>
                  <button
                    onClick={() => setRoofType('plat')}
                    className={`py-2 rounded-xl border transition-all cursor-pointer ${
                      roofType === 'plat' ? `${theme.primary} text-white border-transparent shadow-xs` : 'bg-white border-stone-300 text-stone-700'
                    }`}
                  >
                    Plat Dak (Bitumen/EPDM)
                  </button>
                </div>
              </div>

              {/* Slider Panel Count */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-stone-700">Aantal Zonnepanelen (440 Wp Glas-Glas):</span>
                  <span className={`text-base font-black ${theme.textPrimary}`}>{panelCount} panelen</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="2"
                  value={panelCount}
                  onChange={(e) => setPanelCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1.5">
                  <span>6 panelen (~2.600 kWh)</span>
                  <span>14 panelen (~5.800 kWh)</span>
                  <span>24 panelen (~10.000 kWh)</span>
                </div>
              </div>

              {/* Battery Checkbox */}
              <button
                onClick={() => setIncludeBattery(!includeBattery)}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                  includeBattery ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BatteryCharging className="w-5 h-5 text-emerald-600" />
                  <div className="text-left">
                    <span className="font-black text-stone-900 block">Voeg 10 kWh Thuisbatterij Toe</span>
                    <span className="text-[10px] text-stone-500">Sla overtollige zonnestroom op voor de nacht</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                  includeBattery ? `${theme.primary} text-white` : 'border border-stone-300'
                }`}>
                  {includeBattery ? '✓' : ''}
                </div>
              </button>
            </div>

            {/* Calculations Card */}
            <div className={`lg:col-span-5 ${theme.bgLight} p-6 sm:p-8 rounded-3xl border-2 ${theme.borderLight} text-left flex flex-col justify-between`}>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md inline-block mb-3">
                  Jouw Zonne-rendement
                </span>
                <div className="text-3xl sm:text-4xl font-black text-stone-900 mb-1">
                  €{yearlyEuro.toLocaleString('nl-NL')}
                  <span className="text-xs font-bold text-stone-500"> / jaar besparing</span>
                </div>
                <p className="text-xs text-stone-600 mb-6 font-medium">
                  Verdien je investering terug in circa <strong className="text-stone-900">~{paybackYears} jaar</strong>.
                </p>

                <div className="space-y-2.5 text-xs font-bold text-stone-700">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                    <span>Jaarlijkse stroomopbrengst:</span>
                    <span className="font-black text-emerald-700">{yearlyKwh.toLocaleString('nl-NL')} kWh</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                    <span>Thuisbatterij opslag:</span>
                    <span className="font-black text-emerald-700">{includeBattery ? 'Inbegrepen (10 kWh)' : 'Geen'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                    <span>Geschatte investering (0% BTW):</span>
                    <span className="font-black text-stone-900">€{totalInvestment.toLocaleString('nl-NL')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onRequestQuote}
                className={`w-full py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md mt-6 cursor-pointer`}
              >
                Ontvang Vrijblijvende Dakscan & Offerte
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section id="stappen" className="bg-stone-100/70 py-12 sm:py-16 px-4 sm:px-8 border-t border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2">In 4 Stappen Naar Een Zonne-energie Dak</h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium mb-10">Zonder zorgen, van vergunning tot werkende app</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md block w-fit mb-3">Stap 1</span>
              <h4 className="font-black text-sm text-stone-900 mb-1">Digitale Dakscan</h4>
              <p className="text-xs text-stone-500 font-medium">Binnen 24 uur ontvang je een 3D dakplan met schaduwanalyse en legplan.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md block w-fit mb-3">Stap 2</span>
              <h4 className="font-black text-sm text-stone-900 mb-1">Technische Schouw</h4>
              <p className="text-xs text-stone-500 font-medium">Onze hoofdmonteur controleert jouw meterkast, bekabeling en dakconstructie.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md block w-fit mb-3">Stap 3</span>
              <h4 className="font-black text-sm text-stone-900 mb-1">1-Dags Installatie</h4>
              <p className="text-xs text-stone-500 font-medium">VCA-gecertificeerde montage binnen één werkdag, inclusief nette kabeldoorvoer.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md block w-fit mb-3">Stap 4</span>
              <h4 className="font-black text-sm text-stone-900 mb-1">Live Monitoring</h4>
              <p className="text-xs text-stone-500 font-medium">Volg direct via de Enphase app per paneel hoeveel schone stroom je opwekt.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
