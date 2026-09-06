import CollisionText from '@/components/image/CollisionText'
import { PortfolioItem } from '@/types'

type InternalItem = Extract<PortfolioItem, { link: 'internal' }>

function formatDate(iso: string) {
  if (iso === 'Today') return iso
  const [year, month, day] = iso.split('-')
  return `${day}-${month}-${year}`
}

function formatItemDate(item: InternalItem) {
  return item.dateType === 'single'
    ? formatDate(item.date)
    : `${formatDate(item.dateStart)} - ${formatDate(item.dateEnd)}`
}

export default function ProjectPanel({ item }: { item: InternalItem }) {
  return (
    <div className="relative z-20 flex flex-col max-w-xs md:mt-12">
      <h1 className="text-blue font-bold text-lg leading-tight">
        <CollisionText>{item.title}</CollisionText>
      </h1>
      <p className="text-sm mb-3">
        <CollisionText>{formatItemDate(item)}</CollisionText>
      </p>
      <div className="flex flex-col gap-4">
        {item.description.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed whitespace-pre-line">
            <CollisionText>{paragraph}</CollisionText>
          </p>
        ))}
      </div>
      <p className="text-sm mt-4">
        <CollisionText>{`[${item.skills.join(', ')}]`}</CollisionText>
      </p>
    </div>
  )
}
