'use client'

import Link from 'next/link'
import { PortfolioItem } from '@/types'
import { useHover } from '@/context/HoverContext'

export default function ListItem({ item }: { item: PortfolioItem }) {
  const { setHoveredSlug } = useHover()

  const rowClass = 'flex justify-between text-sm py-0.5 w-full'

  if (item.link === 'external') {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
        <span>{item.title}</span>
        <span>{item.year}</span>
      </a>
    )
  }

  const category = item.category
  const href = `/${category === 'project' ? 'projects' : category === 'press' ? 'press' : 'awards'}/${item.slug}`

  return (
    <Link
      href={href}
      className={rowClass}
      onMouseEnter={() => setHoveredSlug(item.slug)}
      onMouseLeave={() => setHoveredSlug(null)}
    >
      <span>{item.title}</span>
      <span>{item.year}</span>
    </Link>
  )
}
