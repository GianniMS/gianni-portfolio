import type { Metadata } from 'next'
import ExperienceIndex, { IndexRow, IndexSection } from '@/components/experience/ExperienceIndex'
import { PortfolioItem } from '@/types'
import { getItems } from '@/lib/content'
import {
  CATEGORIES,
  CATEGORY_LABELS,
  ORGANIZATION_CATEGORIES,
  PREVIEW_CATEGORIES,
} from '@/data/categories'
import { formatItemYear, getItemTimestamp } from '@/data/itemDates'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Projects, experience, certificates, awards and press of Gianni Mendonça Semedo.',
  alternates: { canonical: '/experience' },
}

// Entries saved before the organization field had it typed into the title as
// "Title - Organization"; that suffix stands in until the field is filled.
function organizationOf(item: PortfolioItem): string | undefined {
  if (item.organization) return item.organization
  const split = item.title.lastIndexOf(' - ')
  return split === -1 ? undefined : item.title.slice(split + 3)
}

function listTitle(item: PortfolioItem): string {
  return item.organization ? `${item.title} - ${item.organization}` : item.title
}

// Private work never shows its image: the stage stays the earth square, titled Private
function stageFor(item: PortfolioItem): IndexRow['stage'] {
  if (ORGANIZATION_CATEGORIES.includes(item.category)) {
    const organization = organizationOf(item)
    return organization ? { title: organization } : undefined
  }
  if (!PREVIEW_CATEGORIES.includes(item.category)) return undefined
  if (item.isPrivate) return { title: 'Private' }
  if (item.link !== 'internal') return undefined
  return { title: item.title, image: item.detailImage || item.image || undefined }
}

export default async function ExperiencePage() {
  const items = await getItems()

  const sections: IndexSection[] = CATEGORIES.map((category) => ({
    label: CATEGORY_LABELS[category],
    rows: items
      .filter((i) => i.category === category)
      .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))
      .map((item) => ({
        id: item.id,
        title: listTitle(item),
        isPrivate: Boolean(item.isPrivate),
        year: formatItemYear(item),
        href: item.link === 'internal' ? `/experience/${item.slug}` : item.href,
        external: item.link === 'external',
        stage: stageFor(item),
      })),
  })).filter((section) => section.rows.length > 0)

  return (
    <div className="px-2.5 pb-20 md:px-5">
      <h1 className="sr-only">Experience</h1>
      <ExperienceIndex sections={sections} />
    </div>
  )
}
