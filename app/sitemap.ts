import { MetadataRoute } from 'next';
import { INITIAL_TEMPLATES } from '../src/data/templates';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://samenonline-web.github.io';

  const templateUrls = INITIAL_TEMPLATES.map((tmpl) => ({
    url: `${baseUrl}/demo/${tmpl.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...templateUrls,
  ];
}
