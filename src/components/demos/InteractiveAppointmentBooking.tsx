'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle2, Scissors, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const InteractiveAppointmentBooking: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState('knippen');
  const [selectedStylist, setSelectedStylist] = useState('Sanne (Senior Stylist)');
  const [selectedDate, setSelectedDate] = useState('Morgen');
  const [selectedSlot, setSelectedSlot] = useState('11:30');
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    { id: 'knippen', title: 'Wassen, Knippen & Föhnen', duration: '45 min', price: 34.5 },
    { id: 'kleuren', title: 'Balayage / Highlights & Treatment', duration: '90 min', price: 89.0 },
    { id: 'baard', title: 'Heren Knippen & Baardverzorging', duration: '35 min', price: 29.5 },
    { id: 'zorg', title: 'Fysiotherapie Intake & Behandeling', duration: '50 min', price: 42.0 },
  ];

  const stylists = [
    { name: 'Sanne (Senior Stylist)', rating: '4.9 ★', badge: 'Populair' },
    { name: 'Daan (Master Barber)', rating: '5.0 ★', badge: 'Specialist' },
    { name: 'Geen voorkeur (Eerstvolgende)', rating: 'Direct', badge: 'Snelst' },
  ];

  const timeslots = ['09:15', '10:00', '11:30', '13:45', '14:30', '15:15', '16:00', '17:30'];

  const currentServiceObj = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-xs font-black uppercase tracking-wider mb-2">
            <Scissors className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Kapper &amp; Zorg Demo Planner</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            Online Afspraken In 3 Stappen
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
            Nooit meer telefoon opnemen tijdens behandelingen. Klanten boeken 24/7 zelf met automatische agenda-synchronisatie.
          </p>
        </div>

        {/* Stepper indicator */}
        <div className="flex items-center gap-2 text-xs font-bold shrink-0">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                step === s
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : step > s
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                  : 'bg-slate-50 dark:bg-slate-800 text-stone-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>Stap {s}</span>
              {step > s && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
          ))}
        </div>
      </div>

      {isBooked ? (
        <div className="mt-8 p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl border border-emerald-200 dark:border-emerald-800 space-y-3 max-w-lg mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-black text-stone-900 dark:text-white">
            Afspraak Bevestigd!
          </h4>
          <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
            Voor <strong>{currentServiceObj.title}</strong> bij <strong>{selectedStylist}</strong> op <strong>{selectedDate} om {selectedSlot} uur</strong>.
          </p>
          <div className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl inline-block border border-emerald-200">
            Kosten: €{currentServiceObj.price.toFixed(2).replace('.', ',')} • Betaling op locatie
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsBooked(false);
                setStep(1);
              }}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-bold cursor-pointer"
            >
              Nog een afspraak inplannen
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Step Content */}
          <div className="lg:col-span-8">
            {step === 1 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-1">
                  1. Kies jouw gewenste behandeling:
                </label>
                {services.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedService(item.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedService === item.id
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 shadow-xs'
                        : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:border-rose-300'
                    }`}
                  >
                    <div>
                      <div className="font-black text-xs sm:text-sm text-stone-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-slate-400 mt-0.5">
                        Duur: {item.duration}
                      </div>
                    </div>
                    <span className="font-mono font-black text-xs sm:text-sm text-rose-700 dark:text-rose-400">
                      €{item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-1">
                  2. Kies jouw behandelaar of specialist:
                </label>
                {stylists.map((st) => (
                  <button
                    key={st.name}
                    type="button"
                    onClick={() => setSelectedStylist(st.name)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedStylist === st.name
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 shadow-xs'
                        : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 flex items-center justify-center font-bold text-xs">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-xs sm:text-sm text-stone-900 dark:text-white">
                          {st.name}
                        </div>
                        <div className="text-[11px] text-amber-600 font-bold mt-0.5">
                          {st.rating} Klanttevredenheid
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-stone-700 dark:text-slate-300">
                      {st.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-1">
                  3. Kies datum en tijdslot:
                </label>
                <div className="flex gap-2">
                  {['Vandaag', 'Morgen', 'Overmorgen'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedDate === d
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {timeslots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stepper navigation buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev - 1) as any)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 dark:text-slate-400 hover:text-stone-900 cursor-pointer"
                >
                  ← Vorige stap
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev + 1) as any)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Volgende stap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsBooked(true)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Bevestig Afspraak</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Booking Summary Box */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/80 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="font-black text-xs sm:text-sm text-stone-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-700">
              Overzicht Afspraak
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-stone-500 block text-[10px]">Behandeling:</span>
                <span className="font-bold text-stone-900 dark:text-white">{currentServiceObj.title}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Behandelaar:</span>
                <span className="font-bold text-stone-900 dark:text-white">{selectedStylist}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Tijdstip:</span>
                <span className="font-mono font-bold text-stone-900 dark:text-white">{selectedDate} om {selectedSlot}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
              <span className="text-xs font-bold text-stone-600 dark:text-slate-400">Prijs:</span>
              <span className="text-lg font-black font-mono text-stone-900 dark:text-white">
                €{currentServiceObj.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Kosteloos annuleren tot 24u van tevoren</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
