'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Search,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Shield,
  MessageCircle,
  Clock,
  Briefcase,
  Home,
  Wrench,
  Paintbrush,
  Zap,
  Droplets,
  ChevronDown,
  Users,
  TrendingUp,
  Heart,
  Phone,
  Printer,
  FileText,
  X,
  Sliders,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const MarktPleinPlatform: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName?.trim() || 'MarktPlein';
  const city = customCity?.trim() || 'Rotterdam';

  const [activeTab, setActiveTab] = useState<'klant' | 'vakman'>('klant');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openProvider, setOpenProvider] = useState<number | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<'timmerman' | 'schilder' | 'elektricien' | 'loodgieter'>('timmerman');
  const [estimatedHours, setEstimatedHours] = useState<number>(8);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [includeMaterialBuffer, setIncludeMaterialBuffer] = useState<boolean>(true);
  const [showDossier, setShowDossier] = useState<boolean>(false);
  const [dossierToken, setDossierToken] = useState('MP-ESCROW-2026-4419');

  const openDossier = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    setDossierToken(`MP-ESCROW-2026-${rand}`);
    setShowDossier(true);
  };

  const jobRates: Record<string, number> = {
    timmerman: 65,
    schilder: 55,
    elektricien: 85,
    loodgieter: 75,
  };

  const baseLabor = (jobRates[selectedJobType] || 65) * estimatedHours;
  const emergencySurcharge = isEmergency ? 45 : 0;
  const materialBuffer = includeMaterialBuffer ? 120 : 0;
  const escrowFee = Math.round(baseLabor * 0.05); // 5% platform escrow guarantee
  const totalJobEstimate = baseLabor + emergencySurcharge + materialBuffer + escrowFee;

  const categories = [
    { id: 'timmerman', label: 'Timmerman', icon: <Wrench className="w-5 h-5" />, count: 48 },
    { id: 'schilder', label: 'Schilder', icon: <Paintbrush className="w-5 h-5" />, count: 35 },
    { id: 'elektricien', label: 'Elektricien', icon: <Zap className="w-5 h-5" />, count: 29 },
    { id: 'loodgieter', label: 'Loodgieter', icon: <Droplets className="w-5 h-5" />, count: 22 },
    { id: 'verhuizer', label: 'Verhuizer', icon: <Home className="w-5 h-5" />, count: 17 },
    { id: 'klusman', label: 'Klusman', icon: <Briefcase className="w-5 h-5" />, count: 61 },
  ];

  const providers = [
    {
      name: `Jan de Vries Timmerwerk ${city}`, cat: 'timmerman', city, distance: '2.3 km',
      rating: 4.9, reviews: 84, price: '€55–85/uur', available: true, verified: true,
      bio: `Ervaren timmerman in ${city} voor interieurwerk, kozijnen, vlieringen en maatwerk keukens. 15 jaar vakmanschap.`,
      completedJobs: 247,
    },
    {
      name: `Schilderwerken Bakker ${city}`, cat: 'schilder', city, distance: '4.1 km',
      rating: 4.7, reviews: 56, price: '€45–70/uur', available: true, verified: true,
      bio: `Vakkundig schilder in ${city} voor binnen en buiten. Inclusief stucwerk, renovatie en kleuradvies.`,
      completedJobs: 183,
    },
    {
      name: `ElektroPro ${city}`, cat: 'elektricien', city, distance: '1.8 km',
      rating: 4.95, reviews: 102, price: '€75–95/uur', available: false, verified: true,
      bio: `Gecertificeerd elektricien in ${city} voor installaties, zonnepanelen, EV-laadpunten en storingsservice.`,
      completedJobs: 389,
    },
    {
      name: `Loodgietersbedrijf ${city} Peters`, cat: 'loodgieter', city, distance: '3.2 km',
      rating: 4.8, reviews: 71, price: '€65–90/uur', available: true, verified: true,
      bio: `24/7 beschikbaar in ${city} voor spoedreparaties. Specialisme in CV-ketels, badkamer en rioleringen.`,
      completedJobs: 214,
    },
  ];

  const filtered = providers.filter((p) => {
    const catMatch = !selectedCategory || p.cat === selectedCategory;
    const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const darkMode = isDarkMode;
  const bg = darkMode ? 'bg-rose-950/20' : 'bg-rose-50/30';
  const bgCard = darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200';
  const textBase = darkMode ? 'text-slate-100' : 'text-slate-900';
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`min-h-full font-sans ${darkMode ? 'bg-zinc-950 text-slate-100' : 'bg-white text-slate-900'} selection:bg-rose-600 selection:text-white`}>

      {/* Nav */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm ${darkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-rose-500 to-orange-500 text-white p-1.5 rounded-lg">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="font-black text-base">{brandName}</span>
          <span className={`text-xs hidden sm:block ${textMuted}`}>Lokale Diensten Marketplace</span>
        </div>
        <div className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-500">
          <a href="#zoeken" className="hover:text-rose-600 transition-colors">Zoek vakman</a>
          <a href="#hoe-werkt-het" className="hover:text-rose-600 transition-colors">Hoe werkt het</a>
          <a href="#vakman-worden" className="hover:text-rose-600 transition-colors">Vakman worden</a>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRequestQuote}
            className="text-xs font-black px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600 transition-colors"
          >
            Vakman Zoeken
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-orange-500 to-amber-400 opacity-95" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4 tracking-tighter">
            Jouw klus, de perfecte vakman —
            <span className="block opacity-90">gevonden in {city}</span>
          </h1>
          <p className="text-rose-100 text-lg mb-10 max-w-xl mx-auto">
            Vergelijk lokale vakmensen, lees echte reviews en boek direct online. Betaling pas na goedkeuring.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-2xl mx-auto flex gap-2 mb-4">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Welke klus zoek je? (bijv. schilder, elektricien...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 px-3 border-l border-slate-200">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 font-medium">{city}</span>
            </div>
            <button
              onClick={onRequestQuote}
              className="bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black px-6 py-2.5 rounded-xl text-sm hover:from-rose-600 hover:to-orange-600 transition-colors"
            >
              Zoeken
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-rose-100 text-xs font-medium">
            <span>✓ 1.200+ geverifieerde vakmensen</span>
            <span>✓ 8.400+ voltooide klussen</span>
            <span>✓ Betaalescrow — veilig betalen</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`py-12 ${darkMode ? 'bg-zinc-900' : 'bg-slate-50'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className={`text-2xl font-black ${textBase} mb-6 text-center`}>Zoek op categorie</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-xs font-bold ${selectedCategory === cat.id ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.15)]' : `${bgCard} ${textMuted} hover:border-slate-300`}`}
              >
                <div className={selectedCategory === cat.id ? 'text-rose-500' : textMuted}>{cat.icon}</div>
                <span className={textBase}>{cat.label}</span>
                <span className={`text-[10px] ${textMuted}`}>{cat.count} vakmensen</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Provider cards */}
      <section id="zoeken" className={`py-12 ${darkMode ? 'bg-zinc-950' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-black ${textBase}`}>
              {filtered.length} vakmensen gevonden
              {selectedCategory && <span className="text-rose-500 ml-2 text-lg font-medium capitalize">· {selectedCategory}</span>}
            </h2>
            <div className={`text-xs ${textMuted}`}>Gesorteerd op: Beoordeling</div>
          </div>

          <div className="space-y-4">
            {(filtered.length > 0 ? filtered : providers).map((p, i) => (
              <div key={i} className={`${bgCard} border rounded-2xl overflow-hidden transition-all ${openProvider === i ? 'shadow-lg' : ''}`}>
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setOpenProvider(openProvider === i ? null : i)}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-black text-base ${textBase}`}>{p.name}</span>
                            {p.verified && (
                              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                <CheckCircle className="w-3 h-3" /> Geverifieerd
                              </span>
                            )}
                            {!p.available && (
                              <span className="text-[10px] font-black text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                                Volgeboekt
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.city} · {p.distance}</span>
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{p.completedJobs} klussen</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`flex items-center gap-1 text-sm font-black ${textBase}`}>
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            {p.rating}
                            <span className={`font-medium ${textMuted}`}>({p.reviews})</span>
                          </div>
                          <div className="text-sm font-bold text-rose-600 mt-0.5">{p.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {openProvider === i && (
                  <div className={`border-t px-5 pb-5 pt-4 ${darkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
                    <p className={`text-sm ${textMuted} mb-4`}>{p.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={onRequestQuote}
                        className="bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black text-sm px-5 py-2.5 rounded-xl hover:from-rose-600 hover:to-orange-600 transition-all flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" /> Offerte Aanvragen
                      </button>
                      <button className={`text-sm font-bold px-4 py-2.5 rounded-xl border flex items-center gap-2 ${darkMode ? 'border-zinc-700 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
                        <Phone className="w-4 h-4" /> Bellen
                      </button>
                      <div className="flex items-center gap-1 text-xs text-slate-400 ml-auto">
                        <Clock className="w-3 h-3" /> Gem. reactietijd: 2 uur
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Klus Escrow Estimator */}
      <section className={`py-12 border-t ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-rose-50/40 border-rose-100'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>Directe Kluskosten &amp; Escrow Berekening</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black ${textBase}`}>Bereken jouw klus in {city}</h2>
            <p className={`text-xs sm:text-sm ${textMuted} mt-1`}>
              Transparante uurtarieven van erkende vakmensen, 100% beveiligd via derdengelden escrow.
            </p>
          </div>

          <div className={`${bgCard} border rounded-3xl p-6 sm:p-8 shadow-md space-y-6 max-w-2xl mx-auto`}>
            {/* Job type */}
            <div>
              <label className="text-xs font-black block mb-2.5">Kies Type Vakman:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'timmerman', label: 'Timmerman', rate: '€65/u' },
                  { id: 'schilder', label: 'Schilder', rate: '€55/u' },
                  { id: 'elektricien', label: 'Elektricien', rate: '€85/u' },
                  { id: 'loodgieter', label: 'Loodgieter', rate: '€75/u' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedJobType(item.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedJobType === item.id
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 ring-2 ring-rose-500/20'
                        : `${bgCard} hover:border-slate-300`
                    }`}
                  >
                    <span className="font-black text-xs block">{item.label}</span>
                    <span className="text-[10px] text-rose-600 font-bold">{item.rate}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <label className="text-xs font-black block mb-2.5">Geschatte Tijdsduur:</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { hours: 4, label: '4 uur (Halve dag)' },
                  { hours: 8, label: '8 uur (1 dag)' },
                  { hours: 16, label: '16 uur (2 dagen)' },
                  { hours: 40, label: '40 uur (1 week)' },
                ].map((item) => (
                  <button
                    key={item.hours}
                    type="button"
                    onClick={() => setEstimatedHours(item.hours)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      estimatedHours === item.hours
                        ? 'border-rose-500 bg-rose-500 text-white font-black shadow-xs'
                        : `${bgCard} text-xs font-bold hover:border-slate-300`
                    }`}
                  >
                    <span className="block text-xs">{item.hours} uur</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsEmergency(!isEmergency)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isEmergency ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20' : `${bgCard}`
                }`}
              >
                <div>
                  <span className="font-bold text-xs block">24/7 Spoedservice {city} (+€45)</span>
                  <span className={`text-[10px] ${textMuted}`}>Vakman binnen 2 uur ter plaatse</span>
                </div>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                  isEmergency ? 'bg-rose-500 text-white border-rose-500 font-bold' : 'border-slate-300'
                }`}>
                  {isEmergency && '✓'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIncludeMaterialBuffer(!includeMaterialBuffer)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  includeMaterialBuffer ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20' : `${bgCard}`
                }`}
              >
                <div>
                  <span className="font-bold text-xs block">Standaard Materiaalbuffer (+€120)</span>
                  <span className={`text-[10px] ${textMuted}`}>Schroeven, kit, buizen &amp; kleinverbruik</span>
                </div>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                  includeMaterialBuffer ? 'bg-rose-500 text-white border-rose-500 font-bold' : 'border-slate-300'
                }`}>
                  {includeMaterialBuffer && '✓'}
                </div>
              </button>
            </div>

            {/* Escrow Guarantee Highlight */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-black text-emerald-900 block">100% Escrow Betalingsbescherming:</span>
                <span className="text-emerald-800 font-medium">Jouw aanbetaling staat veilig op de kwaliteitsrekening en wordt pas vrijgegeven als de klus naar wens is uitgevoerd.</span>
              </div>
            </div>

            {/* Result & Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className={`text-xs ${textMuted} font-bold block`}>Geschat Totaalbedrag (incl. Escrow):</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-rose-600">€{totalJobEstimate.toLocaleString('nl-NL')}</span>
                  <span className={`text-xs ${textMuted} font-medium`}>incl. BTW</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={openDossier}
                  className={`w-full sm:w-auto px-4 py-3 rounded-xl border ${darkMode ? 'border-zinc-700 hover:bg-zinc-800 text-slate-200' : 'border-slate-300 hover:bg-slate-100 text-slate-800'} text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors`}
                >
                  <Printer className="w-4 h-4 text-rose-500" />
                  <span>Print Klusaanvraag &amp; Escrow (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-black text-xs shadow-md cursor-pointer transition-all"
                >
                  Vraag Direct Offertes Aan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="hoe-werkt-het" className={`py-16 ${darkMode ? 'bg-zinc-900' : 'bg-slate-50'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className={`text-3xl font-black ${textBase} mb-10`}>Zo werkt {brandName}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Zoek', desc: 'Zoek op categorie of locatie in jouw buurt.', icon: <Search className="w-6 h-6" /> },
              { step: '2', title: 'Vergelijk', desc: 'Lees reviews, check prijzen en beschikbaarheid.', icon: <Star className="w-6 h-6" /> },
              { step: '3', title: 'Boek', desc: 'Stuur je klus door en ontvang 3 offertes binnen 24 uur.', icon: <MessageCircle className="w-6 h-6" /> },
              { step: '4', title: 'Veilig Betaal', desc: 'Betaal via escrow — geld wordt vrijgegeven na goedkeuring.', icon: <Shield className="w-6 h-6" /> },
            ].map((s) => (
              <div key={s.step} className={`${bgCard} border rounded-2xl p-6 text-center`}>
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  {s.icon}
                </div>
                <div className="text-2xl font-black text-rose-500 mb-1">{s.step}.</div>
                <div className={`font-black text-base ${textBase} mb-2`}>{s.title}</div>
                <div className={`text-xs ${textMuted} leading-relaxed`}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vakman worden CTA */}
      <section id="vakman-worden" className="py-16 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-black px-4 py-1.5 rounded-full mb-4">
            <TrendingUp className="w-3.5 h-3.5" /> Voor vakmensen & ZZP'ers
          </div>
          <h2 className="text-3xl font-black mb-4">Word jij vakman op {brandName}?</h2>
          <p className="text-zinc-400 mb-8">Bereik duizenden klanten in {city} en omgeving. Gratis aanmelden, betaal alleen bij voltooide klus.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={onRequestQuote} className="bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black px-8 py-4 rounded-xl hover:from-rose-600 hover:to-orange-600 transition-colors flex items-center gap-2">
              <Users className="w-5 h-5" /> Profiel Aanmaken — Gratis
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose-400" /> Geen maandelijkse kosten</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose-400" /> Gemiddeld 12 nieuwe klussen/mnd</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose-400" /> Betalingsgarantie via escrow</span>
          </div>
        </div>
      </section>

      <footer className={`py-8 text-center text-xs border-t ${darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
        <p>© 2026 {brandName} – Lokale Diensten Marketplace · {city} · <span className="text-rose-500 font-bold">Fictief Demo Concept</span></p>
      </footer>

      {/* Printable Klusaanvraag & Escrow Modal */}
      {showDossier && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
            <button
              onClick={() => setShowDossier(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print Container */}
            <div id="printable-escrow-dossier" className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black tracking-wider uppercase">
                      Escrow Beveiligd Dossier
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Stichting Derdengelden</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {brandName} • Klusaanvraag &amp; Escrow Paspoort
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Regio {city} • Aanvraag Token: <span className="font-mono font-bold text-slate-800">{dossierToken}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-block p-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <ShieldCheck className="w-8 h-8 mx-auto text-emerald-600" />
                    <span className="text-[9px] font-mono text-slate-500 block mt-0.5">{dossierToken}</span>
                  </div>
                </div>
              </div>

              {/* Job Specification Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-black">
                      <th className="py-2.5 px-4">Onderdeel</th>
                      <th className="py-2.5 px-4">Specificatie</th>
                      <th className="py-2.5 px-4 text-right">Kosten</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="font-medium text-slate-800">
                      <td className="py-2.5 px-4 font-bold text-slate-900 capitalize">Vakman ({selectedJobType})</td>
                      <td className="py-2.5 px-4 text-slate-600">
                        {estimatedHours} uur werk à €{jobRates[selectedJobType]}/uur in {city}
                      </td>
                      <td className="py-2.5 px-4 text-right font-black">€{baseLabor.toFixed(2)}</td>
                    </tr>
                    {isEmergency && (
                      <tr className="font-medium text-slate-800">
                        <td className="py-2.5 px-4 font-bold text-slate-900">24/7 Spoedservice</td>
                        <td className="py-2.5 px-4 text-slate-600">Vakman ter plaatse binnen 2 uur</td>
                        <td className="py-2.5 px-4 text-right font-black">€45.00</td>
                      </tr>
                    )}
                    {includeMaterialBuffer && (
                      <tr className="font-medium text-slate-800">
                        <td className="py-2.5 px-4 font-bold text-slate-900">Materiaal Voorschot</td>
                        <td className="py-2.5 px-4 text-slate-600">Kleinmateriaal buffer (afrekening op nacalculatie)</td>
                        <td className="py-2.5 px-4 text-right font-black">€120.00</td>
                      </tr>
                    )}
                    <tr className="font-medium text-slate-800 bg-emerald-50/40">
                      <td className="py-2.5 px-4 font-bold text-emerald-950">Escrow Waarborg (5%)</td>
                      <td className="py-2.5 px-4 text-emerald-800">100% Geld-terug-garantie tot opleveringsakkoord</td>
                      <td className="py-2.5 px-4 text-right font-black text-emerald-700">€{escrowFee.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Escrow Guarantee Terms */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5 text-xs text-slate-700">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-rose-500" />
                  Voorwaarden Derdengelden Escrow {brandName}
                </span>
                <p>• <strong>Geld Veilig Vast:</strong> Jouw betaling staat op een afgescheiden Stichting Derdengelden rekening.</p>
                <p>• <strong>Vrijgave na Akkoord:</strong> Pas wanneer jij digitaal aftekent dat de klus deugdelijk is opgeleverd, ontvangt de vakman de vergoeding.</p>
                <p>• <strong>Geschillenbeslechting:</strong> Bij oneensheid bemiddelt onze onafhankelijke kwaliteitsinspecteur kosteloos.</p>
              </div>

              {/* Total & Action Buttons */}
              <div className="bg-slate-100/60 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">Totaal Waarborgbedrag:</span>
                  <span className="text-2xl font-black text-rose-600">€{totalJobEstimate.toLocaleString('nl-NL')}</span>
                  <span className="text-xs text-slate-400 block font-medium">Inclusief 21% BTW · Veilig via iDEAL</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDossier(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                  >
                    Sluiten
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Klusaanvraag (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
