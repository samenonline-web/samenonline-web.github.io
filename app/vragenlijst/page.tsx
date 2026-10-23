import type { Metadata } from 'next';
import { VragenlijstPageClient } from '../../src/components/VragenlijstPageClient';

export const metadata: Metadata = {
  title: 'Website Keuzehulp & Vragenlijst | Vind Jouw Ideale Website | Samen Online',
  description: 'Beantwoord 5 gerichte vragen over jouw branche, doel en gewenste functies en ontvang direct een advies op maat met vaste all-in prijs zonder verborgen kosten.',
  alternates: {
    canonical: 'https://samenonline-web.github.io/vragenlijst',
  },
  openGraph: {
    title: 'Website Keuzehulp & Vragenlijst | Samen Online',
    description: 'Binnen 2 minuten helderheid over de beste website-oplossing en vaste prijsindicatie voor jouw onderneming.',
    url: 'https://samenonline-web.github.io/vragenlijst',
    siteName: 'Samen Online',
    locale: 'nl_NL',
    type: 'website',
  },
};

export default function VragenlijstPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://samenonline-web.github.io/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Website Keuzehulp',
            item: 'https://samenonline-web.github.io/vragenlijst',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wat gebeurt er nadat ik de vragenlijst heb afgerond?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Je krijgt direct op je scherm een helder overzicht van het aanbevolen pakket met de vaste all-in richtprijs. Als je op Offerte Aanvragen klikt, nemen we binnen 4 uur contact met je op om eventuele specifieke wensen door te spreken.',
            },
          },
          {
            '@type': 'Question',
            name: 'Zit ik ergens aan vast na het invullen van deze vragen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nee, absoluut niet. De vragenlijst en de offerte zijn 100% vrijblijvend. Pas wanneer jij akkoord geeft op ons definitieve voorstel en de live demo van jouw concept, gaan we voor je aan de slag.',
            },
          },
          {
            '@type': 'Question',
            name: 'Hoe snel kan mijn website daadwerkelijk live staan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gemiddeld staat jouw website binnen 3 tot 5 werkdagen volledig operationeel online, inclusief domeinnaam, zakelijke e-mail, Google SEO en mobiele optimalisatie.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VragenlijstPageClient />
    </>
  );
}
