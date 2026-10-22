'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Heart,
  AlertCircle,
  Loader2,
  MessageCircle,
  ArrowRight,
  Download,
  UploadCloud,
  Trash2,
  Image as ImageIcon,
  FileText,
} from 'lucide-react';
import { WebTemplate, Language } from '../types/company';
import { QuotePdfModal, QuotePdfData } from './QuotePdfModal';

interface RequestWebsiteModalProps {
  isOpen: boolean;
  selectedTemplate: WebTemplate | null;
  lang: Language;
  onClose: () => void;
  preferredTheme?: string;
  preferredFont?: string;
  initialCustomData?: {
    templateName: string;
    budget: string;
    notes: string;
  } | null;
}

export const RequestWebsiteModal: React.FC<RequestWebsiteModalProps> = ({
  isOpen,
  selectedTemplate,
  lang,
  onClose,
  preferredTheme,
  preferredFont,
  initialCustomData,
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    companyName: '',
    phone: '',
    templateName: '',
    budget: 'Vanaf €50 (Starter / Snelle Setup)',
    notes: '',
  });

  const [includeHosting, setIncludeHosting] = useState(true);
  const [projectType, setProjectType] = useState<'template' | 'redesign' | 'custom_plan'>('template');
  const [currentWebsiteUrl, setCurrentWebsiteUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isQuotePdfOpen, setIsQuotePdfOpen] = useState(false);

  // Logo & Sketch Drag-and-Drop state
  interface AttachmentItem {
    name: string;
    size: number;
    previewUrl?: string;
    type: string;
  }
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems: AttachmentItem[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        newItems.push({
          name: file.name,
          size: file.size,
          previewUrl,
          type: file.type,
        });
      } else {
        newItems.push({
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }
    });
    setAttachments((prev) => [...prev, ...newItems].slice(0, 5));
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const item = prev[index];
      if (item?.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    if (initialCustomData) {
      setFormData((prev) => ({
        ...prev,
        templateName: initialCustomData.templateName || prev.templateName,
        budget: initialCustomData.budget || prev.budget,
        notes: initialCustomData.notes || prev.notes,
      }));
      if (initialCustomData.notes?.includes('Zelf hosting regelen')) {
        setIncludeHosting(false);
      } else if (initialCustomData.notes?.includes('All-in Hosting')) {
        setIncludeHosting(true);
      }
      if (initialCustomData.templateName?.toLowerCase().includes('redesign')) {
        setProjectType('redesign');
      } else if (initialCustomData.templateName?.toLowerCase().includes('eigen ontwerp') || initialCustomData.templateName?.toLowerCase().includes('figma')) {
        setProjectType('custom_plan');
      }
    } else if (selectedTemplate) {
      setFormData((prev) => ({
        ...prev,
        templateName: selectedTemplate.name,
      }));
      setProjectType('template');
    } else {
      setFormData((prev) => ({ ...prev, templateName: 'Maatwerk Website Concept' }));
    }
  }, [selectedTemplate, initialCustomData]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = new FormData();
      payload.append('access_key', '160db110-507f-40b0-910c-97b0a6bc2f9d');
      payload.append('name', formData.clientName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone || 'Niet opgegeven');
      payload.append('company', formData.companyName || 'Particulier / Nieuw project');
      payload.append('template', formData.templateName);
      payload.append(
        'project_type',
        projectType === 'redesign'
          ? `Website Redesign (Bestaande site: ${currentWebsiteUrl || 'niet opgegeven'})`
          : projectType === 'custom_plan'
          ? 'Volledig Eigen Ontwerp / Schets / Figma'
          : `Gekozen Concept: ${formData.templateName}`
      );
      if (currentWebsiteUrl) {
        payload.append('existing_website_url', currentWebsiteUrl);
      }
      payload.append('theme_configuration', `Thema: ${preferredTheme || 'Standaard'}, Font: ${preferredFont || 'Standaard'}`);
      payload.append('hosting_plan', includeHosting ? 'Ja, All-in Webhosting & .NL Domein (+€9,50/mnd)' : 'Nee, regelt zelf hosting (€0/mnd)');
      payload.append('budget', formData.budget);
      const attachmentInfo =
        attachments.length > 0
          ? `\n[Bijgevoegd Materiaal (${attachments.length} bestand(en)): ${attachments
              .map((a) => `${a.name} (${Math.round(a.size / 1024)} KB)`)
              .join(', ')}]`
          : '';

      payload.append(
        'message',
        `${formData.notes || 'Geen extra toelichting'}\n\n[Gekozen Huisstijl: ${preferredTheme || 'Standaard'}, Font: ${preferredFont || 'Standaard'}]${attachmentInfo}`
      );
      payload.append('from_name', 'Samen Online');
      payload.append(
        'subject',
        `Nieuwe Website Aanvraag: ${formData.clientName} (${formData.templateName})`
      );

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.message ||
            (lang === 'nl'
              ? 'Er is iets misgegaan bij het versturen. Probeer het opnieuw.'
              : 'Something went wrong. Please try again.')
        );
      }
    } catch (err) {
      setErrorMessage(
        lang === 'nl'
          ? 'Verbindingsfout. Controleer je internetverbinding en probeer het opnieuw.'
          : 'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-100 dark:border-slate-800 flex flex-col cursor-default max-h-[92vh] text-stone-900 dark:text-slate-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 fill-white text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
              Samen Online Webdesign
            </span>
          </div>

          <h2 className="text-2xl font-black text-white">
            {lang === 'nl' ? 'Vraag een Website Aan' : 'Request a Custom Website'}
          </h2>
          <p className="text-xs text-orange-100 mt-1 font-medium">
            {lang === 'nl'
              ? 'Vrijblijvend advies & offerte voor jouw onderneming of project.'
              : 'Free quote & consultation for your web project.'}
          </p>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-white">
              {lang === 'nl' ? 'Aanvraag Succesvol Ontvangen!' : 'Request Sent Successfully!'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">
              {lang === 'nl'
                ? `Bedankt ${formData.clientName}! We hebben je gegevens ontvangen voor "${formData.templateName}". We nemen zo snel mogelijk (meestal binnen enkele uren) contact met je op.`
                : `Thank you ${formData.clientName}! We have received your inquiry for "${formData.templateName}". We will contact you as soon as possible.`}
            </p>

            {/* Reassurance Callout */}
            <div className="p-4 bg-orange-50 dark:bg-slate-950 rounded-2xl border border-orange-200 dark:border-slate-800 text-left space-y-2 mt-4">
              <div className="flex items-center gap-2 text-orange-950 dark:text-orange-300 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Wat gebeurt er nu?</span>
              </div>
              <ul className="text-[11px] text-stone-700 dark:text-slate-300 font-medium space-y-1 list-disc list-inside">
                <li>We bekijken jouw gekozen concept en wensen aandachtig.</li>
                <li>Je ontvangt binnen 24 uur een heldere reactie & vrijblijvende prijsindicatie per e-mail.</li>
                <li>Geen spam, geen ongewenste telefoontjes — jij behoudt de controle.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsQuotePdfOpen(true)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-700/20 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Offerte als PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer border border-stone-200 dark:border-slate-700"
              >
                Sluiten
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-stone-900 dark:text-slate-100">
            {/* Error Message if any */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Project Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 dark:text-slate-300 mb-1.5">
                {lang === 'nl' ? 'Wat voor project wil je starten?' : 'What type of project is this?'}
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setProjectType('template');
                    setFormData((prev) => ({ ...prev, templateName: selectedTemplate?.name || 'Voorbeeldconcept' }));
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    projectType === 'template'
                      ? 'bg-orange-700 text-white border-orange-700 shadow-xs'
                      : 'bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 border-stone-200 dark:border-slate-700'
                  }`}
                >
                  ✨ Concept
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProjectType('redesign');
                    setFormData((prev) => ({ ...prev, templateName: 'Bestaande Website Redesign' }));
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    projectType === 'redesign'
                      ? 'bg-orange-700 text-white border-orange-700 shadow-xs'
                      : 'bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 border-stone-200 dark:border-slate-700'
                  }`}
                >
                  🔄 Redesign
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProjectType('custom_plan');
                    setFormData((prev) => ({ ...prev, templateName: 'Volledig Eigen Ontwerp / Schets' }));
                  }}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    projectType === 'custom_plan'
                      ? 'bg-orange-700 text-white border-orange-700 shadow-xs'
                      : 'bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 border-stone-200 dark:border-slate-700'
                  }`}
                >
                  📐 Eigen Plan
                </button>
              </div>
            </div>

            {/* If Redesign: Current Website URL Input */}
            {projectType === 'redesign' && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 animate-in fade-in duration-150">
                <label className="block text-xs font-bold text-amber-950 dark:text-amber-300 mb-1">
                  {lang === 'nl' ? 'Huidige Website URL (optioneel):' : 'Current Website URL:'}
                </label>
                <input
                  type="text"
                  value={currentWebsiteUrl}
                  onChange={(e) => setCurrentWebsiteUrl(e.target.value)}
                  placeholder="Bijv. https://www.mijnbedrijf.nl"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-amber-300 dark:border-amber-700 rounded-lg text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-[10px] text-amber-800 dark:text-amber-400 font-medium block mt-1">
                  Wij bekijken je huidige site en sturen een voorstel om deze sneller en moderner te maken.
                </span>
              </div>
            )}

            {/* If Custom Plan Tip */}
            {projectType === 'custom_plan' && (
              <div className="p-3 bg-sky-50 dark:bg-slate-950 rounded-xl border border-sky-200 dark:border-slate-800 text-[11px] text-sky-950 dark:text-sky-300 font-medium animate-in fade-in duration-150">
                💡 <strong>Heb je al een schets, wireframe of Figma-bestand?</strong> Beschrijf jouw visie hieronder bij de toelichting of stuur je bestanden na de aanvraag mee. Wij bouwen het 1-op-1!
              </div>
            )}

            {/* Selected Template & Theme Config Badges (if template mode) */}
            {projectType === 'template' && (
              <div className="p-3 bg-orange-50/80 dark:bg-slate-950 rounded-2xl border border-orange-200 dark:border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-stone-600 dark:text-slate-400">{lang === 'nl' ? 'Gekozen Concept:' : 'Selected Concept:'}</span>
                  <span className="text-orange-700 dark:text-orange-400 font-black">{formData.templateName}</span>
                </div>
                {(preferredTheme || preferredFont) && (
                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-slate-400 font-medium pt-1 border-t border-orange-200/60 dark:border-slate-800">
                    <span>Huisstijl configuratie:</span>
                    <span className="font-bold text-stone-800 dark:text-slate-200">
                      {preferredTheme ? `Kleur: ${preferredTheme}` : ''} {preferredFont ? `• Font: ${preferredFont}` : ''}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 dark:text-slate-300 mb-1">
                {lang === 'nl' ? 'Jouw Naam *' : 'Your Name *'}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Bijv. Jan de Vries"
                className="w-full px-3.5 py-2.5 bg-orange-50/40 dark:bg-slate-950 border border-orange-200/80 dark:border-slate-700 rounded-xl text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 dark:text-slate-300 mb-1">
                  {lang === 'nl' ? 'E-mailadres *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jan@onderneming.nl"
                  className="w-full px-3.5 py-2.5 bg-orange-50/40 dark:bg-slate-950 border border-orange-200/80 dark:border-slate-700 rounded-xl text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 dark:text-slate-300 mb-1">
                  {lang === 'nl' ? 'Telefoonnummer' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Bijv. 06 12345678"
                  className="w-full px-3.5 py-2.5 bg-orange-50/40 dark:bg-slate-950 border border-orange-200/80 dark:border-slate-700 rounded-xl text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 dark:text-slate-300 mb-1">
                {lang === 'nl' ? 'Bedrijfsnaam / Projectnaam' : 'Company / Project Name'}
              </label>
              <input
                type="text"
                name="company"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Bijv. Bouwbedrijf De Vries of Nieuw Project"
                className="w-full px-3.5 py-2.5 bg-orange-50/40 dark:bg-slate-950 border border-orange-200/80 dark:border-slate-700 rounded-xl text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 dark:text-slate-300 mb-1">
                {lang === 'nl' ? 'Geschat Budget' : 'Estimated Budget'}
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-orange-50/40 dark:bg-slate-950 border border-orange-200/80 dark:border-slate-700 rounded-xl text-xs font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Message / Notes */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 dark:text-slate-300 mb-1">
                {lang === 'nl' ? 'Specifieke Wensen / Toelichting' : 'Notes / Project details'}
              </label>
              <textarea
                rows={3}
                name="message"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={
                  lang === 'nl'
                    ? 'Vertel kort wat je wilt bereiken met jouw nieuwe website...'
                    : 'Briefly describe what features you need...'
                }
                className="w-full px-3.5 py-2.5 bg-orange-50/40 dark:bg-slate-950 border border-orange-200/80 dark:border-slate-700 rounded-xl text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Logo & Schets Drag-and-Drop Preview Zone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-stone-700 dark:text-slate-300">
                {lang === 'nl' ? 'Logo, Schets of Wireframe (Optioneel)' : 'Logo, Sketch or Wireframe (Optional)'}
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
                  isDragging
                    ? 'border-orange-500 bg-orange-100/60 dark:bg-orange-950/40'
                    : 'border-orange-200 dark:border-slate-700 bg-orange-50/30 dark:bg-slate-950 hover:bg-orange-50/60 dark:hover:bg-slate-900'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-stone-800 dark:text-slate-200">
                    {lang === 'nl'
                      ? 'Sleep een logo of ontwerpschets hierheen, of klik om te kiezen'
                      : 'Drop your logo or wireframe here, or click to upload'}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-slate-400">
                    PNG, JPG, SVG of PDF (max. 5 bestanden)
                  </p>
                </div>
              </div>

              {/* Uploaded Previews */}
              {attachments.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-xs"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        {file.previewUrl ? (
                          <img
                            src={file.previewUrl}
                            alt={file.name}
                            className="w-8 h-8 rounded-lg object-cover border border-stone-200 dark:border-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-slate-700 text-orange-700 dark:text-orange-400 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                        <div className="truncate">
                          <p className="font-bold text-stone-800 dark:text-slate-200 truncate">{file.name}</p>
                          <p className="text-[10px] text-stone-500 dark:text-slate-400">
                            {Math.round(file.size / 1024)} KB
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAttachment(idx);
                        }}
                        className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                        title="Verwijder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Include Hosting Checkbox */}
            <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-800/80 cursor-pointer text-xs font-semibold text-emerald-950 dark:text-emerald-300">
              <input
                type="checkbox"
                checked={includeHosting}
                onChange={(e) => setIncludeHosting(e.target.checked)}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="font-extrabold block text-stone-900 dark:text-white">
                  {lang === 'nl'
                    ? 'All-in Webhosting & .NL Domein Verzorgen (+€9,50/mnd)'
                    : 'Include All-in Web Hosting & Domain (+€9.50/mo)'}
                </span>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-normal leading-tight block mt-0.5">
                  {lang === 'nl'
                    ? 'Ontzorgd op Nederlandse NVMe SSD-servers met gratis SSL en zakelijke e-mail (info@jouwbedrijf.nl).'
                    : 'Hosted on Dutch NVMe SSD servers with automated SSL and business email.'}
                </span>
              </div>
            </label>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-orange-700 hover:bg-orange-800 disabled:bg-orange-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-700/20 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'nl' ? 'Bezig met verzenden...' : 'Sending...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {lang === 'nl' ? 'Verstuur Vrijblijvende Aanvraag' : 'Send Free Consultation Request'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Quote PDF Modal */}
      <QuotePdfModal
        isOpen={isQuotePdfOpen}
        onClose={() => setIsQuotePdfOpen(false)}
        lang={lang}
        quoteData={{
          clientName: formData.clientName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          templateOrProjectType:
            projectType === 'redesign'
              ? 'Website Redesign (Bestaande site moderniseren)'
              : projectType === 'custom_plan'
              ? 'Eigen Ontwerp / Figma Schets'
              : formData.templateName || 'Samen Online Webdesign',
          selectedModules: includeHosting ? ['All-in Webhosting & .NL Domein (+€9,50/mnd)'] : ['Zelf hosting regelen (€0)'],
          hostingPlan: includeHosting ? 'managed' : 'self',
          basePrice: 195,
          addonsPrice: 0,
          totalPrice: 195,
          estimatedDays: 5,
        }}
      />
    </div>
  );
};
