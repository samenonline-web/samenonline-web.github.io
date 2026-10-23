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
  Printer,
  Calculator,
  Shield,
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
  const [petWeightClass, setPetWeightClass] = useState<'small' | 'medium' | 'large'>('small');
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [bookingData, setBookingData] = useState({
    ownerName: '',
    petName: '',
    email: '',
    phone: '',
    reason: 'Vaccinatie & Gezondheidscheck',
  });

  // Huisdieren ZorgPas Calculation
  const zorgPlanPrice =
    petType === 'kat'
      ? 22.5
      : petType === 'konijn'
      ? 16.5
      : petWeightClass === 'small'
      ? 26.5
      : petWeightClass === 'medium'
      ? 29.5
      : 34.5;

  const zorgPlanSavings =
    petType === 'kat'
      ? 110
      : petType === 'konijn'
      ? 85
      : petWeightClass === 'small'
      ? 125
      : petWeightClass === 'medium'
      ? 145
      : 170;

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
                <div className="py-4 space-y-4">
                  <div className="text-center space-y-1.5">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-black text-base">Afspraak Bevestigd voor {bookingData.petName}!</h4>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">
                      Bedankt {bookingData.ownerName}! We zien je graag samen met {bookingData.petName} op de praktijk.
                    </p>
                  </div>

                  {/* Printable Pet Voucher */}
                  <div className={`p-4 rounded-2xl border-2 border-dashed ${isDarkMode ? 'bg-stone-950 border-stone-700' : 'bg-stone-50 border-stone-300'}`}>
                    <div className="flex justify-between items-start mb-3 border-b pb-2 border-stone-200 dark:border-stone-800">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
                          Dierenkliniek Consultatiekaart
                        </span>
                        <span className="font-black text-sm">{brandName}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded font-bold">
                        VET-VEN-2026-X
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <span className="text-[10px] text-stone-500 block">Patiënt (Huisdier)</span>
                        <span className="font-bold">{bookingData.petName} ({petType.toUpperCase()})</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Eigenaar</span>
                        <span className="font-bold">{bookingData.ownerName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Reden Bezoek</span>
                        <span className="font-bold">{bookingData.reason}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block">Locatie</span>
                        <span className="font-bold">{city}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-[11px] space-y-1">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Belangrijk bij het praktijkbezoek:</span>
                      <ul className="list-disc list-inside text-stone-600 dark:text-stone-300 text-[10px] space-y-0.5">
                        <li>Europees Dierenpaspoort of vaccinatieboekje meenemen</li>
                        <li>Hond aangelijnd houden; kat in stevige reismand</li>
                        <li>Eventueel actuele medicatie of dieetvoeding noteren</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow hover:opacity-90 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Afspraakkaart (PDF)</span>
                    </button>
                    <button
                      onClick={() => setAppointmentBooked(false)}
                      className="px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                    >
                      Nieuwe Afspraak
                    </button>
                  </div>
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

          {/* Huisdieren ZorgPas & Preventie Calculator */}
          <div className={`mt-8 p-6 sm:p-8 rounded-3xl border-2 ${
            isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-black text-lg">Huisdieren ZorgPas (Preventief Zorgplan)</h3>
                </div>
                <p className="text-xs text-stone-500 max-w-xl">
                  Spreid de medische kosten van jouw huisdier in overzichtelijke maandbedragen inclusief alle vaccinaties, ontworming en vlooienpreventie.
                </p>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Maandtarief Zorgplan:</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                  €{zorgPlanPrice.toFixed(2).replace('.', ',')}
                  <span className="text-xs text-stone-400 font-medium"> / mnd</span>
                </span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full block mt-1">
                  Bespaar ~€{zorgPlanSavings},- per jaar
                </span>
              </div>
            </div>

            {petType === 'hond' && (
              <div className="mb-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                <span className="text-xs font-bold text-stone-600 dark:text-stone-300 block mb-2">
                  Gewichtsklasse van jouw hond:
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {[
                    { id: 'small', label: 'Klein (< 10 kg)' },
                    { id: 'medium', label: 'Middel (10 - 25 kg)' },
                    { id: 'large', label: 'Groot (> 25 kg)' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setPetWeightClass(w.id as any)}
                      className={`py-2 px-2 text-center rounded-xl border text-[11px] transition-all cursor-pointer ${
                        petWeightClass === w.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-stone-300 dark:border-stone-700 bg-transparent text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Jaarlijkse cocktailvaccinatie & gezondheidscheck</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Volledige jaarrond vlooien-, teken- & wormenkuur</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Onbeperkt gratis nagels knippen door assistente</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>10% korting op voeding, gebitsreiniging & operaties</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
              <button
                onClick={onRequestQuote}
                className={`px-5 py-2.5 rounded-xl text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
              >
                <span>Meld {bookingData.petName || 'Huisdier'} Aan Voor ZorgPas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
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
