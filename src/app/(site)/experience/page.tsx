import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import StageIndex, { IndexRow, IndexSection } from '@/components/stage/StageIndex'
import { PortfolioItem } from '@/types'
import { getItems } from '@/lib/content'
import {
  CATEGORIES,
  CATEGORY_LABELS,
  ORGANIZATION_STAGE_CATEGORIES,
  PREVIEW_CATEGORIES,
} from '@/data/categories'
import { formatItemDuration, formatItemYear, getItemTimestamp } from '@/data/itemDates'
import { itemHref, splitTitle } from '@/data/itemText'

export const metadata: Metadata = pageMetadata({
  title: 'Experience',
  description:
    'Projects, work experience, certificates, awards and press of Gianni Mendonça Semedo, full stack developer in Rotterdam.',
  path: '/experience',
})

function listTitle(item: PortfolioItem): string {
  const { title, organization } = splitTitle(item)
  if (!organization) return title
  return `${title} ${item.category === 'experience' ? '|' : '-'} ${organization}`
}

function stageFor(item: PortfolioItem): IndexRow['stage'] {
  const { title, organization } = splitTitle(item)
  if (ORGANIZATION_STAGE_CATEGORIES.includes(item.category)) {
    return organization ? { title: organization } : undefined
  }
  if (!PREVIEW_CATEGORIES.includes(item.category)) return undefined
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
        href: itemHref(item),
        external: item.link === 'external' || Boolean(item.linkOut),
        stage: stageFor(item),
      })),
  })).filter((section) => section.rows.length > 0)

  return (
    <>
      <h1 className="sr-only">Experience</h1>
      <StageIndex sections={sections} defaultTitle="Experience" fadeIn />
    </>
  )
}
