'use client'

import Link from 'next/link'
import { PortfolioItem } from '@/types'
import { useHover } from '@/context/HoverContext'
import CollisionText from '@/components/image/CollisionText'
import { categoryPath } from '@/data/categoryPaths'
import { getItemYear } from '@/data/itemDates'

export default function ListItem({ item }: { item: PortfolioItem }) {
  const { setHoveredSlug } = useHover()

  const rowClass = 'flex justify-between text-sm py-0.5 w-full'
  const year = getItemYear(item)

  if (item.link === 'external') {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
        <CollisionText crossColor="var(--color-background)">{item.title}</CollisionText>
        <CollisionText crossColor="var(--color-background)">{year}</CollisionText>
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
      <CollisionText crossColor="var(--color-background)">{item.title}</CollisionText>
      <CollisionText crossColor="var(--color-background)">{year}</CollisionText>
    </Link>
  )
}
