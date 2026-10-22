export type ColorThemeId = 'orange' | 'blue' | 'green' | 'purple' | 'dark' | 'red';

export interface ColorTheme {
  id: ColorThemeId;
  name: string;
  primary: string; // Tailwind class or hex
  primaryHover: string;
  bgLight: string;
  borderLight: string;
  textPrimary: string;
  badgeBg: string;
  badgeText: string;
  accentGradient: string;
}

export const COLOR_THEMES: Record<ColorThemeId, ColorTheme> = {
  orange: {
    id: 'orange',
    name: 'Nederlands Oranje',
    primary: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    bgLight: 'bg-orange-50/70',
    borderLight: 'border-orange-200',
    textPrimary: 'text-orange-600',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-900',
    accentGradient: 'from-orange-500 to-amber-500',
  },
  blue: {
    id: 'blue',
    name: 'Koninklijk Blauw',
    primary: 'bg-sky-600',
    primaryHover: 'hover:bg-sky-700',
    bgLight: 'bg-sky-50/70',
    borderLight: 'border-sky-200',
    textPrimary: 'text-sky-600',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-900',
    accentGradient: 'from-sky-500 to-indigo-600',
  },
  green: {
    id: 'green',
    name: 'Duurzaam Groen',
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    bgLight: 'bg-emerald-50/70',
    borderLight: 'border-emerald-200',
    textPrimary: 'text-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    accentGradient: 'from-emerald-500 to-teal-600',
  },
  purple: {
    id: 'purple',
    name: 'Luxe Paars & Indigo',
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    bgLight: 'bg-purple-50/70',
    borderLight: 'border-purple-200',
    textPrimary: 'text-purple-600',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900',
    accentGradient: 'from-purple-600 to-pink-600',
  },
  dark: {
    id: 'dark',
    name: 'Modern Zwart & Brons',
    primary: 'bg-stone-900',
    primaryHover: 'hover:bg-black',
    bgLight: 'bg-stone-100',
    borderLight: 'border-stone-300',
    textPrimary: 'text-stone-900',
    badgeBg: 'bg-stone-200',
    badgeText: 'text-stone-900',
    accentGradient: 'from-stone-800 to-stone-950',
  },
  red: {
    id: 'red',
    name: 'Energieke Robijn',
    primary: 'bg-rose-600',
    primaryHover: 'hover:bg-rose-700',
    bgLight: 'bg-rose-50/70',
    borderLight: 'border-rose-200',
    textPrimary: 'text-rose-600',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
    accentGradient: 'from-rose-500 to-orange-500',
  },
};

export type FontStyleId = 'sans' | 'serif' | 'rounded' | 'tech';

export interface FontStyle {
  id: FontStyleId;
  name: string;
  label: string;
  description: string;
  fontFamily: string;
}

export const FONT_STYLES: Record<FontStyleId, FontStyle> = {
  sans: {
    id: 'sans',
    name: 'Modern Sans',
    label: 'Aa Modern',
    description: 'Strak, fris & hedendaags',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  serif: {
    id: 'serif',
    name: 'Klassiek Serif',
    label: 'Aa Serif',
    description: 'Luxe, elegant & tijdloos',
    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
  },
  rounded: {
    id: 'rounded',
    name: 'Vriendelijk Rond',
    label: 'Aa Rond',
    description: 'Warm, toegankelijk & zacht',
    fontFamily: '"Segoe UI Rounded", "Quicksand", "Nunito", system-ui, -apple-system, sans-serif',
  },
  tech: {
    id: 'tech',
    name: 'Geometrisch / Tech',
    label: 'Aa Tech',
    description: 'SaaS, digitaal & zakelijk',
    fontFamily: '"Trebuchet MS", "Plus Jakarta Sans", "Century Gothic", "Segoe UI", sans-serif',
  },
};

