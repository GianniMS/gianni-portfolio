import { PortfolioItem } from '@/types'
import { getItemTimestamp } from '@/data/itemDates'
import ListSection from './ListSection'
import SocialsSection from './SocialsSection'

export default function ItemList({
  items,
  widthClassName = 'w-48 md:w-72',
  scrollHeightClassName = 'md:h-[calc(100vh-220px)]',
}: {
  items: PortfolioItem[]
  widthClassName?: string
  scrollHeightClassName?: string
}) {
  const byCategory = (cat: PortfolioItem['category']) =>
    items.filter((i) => i.category === cat).sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))

  return (
    <div
      className={`relative z-10 ${widthClassName} shrink-0 overflow-y-auto ${scrollHeightClassName}`}
    >
      <ListSection category="project" items={byCategory('project')} />
      <ListSection category="experience" items={byCategory('experience')} />
      <ListSection category="certificate" items={byCategory('certificate')} />
      <ListSection category="press" items={byCategory('press')} />
      <ListSection category="award" items={byCategory('award')} />
      <SocialsSection />
    </div>
  )
}
