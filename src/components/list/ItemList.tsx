'use client'

import { useEffect, useRef } from 'react'
import { PortfolioItem } from '@/types'
import { getItemTimestamp } from '@/data/itemDates'
import { useImageBounds } from '@/context/ImageBoundsContext'
import ListSection from './ListSection'

export default function ItemList({
  items,
  widthClassName = 'w-48 md:w-72',
  scrollHeightClassName = 'md:h-[calc(100vh-220px)]',
}: {
  items: PortfolioItem[]
  widthClassName?: string
  scrollHeightClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { setListBounds } = useImageBounds()

  const byCategory = (cat: PortfolioItem['category']) =>
    items.filter((i) => i.category === cat).sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))

  useEffect(() => {
    const updateBounds = () => {
      if (!ref.current || ref.current.offsetParent === null) return
      const r = ref.current.getBoundingClientRect()
      setListBounds({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
    }
    updateBounds()
    window.addEventListener('resize', updateBounds)
    window.addEventListener('scroll', updateBounds)
    return () => {
      window.removeEventListener('resize', updateBounds)
      window.removeEventListener('scroll', updateBounds)
      setListBounds(null)
    }
  }, [setListBounds])

  return (
    <div
      ref={ref}
      className={`relative z-10 ${widthClassName} shrink-0 overflow-y-auto ${scrollHeightClassName}`}
    >
      <ListSection category="project" items={byCategory('project')} />
      <ListSection category="experience" items={byCategory('experience')} />
      <ListSection category="certificate" items={byCategory('certificate')} />
      <ListSection category="press" items={byCategory('press')} />
      <ListSection category="award" items={byCategory('award')} />
    </div>
  )
}
