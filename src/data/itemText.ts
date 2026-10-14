import { PortfolioItem } from '@/types'

// Entries saved before the organization field had it typed into the title as
// "Title - Organization"; that split stands in until the field is filled.
export function splitTitle(item: PortfolioItem): { title: string; organization?: string } {
  if (item.organization) return { title: item.title, organization: item.organization }
  const split = item.title.lastIndexOf(' - ')
  if (split === -1) return { title: item.title }
  return { title: item.title.slice(0, split), organization: item.title.slice(split + 3) }
}

// Where clicking an entry goes: its detail page, unless it links out to another site
export function itemHref(item: PortfolioItem): string {
  if (item.link === 'external') return item.href
  return item.linkOut || `/experience/${item.slug}`
}
