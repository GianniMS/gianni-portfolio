import type { MetadataRoute } from 'next'
import { getDetailItems, getProducts } from '@/lib/content'

const BASE = 'https://www.giannims.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [items, products] = await Promise.all([getDetailItems(), getProducts()])

  const details = items.map((i) => ({
    url: `${BASE}/experience/${i.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const productPages = products.flatMap((p) => [
    { url: `${BASE}/products/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 },
    ...(['support', 'privacy', 'terms'] as const)
      .filter((kind) => p[kind])
      .map((kind) => ({
        url: `${BASE}/products/${p.slug}/${kind}`,
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      })),
  ])

  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/products`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/experience`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    ...productPages,
    ...details,
  ]
}
