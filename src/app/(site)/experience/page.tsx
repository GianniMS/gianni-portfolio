import type { Metadata } from 'next'
import ExperienceIndex, { IndexSection } from '@/components/experience/ExperienceIndex'
import { getItems } from '@/lib/content'
import { CATEGORIES, CATEGORY_LABELS, PREVIEW_CATEGORIES } from '@/data/categories'
import { formatItemYear, getItemTimestamp } from '@/data/itemDates'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Projects, experience, certificates, awards and press of Gianni Mendonça Semedo.',
  alternates: { canonical: '/experience' },
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
        title: item.title,
        isPrivate: Boolean(item.isPrivate),
        year: formatItemYear(item),
        href: item.link === 'internal' ? `/experience/${item.slug}` : item.href,
        external: item.link === 'external',
        preview:
          item.link === 'internal' && PREVIEW_CATEGORIES.includes(category)
            ? item.detailImage || item.image
            : undefined,
      })),
  })).filter((section) => section.rows.length > 0)

  return (
    <div className="px-2.5 pb-20 md:px-5">
      <h1 className="sr-only">Experience</h1>
      <ExperienceIndex sections={sections} />
    </div>
  )
}
