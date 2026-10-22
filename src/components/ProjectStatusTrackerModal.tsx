'use client';

import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, Circle, ArrowRight, ShieldCheck, Search, Sparkles, MessageSquare } from 'lucide-react';
import { Language } from '../types/company';

interface ProjectStatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenContactModal: () => void;
}

interface ProjectPhase {
  number: number;
  title: string;
  desc: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  dateLabel: string;
}

export const ProjectStatusTrackerModal: React.FC<ProjectStatusTrackerModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenContactModal,
}) => {
  const [projectCode, setProjectCode] = useState('SO-2026-DEMO');
  const [searchedCode, setSearchedCode] = useState('SO-2026-DEMO');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const phases: ProjectPhase[] = [
    {
      number: 1,
      title: 'Intake, Conceptkeuze & Huisstijl',
      desc: 'Wensen afgestemd, concept vastgelegd, logo en bedrijfskleuren klaargezet.',
      status: 'completed',
      dateLabel: 'Voltooid op dag 1',
    },
    {
      number: 2,
      title: 'Next.js Bouw & Content Inrichting',
      desc: 'Teksten, afbeeldingen, mobiele responsive weergave en formulieren ingericht.',
      status: 'in_progress',
      dateLabel: 'Momenteel in uitvoering',
    },
    {
      number: 3,
      title: '.NL Domein, Zakelijke E-mail & Testlink',
      desc: 'Koppeling van het domein, SSL-certificaat en previewlink voor jouw finale controle.',
      status: 'upcoming',
      dateLabel: 'Gepland over 1 werkdag',
    },
    {
      number: 4,
      title: 'Officiële Livegang & Google Indexering',
      desc: 'Website staat live op internet en is direct vindbaar in Google Zoeken en Maps.',
      status: 'upcoming',
      dateLabel: 'Oplevering binnen 3 werkdagen',
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden flex flex-col cursor-default max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-orange-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
              Live Oplever Tracker
            </span>
          </div>

          <h2 className="text-2xl font-black">
            {lang === 'nl' ? 'Volg de Voortgang van Jouw Website' : 'Track Your Website Build Progress'}
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 mt-1 font-medium">
            {lang === 'nl'
              ? 'Transparantie in elke stap: van eerste intake tot de livegang op Google.'
              : 'Transparency in every phase: from initial intake to launch.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Project Code Search Box */}
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Jouw Referentienummer of Voorbeeldcode:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                placeholder="bijv. SO-2026-DEMO"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-orange-300 bg-white text-xs font-black uppercase text-stone-900 tracking-wider focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setSearchedCode(projectCode || 'SO-2026-DEMO')}
                className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Bekijk Status</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
              <span>Voorbeeldproject:</span>
              <button
                type="button"
                onClick={() => {
                  setProjectCode('SO-2026-DEMO');
                  setSearchedCode('SO-2026-DEMO');
                }}
                className="text-orange-700 font-bold underline cursor-pointer"
              >
                SO-2026-DEMO
              </button>
            </div>
          </div>

          {/* Active Status Badge */}
          <div className="p-4 rounded-2xl bg-stone-900 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Project Ref: {searchedCode}
              </span>
              <h4 className="font-black text-sm text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Fase 2 in Uitvoering: Next.js Bouw
              </h4>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              ~2 werkdagen tot livegang
            </span>
          </div>

          {/* Timeline */}
          <div className="space-y-4 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-stone-200">
            {phases.map((phase) => (
              <div key={phase.number} className="relative flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 z-10 border-2 ${
                  phase.status === 'completed'
                    ? 'bg-emerald-500 text-white border-white shadow-md'
                    : phase.status === 'in_progress'
                    ? 'bg-orange-500 text-white border-white shadow-md animate-pulse'
                    : 'bg-stone-100 text-stone-400 border-stone-300'
                }`}>
                  {phase.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{phase.number}</span>
                  )}
                </div>

                <div className={`flex-1 p-4 rounded-2xl border ${
                  phase.status === 'in_progress'
                    ? 'bg-orange-50/70 border-orange-300 shadow-xs'
                    : phase.status === 'completed'
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-stone-50 border-stone-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h5 className="font-black text-xs sm:text-sm text-stone-900">
                      {phase.title}
                    </h5>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block w-fit ${
                      phase.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : phase.status === 'in_progress'
                        ? 'bg-orange-100 text-orange-900 font-extrabold'
                        : 'bg-stone-200 text-stone-600'
                    }`}>
                      {phase.dateLabel}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {phase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Assistance Note */}
          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="font-bold text-xs text-stone-900 block">
                Heb je een vraag over jouw oplevering of wil je teksten toevoegen?
              </span>
              <span className="text-[11px] text-stone-500">
                Onze ontwerpers reageren meestal binnen enkele uren.
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContactModal();
              }}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold cursor-pointer transition-colors whitespace-nowrap"
            >
              Stel een Vraag
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
