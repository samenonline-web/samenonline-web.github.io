'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Zap,
  Flame,
  Trophy,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronDown,
  Target,
  Dumbbell,
  Heart,
  PlayCircle,
  Phone,
  MapPin,
  Calendar,
  Printer,
} from 'lucide-react';

export const KrachtLijnGym: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName?.trim() || 'KrachtLijn';
  const city = customCity?.trim() || 'Utrecht';

  const [activeMembership, setActiveMembership] = useState<'basis' | 'pro' | 'elite'>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [trialVoucherCreated, setTrialVoucherCreated] = useState<boolean>(false);
  const [memberName, setMemberName] = useState<string>('');
  const [bmi, setBmi] = useState({ weight: 80, height: 175 });
  const [goal, setGoal] = useState<'afvallen' | 'spieropbouw' | 'conditie'>('spieropbouw');
  const [openClassIdx, setOpenClassIdx] = useState<number | null>(null);
  const [spotsLeft] = useState({ maandag: 3, dinsdag: 7, woensdag: 1, donderdag: 5 });

  const bmiValue = (bmi.weight / ((bmi.height / 100) ** 2)).toFixed(1);
  const bmiCategory =
    parseFloat(bmiValue) < 18.5 ? 'Ondergewicht' :
    parseFloat(bmiValue) < 25 ? 'Gezond gewicht' :
    parseFloat(bmiValue) < 30 ? 'Overgewicht' : 'Obesitas';

  const darkBg = isDarkMode ? 'bg-zinc-950' : 'bg-zinc-900';
  const cardBg = isDarkMode ? 'bg-zinc-900' : 'bg-zinc-800';
  const textPrimary = isDarkMode ? 'text-white' : 'text-white';
  const lime = 'text-lime-400';
  const limeBg = 'bg-lime-400';
  const limeGlow = 'shadow-[0_0_20px_rgba(163,230,53,0.3)]';

  const scheduleItems = [
    { day: 'Ma', time: '07:00', class: 'HIIT Bootcamp', trainer: 'Lisa', spots: spotsLeft.maandag, duration: '45 min', intensity: 95 },
    { day: 'Ma', time: '12:00', class: 'Lunchbreak Pump', trainer: 'Marco', spots: 8, duration: '30 min', intensity: 70 },
    { day: 'Di', time: '06:30', class: 'Sunrise Yoga Kracht', trainer: 'Noor', spots: spotsLeft.dinsdag, duration: '60 min', intensity: 55 },
    { day: 'Di', time: '18:00', class: 'PowerLifting Club', trainer: 'Bas', spots: spotsLeft.dinsdag, duration: '75 min', intensity: 100 },
    { day: 'Wo', time: '07:00', class: 'Crossfit Open', trainer: 'Lisa', spots: spotsLeft.woensdag, duration: '60 min', intensity: 90 },
    { day: 'Do', time: '19:30', class: 'Boxing Cardio', trainer: 'Marco', spots: spotsLeft.donderdag, duration: '50 min', intensity: 85 },
  ];

  const memberships = {
    basis: { price: 29, label: 'Basis', features: ['Vrij gebruik apparatuur', 'Kleedkamers & douches', '2× groepsles/week', 'Geen inschrijfkosten'] },
    pro: { price: 49, label: 'Pro', features: ['Alles van Basis', 'Onbeperkt groepslessen', '1× PT consult/maand', 'App & voortgang tracking', 'Gratis shaker bij start'] },
    elite: { price: 79, label: 'Elite', features: ['Alles van Pro', '4× Personal Training/maand', 'Voedingsschema op maat', 'Recovery zone & sauna', 'Prioriteit reserveringen'] },
  };

  const transformations = [
    { name: 'Tim V.', from: '102 kg', to: '81 kg', duration: '6 mnd', quote: 'KrachtLijn veranderde mijn leven. In 6 maanden 21 kilo lichter en sterker dan ooit.' },
    { name: 'Sarah M.', from: 'Geen conditie', to: '5km in 23 min', duration: '3 mnd', quote: 'Van de bank tot halve marathon in slechts een jaar. De coaches zijn absoluut top!' },
    { name: 'Daan H.', from: '65 kg', to: '78 kg', duration: '8 mnd', quote: 'Eindelijk die spiermassa opgebouwd waar ik jarenlang van droomde. Elite pakket = beste investering.' },
  ];

  return (
    <div className={`min-h-full font-sans ${darkBg} ${textPrimary} selection:bg-lime-400 selection:text-zinc-900`}>

      {/* Top bar */}
      <div className="bg-lime-400 text-zinc-900 text-center text-xs font-black py-1.5 tracking-wider uppercase">
        🔥 Nu instappen: geen inschrijfkosten + 7 dagen gratis proberen — Aanbieding eindigt zondag
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`${limeBg} text-zinc-900 font-black text-xs px-2 py-1 rounded`}>
              <Dumbbell className="w-4 h-4 inline" />
            </div>
            <span className="font-black text-lg text-white tracking-tight">
              {brandName}
              <span className={`${lime} ml-1`}>GYM</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-zinc-400">
            <a href="#schema" className="hover:text-lime-400 transition-colors">Lesrooster</a>
            <a href="#lidmaatschap" className="hover:text-lime-400 transition-colors">Lidmaatschap</a>
            <a href="#transformaties" className="hover:text-lime-400 transition-colors">Resultaten</a>
            <a href="#trainers" className="hover:text-lime-400 transition-colors">Trainers</a>
          </div>
          <button
            onClick={onRequestQuote}
            className={`${limeBg} text-zinc-900 font-black text-xs px-4 py-2 rounded-lg hover:bg-lime-300 transition-colors ${limeGlow}`}
          >
            Start Nu Gratis
          </button>
        </div>
      </nav>

      {/* HERO — full-bleed dark with neon lime */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background abstract pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-lime-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-48 h-48 bg-orange-500 rounded-full blur-3xl" />
        </div>
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, #a3e635 0, #a3e635 1px, transparent 0, transparent 60px), repeating-linear-gradient(0deg, #a3e635 0, #a3e635 1px, transparent 0, transparent 60px)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Flame className={`w-5 h-5 ${lime}`} />
              <span className={`text-xs font-black uppercase tracking-widest ${lime}`}>
                {city}'s #1 Prestatiegymnasium
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black leading-none mb-6 tracking-tighter">
              WORD DE
              <span className={`block ${lime}`}>STERKSTE</span>
              VERSIE VAN JOU
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-md leading-relaxed">
              Elite training, bewezen methodes en coaches die jouw resultaten persoonlijk volgen.
              <strong className="text-white"> Geen uitvluchten. Alleen resultaten.</strong>
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={onRequestQuote}
                className={`${limeBg} text-zinc-900 font-black px-8 py-4 rounded-xl text-base hover:bg-lime-300 transition-all ${limeGlow} flex items-center gap-2`}
              >
                <Zap className="w-5 h-5" /> 7 Dagen Gratis Starten
              </button>
              <button className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold px-4 transition-colors">
                <PlayCircle className="w-6 h-6 text-lime-400" /> Bekijk onze resultaten
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-xs font-bold text-zinc-500">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-lime-400" /> Geen contract</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-lime-400" /> Geen inschrijfkosten</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-lime-400" /> Gratis intake</span>
            </div>
          </div>

          {/* Stats panel */}
          <div className={`${cardBg} rounded-2xl p-6 border border-zinc-700`}>
            <div className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Live Gym Stats</div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Actieve leden', value: '1.240+', icon: <Users className="w-5 h-5 text-lime-400" /> },
                { label: 'Trainers', value: '12', icon: <Trophy className="w-5 h-5 text-lime-400" /> },
                { label: 'Groepslessen/week', value: '48', icon: <Calendar className="w-5 h-5 text-lime-400" /> },
                { label: 'Gem. beoordeling', value: '4.9★', icon: <Star className="w-5 h-5 text-lime-400" /> },
              ].map((stat) => (
                <div key={stat.label} className="bg-zinc-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">{stat.icon}</div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* BMI Calculator */}
            <div className="border-t border-zinc-700 pt-4">
              <div className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">BMI Quick Check</div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-zinc-500 font-bold">Gewicht (kg)</label>
                  <input
                    type="range" min={40} max={180} value={bmi.weight}
                    onChange={(e) => setBmi({ ...bmi, weight: +e.target.value })}
                    className="w-full accent-lime-400 mt-1"
                  />
                  <span className="text-lime-400 font-black text-sm">{bmi.weight} kg</span>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-bold">Lengte (cm)</label>
                  <input
                    type="range" min={140} max={220} value={bmi.height}
                    onChange={(e) => setBmi({ ...bmi, height: +e.target.value })}
                    className="w-full accent-lime-400 mt-1"
                  />
                  <span className="text-lime-400 font-black text-sm">{bmi.height} cm</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-zinc-700/60 rounded-xl px-4 py-3">
                <div>
                  <div className="text-3xl font-black text-lime-400">{bmiValue}</div>
                  <div className="text-xs text-zinc-400 font-medium">{bmiCategory}</div>
                </div>
                <button onClick={onRequestQuote} className="text-xs font-black text-zinc-900 bg-lime-400 px-3 py-1.5 rounded-lg hover:bg-lime-300">
                  Gratis Advies →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Schedule */}
      <section id="schema" className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className={`w-5 h-5 ${lime}`} />
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Lesrooster deze week</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">Groepslessen</h2>
          <p className="text-zinc-500 mb-8">
            Klik op een les om te reserveren.
            <span className={`${lime} font-bold`}> Rood = bijna vol!</span>
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduleItems.map((item, idx) => {
              const isFull = item.spots <= 0;
              const isAlmostFull = item.spots <= 2;
              const isOpen = openClassIdx === idx;
              return (
                <div
                  key={idx}
                  className={`${cardBg} rounded-2xl border cursor-pointer transition-all ${isOpen ? 'border-lime-400' : 'border-zinc-700 hover:border-zinc-600'}`}
                  onClick={() => setOpenClassIdx(isOpen ? null : idx)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-black ${lime}`}>{item.day} {item.time}</span>
                          <span className="text-xs text-zinc-600">•</span>
                          <span className="text-xs text-zinc-500 font-medium">{item.duration}</span>
                        </div>
                        <div className="text-base font-black text-white">{item.class}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">Trainer: {item.trainer}</div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Intensity bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-zinc-600 font-medium mb-1">
                        <span>Intensiteit</span>
                        <span className={item.intensity >= 85 ? 'text-red-400 font-black' : 'text-zinc-500'}>{item.intensity}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${item.intensity >= 85 ? 'bg-red-500' : item.intensity >= 65 ? 'bg-lime-400' : 'bg-blue-400'}`}
                          style={{ width: `${item.intensity}%` }}
                        />
                      </div>
                    </div>

                    <div className={`text-xs font-black ${isFull ? 'text-red-400' : isAlmostFull ? 'text-orange-400' : lime}`}>
                      {isFull ? '❌ Volgeboekt' : isAlmostFull ? `⚠️ Nog ${item.spots} plek${item.spots === 1 ? '' : 'ken'}` : `✓ ${item.spots} plekken beschikbaar`}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-zinc-700 p-4">
                      <p className="text-sm text-zinc-400 mb-3">
                        {item.class} is een {item.duration} durende sessie met trainer {item.trainer}. Intensiteitsniveau: {item.intensity >= 85 ? 'Hoog' : item.intensity >= 65 ? 'Gemiddeld-hoog' : 'Gemiddeld'}.
                      </p>
                      <button
                        onClick={onRequestQuote}
                        disabled={isFull}
                        className={`w-full py-2 rounded-xl font-black text-sm transition-all ${isFull ? 'bg-zinc-700 text-zinc-600 cursor-not-allowed' : `${limeBg} text-zinc-900 hover:bg-lime-300 ${limeGlow}`}`}
                      >
                        {isFull ? 'Volgeboekt' : 'Reserveer Nu →'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transformations */}
      <section id="transformaties" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <Target className={`w-5 h-5 ${lime}`} />
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Echte resultaten</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-10">
            Transformaties die spreken
          </h2>

          {/* Goal selector */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(['afvallen', 'spieropbouw', 'conditie'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${goal === g ? `${limeBg} text-zinc-900 ${limeGlow}` : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
              >
                {g === 'afvallen' ? '🔥 Afvallen' : g === 'spieropbouw' ? '💪 Spieropbouw' : '❤️ Conditie'}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {transformations.map((t, i) => (
              <div key={i} className={`${cardBg} rounded-2xl border border-zinc-700 overflow-hidden`}>
                {/* Before/After visual mockup */}
                <div className="grid grid-cols-2 h-40">
                  <div className="bg-zinc-700 flex items-center justify-center flex-col gap-1">
                    <span className="text-zinc-500 text-xs font-black uppercase">Voor</span>
                    <span className="text-white font-black text-lg">{t.from}</span>
                  </div>
                  <div className="bg-lime-400/20 border-l border-zinc-700 flex items-center justify-center flex-col gap-1">
                    <span className={`${lime} text-xs font-black uppercase`}>Na</span>
                    <span className={`${lime} font-black text-lg`}>{t.to}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`${limeBg} text-zinc-900 text-xs font-black px-2 py-0.5 rounded`}>{t.duration}</div>
                    <span className="text-zinc-600 text-xs">•</span>
                    <div className="flex text-lime-400">{'★★★★★'.split('').map((s, si) => <span key={si} className="text-xs">{s}</span>)}</div>
                  </div>
                  <p className="text-sm text-zinc-400 italic mb-3">"{t.quote}"</p>
                  <div className="text-xs font-black text-zinc-500">— {t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="lidmaatschap" className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Kies jouw plan</span>
            <h2 className="text-4xl font-black text-white mt-1">Transparante Prijzen</h2>
            <p className="text-zinc-500 mt-2">Geen verborgen kosten • Sporten in {city}</p>
          </div>

          {/* Billing Switcher & Student Discount */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="inline-flex p-1 rounded-2xl bg-zinc-800 border border-zinc-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Maandelijks Opzegbaar
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-lime-400 text-zinc-900 font-black shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Jaarabonnement (2 Mnd Gratis 🔥)
              </button>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-zinc-300 cursor-pointer bg-zinc-800/80 px-3.5 py-2 rounded-xl border border-zinc-700">
              <input
                type="checkbox"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
                className="rounded accent-lime-400"
              />
              <span>Studentenkorting (-20%)</span>
            </label>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {(Object.entries(memberships) as [keyof typeof memberships, typeof memberships.basis][]).map(([key, plan]) => {
              const isActive = activeMembership === key;
              const displayPrice = isStudent
                ? Math.round((billingCycle === 'annual' ? (plan.price * 10) / 12 : plan.price) * 0.8)
                : billingCycle === 'annual'
                ? Math.round((plan.price * 10) / 12)
                : plan.price;

              return (
                <div
                  key={key}
                  onClick={() => setActiveMembership(key)}
                  className={`rounded-2xl border cursor-pointer transition-all p-6 ${isActive ? `border-lime-400 ${cardBg} ${limeGlow}` : `border-zinc-700 ${cardBg} hover:border-zinc-600`}`}
                >
                  {key === 'pro' && (
                    <div className={`${limeBg} text-zinc-900 text-xs font-black px-3 py-0.5 rounded-full inline-block mb-4`}>Meest gekozen</div>
                  )}
                  <div className="text-zinc-400 font-black uppercase tracking-wide text-xs mb-1">{plan.label}</div>
                  <div className="text-4xl font-black text-white mb-0.5">€{displayPrice}</div>
                  <div className="text-zinc-400 text-xs font-semibold mb-5">
                    {billingCycle === 'annual' ? 'per maand (jaarcontract)' : 'per maand (maandelijks)'}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${lime}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={onRequestQuote}
                    className={`w-full mt-6 py-3 rounded-xl font-black text-sm transition-all ${isActive ? `${limeBg} text-zinc-900 hover:bg-lime-300 ${limeGlow}` : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
                  >
                    Kies {plan.label} <ArrowRight className="inline w-4 h-4 ml-1" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-lime-400 text-zinc-900">
        <div className="max-w-3xl mx-auto text-center px-4">
          <Flame className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-4xl font-black mb-4">Klaar om te starten?</h2>
          <p className="text-zinc-700 mb-8 text-lg">7 dagen gratis. Geen creditcard vereist. Stap vandaag nog in {city}.</p>
          {/* Printable 7-Day Gym Pass Generator */}
          <div className="my-8 bg-zinc-900 rounded-3xl p-6 sm:p-8 text-white border-2 border-zinc-800 text-left max-w-xl mx-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-lime-400" />
                <h3 className="font-black text-base">Claim Jouw 7-Dagen Vrijblijvende Pas</h3>
              </div>
              <span className="text-[10px] font-mono bg-lime-400/20 text-lime-400 border border-lime-400/40 px-2 py-0.5 rounded font-black">
                KL-PASS-2026
              </span>
            </div>

            {trialVoucherCreated ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border-2 border-dashed border-lime-400/60 bg-zinc-950 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-lime-400 block">
                        Officiële Proefpas & Voucher
                      </span>
                      <span className="font-black text-base text-white">{brandName} Gym</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-400">{city}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Naam Sporter</span>
                      <span className="font-bold text-white">{memberName || 'Nieuw Lid'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Gekozen Doel</span>
                      <span className="font-bold text-lime-400 capitalize">{goal}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">BMI & Conditieprofiel</span>
                      <span className="font-bold text-white">{bmiValue} ({bmiCategory})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Geldigheid</span>
                      <span className="font-bold text-white">7 aaneengesloten dagen</span>
                    </div>
                  </div>

                  <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 text-[11px] space-y-1">
                    <span className="font-bold text-lime-400 block">Inbegrepen bij je 7-dagen pas:</span>
                    <ul className="list-disc list-inside text-zinc-300 text-[10px] space-y-0.5">
                      <li>Onbeperkte toegang tot alle fitnesszones in {city}</li>
                      <li>Deelname aan 1x groepsles naar keuze</li>
                      <li>Gratis body composition analyse met PT coach</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 rounded-xl bg-lime-400 text-zinc-950 text-xs font-black flex items-center justify-center gap-1.5 shadow hover:bg-lime-300 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print 7-Dagen Gym Pas (PDF)</span>
                  </button>
                  <button
                    onClick={() => setTrialVoucherCreated(false)}
                    className="px-3 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 text-xs font-bold hover:bg-zinc-800 cursor-pointer"
                  >
                    Nieuwe Pas
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTrialVoucherCreated(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Jouw Volledige Naam</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="bijv. Sander Meijer"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-950 text-xs font-bold text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <span>Genereer Mijn Gratis 7-Dagen Pas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onRequestQuote}
              className="bg-zinc-900 text-white font-black px-8 py-4 rounded-xl hover:bg-zinc-800 transition-colors flex items-center gap-2"
            >
              <Zap className="w-5 h-5" /> Gratis Starten
            </button>
            <a href="tel:030-1234567" className="flex items-center gap-2 bg-zinc-900/20 text-zinc-900 font-black px-6 py-4 rounded-xl hover:bg-zinc-900/30 transition-colors">
              <Phone className="w-5 h-5" /> 030 - 123 45 67
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-zinc-700">
            <MapPin className="w-4 h-4" />
            <span>{brandName} Gym • Sportlaan 12 • {city} • Open 06:00–23:00</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8 text-center text-xs text-zinc-600">
        <p>© 2026 {brandName} Personal Training & Gym · {city} · <span className="text-lime-400 font-bold">Fictief Demo Concept</span></p>
      </footer>
    </div>
  );
};
