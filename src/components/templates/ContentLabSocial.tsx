'use client';

import React, { useState, useEffect } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  TrendingUp,
  BarChart2,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  Play,
  ArrowUpRight,
  Target,
  Sparkles,
  Clock,
  ChevronDown,
  Printer,
  FileText,
  X,
  Sliders,
  Calendar,
} from 'lucide-react';

// Minimal inline brand icons (not in this lucide-react version)
const InstaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  </svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
  </svg>
);

export const ContentLabSocial: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName?.trim() || 'ContentLab';
  const city = customCity?.trim() || 'Rotterdam';

  const [activeCase, setActiveCase] = useState(0);
  const [followerCount, setFollowerCount] = useState(12400);
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'linkedin' | 'tiktok' | 'youtube'>('instagram');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'tiktok']);
  const [includeVideoShoot, setIncludeVideoShoot] = useState(true);
  const [includeAdsManagement, setIncludeAdsManagement] = useState(false);
  const [showDossier, setShowDossier] = useState(false);
  const [dossierToken, setDossierToken] = useState('CL-AUDIT-2026-7731');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openDossier = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    setDossierToken(`CL-AUDIT-2026-${rand}`);
    setShowDossier(true);
  };

  const togglePlatform = (key: string) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(key)) {
        return prev.length > 1 ? prev.filter((p) => p !== key) : prev;
      } else {
        return [...prev, key];
      }
    });
  };

  const platformPriceMap: Record<string, number> = {
    instagram: 495,
    linkedin: 695,
    tiktok: 595,
    youtube: 895,
  };

  const rawPlatformsTotal = selectedPlatforms.reduce((sum, p) => sum + (platformPriceMap[p] || 0), 0);
  const bundleDiscount = selectedPlatforms.length >= 2 ? rawPlatformsTotal * 0.20 : 0;
  const discountedPlatformsTotal = rawPlatformsTotal - bundleDiscount;
  const videoShootCost = includeVideoShoot ? 350 : 0;
  const adsManagementCost = includeAdsManagement ? 250 : 0;
  const grandTotalMonthly = discountedPlatformsTotal + videoShootCost + adsManagementCost;
  const estimatedMonthlyReach = (selectedPlatforms.length * 75000) + (includeVideoShoot ? 50000 : 0) + (includeAdsManagement ? 120000 : 0);

  // Simulated live growth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFollowerCount((prev) => prev + Math.floor(Math.random() * 3 + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const darkMode = isDarkMode;
  const bg = darkMode ? 'bg-zinc-950' : 'bg-white';
  const bgCard = darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200';
  const textBase = darkMode ? 'text-slate-100' : 'text-slate-900';
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500';

  const caseStudies = [
    {
      client: 'FreshBrew Koffie', category: 'Instagram & TikTok',
      before: { followers: '1.2K', reach: '3K/mnd', orders: '12/mnd' },
      after: { followers: '28K', reach: '480K/mnd', orders: '340/mnd' },
      duration: '6 maanden',
      highlight: '+2.233% meer volgers',
      color: 'from-amber-500 to-orange-500',
    },
    {
      client: 'Rechtlijn Advocaten', category: 'LinkedIn',
      before: { followers: '320', reach: '800/mnd', orders: '2 leads/mnd' },
      after: { followers: '4.800', reach: '68K/mnd', orders: '31 leads/mnd' },
      duration: '4 maanden',
      highlight: '+1.400% meer bereik',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      client: 'YogaFlow Studio', category: 'Instagram & Youtube',
      before: { followers: '880', reach: '2.1K/mnd', orders: '6/mnd' },
      after: { followers: '19.2K', reach: '220K/mnd', orders: '89/mnd' },
      duration: '5 maanden',
      highlight: '+2.082% meer bereik',
      color: 'from-pink-500 to-purple-600',
    },
  ];

  const platformPackages = {
    instagram: {
      icon: <InstaIcon className="w-5 h-5" />, label: 'Instagram', color: 'from-pink-500 to-purple-600',
      services: ['12 posts/maand (Reels + Carousels)', 'Story strategie (5×/week)', 'Hashtag & SEO optimalisatie', 'Community management', 'Maandelijkse analytics report'],
      price: 495,
    },
    linkedin: {
      icon: <LinkedInIcon className="w-5 h-5" />, label: 'LinkedIn', color: 'from-blue-600 to-blue-700',
      services: ['8 thought leadership posts/mnd', 'Persoonlijk profiel optimalisatie', 'Lead-generatie campagne', 'DM follow-up scripts', 'B2B content kalender'],
      price: 695,
    },
    tiktok: {
      icon: <Play className="w-5 h-5" />, label: 'TikTok', color: 'from-zinc-900 to-zinc-700',
      services: ['12 video\'s/maand (scriptwriting + edit)', 'Trending sound & challenge monitoring', 'Virality growth hacking', 'FYP optimalisatie', 'Duet & reactie strategie'],
      price: 595,
    },
    youtube: {
      icon: <YoutubeIcon className="w-5 h-5" />, label: 'YouTube', color: 'from-red-600 to-rose-600',
      services: ['4 lange videos/maand (full prod)', 'Shorts strategie (8×/mnd)', 'SEO-geoptimaliseerde titels & tags', 'Thumbnail A/B testing', 'Monetisatie advies'],
      price: 895,
    },
  };

  const currentPkg = platformPackages[activePlatform];

  const faqs = [
    { q: 'Hoelang duurt het voordat ik resultaten zie?', a: 'De meeste klanten zien significante groei binnen 60-90 dagen. Organische social media groei kost tijd maar levert duurzame resultaten op — wij zetten in op kwaliteitsvolgers die echt converteren.' },
    { q: 'Maken jullie ook de content of alleen strategie?', a: 'Wij doen alles: van contentplanning, copywriting en grafisch ontwerp tot video-editing en publicatie. Jij hoeft nergens naar om te kijken tenzij je dat wilt.' },
    { q: 'Moet ik een lang contract tekenen?', a: 'We werken met minimaal 3 maanden (zo kunnen we een echte groeicurve bouwen). Daarna maandelijks opzegbaar per de 1e van de maand.' },
    { q: 'Kunnen jullie meerdere platforms tegelijk beheren?', a: 'Ja. We bieden multi-platform bundels met 20% korting. Veel klanten combineren Instagram + LinkedIn of TikTok + Instagram.' },
  ];

  return (
    <div className={`min-h-full font-sans ${bg} ${textBase} selection:bg-pink-600 selection:text-white`}>

      {/* Top bar */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 text-white text-center text-xs font-black py-1.5 tracking-wide">
        📈 Gratis social media audit: ontdek in 24 uur waar jouw groeikansen liggen →{' '}
        <button onClick={onRequestQuote} className="underline hover:no-underline">Claim jouw audit</button>
      </div>

      {/* Nav */}
      <nav className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between ${darkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-slate-100'}`}>
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-pink-500 to-orange-500 text-white p-1.5 rounded-lg">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="font-black text-base">{brandName}</span>
          <span className={`text-xs hidden sm:block ${textMuted}`}>Social Media Bureau</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-500">
          <a href="#resultaten" className="hover:text-pink-500 transition-colors">Resultaten</a>
          <a href="#diensten" className="hover:text-pink-500 transition-colors">Diensten</a>
          <a href="#werkwijze" className="hover:text-pink-500 transition-colors">Werkwijze</a>
        </div>
        <button onClick={onRequestQuote} className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-black text-xs px-4 py-2 rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all shadow-md">
          Gratis Audit →
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Social Media Bureau · {city}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black leading-tight tracking-tighter mb-6">
              Meer volgers.
              <span className="block bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                Meer omzet.
              </span>
              Echt resultaat.
            </h1>
            <p className={`text-lg ${textMuted} mb-8 leading-relaxed`}>
              {brandName} beheert Instagram, TikTok, LinkedIn en YouTube voor ambitieuze Nederlandse merken.
              Wij zorgen voor groei — jij focust op je business.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={onRequestQuote}
                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-black px-8 py-4 rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all shadow-lg flex items-center gap-2"
              >
                <Zap className="w-5 h-5" /> Gratis Social Audit
              </button>
              <button className={`flex items-center gap-2 font-bold px-6 py-4 rounded-xl border ${darkMode ? 'border-zinc-700 text-slate-300 hover:bg-zinc-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'} transition-colors`}>
                <Play className="w-4 h-4 text-pink-500" /> Bekijk cases
              </button>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 75+ tevreden klanten</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Gem. +320% bereikgroei</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> ROI-rapportage per maand</span>
            </div>
          </div>

          {/* Live follower growth widget */}
          <div className="space-y-4">
            <div className={`${bgCard} border rounded-2xl p-5 shadow-lg`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Live Groeisimulatie</div>
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-500">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </div>
              </div>

              {/* Simulated chart bars */}
              <div className="flex items-end gap-1 h-24 mb-3">
                {[45, 52, 48, 65, 71, 68, 80, 74, 88, 82, 95, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-pink-500 to-orange-400 opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-pink-500">{followerCount.toLocaleString('nl-NL')}</div>
                  <div className={`text-xs ${textMuted}`}>Actieve volgers (simulatie)</div>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-sm font-black">
                  <TrendingUp className="w-4 h-4" /> +18.3%
                </div>
              </div>
            </div>

            {/* Platform mini-stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { platform: 'Instagram', reach: '480K', icon: <InstaIcon className="w-4 h-4" />, color: 'from-pink-500 to-purple-500' },
                { platform: 'TikTok', reach: '1.2M', icon: <Play className="w-4 h-4" />, color: 'from-zinc-900 to-zinc-700' },
                { platform: 'LinkedIn', reach: '68K', icon: <LinkedInIcon className="w-4 h-4" />, color: 'from-blue-600 to-blue-700' },
                { platform: 'YouTube', reach: '220K', icon: <YoutubeIcon className="w-4 h-4" />, color: 'from-red-600 to-rose-500' },
              ].map((p) => (
                <div key={p.platform} className={`${bgCard} border rounded-xl p-3 flex items-center gap-3`}>
                  <div className={`bg-gradient-to-br ${p.color} text-white p-2 rounded-lg`}>{p.icon}</div>
                  <div>
                    <div className={`text-xs font-bold ${textBase}`}>{p.platform}</div>
                    <div className="text-xs text-emerald-500 font-black">{p.reach} bereik/mnd</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="resultaten" className={`py-16 ${darkMode ? 'bg-zinc-900' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Bewezen resultaten</span>
            <h2 className={`text-3xl font-black mt-1 ${textBase}`}>Klanten die wij lieten groeien</h2>
          </div>

          {/* Case tabs */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {caseStudies.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveCase(i)}
                className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${activeCase === i ? `bg-gradient-to-r ${c.color} text-white shadow-lg` : `${bgCard} border ${textMuted}`}`}
              >
                {c.client}
              </button>
            ))}
          </div>

          {(() => {
            const c = caseStudies[activeCase];
            return (
              <div className={`${bgCard} border rounded-2xl overflow-hidden shadow-lg`}>
                <div className={`bg-gradient-to-r ${c.color} p-6 text-white`}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">{c.category}</div>
                      <div className="text-2xl font-black">{c.client}</div>
                      <div className="text-sm opacity-80 mt-1">in {c.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black">{c.highlight.split(' ')[0]}</div>
                      <div className="text-sm opacity-80">{c.highlight.split(' ').slice(1).join(' ')}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 grid md:grid-cols-3 gap-4">
                  {(Object.keys(c.before) as (keyof typeof c.before)[]).map((metric) => (
                    <div key={metric} className={`${darkMode ? 'bg-zinc-800' : 'bg-slate-50'} rounded-xl p-4`}>
                      <div className={`text-xs font-black uppercase tracking-widest ${textMuted} mb-2 capitalize`}>{metric.replace('orders', 'Conversies')}</div>
                      <div className="flex items-center gap-3">
                        <div className={`text-sm font-medium ${textMuted} line-through`}>{c.before[metric]}</div>
                        <ArrowRight className="w-4 h-4 text-pink-500" />
                        <div className="text-lg font-black text-emerald-500">{c.after[metric]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Platform packages */}
      <section id="diensten" className={`py-16 ${darkMode ? 'bg-zinc-950' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Diensten</span>
            <h2 className={`text-3xl font-black mt-1 ${textBase}`}>Kies jouw platform</h2>
          </div>

          {/* Platform selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {(Object.entries(platformPackages) as [keyof typeof platformPackages, typeof platformPackages.instagram][]).map(([key, pkg]) => (
              <button
                key={key}
                onClick={() => setActivePlatform(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black transition-all ${activePlatform === key ? `bg-gradient-to-r ${pkg.color} text-white shadow-lg` : `${bgCard} border ${textMuted} hover:border-slate-300`}`}
              >
                {pkg.icon} {pkg.label}
              </button>
            ))}
          </div>

          <div className={`${bgCard} border rounded-2xl overflow-hidden shadow-lg`}>
            <div className={`bg-gradient-to-r ${currentPkg.color} p-6 text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">{currentPkg.icon}</div>
                <div>
                  <div className="text-xs font-black opacity-70 uppercase tracking-wider">{currentPkg.label} Pakket</div>
                  <div className="text-2xl font-black">€{currentPkg.price}<span className="text-base font-medium opacity-70">/maand</span></div>
                </div>
              </div>
              <button onClick={onRequestQuote} className="bg-white/20 hover:bg-white/30 font-black text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
                Aanvragen <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-3">
              {currentPkg.services.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className={textBase}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Platform Custom Package & ROI Builder */}
          <div className={`mt-10 ${bgCard} border rounded-2xl p-6 sm:p-8 shadow-lg`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sliders className="w-4 h-4 text-pink-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-pink-600">Interactieve Pakket Samensteller</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">Stel jouw ideale Social Media Mix samen</h3>
                <p className={`text-xs ${textMuted} mt-1`}>
                  Combineer 2 of meer kanalen voor automatisch 20% bundelkorting op jouw maandtarief
                </p>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-[10px] uppercase font-black text-slate-400 block">Verwacht Maandelijks Bereik</span>
                <span className="text-2xl font-black text-emerald-500">~{estimatedMonthlyReach.toLocaleString('nl-NL')} views</span>
              </div>
            </div>

            {/* Platform Selection Checkboxes */}
            <div className="mb-6">
              <label className="text-xs font-black block mb-3">Selecteer Jouw Kanalen:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'instagram', label: 'Instagram', icon: <InstaIcon className="w-4 h-4" />, price: 495 },
                  { key: 'tiktok', label: 'TikTok', icon: <Play className="w-4 h-4" />, price: 595 },
                  { key: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon className="w-4 h-4" />, price: 695 },
                  { key: 'youtube', label: 'YouTube', icon: <YoutubeIcon className="w-4 h-4" />, price: 895 },
                ].map((item) => {
                  const isSelected = selectedPlatforms.includes(item.key);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => togglePlatform(item.key)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/20 ring-2 ring-pink-500/20'
                          : `${bgCard} hover:border-slate-300`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={isSelected ? 'text-pink-600' : textMuted}>{item.icon}</div>
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                          isSelected ? 'bg-pink-500 text-white border-pink-500 font-bold' : 'border-slate-300'
                        }`}>
                          {isSelected && '✓'}
                        </div>
                      </div>
                      <div>
                        <span className="font-extrabold text-xs block">{item.label}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-pink-600 font-bold' : textMuted}`}>€{item.price}/mnd</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add-ons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setIncludeVideoShoot(!includeVideoShoot)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  includeVideoShoot
                    ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/20'
                    : `${bgCard} hover:border-slate-300`
                }`}
              >
                <div>
                  <span className="font-bold text-xs block">Videografie &amp; Shoot op locatie {city} (+€350/mnd)</span>
                  <span className={`text-[11px] ${textMuted}`}>Maandelijkse opnamedag door professionele videograaf</span>
                </div>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                  includeVideoShoot ? 'bg-pink-500 text-white border-pink-500 font-bold' : 'border-slate-300'
                }`}>
                  {includeVideoShoot && '✓'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIncludeAdsManagement(!includeAdsManagement)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  includeAdsManagement
                    ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/20'
                    : `${bgCard} hover:border-slate-300`
                }`}
              >
                <div>
                  <span className="font-bold text-xs block">Meta &amp; LinkedIn Ads Beheer (+€250/mnd)</span>
                  <span className={`text-[11px] ${textMuted}`}>Conversiecampagnes, doelgroeptargeting en wekelijkse split-tests</span>
                </div>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                  includeAdsManagement ? 'bg-pink-500 text-white border-pink-500 font-bold' : 'border-slate-300'
                }`}>
                  {includeAdsManagement && '✓'}
                </div>
              </button>
            </div>

            {/* Price calculation bar & CTAs */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className={`text-xs ${textMuted} font-bold block`}>
                  Totaal Maandtarief {bundleDiscount > 0 && <span className="text-emerald-500 font-black">(-20% Bundelkorting)</span>}:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-pink-600">€{Math.round(grandTotalMonthly).toLocaleString('nl-NL')}</span>
                  <span className={`text-xs ${textMuted} font-medium`}>/maand excl. BTW</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={openDossier}
                  className={`w-full sm:w-auto px-4 py-3 rounded-xl border ${darkMode ? 'border-zinc-700 hover:bg-zinc-800 text-slate-200' : 'border-slate-300 hover:bg-slate-100 text-slate-800'} text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors`}
                >
                  <Printer className="w-4 h-4 text-pink-500" />
                  <span>Print Groeiplan &amp; Audit (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-black text-xs shadow-md cursor-pointer transition-all"
                >
                  Vraag Dit Groeiplan Aan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`py-16 ${darkMode ? 'bg-zinc-900' : 'bg-slate-50'}`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className={`text-3xl font-black ${textBase} mb-8 text-center`}>Veelgestelde vragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`${bgCard} border rounded-xl overflow-hidden`}>
                <button
                  className={`w-full text-left flex items-center justify-between p-4 text-sm font-bold ${textBase}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown className={`w-4 h-4 text-pink-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className={`px-4 pb-4 text-sm ${textMuted}`}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-rose-500 to-orange-500 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-4xl font-black mb-4">Klaar om te groeien?</h2>
          <p className="text-rose-100 text-lg mb-8">Ontvang binnen 24 uur een gratis audit van jouw huidige social media.</p>
          <button onClick={onRequestQuote} className="bg-white text-pink-600 font-black px-10 py-4 rounded-2xl hover:bg-rose-50 transition-colors text-lg shadow-xl">
            Gratis Audit Aanvragen →
          </button>
          <p className="text-rose-200 text-xs mt-4">Gevestigd in {city} · 75+ tevreden klanten · Geen lange contracten</p>
        </div>
      </section>

      <footer className={`py-8 text-center text-xs border-t ${darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
        <p>© 2026 {brandName} Social Media Bureau · {city} · <span className="text-pink-500 font-bold">Fictief Demo Concept</span></p>
      </footer>

      {/* Printable Social Media Groeiplan Modal */}
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
            <div id="printable-groeiplan" className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-800 text-[10px] font-black tracking-wider uppercase">
                      Social Media Groeiplan
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Regio {city}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {brandName} • Strategisch Groeiplan &amp; Audit Dossier
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Content &amp; Community Studio • Dossier Referentie: <span className="font-mono font-bold text-slate-800">{dossierToken}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-block p-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <FileText className="w-8 h-8 mx-auto text-pink-600" />
                    <span className="text-[9px] font-mono text-slate-500 block mt-0.5">{dossierToken}</span>
                  </div>
                </div>
              </div>

              {/* Channels Breakdown */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-black">
                      <th className="py-2.5 px-4">Kanaal / Dienst</th>
                      <th className="py-2.5 px-4">Frequentie &amp; Specificatie</th>
                      <th className="py-2.5 px-4 text-right">Maandtarief</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedPlatforms.map((p) => {
                      const pkg = platformPackages[p as keyof typeof platformPackages];
                      return (
                        <tr key={p} className="font-medium text-slate-800">
                          <td className="py-2.5 px-4 font-bold text-slate-900 capitalize">{p}</td>
                          <td className="py-2.5 px-4 text-slate-600">{pkg ? pkg.services[0] : 'Volledig kanaalbeheer'}</td>
                          <td className="py-2.5 px-4 text-right font-black">€{platformPriceMap[p]}/mnd</td>
                        </tr>
                      );
                    })}
                    {bundleDiscount > 0 && (
                      <tr className="font-bold text-emerald-700 bg-emerald-50/50">
                        <td className="py-2 px-4" colSpan={2}>Multikanaal Bundelkorting (-20%)</td>
                        <td className="py-2 px-4 text-right">-€{bundleDiscount.toFixed(2)}/mnd</td>
                      </tr>
                    )}
                    {includeVideoShoot && (
                      <tr className="font-medium text-slate-800">
                        <td className="py-2.5 px-4 font-bold text-slate-900">Shoot op locatie</td>
                        <td className="py-2.5 px-4 text-slate-600">Professionele videograaf op locatie in {city}</td>
                        <td className="py-2.5 px-4 text-right font-black">€350/mnd</td>
                      </tr>
                    )}
                    {includeAdsManagement && (
                      <tr className="font-medium text-slate-800">
                        <td className="py-2.5 px-4 font-bold text-slate-900">Paid Ads Management</td>
                        <td className="py-2.5 px-4 text-slate-600">Meta &amp; LinkedIn advertentiebeheer &amp; A/B testing</td>
                        <td className="py-2.5 px-4 text-right font-black">€250/mnd</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Metrics & Scope Guarantee */}
              <div className="bg-pink-50/60 border border-pink-200 rounded-2xl p-4 space-y-1.5 text-xs text-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-800 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-pink-600" />
                  Geprojecteerde Groei &amp; Voorwaarden
                </span>
                <p>• <strong>Verwacht Bereik:</strong> ~{estimatedMonthlyReach.toLocaleString('nl-NL')} impressies per maand in jouw doelgroep.</p>
                <p>• <strong>Flexibele Voorwaarden:</strong> Na 3 maanden proefperiode maandelijks opzegbaar per de 1e van de maand.</p>
                <p>• <strong>Transparante Rapportage:</strong> Live dashboard + maandelijks video-evaluatiegesprek.</p>
              </div>

              {/* Total & Action Buttons */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">Maandelijks Investeringstotaal:</span>
                  <span className="text-2xl font-black text-pink-600">€{Math.round(grandTotalMonthly).toLocaleString('nl-NL')}</span>
                  <span className="text-xs text-slate-400 block font-medium">Exclusief BTW · Maandelijks gefactureerd</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDossier(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
                  >
                    Sluiten
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Groeiplan (PDF)</span>
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
