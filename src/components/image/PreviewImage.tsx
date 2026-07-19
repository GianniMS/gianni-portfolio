'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'
import { useHover } from '@/context/HoverContext'
import { useImageBounds } from '@/context/ImageBoundsContext'
import { PortfolioItem } from '@/types'
import { categoryPath } from '@/data/categoryPaths'

export const PORTRAIT_HOVER_SLUG = '__portrait__'
const PORTRAIT_SRC = 'images/portrait.jpg'

type PreviewSource = { slug: string; image: string; title: string }

export default function PreviewImage({ items }: { items: PortfolioItem[] }) {
  const { hoveredSlug } = useHover()
  const { setPreviewBounds } = useImageBounds()
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  const matched = items.find(
    (i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.slug === hoveredSlug
  )
  const isSelected = matched && pathname === `/${categoryPath[matched.category]}/${matched.slug}`

  const isPortraitHover = hoveredSlug === PORTRAIT_HOVER_SLUG
  const portraitAlreadyShown = pathname === '/' || pathname === '/cv'

  const hovered: PreviewSource | undefined = useMemo(() => {
    if (isPortraitHover) {
      return portraitAlreadyShown
        ? undefined
        : { slug: PORTRAIT_HOVER_SLUG, image: PORTRAIT_SRC, title: 'Gianni Mendonça Semedo' }
    }
    return isSelected ? undefined : matched
  }, [isPortraitHover, portraitAlreadyShown, isSelected, matched])

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
            className="absolute top-[4%] left-[12%] w-full aspect-[966/669] z-[5]"
          >
            <Image
              src={`/${hovered.image}`}
              alt={hovered.title}
              fill
              sizes="(max-width: 768px) 80vw, 900px"
              className="object-cover"
              data-preview=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
