export type CategoryType = 
  | 'All'
  | 'Webshops & E-commerce'
  | 'Tech & SaaS'
  | 'Creative & Agencies'
  | 'Sustainable & Green'
  | 'Food & Hospitality'
  | 'Local Services & Healthcare';

export type ProvinceType =
  | 'All'
  | 'Noord-Holland'
  | 'Zuid-Holland'
  | 'Utrecht'
  | 'Noord-Brabant'
  | 'Gelderland'
  | 'Overijssel'
  | 'Groningen'
  | 'Friesland'
  | 'Drenthe'
  | 'Zeeland'
  | 'Limburg'
  | 'Flevoland';

export interface WebTemplate {
  id: string;
  name: string;
  subtitle: string;
  subtitleNl: string;
  description: string;
  descriptionNl: string;
  category: CategoryType;
  city: string;
  province: ProvinceType;
  priceTier: 'Starter' | 'Professional' | 'Custom Enterprise';
  estimatedBuildDays: number;
  features: string[];
  featuresNl: string[];
  badges: string[];
  rating: number;
  reviewCount: number;
  demoUrl?: string;
  logoBg: string;
  logoText: string;
  bannerGradient: string;
  isFeatured: boolean;
  idealReady: boolean;
  multilingual: boolean;
  highlightSnippet: string;
  highlightSnippetNl: string;
}

export type Language = 'nl' | 'en';
