import CollisionText from '@/components/image/CollisionText'
import { PortfolioItem } from '@/types'

type InternalItem = Extract<PortfolioItem, { link: 'internal' }>

export default function ProjectPanel({ item }: { item: InternalItem }) {
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h1 className="text-blue font-bold text-lg leading-tight">
        <CollisionText>{item.title}</CollisionText>
      </h1>
      <p className="text-sm">
        <CollisionText>{item.date}</CollisionText>
      </p>
      <p className="text-sm leading-relaxed">
        <CollisionText>{item.description}</CollisionText>
      </p>
    </div>
  )
}
