'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Heart,
  Calendar,
  Check,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Clock,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  Phone,
  Award,
  ChevronRight,
  Activity,
  Printer,
  FileCheck,
} from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  role: string;
  big: string;
  specialism: string;
  image: string;
}

const THERAPISTS: Therapist[] = [
  {
    id: 't1',
    name: 'Drs. Sanne van den Berg',
    role: 'Master Manueel Therapeut & Eigenaar',
    big: 'BIG: 49912847104',
    specialism: 'Wervelkolom, nekpijn, acute hernia & hoofdpijnklachten',
    image: 'https://images.unsplash.com/photo-1594824813511-370cb8d15c7e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 't2',
    name: 'Daan Meijer, MSc',
    role: 'Sportfysiotherapeut & Dry Needling',
    big: 'BIG: 79934182904',
    specialism: 'Voorste kruisband revalidatie, hardloopblessures & schouder',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 't3',
    name: 'Lisa Hendriks',
    role: 'Algemeen Fysiotherapeut & Oedeem',
    big: 'BIG: 19948291044',
    specialism: 'Houdingscorrectie, chronische pijn & post-operatieve zorg',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80',
  },
];

const TREATMENTS = [
  {
    id: 'tr1',
    title: 'Fysiotherapie Intake & Behandeling',
    duration: '35 min',
    refund: '100% vergoed via aanvullende verzekering',
    desc: 'Grondige fysieke intake, echografische beoordeling indien nodig en direct eerste behandeling.',
  },
  {
    id: 'tr2',
    title: 'Manuele Therapie (Wervelkolom & Nek)',
    duration: '45 min',
    refund: 'Directe toegankelijkheid zonder verwijzing van huisarts',
    desc: 'Gerichte gewrichtsmobilisaties en manipulaties voor snelle pijnverlichting en betere beweeglijkheid.',
  },
  {
    id: 'tr3',
    title: 'Sportrevalidatie & Dry Needling',
    duration: '45 min',
    refund: 'Inclusief online oefenprogramma in Physitrack app',
    desc: 'Spierontspanning via triggerpoint dry needling gecombineerd met actieve krachtopbouw in onze medische oefenzaal.',
  },
];

export const StadskliniekFysio: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'Stadskliniek Fysiotherapie';
  const city = customCity || 'Maastricht • Centrum voor Beweging';
  const [selectedTherapy, setSelectedTherapy] = useState(TREATMENTS[0].id);
  const [selectedTherapist, setSelectedTherapist] = useState(THERAPISTS[0].id);
  const [selectedDay, setSelectedDay] = useState('Morgen');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [selectedInsurer, setSelectedInsurer] = useState('zilverenkruis');
  const [booked, setBooked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const activeTreatmentObj = TREATMENTS.find((t) => t.id === selectedTherapy) || TREATMENTS[0];
  const activeTherapistObj = THERAPISTS.find((t) => t.id === selectedTherapist) || THERAPISTS[0];

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-teal-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <UserCheck className="w-3.5 h-3.5" />
        <span>Geen verwijsbrief van huisarts nodig • Binnen 48 uur plek • Contracten met alle zorgverzekeraars</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            SF
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">{brandName}</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">{city}</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#afspraak" className="hover:text-stone-900">Direct Plannen</a>
          <a href="#behandelingen" className="hover:text-stone-900">Behandelingen</a>
          <a href="#team" className="hover:text-stone-900">Onze Specialisten</a>
          <a href="#vergoeding" className="hover:text-stone-900">Vergoeding 2026</a>
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

          <a
            href="#afspraak"
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Maak Een Afspraak
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-100/60 via-stone-50 to-white py-12 sm:py-20 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>KNGF & Keurmerk Fysiotherapie Gecertificeerd</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Weer pijnvrij bewegen met <span className={theme.textPrimary}>persoonlijke topzorg</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Van acute rugklachten tot topsportrevalidatie. Moderne faciliteiten met echografie, private behandelkamers en een professionele oefenzaal in hartje Maastricht.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="#afspraak"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
            >
              <Calendar className="w-4 h-4" />
              <span>Direct Online Inplannen</span>
            </a>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Vraag Zorgwebsite Aan
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span className="text-stone-800 font-extrabold">🩺 BIG-Geregistreerd & KNGF Aangesloten</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">🏥 Contracten met alle zorgverzekeraars</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">📍 Markt 28, Maastricht (Parkeren voor de deur)</span>
          </div>
        </div>
      </section>

      {/* Online Appointment Booking Tool */}
      <section id="afspraak" className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Direct Online Afspraak Plannen</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              Selecteer je gewenste behandeling, fysiotherapeut en het geschikte tijdslot
            </p>
          </div>

          {booked ? (
            <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200 space-y-4 max-w-lg mx-auto text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-stone-900">Afspraak Gereserveerd!</h3>
                  <p className="text-xs text-stone-500">{brandName} staat voor je klaar.</p>
                </div>
              </div>

              {/* Printable Appointment Voucher */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-stone-300 bg-white space-y-3">
                <div className="flex justify-between items-start border-b pb-2 border-stone-200">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 block">
                      Fysiotherapie Behandelpas & Reservering
                    </span>
                    <span className="font-black text-sm text-stone-900">{brandName}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold">
                    SF-FYSIO-2026-X
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Behandeling</span>
                    <span className="font-bold">{activeTreatmentObj.title}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Duur & Tarief</span>
                    <span className="font-bold">{activeTreatmentObj.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Specialist</span>
                    <span className="font-bold">{activeTherapistObj.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Tijdstip</span>
                    <span className="font-bold">{selectedDay} om {selectedTime} u</span>
                  </div>
                </div>

                <div className="bg-teal-50 p-2.5 rounded-xl border border-teal-200 text-[11px] space-y-1">
                  <span className="font-bold text-teal-900 block">Meenemen naar je eerste afspraak:</span>
                  <ul className="list-disc list-inside text-stone-600 text-[10px] space-y-0.5">
                    <li>Geldig legitimatiebewijs (Paspoort of ID)</li>
                    <li>Grote schone handdoek voor op de behandelbank</li>
                    <li>Gemakkelijke kleding waarin je vrij kunt bewegen</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow hover:opacity-90 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Behandelpas (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBooked(false)}
                  className="px-3 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  Nieuwe Afspraak
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Treatments & Therapist Pickers */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Therapy Choice */}
                <div>
                  <label className="text-xs font-black text-stone-700 block mb-2">1. Kies type behandeling:</label>
                  <div className="space-y-2">
                    {TREATMENTS.map((t) => {
                      const isSelected = selectedTherapy === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTherapy(t.id)}
                          className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25`
                              : 'border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-black text-xs text-stone-900">{t.title}</span>
                            <span className="text-[10px] font-bold text-stone-500">{t.duration}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 font-medium mb-1.5">{t.desc}</p>
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            ✓ {t.refund}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Therapist Choice */}
                <div>
                  <label className="text-xs font-black text-stone-700 block mb-2">2. Kies jouw specialist:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {THERAPISTS.map((therapist) => {
                      const isSelected = selectedTherapist === therapist.id;
                      return (
                        <button
                          key={therapist.id}
                          onClick={() => setSelectedTherapist(therapist.id)}
                          className={`p-3 rounded-2xl border text-left flex sm:flex-col items-center gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25`
                              : 'border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <img
                            src={therapist.image}
                            alt={therapist.name}
                            className="w-12 h-12 rounded-full object-cover shrink-0"
                          />
                          <div className="text-left sm:text-center">
                            <span className="font-black text-xs text-stone-900 block leading-tight">
                              {therapist.name.split(' ')[1]}
                            </span>
                            <span className="text-[10px] text-stone-500 truncate block">{therapist.role.split('&')[0]}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Day / Time Selector & Confirmation */}
              <div className={`lg:col-span-5 ${theme.bgLight} p-6 sm:p-7 rounded-3xl border-2 ${theme.borderLight} space-y-5`}>
                <h3 className="font-black text-base text-stone-900">3. Datum & Tijdstip</h3>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1.5">Voorkeursdag:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Morgen', 'Overmorgen', 'Vrijdag'].map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                          selectedDay === day ? `${theme.primary} text-white border-transparent shadow-xs` : 'bg-white border-stone-200 text-stone-700'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1.5">Beschikbare Tijdstippen:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['08:30', '10:00', '11:15', '14:00', '15:30', '17:00'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                          selectedTime === time ? `${theme.primary} text-white border-transparent shadow-xs` : 'bg-white border-stone-200 text-stone-700'
                        }`}
                      >
                        {time} u
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-stone-200 text-xs font-medium text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Behandelaar:</span>
                    <strong className="text-stone-900">{activeTherapistObj.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Tijdstip:</span>
                    <strong className="text-stone-900">{selectedDay} om {selectedTime} uur</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setBooked(true);
                    showToast('Afspraak bevestigd!');
                  }}
                  className={`w-full py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md cursor-pointer`}
                >
                  Bevestig Jouw Afspraak
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Insurance Vergoeding 2026 Checker */}
      <section id="vergoeding" className="py-12 sm:py-16 px-4 sm:px-8 bg-stone-100/70 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zorgvergoeding & Declaratie 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Directe Vergoeding Via Jouw Zorgverzekering
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            {brandName} is aangesloten bij alle grote zorgkoepels in Nederland. Wij declareren rechtstreeks, zodat je zelf niets hoeft voor te schieten.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            {[
              { name: 'Zilveren Kruis', tag: '100% Gecontracteerd' },
              { name: 'CZ & Ohra', tag: '100% Gecontracteerd' },
              { name: 'VGZ & Univé', tag: '100% Gecontracteerd' },
              { name: 'Menzis', tag: '100% Gecontracteerd' },
              { name: 'DSW Zorgverzekeraar', tag: '100% Gecontracteerd' },
              { name: 'ASR & Ditzo', tag: '100% Gecontracteerd' },
            ].map((ins, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="font-black text-xs text-stone-900 block">{ins.name}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                  ✓ {ins.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs text-stone-600 font-medium max-w-xl mx-auto text-center space-y-1 mt-6">
            <strong className="text-stone-900 block">Wist je dat?</strong>
            <span>Fysiotherapie uit de aanvullende verzekering gaat <strong>nooit</strong> ten koste van je eigen risico (€385,-).</span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Gespecialiseerde Fysiotherapeuten</h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">BIG-geregistreerd met doorlopende postacademische scholing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THERAPISTS.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs p-6 text-center">
              <img src={t.image} alt={t.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-stone-200" />
              <h3 className="font-black text-base text-stone-900 mb-0.5">{t.name}</h3>
              <p className="text-xs font-bold text-emerald-700 mb-1">{t.role}</p>
              <span className="text-[10px] text-stone-400 font-bold block mb-3">{t.big}</span>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">{t.specialism}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
