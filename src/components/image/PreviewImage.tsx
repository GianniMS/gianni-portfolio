'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useHover } from '@/context/HoverContext'
import { useImageBounds } from '@/context/ImageBoundsContext'
import { PortfolioItem } from '@/types'

export default function PreviewImage({ items }: { items: PortfolioItem[] }) {
  const { hoveredSlug } = useHover()
  const { setPreviewBounds } = useImageBounds()
  const ref = useRef<HTMLDivElement>(null)

  const hovered = items.find(
    (i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.slug === hoveredSlug
  )

  useEffect(() => {
    if (!ref.current || !hovered) {
      setPreviewBounds(null)
      return
    }
    const r = ref.current.getBoundingClientRect()
    setPreviewBounds({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
  }, [hovered, setPreviewBounds])

  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {hovered && (
          <motion.div
            ref={ref}
            key={hovered.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[15%] left-[12%] w-[460px] h-[530px] z-10"
          >
            <Image
              src={`/${hovered.image}`}
              alt={hovered.title}
              fill
              className="object-cover"
              data-preview=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
