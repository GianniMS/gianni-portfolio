import type { MetadataRoute } from 'next'
import { getItems } from '@/lib/content'
import { categoryPath } from '@/data/categoryPaths'

const BASE = 'https://www.giannims.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getItems()

  const details = items
    .filter((item) => item.link === 'internal')
    .map((item) => ({
      url: `${BASE}/${categoryPath[item.category]}/${item.link === 'internal' ? item.slug : ''}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/cv`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    ...details,
  ]
}
