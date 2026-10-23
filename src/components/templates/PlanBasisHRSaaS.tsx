'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Users,
  Clock,
  BarChart2,
  CheckCircle,
  ArrowRight,
  Bell,
  Settings,
  Layers,
  TrendingUp,
  Calendar,
  Shield,
  Zap,
  ChevronDown,
  Star,
  Phone,
  Mail,
  Globe,
} from 'lucide-react';

export const PlanBasisHRSaaS: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName?.trim() || 'PlanBasis';
  const city = customCity?.trim() || 'Utrecht';

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [teamSize, setTeamSize] = useState(12);
  const [activePlan, setActivePlan] = useState<'starter' | 'business' | 'enterprise'>('business');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [rosterWeek] = useState([
    { name: 'Emma v.d. Berg', role: 'Klantenservice', days: [true, true, false, true, true, false, false], hours: 32 },
    { name: 'Tom Jansen', role: 'Verkoop', days: [true, false, true, true, true, false, false], hours: 36 },
    { name: 'Nathalie Smit', role: 'Operations', days: [false, true, true, true, false, true, false], hours: 28 },
    { name: 'Bas de Groot', role: 'IT Support', days: [true, true, true, false, true, false, false], hours: 40 },
  ]);

  const yearlyDiscount = 0.2;
  const plans = {
    starter: { base: 29, label: 'Starter', seats: 10, features: ['Tot 10 medewerkers', 'Roosterplanning', 'Verlofregistratie', 'E-mail support'] },
    business: { base: 59, label: 'Business', seats: 50, features: ['Tot 50 medewerkers', 'Alles van Starter', 'Integraties: Exact, AFAS', 'Verlof-goedkeuringsflow', 'Real-time roosternotificaties', 'Prioriteit support'] },
    enterprise: { base: 99, label: 'Enterprise', seats: 999, features: ['Onbeperkt medewerkers', 'SSO & Active Directory', 'Custom workflows', 'Dedicated account manager', 'SLA 99.9% uptime garantie', 'On-premise optie'] },
  };

  const getPrice = (base: number) => billingCycle === 'yearly' ? Math.round(base * (1 - yearlyDiscount)) : base;

  const integrations = ['Exact Online', 'AFAS', 'Nmbrs', 'Unit4', 'Slack', 'Teams', 'Google Cal', 'Outlook'];

  const faqs = [
    { q: 'Kan ik PlanBasis uitproberen zonder creditcard?', a: 'Ja, je kunt 14 dagen volledig gratis proberen zonder creditcard. Na die periode kies je een passend abonnement of stop je simpelweg.' },
    { q: 'Hoe werkt de koppeling met Exact Online?', a: 'PlanBasis synchroniseert via de Exact REST API automatisch personeelsmutaties, verlofuren en werkplanning. Setup duurt minder dan 10 minuten met onze stap-voor-stap wizard.' },
    { q: 'Voldoet PlanBasis aan de AVG?', a: 'Ja. Alle data wordt versleuteld opgeslagen op Nederlandse servers (ISO 27001 datacenter in Amsterdam). We zijn volledig AVG-compliant en verwerkersovereenkomsten zijn standaard inbegrepen.' },
    { q: 'Wat als mijn team groeit boven ons abonnement?', a: 'Je kunt op elk moment upgraden. Upgraden gaat direct in; je betaalt alleen de prorata meerprijs voor de resterende maand.' },
  ];

  const darkMode = isDarkMode;
  const bg = darkMode ? 'bg-slate-950' : 'bg-slate-50';
  const bgCard = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const textBase = darkMode ? 'text-slate-100' : 'text-slate-900';
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const navBg = darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200';

  return (
    <div className={`min-h-full font-sans ${bg} ${textBase} selection:bg-violet-600 selection:text-white`}>

      {/* Nav */}
      <nav className={`sticky top-0 z-40 ${navBg} backdrop-blur-md border-b px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-2.5">
          <div className="bg-violet-600 text-white p-1.5 rounded-lg">
            <Users className="w-4 h-4" />
          </div>
          <span className="font-black text-base tracking-tight">{brandName}</span>
          <span className="text-xs px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full font-bold hidden sm:inline-block">HR & Roosterplanning SaaS</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-500">
          <a href="#demo" className="hover:text-violet-600 transition-colors">Live Demo</a>
          <a href="#prijzen" className="hover:text-violet-600 transition-colors">Prijzen</a>
          <a href="#integraties" className="hover:text-violet-600 transition-colors">Integraties</a>
          <a href="#faq" className="hover:text-violet-600 transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-2">
          <button className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'} transition-colors`}>
            Inloggen
          </button>
          <button
            onClick={onRequestQuote}
            className="text-xs font-black px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            14 Dagen Gratis →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-black px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5" /> Nieuw: Automatische integratie met Nmbrs payroll
        </div>
        <h1 className={`text-5xl sm:text-7xl font-black tracking-tighter mb-6 ${textBase}`}>
          Personeelsplanning
          <span className="block text-violet-600">zonder gedoe</span>
        </h1>
        <p className={`text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${textMuted}`}>
          {brandName} is het MKB-vriendelijke HR-platform dat roosterplanning, verlofregistratie en loonkoppeling in één dashboard combineert.
          Gebouwd voor Nederlandse teams.
        </p>

        {/* Team size slider */}
        <div className={`max-w-md mx-auto ${bgCard} border rounded-2xl p-6 mb-8 text-left`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-bold ${textBase}`}>Hoe groot is jouw team?</span>
            <span className="text-violet-600 font-black text-lg">{teamSize} personen</span>
          </div>
          <input
            type="range" min={2} max={200} value={teamSize}
            onChange={(e) => setTeamSize(+e.target.value)}
            className="w-full accent-violet-600 mb-4"
          />
          <div className={`text-xs ${textMuted}`}>
            Aanbevolen plan voor {teamSize} personen:
            <span className="text-violet-600 font-black ml-1">
              {teamSize <= 10 ? 'Starter' : teamSize <= 50 ? 'Business' : 'Enterprise'} — 
              €{teamSize <= 10 ? getPrice(29) : teamSize <= 50 ? getPrice(59) : getPrice(99)}/mnd
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={onRequestQuote}
            className="bg-violet-600 text-white font-black px-8 py-4 rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2 text-base"
          >
            Gratis 14 Dagen Proberen <ArrowRight className="w-5 h-5" />
          </button>
          <button className={`border ${darkMode ? 'border-slate-700 text-slate-300' : 'border-slate-200 text-slate-700'} font-bold px-6 py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2`}>
            <Phone className="w-4 h-4" /> Bel met sales
          </button>
        </div>

        {/* Social proof */}
        <div className={`flex flex-wrap justify-center items-center gap-6 text-xs ${textMuted}`}>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Geen creditcard vereist</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> AVG-compliant, NL servers</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Binnen 5 min operationeel</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 van 320+ bedrijven</span>
        </div>
      </section>

      {/* Live roster demo */}
      <section id="demo" className={`py-16 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Interactieve Preview</span>
            <h2 className={`text-3xl font-black mt-1 ${textBase}`}>Zo ziet jouw rooster eruit</h2>
          </div>

          {/* Dashboard mockup */}
          <div className={`rounded-2xl border overflow-hidden shadow-2xl ${bgCard}`}>
            {/* App chrome */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className={`text-xs font-medium ${textMuted} ml-2`}>app.planbasis.nl/rooster</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className={`w-4 h-4 ${textMuted}`} />
                <Settings className={`w-4 h-4 ${textMuted}`} />
                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-black">A</div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className={`grid md:grid-cols-4 min-h-64`}>
              {/* Sidebar */}
              <div className={`border-r ${darkMode ? 'border-slate-700 bg-slate-850' : 'border-slate-100 bg-slate-50'} p-4 hidden md:block`}>
                <div className={`text-xs font-black uppercase tracking-widest ${textMuted} mb-3`}>Menu</div>
                {['Dashboard', 'Rooster', 'Verlof', 'Medewerkers', 'Rapporten', 'Instellingen'].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 text-xs font-medium py-1.5 px-2 rounded-lg mb-0.5 cursor-pointer ${i === 1 ? 'bg-violet-100 text-violet-700 font-bold' : `${textMuted} hover:bg-slate-100`}`}
                  >
                    {i === 0 && <BarChart2 className="w-3.5 h-3.5" />}
                    {i === 1 && <Calendar className="w-3.5 h-3.5 text-violet-600" />}
                    {i === 2 && <Clock className="w-3.5 h-3.5" />}
                    {i === 3 && <Users className="w-3.5 h-3.5" />}
                    {i === 4 && <TrendingUp className="w-3.5 h-3.5" />}
                    {i === 5 && <Settings className="w-3.5 h-3.5" />}
                    {item}
                  </div>
                ))}
              </div>

              {/* Main roster */}
              <div className="md:col-span-3 p-4 overflow-x-auto">
                <div className={`text-xs font-black ${textBase} mb-3`}>Week 43 — Oktober 2026</div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className={`${textMuted} border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                      <th className="text-left py-2 pr-4 font-medium w-40">Medewerker</th>
                      {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((d) => (
                        <th key={d} className="text-center py-2 px-1 font-medium w-10">{d}</th>
                      ))}
                      <th className="text-right py-2 pl-2 font-medium">Uren</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rosterWeek.map((emp, i) => (
                      <tr key={i} className={`border-b ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                        <td className="py-2 pr-4">
                          <div className={`font-bold ${textBase} truncate`}>{emp.name}</div>
                          <div className={`${textMuted} text-[10px]`}>{emp.role}</div>
                        </td>
                        {emp.days.map((worked, di) => (
                          <td key={di} className="text-center py-2 px-1">
                            {worked ? (
                              <div className="w-6 h-6 bg-violet-100 border border-violet-300 rounded text-violet-700 font-black flex items-center justify-center text-[10px] mx-auto">✓</div>
                            ) : (
                              <div className="w-6 h-6 rounded border border-slate-200 mx-auto" />
                            )}
                          </td>
                        ))}
                        <td className={`text-right py-2 pl-2 font-black ${textBase}`}>{emp.hours}u</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={onRequestQuote} className="mt-4 text-xs font-black text-violet-600 hover:text-violet-700 flex items-center gap-1">
                  Volledig dashboard openen <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integraties" className={`py-16 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Naadloze koppelingen</span>
          <h2 className={`text-3xl font-black mt-1 mb-8 ${textBase}`}>Werkt met jouw bestaande tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((name) => (
              <div key={name} className={`${bgCard} border rounded-xl px-4 py-3 font-bold text-sm ${textBase} flex items-center gap-2`}>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="prijzen" className={`py-16 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-black ${textBase} mb-2`}>Transparante Prijzen</h2>
            <div className={`inline-flex items-center gap-1 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border rounded-xl p-1`}>
              {(['monthly', 'yearly'] as const).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${billingCycle === cycle ? 'bg-violet-600 text-white' : textMuted}`}
                >
                  {cycle === 'monthly' ? 'Maandelijks' : 'Jaarlijks −20%'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(Object.entries(plans) as [keyof typeof plans, typeof plans.starter][]).map(([key, plan]) => {
              const isActive = activePlan === key;
              return (
                <div
                  key={key}
                  onClick={() => setActivePlan(key)}
                  className={`rounded-2xl border cursor-pointer transition-all p-6 ${isActive ? 'border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.15)]' : darkMode ? 'border-slate-700' : 'border-slate-200'} ${bgCard}`}
                >
                  {key === 'business' && (
                    <div className="bg-violet-100 text-violet-700 text-xs font-black px-3 py-0.5 rounded-full inline-block mb-4">Meest gekozen</div>
                  )}
                  <div className={`text-xs font-black uppercase tracking-widest ${textMuted} mb-1`}>{plan.label}</div>
                  <div className={`text-4xl font-black ${textBase} mb-0.5`}>€{getPrice(plan.base)}</div>
                  <div className={`text-xs ${textMuted} mb-5`}>per maand · tot {plan.seats === 999 ? '∞' : plan.seats} medewerkers</div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-start gap-2 text-sm ${textMuted}`}>
                        <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={onRequestQuote}
                    className={`w-full py-3 rounded-xl font-black text-sm transition-all ${isActive ? 'bg-violet-600 text-white hover:bg-violet-700' : darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    Kies {plan.label} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-16 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
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
                  <ChevronDown className={`w-4 h-4 text-violet-600 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className={`px-4 pb-4 text-sm ${textMuted}`}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="py-20 bg-violet-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Shield className="w-10 h-10 mx-auto mb-4 opacity-70" />
          <h2 className="text-4xl font-black mb-4">Start vandaag gratis</h2>
          <p className="text-violet-200 text-lg mb-8">Geen creditcard. Geen verplichtingen. In 5 minuten live.</p>
          <button onClick={onRequestQuote} className="bg-white text-violet-700 font-black px-10 py-4 rounded-2xl hover:bg-violet-50 transition-colors text-lg">
            14 Dagen Gratis Proberen →
          </button>
          <p className="text-violet-300 text-xs mt-4">Gebruikt door 320+ Nederlandse MKB-bedrijven · Gevestigd in {city}</p>
        </div>
      </section>

      <footer className={`py-8 text-center text-xs border-t ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
        <p>© 2026 {brandName} – HR & Roosterplanning SaaS · {city} · <span className="text-violet-500 font-bold">Fictief Demo Concept</span></p>
      </footer>
    </div>
  );
};
