'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Camera,
  Play,
  Heart,
  ArrowRight,
  MapPin,
  Star,
  Mail,
  Phone,
  CheckCircle,
  X,
  Printer,
  Calculator,
} from 'lucide-react';

// Instagram icon (not in this lucide-react version)
const InstaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

export const LensVerhaalFotografie: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName?.trim() || 'LensVerhaal';
  const city = customCity?.trim() || 'Groningen';

  const [activeCategory, setActiveCategory] = useState<'all' | 'bruiloft' | 'zakelijk' | 'lifestyle' | 'portret'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [activePackage, setActivePackage] = useState<'silver' | 'gold' | 'platinum'>('gold');
  const [includeSecondShooter, setIncludeSecondShooter] = useState<boolean>(false);
  const [includeDroneVideo, setIncludeDroneVideo] = useState<boolean>(true);
  const [includeLinenAlbum, setIncludeLinenAlbum] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Alle Werken' },
    { id: 'bruiloft', label: '💍 Bruiloft' },
    { id: 'zakelijk', label: '💼 Zakelijk' },
    { id: 'lifestyle', label: '🌿 Lifestyle' },
    { id: 'portret', label: '🎭 Portret' },
  ] as const;

  // Simulated portfolio grid with color blocks representing photos
  const portfolio = [
    { cat: 'bruiloft', aspect: 'portrait', tone: 'from-stone-800 to-amber-900', label: 'Trouwerij Bakker × Vos', year: '2026' },
    { cat: 'zakelijk', aspect: 'landscape', tone: 'from-zinc-900 to-slate-800', label: 'Technisch Bureau Den Haag', year: '2026' },
    { cat: 'lifestyle', aspect: 'square', tone: 'from-amber-900 to-stone-800', label: 'Golden Hour Lifestyle', year: '2025' },
    { cat: 'portret', aspect: 'portrait', tone: 'from-zinc-800 to-zinc-900', label: 'Business Portret — Marjolein', year: '2026' },
    { cat: 'bruiloft', aspect: 'landscape', tone: 'from-rose-950 to-stone-900', label: 'Bruiloft de Ruiter × Smit', year: '2025' },
    { cat: 'zakelijk', aspect: 'square', tone: 'from-slate-900 to-indigo-950', label: 'Startup Teamfoto', year: '2026' },
    { cat: 'lifestyle', aspect: 'portrait', tone: 'from-stone-700 to-amber-800', label: 'Familie Shoot Drentse Aa', year: '2025' },
    { cat: 'bruiloft', aspect: 'square', tone: 'from-amber-950 to-rose-950', label: 'Bruiloft Cohen × Müller', year: '2026' },
    { cat: 'portret', aspect: 'landscape', tone: 'from-zinc-900 to-stone-800', label: 'LinkedIn Fotoshoot', year: '2026' },
  ];

  const filtered = activeCategory === 'all' ? portfolio : portfolio.filter((p) => p.cat === activeCategory);

  const packages = {
    silver: {
      label: 'Silver', price: 695, color: 'from-zinc-600 to-zinc-700',
      features: ['4 uur reportage', 'Tot 250 bewerkte foto\'s', 'Privé download galerie (12 mnd)', 'Online intake formulier', 'Reiskosten 50km incl.'],
    },
    gold: {
      label: 'Gold', price: 1195, color: 'from-amber-700 to-amber-800',
      features: ['8 uur full-day reportage', 'Tot 600 bewerkte foto\'s', 'Privé galerie + USB box', 'Behind-the-scenes video reel', '2× revisieronde', 'Reiskosten NL incl.'],
    },
    platinum: {
      label: 'Platinum', price: 1895, color: 'from-stone-600 to-stone-700',
      features: ['Alles in Gold', 'Drone opnames incl.', 'Same-day sneak peek (10 foto\'s)', 'Extra editie fotoboek (30×30)', 'Extra belichte Fotoshoot avond', 'Prioriteit planning'],
    },
  };

  const testimonials = [
    { name: 'Eva & Pieter', type: 'Bruiloft', text: 'We kunnen gewoon niet geloven hoe mooi onze bruiloftsfoto\'s zijn. Elk moment is perfect vastgelegd. Werkelijk een talent!', stars: 5 },
    { name: 'Vleugel & Partners', type: 'Zakelijk', text: 'Onze nieuwe bedrijfsfoto\'s geven precies de uitstraling die we zochten. Professioneel, snel en enorm prettig in de samenwerking.', stars: 5 },
    { name: 'Sanne M.', type: 'Portret', text: 'Ik was altijd onzeker voor de camera maar LensVerhaal heeft me op mijn gemak gesteld. De foto\'s zijn verbluffend!', stars: 5 },
  ];

  const darkBase = isDarkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-950 text-white';
  const amber = 'text-amber-400';
  const amberBg = 'bg-amber-500';

  return (
    <div className={`min-h-full font-sans ${darkBase} selection:bg-amber-500 selection:text-zinc-900`}>

      {/* Minimal top nav — editorial style */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">{brandName}</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-zinc-400">
          <a href="#portfolio" className="hover:text-amber-400 transition-colors">Portfolio</a>
          <a href="#pakketten" className="hover:text-amber-400 transition-colors">Pakketten</a>
          <a href="#over" className="hover:text-amber-400 transition-colors">Over Mij</a>
          <button onClick={onRequestQuote} className="text-zinc-900 bg-amber-400 px-4 py-1.5 rounded font-bold hover:bg-amber-300 transition-colors">
            Boek Sessie
          </button>
        </div>
      </nav>

      {/* HERO — full-bleed cinematic */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        {/* Simulated full-screen photo background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-stone-900 to-amber-950 opacity-80" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(217,119,6,0.15),transparent)]" />
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        {/* Floating photo mosaic */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-sm bg-gradient-to-br ${portfolio[i].tone}`}
              style={{
                width: `${180 + i * 30}px`,
                height: `${120 + i * 20}px`,
                top: `${10 + (i % 3) * 30}%`,
                left: `${55 + (i % 2) * 25}%`,
                transform: `rotate(${-8 + i * 4}deg)`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6 text-amber-400">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-xs tracking-[0.3em] uppercase font-medium">Fotograaf & Videograaf · {city}</span>
            </div>
            <h1 className="text-6xl sm:text-8xl font-black leading-none tracking-tighter mb-6 text-white">
              Elk moment
              <span className="block text-amber-400">verdient</span>
              een verhaal
            </h1>
            <p className="text-zinc-400 text-xl mb-10 max-w-lg leading-relaxed">
              Bruiloften, portretten, zakelijke fotografie en lifestyle shoots in heel Nederland.
              Authentiek. Tijdloos. Jouw verhaal.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onRequestQuote}
                className="bg-amber-500 text-zinc-900 font-black px-8 py-4 rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-2"
              >
                Beschikbaarheid Checken <ArrowRight className="w-5 h-5" />
              </button>
              <button className="text-zinc-400 hover:text-white font-bold px-4 flex items-center gap-2 transition-colors">
                <Play className="w-5 h-5 text-amber-400" /> Bekijk showreel
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 mt-12 text-center">
              {[{ v: '380+', l: 'Shoots' }, { v: '14', l: 'Bruiloften 2026' }, { v: '4.97', l: '★ Gemiddeld' }].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-black text-white">{s.v}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-black text-white">Portfolio</h2>
              <p className="text-zinc-500 mt-1">Geselecteerde werken uit {city} en omstreken</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id as typeof activeCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeCategory === c.id ? 'bg-amber-500 text-zinc-900' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((photo, i) => {
              const heights = { portrait: 'h-72', landscape: 'h-48', square: 'h-60' };
              return (
                <div
                  key={i}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                  onClick={() => setSelectedPhoto(i)}
                >
                  <div className={`${heights[photo.aspect as keyof typeof heights]} bg-gradient-to-br ${photo.tone} w-full transition-transform duration-500 group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center px-4">
                      <Heart className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                      <div className="text-white text-sm font-bold">{photo.label}</div>
                      <div className="text-zinc-400 text-xs">{photo.year}</div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-zinc-900/80 text-amber-400 text-xs font-bold px-2 py-1 rounded capitalize">
                    {photo.cat}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedPhoto !== null && (
            <div className="fixed inset-0 z-50 bg-zinc-950/95 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
              <div className="max-w-2xl w-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className={`h-80 bg-gradient-to-br ${(activeCategory === 'all' ? portfolio : filtered)[selectedPhoto]?.tone || 'from-zinc-800 to-zinc-900'}`} />
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <div className="font-black text-white">{(activeCategory === 'all' ? portfolio : filtered)[selectedPhoto]?.label}</div>
                    <div className="text-zinc-500 text-sm">{(activeCategory === 'all' ? portfolio : filtered)[selectedPhoto]?.year}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={onRequestQuote} className="bg-amber-500 text-zinc-900 font-black text-sm px-4 py-2 rounded-lg hover:bg-amber-400">
                      Vergelijkbare sessie boeken
                    </button>
                    <button onClick={() => setSelectedPhoto(null)} className="text-zinc-500 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Packages */}
      <section id="pakketten" className="py-24 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-2">Pakketten & Prijzen</h2>
            <p className="text-zinc-500">Inclusief onbeperkte bewerking. Transparant geprijsd.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(Object.entries(packages) as [keyof typeof packages, typeof packages.silver][]).map(([key, pkg]) => {
              const isActive = activePackage === key;
              return (
                <div
                  key={key}
                  onClick={() => setActivePackage(key)}
                  className={`rounded-2xl cursor-pointer transition-all overflow-hidden border ${isActive ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'border-zinc-800 hover:border-zinc-700'}`}
                >
                  <div className={`bg-gradient-to-br ${pkg.color} p-6`}>
                    {key === 'gold' && <div className="text-xs font-black text-amber-200 bg-amber-700/50 px-2 py-0.5 rounded-full inline-block mb-2">Populairst</div>}
                    <div className="text-xs font-black uppercase tracking-widest text-zinc-300 mb-1">{pkg.label}</div>
                    <div className="text-4xl font-black text-white">€{pkg.price}</div>
                  </div>
                  <div className="bg-zinc-900 p-6">
                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm text-zinc-400">
                          <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={onRequestQuote}
                      className={`w-full py-3 rounded-xl font-black text-sm transition-all ${isActive ? 'bg-amber-500 text-zinc-900 hover:bg-amber-400' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                    >
                      Pakket Aanvragen →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Shoot Draaiboek & Custom Quote Builder */}
          <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-black text-white">Stel Jouw Ideale Fotosessie Samen</h3>
                </div>
                <p className="text-xs text-zinc-400">
                  Combineer het {packages[activePackage].label} pakket met professionele cinema & print upgrades.
                </p>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Totaalprijs Indicatie:</span>
                <span className="text-3xl font-black text-amber-400">
                  €{(packages[activePackage].price + (includeSecondShooter ? 350 : 0) + (includeDroneVideo ? 225 : 0) + (includeLinenAlbum ? 195 : 0)).toLocaleString('nl-NL')}
                </span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">Inclusief BTW & nabewerking</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              <label className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 flex items-center justify-between gap-3 cursor-pointer hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeDroneVideo}
                    onChange={(e) => setIncludeDroneVideo(e.target.checked)}
                    className="rounded accent-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">4K Drone Luchtbeelden</span>
                    <span className="text-[10px] text-zinc-400">+€225 (cinema reel)</span>
                  </div>
                </div>
              </label>

              <label className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 flex items-center justify-between gap-3 cursor-pointer hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeSecondShooter}
                    onChange={(e) => setIncludeSecondShooter(e.target.checked)}
                    className="rounded accent-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">2e Fotograaf (Second Shooter)</span>
                    <span className="text-[10px] text-zinc-400">+€350 (alle hoeken)</span>
                  </div>
                </div>
              </label>

              <label className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 flex items-center justify-between gap-3 cursor-pointer hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeLinenAlbum}
                    onChange={(e) => setIncludeLinenAlbum(e.target.checked)}
                    className="rounded accent-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Luxe Linnen Album (30×30)</span>
                    <span className="text-[10px] text-zinc-400">+€195 (handgebonden)</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-800">
              <span className="text-xs text-zinc-400 font-medium">
                📍 Werkzaam in {city} en op locatie door heel Nederland & buitenland
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print Draaiboek (PDF)</span>
                </button>
                <button
                  onClick={onRequestQuote}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 text-xs font-black shadow-md cursor-pointer transition-all"
                >
                  Boek Deze Configuratie
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white mb-10 text-center">Wat klanten zeggen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-zinc-800/60 rounded-2xl p-6 border border-zinc-700">
                <div className="flex mb-3">
                  {[...Array(t.stars)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 italic mb-4">"{t.text}"</p>
                <div>
                  <div className="text-xs font-black text-white">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.type} shoot</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-2xl mx-auto text-center px-6">
          <Camera className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white mb-4">Jouw sessie inplannen?</h2>
          <p className="text-zinc-400 mb-8 text-lg">Stuur een berichtje voor beschikbaarheid en een offerte op maat.</p>
          <button
            onClick={onRequestQuote}
            className="bg-amber-500 text-zinc-900 font-black px-10 py-4 rounded-2xl hover:bg-amber-400 transition-colors text-lg mb-8"
          >
            Beschikbaarheid Checken
          </button>
          <div className="flex justify-center gap-6 text-zinc-500">
            <a href="mailto:info@lensverhaal.nl" className="flex items-center gap-2 hover:text-amber-400 transition-colors text-sm">
              <Mail className="w-4 h-4" /> info@lensverhaal.nl
            </a>
            <a href="tel:050-1234567" className="flex items-center gap-2 hover:text-amber-400 transition-colors text-sm">
              <Phone className="w-4 h-4" /> 050 - 123 45 67
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-amber-400 transition-colors text-sm">
              <InstaIcon className="w-4 h-4" /> @lensverhaal
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-zinc-600">
            <MapPin className="w-4 h-4" />
            <span>Gevestigd in {city} · door heel NL beschikbaar</span>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-8 text-center text-xs text-zinc-700">
        <p>© 2026 {brandName} Fotografie & Video · {city} · <span className="text-amber-400 font-bold">Fictief Demo Concept</span></p>
      </footer>
    </div>
  );
};
