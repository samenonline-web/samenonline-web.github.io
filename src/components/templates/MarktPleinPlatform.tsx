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
      name: 'Jan de Vries Timmerwerk', cat: 'timmerman', city: 'Rotterdam', distance: '2.3 km',
      rating: 4.9, reviews: 84, price: '€55–85/uur', available: true, verified: true,
      bio: 'Ervaren timmerman voor interieurwerk, kozijnen, vlieringen en maatwerk keukens. 15 jaar vakmanschap.',
      completedJobs: 247,
    },
    {
      name: 'Schillerwerken Bakker', cat: 'schilder', city: 'Rotterdam', distance: '4.1 km',
      rating: 4.7, reviews: 56, price: '€45–70/uur', available: true, verified: true,
      bio: 'Vakkundig schilder voor binnen en buiten. Inclusief stucwerk, renovatie en kleuradvies.',
      completedJobs: 183,
    },
    {
      name: 'ElektroPro Zuid-Holland', cat: 'elektricien', city: 'Rotterdam', distance: '1.8 km',
      rating: 4.95, reviews: 102, price: '€75–95/uur', available: false, verified: true,
      bio: 'Gecertificeerd elektricien voor installaties, zonnepanelen, EV-laadpunten en storingsservice.',
      completedJobs: 389,
    },
    {
      name: 'Loodgietersbedrijf Peters', cat: 'loodgieter', city: 'Rotterdam', distance: '5.2 km',
      rating: 4.8, reviews: 71, price: '€65–90/uur', available: true, verified: true,
      bio: '24/7 beschikbaar voor spoedreparaties. Specialisme in CV-ketels, badkamer en rioleringen.',
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
    </div>
  );
};
