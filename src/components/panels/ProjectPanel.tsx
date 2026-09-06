import CollisionText from '@/components/image/CollisionText'
import { PortfolioItem } from '@/types'

type InternalItem = Extract<PortfolioItem, { link: 'internal' }>

// Anything that is not an ISO date passes through, so "Today" survives
function yearOf(value: string) {
  return /^\d{4}/.test(value) ? value.slice(0, 4) : value
}

function formatItemDate(item: InternalItem) {
  if (item.dateType === 'single') return yearOf(item.date)
  const start = yearOf(item.dateStart)
  const end = yearOf(item.dateEnd)
  return start === end ? start : `${start} - ${end}`
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
      {item.skills.length > 0 && (
        <p className="text-sm mt-4">
          <CollisionText>{item.skills.join(', ')}</CollisionText>
        </p>
      )}
    </div>
  )
}
