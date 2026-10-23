'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Car,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  MapPin,
  TrendingUp,
  UserCheck,
  Fuel,
  Sun,
  Moon,
  Printer,
  CreditCard,
  HelpCircle,
  Check,
} from 'lucide-react';

interface LessonPackage {
  id: string;
  name: string;
  badge?: string;
  lessons: number;
  price: number;
  features: string[];
  recommended?: boolean;
}

const PACKAGES: LessonPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pakket',
    lessons: 20,
    price: 1199,
    features: [
      '20 rijlessen à 60 minuten',
      'Inclusief eerste CBR Praktijkexamen',
      'Gratis online theoriecursus (t.w.v. €69)',
      'Vaste, geduldige instructeur',
      'Ophaalservice thuis of op school',
    ],
  },
  {
    id: 'zekerheid',
    name: 'Zekerheid & Slagingsgarantie',
    badge: 'Meest Gekozen',
    lessons: 35,
    price: 1995,
    features: [
      '35 rijlessen à 60 minuten',
      'CBR Tussentijdse Toets (TTT)',
      '1e CBR Praktijkexamen + 1x Gratis Herexamengarantie',
      'Onbeperkt online theorie examens oefenen',
      'Lesadvies en digitale vorderingen-app',
      'Ophaalservice op elke gewenste locatie',
    ],
    recommended: true,
  },
  {
    id: 'spoed',
    name: '14-Dagen Spoedcursus',
    badge: 'Snel je Rijbewijs',
    lessons: 30,
    price: 1780,
    features: [
      '30 intensieve lessen in 2-3 weken',
      'Gereserveerd CBR examen direct aansluitend',
      'CBR Tussentijdse Toets inbegrepen',
      'Rijles in moderne hybride lesauto',
      'Persoonlijke intake voor geschiktheid',
    ],
  },
];

export const RijschoolVlot: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'Rijschool Vlot & Veilig';
  const city = customCity || 'Rotterdam & Omstreken';

  const [transmission, setTransmission] = useState<'schakel' | 'automaat'>('schakel');
  const [selectedPackage, setSelectedPackage] = useState<string>('zekerheid');
  const [installmentCount, setInstallmentCount] = useState<1 | 2 | 3>(1);
  const [trialStep, setTrialStep] = useState(1);
  const [trialData, setTrialData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    experience: 'Geen ervaring',
  });
  const [trialBooked, setTrialBooked] = useState(false);
  const [passRatePercent, setPassRatePercent] = useState(79);

  const handleBookTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialData.name || !trialData.phone) return;
    setTrialBooked(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-800'}`}>
      
      {/* Demo Concept Disclaimer Bar */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Voorbeeldconcept:</strong> Rijschool & Rij-instructeur website lay-out (Geschikt voor WRM instructeurs en verkeersscholen).
        </span>
      </div>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
        isDarkMode ? 'bg-stone-950/90 border-stone-800' : 'bg-white/95 border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block leading-none">
                {brandName}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                Erkend CBR Opleider • {city}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                aria-label="Toggle Dark Mode"
                className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                  isDarkMode
                    ? 'border-stone-800 bg-stone-900 text-yellow-400 hover:bg-stone-800'
                    : 'border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={onRequestQuote}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-md transition-all cursor-pointer ${theme.primary} hover:opacity-95`}
            >
              Proefles Aanvragen
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
              <Award className="w-4 h-4" />
              <span>CBR Slagingspercentage 79% (Landelijk gem. 52%)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Snel & Zelfverzekerd Je Rijbewijs Halen in <span className={theme.textPrimary}>{city}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-xl">
              Geen wachttijden, een vaste geduldige instructeur en een unieke examengarantie. Kies voor schakel of automaat en start vandaag nog met een vrijblijvende proefles.
            </p>

            {/* Transmission Selector Pill */}
            <div className="inline-flex p-1 rounded-2xl bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold">
              <button
                onClick={() => setTransmission('schakel')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  transmission === 'schakel'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                🕹️ Handgeschakeld (B-Rijbewijs)
              </button>
              <button
                onClick={() => setTransmission('automaat')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  transmission === 'automaat'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                ⚡ Elektrisch / Automaat (Code 78)
              </button>
            </div>

            {/* USPs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Geen wachttijd voor examen</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Ophalen aan huis</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Termijnbetaling mogelijk</span>
              </div>
            </div>
          </div>

          {/* Right Card: Interactive Proefles Booker */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-7 rounded-3xl border-2 shadow-xl ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <h3 className="font-black text-lg">Direct Proefles Inplannen</h3>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  €45 (Gratis bij pakket)
                </span>
              </div>

              {trialBooked ? (
                <div className="py-4 space-y-4">
                  <div className="text-center space-y-1.5">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-black text-base">Proefles Succesvol Gepland!</h4>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">
                      Beste {trialData.name}, we nemen binnen 2 uur telefonisch contact op om het exacte ophaaltijdstip af te stemmen.
                    </p>
                  </div>

                  {/* Printable Proefles Voucher */}
                  <div className={`p-4 rounded-2xl border-2 border-dashed ${isDarkMode ? 'bg-stone-950 border-stone-700' : 'bg-stone-50 border-stone-300'}`}>
                    <div className="flex justify-between items-start mb-3 border-b pb-2 border-stone-200 dark:border-stone-800">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block">
                          Officiële Intake Voucher
                        </span>
                        <span className="font-black text-sm">{brandName}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded font-bold">
                        VLT-2026-PROEF
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <span className="text-[10px] text-stone-500 block">Leerling</span>
                        <span className="font-bold">{trialData.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Telefoon</span>
                        <span className="font-bold">{trialData.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Type Transmissie</span>
                        <span className="font-bold">{transmission === 'schakel' ? 'Handgeschakeld (B)' : 'Automaat (Code 78)'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Voorkeursdatum</span>
                        <span className="font-bold">{trialData.date || 'In telefonisch overleg'}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-[11px] space-y-1">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Meenemen naar de proefles:</span>
                      <ul className="list-disc list-inside text-stone-600 dark:text-stone-300 text-[10px] space-y-0.5">
                        <li>Geldig ID-bewijs of paspoort</li>
                        <li>Schoenen met stevige, platte zool</li>
                        <li>Eventueel theoriecertificaat indien behaald</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow hover:opacity-90 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Proefles Voucher</span>
                    </button>
                    <button
                      onClick={() => setTrialBooked(false)}
                      className="px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                    >
                      Nieuwe Aanvraag
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookTrial} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                      Jouw Naam
                    </label>
                    <input
                      type="text"
                      required
                      value={trialData.name}
                      onChange={(e) => setTrialData({ ...trialData, name: e.target.value })}
                      placeholder="bijv. Sophie van Dijk"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                        Telefoonnummer
                      </label>
                      <input
                        type="tel"
                        required
                        value={trialData.phone}
                        onChange={(e) => setTrialData({ ...trialData, phone: e.target.value })}
                        placeholder="06 12345678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                        Voorkeursdatum
                      </label>
                      <input
                        type="date"
                        value={trialData.date}
                        onChange={(e) => setTrialData({ ...trialData, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-1">
                      Eerdere Rij-ervaring
                    </label>
                    <select
                      value={trialData.experience}
                      onChange={(e) => setTrialData({ ...trialData, experience: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Geen ervaring">Nog nooit gereden (Beginner)</option>
                      <option value="Enkele lessen">Al enkele lessen gehad (5-15 lessen)</option>
                      <option value="Overstapper">Overstapper van andere rijschool</option>
                      <option value="Faalangst">Behoefte aan faalangst-instructie</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                  >
                    <span>Vrijblijvende Proefles Bevestigen</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Interactive CBR Slagingsmeter */}
      <section className={`py-12 px-4 sm:px-6 border-y ${
        isDarkMode ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <TrendingUp className="w-4 h-4" />
            <span>Officiële CBR Benchmark Slagingsstatistieken</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black">
            Hoe scoort {brandName} bij het CBR?
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
            Dankzij onze stapsgewijze lesopbouw slagen onze leerlingen aanzienlijk sneller en vaker in één keer.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-sm">{brandName} Slagingspercentage</span>
                <span className="text-xl font-black text-emerald-600">79%</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: '79%' }} />
              </div>
              <span className="text-[11px] text-stone-500 mt-2 block">
                Gebaseerd op 148 eerste CBR praktijkexamens afgelopen 12 maanden
              </span>
            </div>

            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-sm">CBR Landelijk Gemiddelde</span>
                <span className="text-xl font-black text-stone-500">52%</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 h-3 rounded-full overflow-hidden">
                <div className="bg-stone-400 h-full rounded-full" style={{ width: '52%' }} />
              </div>
              <span className="text-[11px] text-stone-500 mt-2 block">
                Bron: Officiële openbare CBR rijschoolstatistieken regio {city}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Package Pricing Tiers with Installment Calculator */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-orange-600">
            Transparante Tarieven Zonder Verrassingen
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">
            Kies Jouw Rijles Pakket
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Alle pakketten zijn inclusief theorie training en flexibele betaling in 2 of 3 termijnen zonder rente.
          </p>
        </div>

        {/* Installment Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <span className="text-xs font-bold text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-orange-500" />
            Termijnbetaling Calculator:
          </span>
          <div className="inline-flex p-1 rounded-2xl bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold">
            <button
              onClick={() => setInstallmentCount(1)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                installmentCount === 1
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              1x Ineens Volledig
            </button>
            <button
              onClick={() => setInstallmentCount(2)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                installmentCount === 2
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              2 Termijnen (0% rente)
            </button>
            <button
              onClick={() => setInstallmentCount(3)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                installmentCount === 3
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              3 Termijnen (0% rente)
            </button>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
            ✓ 0% Rente & Geen BKR Registratie
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            const installmentAmount = Math.round(pkg.price / installmentCount);
            return (
              <div
                key={pkg.id}
                className={`p-6 sm:p-7 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                  pkg.recommended
                    ? 'border-orange-500 bg-orange-50/20 dark:bg-orange-950/20 shadow-xl'
                    : isDarkMode
                    ? 'border-stone-800 bg-stone-900'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div>
                  {pkg.badge && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-600 text-white inline-block mb-3">
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="font-black text-xl mb-1">{pkg.name}</h3>
                  <div className="my-4">
                    <div className="text-3xl font-black">
                      €{installmentAmount}
                      <span className="text-xs text-stone-400 font-medium">
                        {installmentCount === 1 ? ' ineens' : ` / mnd (${installmentCount}x termijnen)`}
                      </span>
                    </div>
                    {installmentCount > 1 ? (
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold block mt-0.5">
                        Totaal pakketprijs: €{pkg.price} • {pkg.lessons} rijlessen
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold block mt-0.5">
                        Inclusief CBR praktijkexamen ({pkg.lessons} rijlessen)
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-xs font-medium text-stone-600 dark:text-stone-300">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-800">
                  <button
                    onClick={onRequestQuote}
                    className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      pkg.recommended
                        ? `${theme.primary} text-white shadow-md hover:opacity-90`
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700'
                    }`}
                  >
                    <span>Pakket Aanvragen</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Demo Note */}
      <footer className="py-8 px-4 text-center text-xs text-stone-500 border-t border-stone-200 dark:border-stone-800">
        <p>© 2026 {brandName} • Gemaakt met Samen Online Webconcepten</p>
      </footer>

    </div>
  );
};
