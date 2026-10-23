'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Heart,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sun,
  Moon,
  AlertCircle,
  PhoneCall,
  Activity,
  Award,
} from 'lucide-react';

interface PetTariff {
  service: string;
  targetPet: string;
  price: string;
  details: string;
}

const PET_TARIFFS: PetTariff[] = [
  {
    service: 'Algemeen Gezondheidsconsult',
    targetPet: 'Hond / Kat / Konijn',
    price: '€ 44,50',
    details: 'Grondig lichamelijk onderzoek, gewichtscontrole, ogen, oren, gebit en hart.',
  },
  {
    service: 'Jaarlijkse Cocktail Vaccinatie',
    targetPet: 'Hond of Kat',
    price: '€ 62,00',
    details: 'Inclusief gezondheidscheck en aftekening in het Europees Dierenpaspoort.',
  },
  {
    service: 'Elektronisch Chippen & NDG Registratie',
    targetPet: 'Alle gezelschapsdieren',
    price: '€ 36,50',
    details: 'Pijnloze plaatsing van ISO-microchip en officiële registratie in de Nederlandse databank.',
  },
  {
    service: 'Preventieve Gebitsreiniging (Ultrasoon)',
    targetPet: 'Hond of Kat',
    price: 'vanaf € 145,-',
    details: 'Onder veilige gasnarcose met continue bewaking van vitale functies.',
  },
];

export const DierenkliniekDeVennen: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'Dierenkliniek De Vennen';
  const city = customCity || 'Tilburg & Midden-Brabant';

  const [petType, setPetType] = useState<'hond' | 'kat' | 'konijn' | 'anders'>('hond');
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [bookingData, setBookingData] = useState({
    ownerName: '',
    petName: '',
    email: '',
    phone: '',
    reason: 'Vaccinatie & Gezondheidscheck',
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.ownerName || !bookingData.petName) return;
    setAppointmentBooked(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-800'}`}>
      
      {/* Demo Concept Disclaimer Bar */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Voorbeeldconcept:</strong> Dierenartsenpraktijk & Dierenkliniek website lay-out (KNMvD richtlijnen).
        </span>
      </div>

      {/* Emergency Spoedwijzer Notice Bar */}
      <div className="bg-amber-600 text-white px-4 py-2 text-xs font-bold">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>Acute Spoedgevallen bij Huisdieren:</span>
          </div>
          <span className="bg-black/20 px-3 py-0.5 rounded-full font-black text-[11px]">
            Spoedtelefoon: 24/7 bereikbaar via weekenddienstkring regio {city}
          </span>
        </div>
      </div>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
        isDarkMode ? 'bg-stone-950/90 border-stone-800' : 'bg-white/95 border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
              🐾
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block leading-none">
                {brandName}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                Gezelschapsdieren & Diergeneeskunde • {city}
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
              Online Afspraak Plannen
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Liefdevolle Zorg Zonder Stress Voor Jouw Dier</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Beste Zorg Voor Jouw Huisdier in <span className={theme.textPrimary}>{city}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-xl">
              Van jaarlijkse vaccinaties en chippen tot geavanceerde chirurgie, echo en röntgendiagnostiek. Gescheiden wachtkamers voor honden en katten voor een stressvrij bezoek.
            </p>

            {/* Pet Type Selector Pills */}
            <div className="inline-flex p-1 rounded-2xl bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold">
              {[
                { id: 'hond', label: '🐕 Hond' },
                { id: 'kat', label: '🐈 Kat' },
                { id: 'konijn', label: '🐇 Konijn & Knaagdier' },
                { id: 'anders', label: '🦜 Vogel & Exoot' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPetType(p.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    petType === p.id
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Katvriendelijke kliniek (Cat Friendly)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Eigen bloedanalyse lab</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Ruime parkeergelegenheid</span>
              </div>
            </div>
          </div>

          {/* Right Card: Online Afspraak Formulier */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-7 rounded-3xl border-2 shadow-xl ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-black text-lg">Afspraak Plannen</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Direct Bevestigd
                </span>
              </div>

              {appointmentBooked ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-base">Afspraak Bevestigd voor {bookingData.petName}!</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Bedankt {bookingData.ownerName}! We kijken uit naar het bezoek van {bookingData.petName}. Je ontvangt per direct een bevestiging per e-mail.
                  </p>
                  <button
                    onClick={() => setAppointmentBooked(false)}
                    className="text-xs font-bold text-stone-500 underline cursor-pointer mt-2"
                  >
                    Nog een afspraak inplannen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold block mb-1">Naam Eigenaar</label>
                      <input
                        type="text"
                        required
                        value={bookingData.ownerName}
                        onChange={(e) => setBookingData({ ...bookingData, ownerName: e.target.value })}
                        placeholder="bijv. Lisa Jansen"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Naam Huisdier</label>
                      <input
                        type="text"
                        required
                        value={bookingData.petName}
                        onChange={(e) => setBookingData({ ...bookingData, petName: e.target.value })}
                        placeholder="bijv. Max / Luna"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">E-mailadres voor bevestiging</label>
                    <input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      placeholder="lisa@voorbeeld.nl"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">Reden van Bezoek</label>
                    <select
                      value={bookingData.reason}
                      onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Vaccinatie & Gezondheidscheck">Jaarlijkse vaccinatie & gezondheidscheck</option>
                      <option value="Ziek consult">Ziek huisdier (lusteloos, braken, jeuk)</option>
                      <option value="Chippen">Chippen & registratie NDG</option>
                      <option value="Gebitsbehandeling">Gebitscontrole of tandsteenreiniging</option>
                      <option value="Nagels knippen">Nagels knippen & parasietenadvies</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                  >
                    <span>Afspraak Direct Bevestigen</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Tarieventabel Gezelschapsdieren */}
      <section className={`py-14 px-4 sm:px-6 border-t ${
        isDarkMode ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              Eerlijke & Duidelijke Prijzen
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Tarievenoverzicht Behandelingen
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 dark:bg-stone-800/80 font-black text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">Behandeling</th>
                  <th className="p-3.5">Geschikt Voor</th>
                  <th className="p-3.5">Tarief</th>
                  <th className="p-3.5">Wat is inbegrepen?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {PET_TARIFFS.map((t, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                    <td className="p-3.5 font-black text-stone-900 dark:text-stone-100">{t.service}</td>
                    <td className="p-3.5 font-bold text-stone-500">{t.targetPet}</td>
                    <td className="p-3.5 font-black text-emerald-600 font-mono text-sm">{t.price}</td>
                    <td className="p-3.5 text-stone-600 dark:text-stone-400 font-medium">{t.details}</td>
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
