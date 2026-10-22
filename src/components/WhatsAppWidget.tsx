'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, CheckCircle2, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types/company';

interface WhatsAppWidgetProps {
  lang: Language;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check business hours: 09:00 - 19:00 Dutch local time
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const checkBusinessHours = () => {
      try {
        const now = new Date();
        const hourStr = now.toLocaleTimeString('nl-NL', {
          timeZone: 'Europe/Amsterdam',
          hour: '2-digit',
          hour12: false,
        });
        const hour = parseInt(hourStr, 10);
        setIsOnline(hour >= 9 && hour < 19);
      } catch {
        const h = new Date().getHours();
        setIsOnline(h >= 9 && h < 19);
      }
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000);
    return () => clearInterval(interval);
  }, []);

  const quickTemplates = [
    {
      id: 'new',
      label: '🚀 Nieuw Concept',
      text: 'Beste Samen Online, ik wil graag een vrijblijvende offerte aanvragen voor een nieuwe professionele bedrijfswebsite.',
    },
    {
      id: 'redesign',
      label: '🔄 Website Redesign',
      text: 'Beste Samen Online, ik heb al een bestaande website en wil deze graag laten moderniseren en versnellen naar Next.js.',
    },
    {
      id: 'hosting',
      label: '🌐 All-in Hosting & Domein',
      text: 'Beste Samen Online, ik heb een vraag over het All-in Webhosting & .NL Domein pakket (+€9,50/mnd).',
    },
    {
      id: 'general',
      label: '💬 Algemene Vraag',
      text: 'Beste Samen Online, wat is de geschatte levertijd en werkwijze voor mijn type bedrijf?',
    },
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!question.trim()) return;

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage(
        lang === 'nl' ? 'Vul een geldig e-mailadres in zodat we kunnen antwoorden.' : 'Please enter a valid email address.'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = new FormData();
      payload.append('access_key', '160db110-507f-40b0-910c-97b0a6bc2f9d');
      payload.append('name', 'Snelle Vraag Bezoeker');
      payload.append('email', email.trim());
      payload.append('message', `Vraag via de zwevende contactwidget:\n\n${question}`);
      payload.append('from_name', 'Samen Online Chat');
      payload.append('subject', `Nieuwe Snelle Vraag via Website (${email.trim()})`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (data.success) {
        setIsSent(true);
        setQuestion('');
        setTimeout(() => {
          setIsSent(false);
          setIsOpen(false);
        }, 4000);
      } else {
        setErrorMessage(data.message || 'Er is iets misgegaan. Probeer het opnieuw.');
      }
    } catch {
      setErrorMessage('Verbindingsfout. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end print:hidden">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-84 sm:w-96 bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border-2 border-orange-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-stone-900 dark:text-white transition-colors">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-700 to-amber-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-black text-sm">
                  SO
                </div>
                <span
                  className={`w-3 h-3 rounded-full border-2 border-white absolute bottom-0 right-0 ${
                    isOnline ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                ></span>
              </div>
              <div>
                <p className="font-black text-sm leading-tight text-white">Samen Online Direct</p>
                <div className="flex items-center gap-1 text-[11px] text-orange-100 font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  <span>
                    {isOnline
                      ? (lang === 'nl' ? 'Nu online (09:00 - 19:00) • Direct antwoord' : 'Online now (09:00 - 19:00) • Fast reply')
                      : (lang === 'nl' ? 'Bereikbaar: 09:00 - 19:00 • Reactie per mail' : 'Hours: 09:00 - 19:00 • Reply via email')}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/10 text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-stone-50 dark:bg-slate-900/90 space-y-3 transition-colors">
            {isSent ? (
              <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <p className="font-extrabold text-sm text-stone-900 dark:text-white">
                  {lang === 'nl' ? 'Vraag Verzonden!' : 'Message Sent!'}
                </p>
                <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
                  {lang === 'nl'
                    ? 'Bedankt! We hebben je vraag ontvangen en sturen je z.s.m. een reactie per e-mail.'
                    : 'Thank you! We received your question and will reply via email shortly.'}
                </p>
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-slate-950 p-3 rounded-2xl rounded-tl-none border border-stone-200 dark:border-slate-800 text-xs text-stone-700 dark:text-slate-300 leading-relaxed shadow-2xs">
                  {isOnline
                    ? (lang === 'nl'
                        ? '👋 Hoi! We zijn nu online. Heb je een vraag over een website, concept of prijs? Stel hem hier direct en je ontvangt snel antwoord.'
                        : '👋 Hi! We are online right now. Ask any question about a template or quote for a quick response.')
                    : (lang === 'nl'
                        ? '👋 Hoi! We zijn momenteel buiten onze openingstijden (bereikbaar tussen 09:00 en 19:00). Laat gerust je vraag en e-mail achter, dan beantwoorden we hem direct tijdens onze openingstijden!'
                        : '👋 Hi! We are currently outside operating hours (active between 09:00 and 19:00). Feel free to leave your question and email, and we will reply promptly!')}
                </div>

                {/* Quick topic buttons */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase tracking-wider block">
                    {lang === 'nl' ? 'Kies een onderwerp of typ zelf:' : 'Choose a topic or type message:'}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {quickTemplates.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setQuestion(t.text)}
                        className="text-left p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-[11px] font-bold text-stone-700 dark:text-slate-200 hover:text-orange-950 dark:hover:text-white border border-stone-200 dark:border-slate-700 hover:border-orange-200 transition-colors cursor-pointer truncate"
                        title={t.text}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-2 pt-1">
                  {errorMessage && (
                    <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[11px] font-bold border border-rose-200 dark:border-rose-800">
                      {errorMessage}
                    </div>
                  )}

                  <textarea
                    rows={2}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={lang === 'nl' ? 'Typ je vraag hier...' : 'Type your question here...'}
                    className="w-full p-2.5 bg-white dark:bg-slate-950 rounded-xl border border-stone-300 dark:border-slate-700 text-xs font-medium text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    required
                  />

                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'nl' ? 'Jouw e-mailadres...' : 'Your email address...'}
                      className="flex-1 px-3 py-2 bg-white dark:bg-slate-950 rounded-xl border border-stone-300 dark:border-slate-700 text-xs font-medium text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer shadow-sm transition-all shrink-0"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>Verstuur</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-xs shadow-xl shadow-orange-700/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title={
          isOnline
            ? (lang === 'nl' ? 'Stel een vraag (Nu online: 09:00 - 19:00)' : 'Ask a question (Online now: 09:00 - 19:00)')
            : (lang === 'nl' ? 'Laat een vraag achter (Bereikbaar: 09:00 - 19:00)' : 'Leave a question (Available: 09:00 - 19:00)')
        }
        aria-label={lang === 'nl' ? 'Stel een vraag' : 'Ask a question'}
      >
        {isOnline ? (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
        ) : (
          <span className="relative flex h-2.5 w-2.5">
            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-stone-300"></span>
          </span>
        )}
        <MessageCircle className="w-5 h-5 fill-white text-orange-700" />
        <span>
          {isOnline
            ? (lang === 'nl' ? 'Stel een Vraag' : 'Ask a Question')
            : (lang === 'nl' ? 'Vraag Achterlaten' : 'Leave a Question')}
        </span>
      </button>
    </div>
  );
};
