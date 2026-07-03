import { PortfolioItem } from '@/types'
import ListSection from './ListSection'

export default function ItemList({ items }: { items: PortfolioItem[] }) {
  const byCategory = (cat: PortfolioItem['category']) =>
    items.filter((i) => i.category === cat)

  return (
    <div className="w-48 md:w-56 shrink-0">
      <ListSection category="project" items={byCategory('project')} />
      <ListSection category="press" items={byCategory('press')} />
      <ListSection category="award" items={byCategory('award')} />
    </div>
  )
}
