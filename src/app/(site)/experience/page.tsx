import type { Metadata } from 'next'
import ExperienceIndex, { IndexRow, IndexSection } from '@/components/experience/ExperienceIndex'
import { PortfolioItem } from '@/types'
import { getItems } from '@/lib/content'
import {
  CATEGORIES,
  CATEGORY_LABELS,
  ORGANIZATION_STAGE_CATEGORIES,
  PREVIEW_CATEGORIES,
} from '@/data/categories'
import { formatItemDuration, formatItemYear, getItemTimestamp } from '@/data/itemDates'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Projects, experience, certificates, awards and press of Gianni Mendonça Semedo.',
  alternates: { canonical: '/experience' },
}

// Entries saved before the organization field had it typed into the title as
// "Title - Organization"; that split stands in until the field is filled.
function splitTitle(item: PortfolioItem): { title: string; organization?: string } {
  if (item.organization) return { title: item.title, organization: item.organization }
  const split = item.title.lastIndexOf(' - ')
  if (split === -1) return { title: item.title }
  return { title: item.title.slice(0, split), organization: item.title.slice(split + 3) }
}

function listTitle(item: PortfolioItem): string {
  const { title, organization } = splitTitle(item)
  if (!organization) return title
  return `${title} ${item.category === 'experience' ? '|' : '-'} ${organization}`
}

// Private work never shows its image: the stage stays the earth square, titled Private
function stageFor(item: PortfolioItem): IndexRow['stage'] {
  const { title, organization } = splitTitle(item)
  if (ORGANIZATION_STAGE_CATEGORIES.includes(item.category)) {
    return organization ? { title: organization } : undefined
  }
  if (!PREVIEW_CATEGORIES.includes(item.category)) return undefined
  if (item.isPrivate) return { title: 'Private' }
  if (item.link !== 'internal') return { title }
  return { title, image: item.detailImage || item.image || undefined }
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
        year: category === 'experience' ? formatItemDuration(item) : formatItemYear(item),
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
