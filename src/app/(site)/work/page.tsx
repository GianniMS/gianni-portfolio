import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { getItems } from '@/lib/content'
import SiteFooter from '@/components/layout/SiteFooter'
import { ItemRow, LIST_PAGE, ListPageTitle, ListSection, ListText } from '@/components/list/ItemList'
import PreviewList from '@/components/list/PreviewList'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { philosophy, projectOrder } from '@/data/work'
import { formatItemYear, getItemTimestamp, getItemYear } from '@/data/itemDates'
import type { PortfolioItem } from '@/types'

export const metadata: Metadata = pageMetadata({
  title: 'Work',
  description:
    'The work of Gianni Mendonça Semedo, full stack developer in Rotterdam: the projects he designed and built.',
  path: '/work',
})

// Experience and certificates live on the CV page
const WORK_CATEGORIES = CATEGORIES.filter((category) => category !== 'experience' && category !== 'certificate')

// Newest year first; within a year the hand-picked order, then anything else newest first
const rank = (item: PortfolioItem) => {
  const index = projectOrder.indexOf(item.id)
  return index === -1 ? Infinity : index
}
const byYearThenOrder = (a: PortfolioItem, b: PortfolioItem) =>
  getItemYear(b) - getItemYear(a) || rank(a) - rank(b) || getItemTimestamp(b) - getItemTimestamp(a)

export default async function WorkPage() {
  const items = await getItems()
  const sections = WORK_CATEGORIES.map((category) => ({
    category,
    items: items.filter((item) => item.category === category).sort(byYearThenOrder),
  })).filter((section) => section.items.length > 0)

  return (
    <>
      <div className={LIST_PAGE}>
        <ListPageTitle melt>Work</ListPageTitle>
        <ListSection title="Philosophy" melt>
          <ListText paragraphs={philosophy} melt />
        </ListSection>
        {sections.map(({ category, items }) => (
          <ListSection key={category} title={CATEGORY_LABELS[category]} melt>
            <PreviewList>
              <ul>
                {items.map((item) => (
                  <ItemRow key={item.id} item={item} lead={formatItemYear(item)} showTags melt />
                ))}
              </ul>
            </PreviewList>
          </ListSection>
        ))}
      </div>
      <SiteFooter />
    </>
  )
}
