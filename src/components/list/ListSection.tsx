import { PortfolioItem } from '@/types'
import ListItem from './ListItem'

const LABELS: Record<PortfolioItem['category'], string> = {
  project: 'Projects',
  press: 'Press',
  award: 'Awards',
}

export default function ListSection({
  category,
  items,
}: {
  category: PortfolioItem['category']
  items: PortfolioItem[]
}) {
  return (
    <div className="mb-2">
      <p className="text-blue font-bold text-sm mb-1">{LABELS[category]}</p>
      {items.map((item) => (
        <ListItem key={item.title} item={item} />
      ))}
    </div>
  )
}
