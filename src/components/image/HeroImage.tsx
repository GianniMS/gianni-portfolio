'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'

export default function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { setHeroBounds } = useImageBounds()

  useEffect(() => {
    const update = () => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      setHeroBounds({ top: r.top, left: r.left, bottom: r.bottom, right: r.right })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [setHeroBounds])

  return (
    <motion.div
      ref={ref}
      layoutId="hero"
      className="relative w-[420px] h-[490px] shrink-0"
    >
      <Image src={`/${src}`} alt={alt} fill className="object-cover" data-hero="" />
    </motion.div>
  )
}
