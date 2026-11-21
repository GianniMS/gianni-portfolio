import type { MetadataRoute } from 'next'
import { getDetailItems } from '@/lib/content'

const BASE = 'https://www.giannims.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getDetailItems()

  const details = items.map((i) => ({
    url: `${BASE}/work/${i.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/work`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/cv`, changeFrequency: 'monthly', priority: 0.9 },
    ...details,
  ]
}
