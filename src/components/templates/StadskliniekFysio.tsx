'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import { Heart, Calendar, Check, ArrowRight, ShieldCheck, UserCheck, Clock, Sun, Moon } from 'lucide-react';

export const StadskliniekFysio: React.FC<TemplateProps> = ({ theme, isDarkMode, onToggleDarkMode, onRequestQuote }) => {
  const [selectedTherapy, setSelectedTherapy] = useState('Fysiotherapie Algemeen');
  const [selectedDay, setSelectedDay] = useState('Morgen');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [booked, setBooked] = useState(false);

  const treatments = [
    { title: 'Fysiotherapie Algemeen', duration: '30 min', refund: '100% vergoed via aanvullende verzekering' },
    { title: 'Manuele Therapie & Rugklachten', duration: '45 min', refund: 'Directe toegankelijkheid zonder verwijzing' },
    { title: 'Sportrevalidatie & Dry Needling', duration: '45 min', refund: 'Inclusief persoonlijk trainingsschema' },
  ];

  return (
    <div className="min-h-full bg-white text-stone-900 font-sans">
      {/* Header */}
      <header className="border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
            SF
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">Stadskliniek Fysiotherapie</span>
            <span className="block text-[10px] text-stone-500 font-medium">Maastricht • Praktijk voor Beweging & Zorg</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <nav className="hidden sm:flex items-center gap-5 text-stone-600">
            <a href="#afspraak" className="hover:text-stone-900">Afspraak Maken</a>
            <a href="#behandelingen" className="hover:text-stone-900">Behandelingen</a>
            <a href="#vergoeding" className="hover:text-stone-900">Vergoeding & Zorg</a>
          </nav>
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200"
              title={isDarkMode ? 'Lichte Modus' : 'Donkere Modus'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>
          )}
          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-xs cursor-pointer`}
          >
            Direct Afspraak Plannen
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className={`py-14 sm:py-20 px-6 ${theme.bgLight} border-b ${theme.borderLight} text-center`}>
        <div className="max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-extrabold mb-4 border ${theme.borderLight}`}>
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Geen Verwijsbrief Nodig • Binnen 48 Uur Geholpen</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Weer pijnvrij bewegen met <span className={theme.textPrimary}>persoonlijke fysiotherapie</span>.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Moderne praktijk in Maastricht. Contracten met alle Nederlandse zorgverzekeraars en aangesloten bij het KNGF.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#afspraak"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-bold text-xs shadow-md flex items-center gap-2`}
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Online Afspraak</span>
            </a>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 cursor-pointer"
            >
              Vraag Zorg-Template Aan
            </button>
          </div>
        </div>
      </section>

      {/* Online Appointment Booking */}
      <section id="afspraak" className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-stone-50 rounded-3xl border-2 border-stone-200 p-8 shadow-xs">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h2 className="text-2xl font-black text-stone-900">Direct Online Afspraak Plannen</h2>
            <p className="text-xs text-stone-500 font-medium">Kies je behandeling en het gewenste tijdslot</p>
          </div>

          {booked ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
              <span className="text-4xl">🎉</span>
              <h3 className="font-extrabold text-lg text-stone-900">Afspraak Bevestigd (Demo)!</h3>
              <p className="text-xs text-stone-600">
                Je afspraak voor <strong>{selectedTherapy}</strong> op <strong>{selectedDay} om {selectedTime}</strong> staat genoteerd.
              </p>
              <button
                onClick={() => setBooked(false)}
                className="text-xs text-stone-500 font-bold underline cursor-pointer mt-2"
              >
                Plan nog een afspraak
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-xl mx-auto">
              {/* 1. Therapy Choice */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-2">1. Kies type behandeling:</label>
                <div className="space-y-2">
                  {treatments.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTherapy(t.title)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedTherapy === t.title ? `${theme.borderLight} bg-white ring-2 ring-orange-500/30` : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-stone-900 block">{t.title}</span>
                        <span className="text-[10px] text-stone-500">{t.refund}</span>
                      </div>
                      <span className="text-xs font-bold text-stone-500">{t.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Day & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2">2. Dag:</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none"
                  >
                    <option value="Morgen">Morgen</option>
                    <option value="Overmorgen">Overmorgen</option>
                    <option value="Volgende week maandag">Volgende week maandag</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2">3. Tijd:</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none"
                  >
                    <option value="09:00">09:00 uur</option>
                    <option value="10:00">10:00 uur</option>
                    <option value="11:30">11:30 uur</option>
                    <option value="14:00">14:00 uur</option>
                    <option value="16:00">16:00 uur</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setBooked(true)}
                className={`w-full py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md transition-all cursor-pointer`}
              >
                Bevestig Afspraak ({selectedDay} om {selectedTime})
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
