'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Sparkles,
  Send,
  Globe,
  Layers,
  Award,
  Users,
  Sun,
  Moon,
  ExternalLink,
  X,
  Code2,
  TrendingUp,
  Sliders,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  client: string;
  cat: 'Web' | 'E-commerce' | 'Branding';
  tag: string;
  metric: string;
  image: string;
  summary: string;
  stack: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Van Dijk & Partners Architectuur',
    client: 'Van Dijk B.V.',
    cat: 'Web',
    tag: 'Next.js 16, Three.js 3D & Headless CMS',
    metric: '+180% Offerte-aanvragen',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    summary: 'Exclusieve portfoliobeleving voor een toonaangevend Amsterdams architectenbureau met vloeiende animaties en interactieve 3D gebouwentours.',
    stack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    id: 'p2',
    title: 'Nordic Clean Coffee Roasters',
    client: 'Nordic Coffee Co.',
    cat: 'E-commerce',
    tag: 'Shopify Plus, iDEAL & Klarna',
    metric: '€120k/mnd recurring omzet',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    summary: 'Direct-to-consumer koffie abonnementenplatform met gepersonaliseerde smaakquiz, herhaalleveringen en razor-sharp laadtijden onder 0.8s.',
    stack: ['Shopify Plus', 'Liquid', 'Tailwind', 'Mollie Payments'],
  },
  {
    id: 'p3',
    title: 'Vondelpark Yoga & Wellness Loft',
    client: 'Vondel Loft',
    cat: 'Branding',
    tag: 'Merkidentiteit & Boekingsplatform',
    metric: 'Dutch Design Award Nominee',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    summary: 'Complete rebrand inclusief typografie, fysieke signing, responsive website en geïntegreerd lesrooster met directe iDEAL-betalingen.',
    stack: ['Brand Identity', 'Next.js', 'Stripe', 'Figma'],
  },
  {
    id: 'p4',
    title: 'FinFlow B.V. Enterprise FinTech',
    client: 'FinFlow Europe',
    cat: 'Web',
    tag: 'Fintech SaaS Dashboard & Marketing',
    metric: '€4.2M Series A Ronde',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    summary: 'Enterprise B2B fintech landingsplatform met interactieve productdemo’s, compliance documentatie en veilige API documentatie portaal.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
  },
];

export const GrachtenWebAgency: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Branding' | 'Web' | 'E-commerce'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [estimateScope, setEstimateScope] = useState<'landing' | 'full' | 'shop'>('full');
  const [estimateDesign, setEstimateDesign] = useState<'standaard' | 'custom'>('custom');
  const [formSent, setFormSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredProjects =
    activeTab === 'All' ? PROJECTS : PROJECTS.filter((p) => p.cat === activeTab);

  // Estimator calculation
  const calculatedEstimate =
    (estimateScope === 'landing' ? 950 : estimateScope === 'full' ? 1850 : 2650) +
    (estimateDesign === 'custom' ? 450 : 0);

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-orange-500 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <Award className="w-3.5 h-3.5" />
        <span>Geselecteerd voor Best Dutch Agency 2026 • 100% Maatwerk Code zonder WordPress ballast</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            GW
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">GrachtenWeb Studio</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Keizersgracht Amsterdam • Digitaal Ontwerp</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#werk" className="hover:text-stone-900 transition-colors">Portfolio</a>
          <a href="#calculator" className="hover:text-stone-900 transition-colors">Kosten Calculator</a>
          <a href="#diensten" className="hover:text-stone-900 transition-colors">Onze Aanpak</a>
          <a href="#reviews" className="hover:text-stone-900 transition-colors">Reviews</a>
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

          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Start Project
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-100/60 via-stone-50 to-white py-14 sm:py-20 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Studio voor High-Impact Nederlandse Bedrijven</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Wij bouwen websites die <span className={theme.textPrimary}>jouw merk autoriteit geven</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Geen trage templates of standaard thema&apos;s. We combineren bekroond Amsterdams digitaal ontwerp met razendsnelle Next.js technologie en meetbare conversie.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={onRequestQuote}
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md flex items-center gap-2 cursor-pointer`}
            >
              <span>Vraag Vrijblijvende Offerte Aan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#werk"
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Bekijk Opgeleverde Cases
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span className="text-stone-800 font-extrabold">🚀 Next.js 16 &amp; Headless Architectuur</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">⚡ Google PageSpeed 98/100</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">🔒 100% AVG / GDPR Proof</span>
          </div>
        </div>
      </section>

      {/* Portfolio Grid with Interactive Filter Tabs */}
      <section id="werk" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Recent Opgeleverde Cases</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">Klik op een project voor de volledige casestudy</p>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-200/60 p-1.5 rounded-2xl text-xs font-bold">
            {(['All', 'Web', 'E-commerce', 'Branding'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-stone-900 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab === 'All' ? 'Alles' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-stone-100">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText} shadow-sm`}>
                    {proj.cat}
                  </span>
                  <span className="text-[10px] font-black bg-stone-900/80 backdrop-blur-md text-emerald-400 px-2.5 py-1 rounded-md">
                    {proj.metric}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-lg text-stone-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mb-3">{proj.tag}</p>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium mb-4">{proj.summary}</p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-800">
                  <span className="flex items-center gap-1.5 text-stone-500">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{proj.stack.slice(0, 2).join(' • ')}</span>
                  </span>
                  <span className="flex items-center gap-1 text-orange-600 font-black group-hover:translate-x-1 transition-transform">
                    <span>Bekijk Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Cost Estimator */}
      <section id="calculator" className={`py-12 sm:py-16 px-4 sm:px-8 ${theme.bgLight} border-t ${theme.borderLight}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="max-w-xl mx-auto mb-8">
            <Sliders className={`w-8 h-8 ${theme.textPrimary} mx-auto mb-2`} />
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Directe Project Indicatie</h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">Bereken direct een realistische prijsindicatie voor jouw nieuwe website</p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md text-left max-w-2xl mx-auto space-y-6">
            {/* Scope */}
            <div>
              <label className="text-xs font-black text-stone-700 block mb-2">Type Oplevering:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'landing', label: 'One-page Landing', price: 'Vanaf €950' },
                  { id: 'full', label: 'Corporate Website', price: 'Vanaf €1.850' },
                  { id: 'shop', label: 'E-commerce & iDEAL', price: 'Vanaf €2.650' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEstimateScope(item.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      estimateScope === item.id
                        ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25`
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-black text-xs text-stone-900 block">{item.label}</span>
                    <span className="text-[10px] text-stone-500">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Level */}
            <div>
              <label className="text-xs font-black text-stone-700 block mb-2">Design Niveau:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEstimateDesign('standaard')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    estimateDesign === 'standaard' ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200'
                  }`}
                >
                  <span className="font-black text-xs text-stone-900 block">Strakke Huisstijl</span>
                  <span className="text-[10px] text-stone-500">Bestaande branding & logo</span>
                </button>
                <button
                  onClick={() => setEstimateDesign('custom')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    estimateDesign === 'custom' ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200'
                  }`}
                >
                  <span className="font-black text-xs text-stone-900 block">Compleet Nieuwe Branding (+€450)</span>
                  <span className="text-[10px] text-emerald-700 font-bold">Inclusief typografie & animaties</span>
                </button>
              </div>
            </div>

            {/* Calculation Result */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500 font-bold block">Geschatte investering:</span>
                <span className="text-3xl font-black text-stone-900">€{calculatedEstimate.toLocaleString('nl-NL')}</span>
                <span className="text-xs text-stone-400 block font-medium">Oplevering binnen 2-3 weken</span>
              </div>
              <button
                onClick={onRequestQuote}
                className={`px-6 py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md cursor-pointer`}
              >
                Vraag Dit Project Aan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-56 w-full">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeText}`}>
                  {selectedProject.cat}
                </span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {selectedProject.metric}
                </span>
              </div>

              <h3 className="font-black text-xl text-stone-900 mb-2">{selectedProject.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium mb-4">{selectedProject.summary}</p>

              <div className="mb-6">
                <span className="text-[11px] font-black text-stone-400 uppercase tracking-wider block mb-1.5">
                  Gebruikte Technologieën:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((s, i) => (
                    <span key={i} className="text-xs font-bold px-2.5 py-1 bg-stone-100 rounded-lg text-stone-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onRequestQuote();
                  }}
                  className={`flex-1 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md cursor-pointer`}
                >
                  Bespreek Vergelijkbaar Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
