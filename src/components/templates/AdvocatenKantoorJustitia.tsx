'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Scale,
  Briefcase,
  Users,
  Home,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronRight,
  Sun,
  Moon,
  Award,
  FileText,
  Lock,
} from 'lucide-react';

interface LegalPracticeArea {
  id: string;
  name: string;
  desc: string;
  fixedRate: string;
  icon: any;
  bulletPoints: string[];
}

const PRACTICE_AREAS: LegalPracticeArea[] = [
  {
    id: 'arbeid',
    name: 'Arbeidsrecht & Ontslag',
    desc: 'Beoordeling van vaststellingsovereenkomsten (VSO), ontslagvergoeding en transitievergoeding.',
    fixedRate: 'VSO Check: Vaak 100% vergoed door werkgever',
    icon: Briefcase,
    bulletPoints: [
      'Controle transitievergoeding & opzegtermijn',
      'Onderhandeling over hogere ontslagvergoeding',
      'Behoud van WW-uitkering gegarandeerd',
    ],
  },
  {
    id: 'onderneming',
    name: 'Ondernemingsrecht & Contracten',
    desc: 'Samenwerkingsovereenkomsten, aandeelhoudersgeschillen, algemene voorwaarden en overnames.',
    fixedRate: 'Vanaf € 185,- per uur of fixed-fee project',
    icon: Scale,
    bulletPoints: [
      'Opstellen en toetsen van contracten',
      'Bestuurdersaansprakelijkheid & geschillen',
      'Aan- en verkoop van MKB ondernemingen',
    ],
  },
  {
    id: 'vastgoed',
    name: 'Huurrecht & Vastgoed',
    desc: 'Geschillen over bedrijfsruimte, woonruimte, gebreken, huurbeëindiging en ontruiming.',
    fixedRate: 'Vaste pakkettarieven voor huurcontract check',
    icon: Home,
    bulletPoints: [
      'Huurovereenkomsten winkel- en kantoorruimte',
      'Geschillen over renovatie en servicekosten',
      'Procedures bij de kantonrechter',
    ],
  },
  {
    id: 'familie',
    name: 'Familierecht & Echtscheiding',
    desc: 'Mediation, convenant, ouderschapsplan, kinder- en partneralimentatie en verdeling van vermogen.',
    fixedRate: 'Eerste kennismaking kosteloos (30 min)',
    icon: Users,
    bulletPoints: [
      'Gezamenlijke scheiding via mediation',
      'Berekening wettelijke alimentatie',
      'Boedelverdeling en huwelijkse voorwaarden',
    ],
  },
];

export const AdvocatenKantoorJustitia: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'Justitia & Partners Advocaten';
  const city = customCity || 'Den Haag & Randstad';

  const [selectedArea, setSelectedArea] = useState<string>('arbeid');
  const [feeType, setFeeType] = useState<'fixed' | 'hourly'>('fixed');
  const [intakeSubmitted, setIntakeSubmitted] = useState(false);
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    caseDescription: '',
    urgency: 'Binnen enkele dagen',
  });

  const activeAreaObj = PRACTICE_AREAS.find((a) => a.id === selectedArea) || PRACTICE_AREAS[0];

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientData.name || !clientData.email) return;
    setIntakeSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-800'}`}>
      
      {/* Demo Concept Disclaimer Bar */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Voorbeeldconcept:</strong> Advocatenkantoor & Juridisch Advies website lay-out (NOvA compliant & AVG-proof).
        </span>
      </div>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
        isDarkMode ? 'bg-stone-950/90 border-stone-800' : 'bg-white/95 border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block leading-none">
                {brandName}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                Beëdigde Advocaten & Mediators • {city}
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
              Gratis Eerste Beoordeling
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
              <Award className="w-4 h-4" />
              <span>Nederlandse Orde van Advocaten (NOvA) Geregistreerd</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Daadkrachtige Juridische Bijstand in <span className={theme.textPrimary}>{city}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-xl">
              Helder advies zonder juridisch jargon. Van ontslagzaken en VSO-onderhandelingen tot zakelijke contracten en familierecht. Wij strijden voor jouw recht met een transparante kostenstructuur.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Geen verborgen kantoorkosten</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Binnen 24u eerste analyse</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Geheimhoudingsplicht</span>
              </div>
            </div>
          </div>

          {/* Right Card: Vertrouwelijk Intakeformulier */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-7 rounded-3xl border-2 shadow-xl ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-black text-lg">Vertrouwelijke Case Intake</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Vrijblijvend
                </span>
              </div>

              {intakeSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-base">Aanvraag Veilig Ontvangen</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Geachte {clientData.name}, uw dossier is onder strikte geheimhouding ontvangen. Een van onze gespecialiseerde advocaten neemt binnen 1 werkdag telefonisch contact met u op.
                  </p>
                  <button
                    onClick={() => setIntakeSubmitted(false)}
                    className="text-xs font-bold text-stone-500 underline cursor-pointer mt-2"
                  >
                    Nog een zaak doorgeven
                  </button>
                </div>
              ) : (
                <form onSubmit={handleIntakeSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold block mb-1">Uw Volledige Naam</label>
                    <input
                      type="text"
                      required
                      value={clientData.name}
                      onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                      placeholder="bijv. Mr. R. van den Berg"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold block mb-1">E-mailadres</label>
                      <input
                        type="email"
                        required
                        value={clientData.email}
                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                        placeholder="naam@voorbeeld.nl"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Telefoonnummer</label>
                      <input
                        type="tel"
                        value={clientData.phone}
                        onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                        placeholder="06 12345678"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">Korte Omschrijving van uw Situatie</label>
                    <textarea
                      rows={2}
                      value={clientData.caseDescription}
                      onChange={(e) => setClientData({ ...clientData, caseDescription: e.target.value })}
                      placeholder="bijv. Vaststellingsovereenkomst ontvangen / geschil met aandeelhouder..."
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                  >
                    <span>Vertrouwelijke Toetsing Aanvragen</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Rechtsgebieden Tabs & Fixed-Fee Selector */}
      <section className={`py-14 px-4 sm:px-6 border-t ${
        isDarkMode ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-orange-600">
              Rechtsgebieden & Tarieven
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Gespecialiseerde Juridische Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
            {PRACTICE_AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedArea === area.id
                    ? 'border-orange-500 bg-orange-50/70 dark:bg-orange-950/40 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:border-orange-300 bg-transparent'
                }`}
              >
                <h4 className="font-black text-xs sm:text-sm text-stone-900 dark:text-stone-100 mb-1">
                  {area.name}
                </h4>
                <span className="text-[11px] text-stone-500 line-clamp-2">
                  {area.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Active Area Details Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border-2 ${
            isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">
                  {activeAreaObj.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xl">
                  {activeAreaObj.desc}
                </p>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-xs font-black text-emerald-800 dark:text-emerald-300 shrink-0">
                {activeAreaObj.fixedRate}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-200 dark:border-stone-800 pt-6">
              {activeAreaObj.bulletPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Demo Note */}
      <footer className="py-8 px-4 text-center text-xs text-stone-500 border-t border-stone-200 dark:border-stone-800">
        <p>© 2026 {brandName} • Gemaakt met Samen Online Webconcepten</p>
      </footer>

    </div>
  );
};
