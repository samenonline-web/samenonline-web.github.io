'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  HeartPulse,
  PhoneCall,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  Clock,
  AlertCircle,
  FileText,
  UserPlus,
  Stethoscope,
} from 'lucide-react';

interface TariffItem {
  code: string;
  name: string;
  desc: string;
  rate: string;
  covered: string;
}

const TARIFFS: TariffItem[] = [
  {
    code: 'C002',
    name: 'Periodieke Gebitscontrole',
    desc: 'Halfjaarlijkse preventieve controle inclusief advies mondhygiëne',
    rate: '€ 26,75',
    covered: '100% tot 18 jaar / Aanvullend 75-100%',
  },
  {
    code: 'M03',
    name: 'Gebitsreiniging (per 5 min)',
    desc: 'Verwijderen van tandsteen en professioneel polijsten van tanden',
    rate: '€ 16,40',
    covered: 'Aanvullende tandartsverzekering',
  },
  {
    code: 'X10',
    name: 'Kleine Röntgenfoto (Bitewing)',
    desc: 'Detectie van beginnende gaatjes tussen kiezen onder het tandvlees',
    rate: '€ 20,49',
    covered: '100% tot 18 jaar / Aanvullend',
  },
  {
    code: 'V91',
    name: 'Witte Composiet Vulling (1 vlak)',
    desc: 'Kleur-nauwkeurige restauratie van kies of voortand',
    rate: '€ 55,20',
    covered: 'Aanvullende tandartsverzekering',
  },
];

export const ZorgMondKliniek: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'Mondzorg & Tandartsenpraktijk Centrum';
  const city = customCity || 'Almere & Flevoland';

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    birthdate: '',
    insuranceCompany: '',
    previousDentist: '',
    urgency: 'Normale inschrijving',
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientData.name || !patientData.email) return;
    setRegisterSuccess(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-800'}`}>
      
      {/* Demo Concept Disclaimer Bar */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Voorbeeldconcept:</strong> Zorgpraktijk, Tandarts & Mondhygiënist website lay-out (NZa conform & AVG-proof).
        </span>
      </div>

      {/* Emergency Spoedlijn Notice Bar */}
      <div className="bg-red-700 text-white px-4 py-2 text-xs font-bold">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Tandheelkundige Spoedgevallen (Acute Pijn of Afgebroken Tand):</span>
          </div>
          <span className="bg-black/30 px-3 py-0.5 rounded-full font-black text-[11px]">
            Spoedlijn Bereikbaar: 08:00 - 17:00 (Buiten kantoor: Dental365)
          </span>
        </div>
      </div>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
        isDarkMode ? 'bg-stone-950/90 border-stone-800' : 'bg-white/95 border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block leading-none">
                {brandName}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                BIG-Geregistreerde Tandartsen & Mondhygiënisten • {city}
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
              Inschrijven als Patiënt
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Praktijk Open Voor Nieuwe Patiënten • Geen Wachtlijst</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Moderne & Angstvrije Mondzorg in <span className={theme.textPrimary}>{city}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-xl">
              Van periodieke controles en mondhygiëne tot esthetische facings, kronen en wortelkanaalbehandelingen onder verdoving. Onze specialisten nemen altijd ruim de tijd voor jouw glimlach.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>KNMT & KRT Erkend</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Angstbegeleiding op maat</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Rolstoeltoegankelijke praktijk</span>
              </div>
            </div>
          </div>

          {/* Right Card: Online Patiënten Inschrijfformulier */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-7 rounded-3xl border-2 shadow-xl ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-teal-600" />
                  <h3 className="font-black text-lg">Inschrijven Nieuwe Patiënt</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Direct Welkom
                </span>
              </div>

              {registerSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-base">Inschrijving Ontvangen!</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Bedankt {patientData.name}! Onze praktijkassistente neemt binnen 1 werkdag contact met je op om de intakecontrole in te plannen en je patiëntendossier over te nemen.
                  </p>
                  <button
                    onClick={() => setRegisterSuccess(false)}
                    className="text-xs font-bold text-stone-500 underline cursor-pointer mt-2"
                  >
                    Nog een gezinslid inschrijven
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold block mb-1">Volledige Naam</label>
                    <input
                      type="text"
                      required
                      value={patientData.name}
                      onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                      placeholder="bijv. Mark de Jong"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold block mb-1">E-mailadres</label>
                      <input
                        type="email"
                        required
                        value={patientData.email}
                        onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                        placeholder="mark@voorbeeld.nl"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Geboortedatum</label>
                      <input
                        type="date"
                        value={patientData.birthdate}
                        onChange={(e) => setPatientData({ ...patientData, birthdate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">Zorgverzekeraar & Polis</label>
                    <input
                      type="text"
                      value={patientData.insuranceCompany}
                      onChange={(e) => setPatientData({ ...patientData, insuranceCompany: e.target.value })}
                      placeholder="bijv. Zilveren Kruis / VGZ / CZ"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">Voorkeur Behandeling</label>
                    <select
                      value={patientData.urgency}
                      onChange={(e) => setPatientData({ ...patientData, urgency: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Normale inschrijving">Reguliere periodieke controle & inschrijving</option>
                      <option value="Angstpatient">Angstpatiënt (Graag extra tijd & uitleg)</option>
                      <option value="Mondhygiëne">Mondhygiëniste (Tandsteen / Gevoelig tandvlees)</option>
                      <option value="Pijnklacht">Huidige pijnklacht of acute tandproblemen</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                  >
                    <span>Inschrijving Bevestigen</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Officiële NZa Tarieven & Vergoedingen Table */}
      <section className={`py-14 px-4 sm:px-6 border-y ${
        isDarkMode ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-teal-600">
              Landelijke Transparantie
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Vastgestelde NZa Tandartstarieven
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
              Onze tarieven worden landelijk wettelijk vastgesteld door de Nederlandse Zorgautoriteit (NZa). Geen onverwachte kosten.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 dark:bg-stone-800/80 font-black text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Omschrijving Behandeling</th>
                  <th className="p-3.5">Vast NZa Tarief</th>
                  <th className="p-3.5">Vergoeding Zorgverzekering</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {TARIFFS.map((t) => (
                  <tr key={t.code} className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                    <td className="p-3.5 font-black text-teal-600 font-mono">{t.code}</td>
                    <td className="p-3.5">
                      <strong className="block text-stone-900 dark:text-stone-100">{t.name}</strong>
                      <span className="text-[11px] text-stone-500">{t.desc}</span>
                    </td>
                    <td className="p-3.5 font-black text-stone-900 dark:text-stone-100">{t.rate}</td>
                    <td className="p-3.5 text-stone-600 dark:text-stone-400 font-medium">{t.covered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
