import { MetadataRoute } from 'next';
import { INITIAL_TEMPLATES } from '../src/data/templates';
import { CITIES_DATA } from '../src/data/cities';
import { ARTICLES_DATA } from '../src/data/articles';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://samenonline-web.github.io';

  const templateUrls = INITIAL_TEMPLATES.map((tmpl) => ({
    url: `${baseUrl}/demo/${tmpl.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const cityUrls = CITIES_DATA.map((city) => ({
    url: `${baseUrl}/locaties/${city.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const articleUrls = ARTICLES_DATA.map((article) => ({
    url: `${baseUrl}/kennisbank/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vragenlijst`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kennisbank`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    ...articleUrls,
    ...cityUrls,
    ...templateUrls,
  ];
}
