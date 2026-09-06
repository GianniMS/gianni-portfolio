import { PortfolioItem } from '@/types'
import { CATEGORY_LABELS } from '@/data/categories'
import ListItem from './ListItem'
import CollisionText from '@/components/image/CollisionText'

export default function ListSection({
  category,
  items,
}: {
  category: PortfolioItem['category']
  items: PortfolioItem[]
}) {
  if (items.length === 0) return null

  return (
    <div className="mb-2">
      <p className="text-blue font-bold text-sm mb-1">
        <CollisionText>{CATEGORY_LABELS[category]}</CollisionText>
      </p>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  )
}
