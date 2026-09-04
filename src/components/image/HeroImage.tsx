'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'

export default function HeroImage({
  src,
  alt,
  layoutId = 'hero',
  priority = false,
}: {
  src: string
  alt: string
  layoutId?: string
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { setHeroBounds } = useImageBounds()

  const updateBounds = () => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) return
    setHeroBounds({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
  }

  useEffect(() => {
    updateBounds()
    window.addEventListener('resize', updateBounds)
    window.addEventListener('scroll', updateBounds)
    return () => {
      window.removeEventListener('resize', updateBounds)
      window.removeEventListener('scroll', updateBounds)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHeroBounds])

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      onLayoutAnimationComplete={updateBounds}
      className="relative w-full aspect-[966/669] shrink-0 bg-blue"
    >
      <Image
        src={src.startsWith('http') ? src : `/${src}`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 80vw, 900px"
        priority={priority}
        className="object-cover"
        data-hero=""
      />
    </motion.div>
  )
}
