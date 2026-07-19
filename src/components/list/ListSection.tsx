import { PortfolioItem } from '@/types'
import ListItem from './ListItem'
import CollisionText from '@/components/image/CollisionText'

const LABELS: Record<PortfolioItem['category'], string> = {
  project: 'Projects',
  experience: 'Experience',
  certificate: 'Certificates',
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
      <p className="text-blue font-bold text-sm mb-1">
        <CollisionText>{LABELS[category]}</CollisionText>
      </p>
      {items.map((item) => (
        <ListItem key={item.title} item={item} />
      ))}
    </div>
  )
}
