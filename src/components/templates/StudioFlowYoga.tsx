'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Heart,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Sun,
  Moon,
  Flame,
  Award,
  Compass,
  Printer,
  Calculator,
} from 'lucide-react';

interface YogaClass {
  id: string;
  day: string;
  time: string;
  title: string;
  teacher: string;
  level: string;
  intensity: 'Mild' | 'Gemiddeld' | 'Intensief';
  maxSpots: number;
  availableSpots: number;
}

const SCHEDULE: YogaClass[] = [
  {
    id: 'c1',
    day: 'Maandag',
    time: '09:00 - 10:15',
    title: 'Morning Vinyasa Flow',
    teacher: 'Anouk',
    level: 'Alle niveaus',
    intensity: 'Gemiddeld',
    maxSpots: 14,
    availableSpots: 4,
  },
  {
    id: 'c2',
    day: 'Maandag',
    time: '19:30 - 20:45',
    title: 'Diepe Ontspanning & Yin Yoga',
    teacher: 'Sanne',
    level: 'Rustgevend',
    intensity: 'Mild',
    maxSpots: 14,
    availableSpots: 2,
  },
  {
    id: 'c3',
    day: 'Dinsdag',
    time: '07:30 - 08:30',
    title: 'Sunrise Pilates & Core',
    teacher: 'Lisa',
    level: 'Gevorderd',
    intensity: 'Intensief',
    maxSpots: 12,
    availableSpots: 0,
  },
  {
    id: 'c4',
    day: 'Woensdag',
    time: '18:30 - 19:45',
    title: 'Hatha Yoga & Pranayama Ademhaling',
    teacher: 'Anouk',
    level: 'Alle niveaus',
    intensity: 'Mild',
    maxSpots: 14,
    availableSpots: 6,
  },
  {
    id: 'c5',
    day: 'Donderdag',
    time: '20:00 - 21:15',
    title: 'Sound Healing & Klankschalen Meditatie',
    teacher: 'Daan',
    level: 'Voor iedereen',
    intensity: 'Mild',
    maxSpots: 16,
    availableSpots: 3,
  },
  {
    id: 'c6',
    day: 'Zaterdag',
    time: '10:00 - 11:30',
    title: 'Weekend Flow & Chakra Balance',
    teacher: 'Sanne & Anouk',
    level: 'Alle niveaus',
    intensity: 'Gemiddeld',
    maxSpots: 16,
    availableSpots: 5,
  },
];

export const StudioFlowYoga: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'Studio Flow Yoga & Coaching';
  const city = customCity || 'Haarlem & Kennemerland';

  const [activeDay, setActiveDay] = useState<string>('Alle dagen');
  const [bookedClassId, setBookedClassId] = useState<string | null>(null);
  const [membershipPlan, setMembershipPlan] = useState<'1x' | '2x' | 'unlimited' | '10strippen'>('2x');
  const [intakeSuccess, setIntakeSuccess] = useState(false);
  const [intakeData, setIntakeData] = useState({
    name: '',
    email: '',
    goal: 'Stressreductie & Rust',
  });

  const planPrices = {
    '1x': { price: 44, label: '1 Les per week', estClasses: 4, isMonthly: true },
    '2x': { price: 69, label: '2 Lessen per week', estClasses: 8.5, isMonthly: true },
    'unlimited': { price: 89, label: 'Onbeperkt Vrij Flowen', estClasses: 14, isMonthly: true },
    '10strippen': { price: 145, label: '10-Rittenkaart (3 mnd)', estClasses: 10, isMonthly: false },
  };

  const selectedPlanObj = planPrices[membershipPlan];
  const pricePerClass = (selectedPlanObj.price / selectedPlanObj.estClasses).toFixed(2);

  const filteredSchedule = SCHEDULE.filter((cls) => {
    if (activeDay === 'Alle dagen') return true;
    return cls.day === activeDay;
  });

  const handleBookSpot = (clsId: string) => {
    setBookedClassId(clsId);
    setTimeout(() => setBookedClassId(null), 3000);
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeData.name || !intakeData.email) return;
    setIntakeSuccess(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-800'}`}>
      
      {/* Demo Concept Disclaimer Bar */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Voorbeeldconcept:</strong> Yoga Studio, Pilates & Lifestyle Coaching website lay-out (Geschikt voor wellness & trainers).
        </span>
      </div>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
        isDarkMode ? 'bg-stone-950/90 border-stone-800' : 'bg-white/95 border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block leading-none">
                {brandName}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                Boutique Yoga Studio & Mindful Coaching • {city}
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
              Gratis Proefles Boeken
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
              <Sparkles className="w-4 h-4" />
              <span>Kleine Groepen (Max 14 Deelnemers) • Warme Zaal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Vind Jouw Balans & Innerlijke Rust in <span className={theme.textPrimary}>{city}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-xl">
              Ontsnap aan de dagelijkse drukte in onze sfeervolle, lichte studio. Van dynamische Vinyasa tot meditatieve Yin Yoga en persoonlijke mindfulness coaching.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Geen inschrijfkosten</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Matten & props aanwezig</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verse kruidenthee na afloop</span>
              </div>
            </div>
          </div>

          {/* Right Card: Quick Proefles Intake */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-7 rounded-3xl border-2 shadow-xl ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <h3 className="font-black text-lg">Eerste Keer? Proefles €10</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  Kennismaking
                </span>
              </div>

              {intakeSuccess ? (
                <div className="py-4 space-y-4">
                  <div className="text-center space-y-1.5">
                    <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-black text-base text-stone-900 dark:text-white">Welkom bij {brandName}!</h4>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">
                      Bedankt {intakeData.name}! Je proeflesreservering is bevestigd.
                    </p>
                  </div>

                  {/* Printable Proefles & Studio Pas Voucher */}
                  <div className="p-4 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-stone-850 space-y-3">
                    <div className="flex justify-between items-start border-b pb-2 border-rose-200 dark:border-rose-900">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
                          Officiële Proefles & Studio Pas
                        </span>
                        <span className="font-black text-sm text-stone-900 dark:text-white">{brandName}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-stone-900 text-rose-300 px-2 py-0.5 rounded font-bold">
                        FLOW-YOGA-2026-X
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
                      <div>
                        <span className="text-[10px] text-stone-400 block">Deelnemer</span>
                        <span className="font-bold text-stone-900 dark:text-white">{intakeData.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block">Focus & Doel</span>
                        <span className="font-bold text-rose-600">{intakeData.goal}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block">Studio Locatie</span>
                        <span className="font-bold">{city}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 block">Inclusief</span>
                        <span className="font-bold text-emerald-600">Mat & Kruidenthee</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Proefles Voucher (PDF)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIntakeSuccess(false)}
                        className="px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                      >
                        Nog een les
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleIntakeSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold block mb-1">Jouw Naam</label>
                    <input
                      type="text"
                      required
                      value={intakeData.name}
                      onChange={(e) => setIntakeData({ ...intakeData, name: e.target.value })}
                      placeholder="bijv. Emma Vermeer"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">E-mailadres</label>
                    <input
                      type="email"
                      required
                      value={intakeData.email}
                      onChange={(e) => setIntakeData({ ...intakeData, email: e.target.value })}
                      placeholder="emma@voorbeeld.nl"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">Waar wil je aan werken?</label>
                    <select
                      value={intakeData.goal}
                      onChange={(e) => setIntakeData({ ...intakeData, goal: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="Stressreductie & Rust">Stress verminderen & Beter slapen</option>
                      <option value="Flexibiliteit & Kracht">Lenigheid & Core stability opbouwen</option>
                      <option value="Rugklachten">Verlichting van nek- en rugklachten</option>
                      <option value="Mindfulness">Mindfulness & Meditatietraining</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                  >
                    <span>Reserveer Jouw Proefles</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Weekagenda / Lesrooster met Vrije Plekken */}
      <section className={`py-14 px-4 sm:px-6 border-y ${
        isDarkMode ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                Live Rooster & Beschikbaarheid
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Weekrooster Studio Flow
              </h2>
            </div>

            {/* Day Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              {['Alle dagen', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Zaterdag'].map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    activeDay === d
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 border-transparent shadow-xs'
                      : 'border-stone-300 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchedule.map((cls) => {
              const isFull = cls.availableSpots === 0;
              const isBooked = bookedClassId === cls.id;

              return (
                <div
                  key={cls.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-bold text-stone-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{cls.day} {cls.time}</span>
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isFull
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isFull ? 'Volgeboekt' : `Nog ${cls.availableSpots} plekken`}
                      </span>
                    </div>

                    <h3 className="font-black text-base text-stone-900 dark:text-stone-100 mb-1">
                      {cls.title}
                    </h3>
                    <p className="text-xs text-stone-500 mb-3">
                      Docent: <strong>{cls.teacher}</strong> • Intensiteit: <strong>{cls.intensity}</strong>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-500">
                      {cls.level}
                    </span>

                    {isBooked ? (
                      <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Gereserveerd!
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBookSpot(cls.id)}
                        disabled={isFull}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isFull
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed dark:bg-stone-800'
                            : 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90'
                        }`}
                      >
                        {isFull ? 'Wachtlijst' : 'Plek Boeken'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Yoga & Mindfulness Tarieven Module */}
      <section className={`py-14 px-4 sm:px-6 ${
        isDarkMode ? 'bg-stone-950 text-white' : 'bg-stone-100/70 text-stone-900'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Transparante Studio Tarieven</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Yoga & Mindfulness Tarieven Module
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
              Kies het ritme dat bij jouw levensstijl past in {city}. Maandelijks opzegbaar of een flexibele rittenkaart.
            </p>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl ${
            isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { id: '1x', label: '1 Les / week' },
                { id: '2x', label: '2 Lessen / week' },
                { id: 'unlimited', label: 'Onbeperkt' },
                { id: '10strippen', label: '10-Rittenkaart' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setMembershipPlan(p.id as any)}
                  className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                    membershipPlan === p.id
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 ring-2 ring-rose-500/20 font-black'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 font-bold hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span className="text-xs block">{p.label}</span>
                </button>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Geselecteerd:</span>
                <span className="text-xl font-black text-stone-900 dark:text-white">{selectedPlanObj.label}</span>
                <div className="text-xs text-stone-500 mt-1 flex flex-wrap gap-x-3">
                  <span>✓ Ca. €{pricePerClass} per yogales</span>
                  <span>✓ Geen langdurige contracten</span>
                  <span>✓ Matten & thee inbegrepen</span>
                </div>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <span className="text-3xl font-black text-rose-600 dark:text-rose-400">
                  €{selectedPlanObj.price}
                </span>
                <span className="text-xs text-stone-400 block font-bold">
                  {selectedPlanObj.isMonthly ? 'per maand' : 'eenmalig'}
                </span>
                <button
                  onClick={onRequestQuote}
                  className={`mt-2 px-5 py-2.5 rounded-xl text-white font-black text-xs shadow-md transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                >
                  Meld Je Aan Voor Dit Tarief
                </button>
              </div>
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
