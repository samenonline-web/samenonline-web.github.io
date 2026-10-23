'use client';

import React from 'react';
import { ShieldCheck, Server, Lock, HeartHandshake, CreditCard, Award, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/company';

interface DutchCraftTrustBadgesProps {
  lang: Language;
}

export const DutchCraftTrustBadges: React.FC<DutchCraftTrustBadgesProps> = ({ lang }) => {
  const trustItems = [
    {
      icon: <Award className="w-5 h-5 text-orange-600 dark:text-blue-400" />,
      titleNl: '100% Nederlands Ambacht',
      titleEn: '100% Dutch Craftsmanship',
      descNl: 'Geen vage callcenters of offshore code. Direct contact met jouw vaste ontwikkelaar in Utrecht.',
      descEn: 'Direct contact with your dedicated Dutch web developer. No corporate bureaucracy.',
      tag: 'Handgemaakt',
    },
    {
      icon: <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      titleNl: 'Nederlandse NVMe Hosting',
      titleEn: 'Dutch NVMe Hosting',
      descNl: 'Supersnelle SSD-servers in Amsterdam & Utrecht met 99.9% uptime en gratis SSL certificaten.',
      descEn: 'Ultra-fast NVMe servers in Amsterdam & Utrecht with 99.9% uptime and automated SSL.',
      tag: 'Tier-3 Datacenter',
    },
    {
      icon: <Lock className="w-5 h-5 text-orange-600 dark:text-blue-400" />,
      titleNl: '100% AVG & Privacyveilig',
      titleEn: '100% GDPR Compliant',
      descNl: 'Geen agressieve trackers of privacyschendingen. Voldoet volledig aan de Europese privacywetgeving.',
      descEn: 'Zero intrusive ad tracking. Fully compliant with European privacy regulations.',
      tag: 'Cookieloos & Veilig',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-amber-600 dark:text-cyan-400" />,
      titleNl: 'Gratis Revisieronde',
      titleEn: 'Free Revision Round',
      descNl: 'We passen kleuren, logo en teksten aan tot je 100% trots bent op het eindresultaat.',
      descEn: 'We adjust layouts, branding, and copy until you are 100% proud of the launch.',
      tag: 'Tevredenheidsgarantie',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      titleNl: 'iDEAL & Mollie Ready',
      titleEn: 'iDEAL & Mollie Ready',
      descNl: 'Direct Nederlandse betaalmethoden (iDEAL, Bancontact, Klarna) zonder ingewikkelde contracten.',
      descEn: 'Native Dutch & European payment methods ready for immediate launch.',
      tag: 'Direct Afrekenen',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-orange-600 dark:text-blue-400" />,
      titleNl: '100% Jouw Code & Eigendom',
      titleEn: '100% Code Ownership',
      descNl: 'Geen wurgcontracten of platform lock-in zoals bij Wix of Shopify. De broncode is 100% van jou.',
      descEn: 'Zero vendor lock-in. You retain 100% legal ownership of your website and domain.',
      tag: 'Nul Lock-in',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border-2 border-orange-100/90 dark:border-slate-800 shadow-md transition-colors">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-blue-950/60 text-orange-800 dark:text-blue-300 border border-orange-200 dark:border-blue-800/60 text-xs font-black uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-blue-400" />
            <span>{lang === 'nl' ? 'Onze 6 Vaste Zekerheden' : 'Our 6 Core Guarantees'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            {lang === 'nl' ? 'Echt Nederlands Webwerk Zonder Verrassingen' : 'Authentic Dutch Web Craft With Zero Hidden Surprises'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium">
            {lang === 'nl'
              ? 'Transparante afspraken, snelle oplevering en volledige eigendomsrechten vanaf dag één.'
              : 'Transparent terms, rapid delivery, and complete source code ownership from day one.'}
          </p>
        </div>

        {/* 6 Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-orange-50/50 dark:bg-slate-800/50 border border-orange-100 dark:border-slate-700/80 hover:border-orange-300 dark:hover:border-slate-600 transition-all hover:-translate-y-1 shadow-2xs group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 dark:text-blue-300 bg-orange-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-sm font-black text-stone-900 dark:text-white mb-1.5">
                {lang === 'nl' ? item.titleNl : item.titleEn}
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-300 font-medium leading-relaxed">
                {lang === 'nl' ? item.descNl : item.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
