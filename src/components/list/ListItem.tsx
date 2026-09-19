'use client'

import Link from 'next/link'
import { PortfolioItem } from '@/types'
import { useHover } from '@/context/HoverContext'
import CollisionText from '@/components/image/CollisionText'
import { categoryPath } from '@/data/categoryPaths'
import { getItemYear } from '@/data/itemDates'

export default function ListItem({ item }: { item: PortfolioItem }) {
  const { setHoveredSlug } = useHover()

  const rowClass = 'flex justify-between gap-3 text-sm py-0.5 w-full'
  const year = getItemYear(item)

  // Fixed columns on the right so the years stay aligned however the title wraps
  const meta = (
    <span className="flex shrink-0 gap-3">
      <span className="w-14 text-right">
        <CollisionText>{item.isPrivate ? 'Private' : 'Public'}</CollisionText>
      </span>
      <span className="w-10 text-right">
        <CollisionText>{year}</CollisionText>
      </span>
    </span>
  )

  if (item.link === 'external') {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
        <span className="min-w-0">
          <CollisionText>{item.title}</CollisionText>
        </span>
        {meta}
      </a>
    )
  }

  const href = `/${categoryPath[item.category]}/${item.slug}`

  return (
    <Link
      href={href}
      className={rowClass}
      onMouseEnter={() => setHoveredSlug(item.slug)}
      onMouseLeave={() => setHoveredSlug(null)}
    >
      <span className="min-w-0">
        <CollisionText>{item.title}</CollisionText>
      </span>
      {meta}
    </Link>
  )
}
