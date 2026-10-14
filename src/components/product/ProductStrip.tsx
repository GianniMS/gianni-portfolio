'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { imageSrc } from '@/lib/images'

export default function ProductStrip({ name, images }: { name: string; images: string[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const [canSlide, setCanSlide] = useState({ back: false, forward: false })

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const update = () =>
      setCanSlide({
        back: list.scrollLeft > 1,
        forward: list.scrollLeft < list.scrollWidth - list.clientWidth - 1,
      })
    update()
    list.addEventListener('scroll', update, { passive: true })
    // Images widen the list as they load, so the items are watched as well as the list
    const observer = new ResizeObserver(update)
    observer.observe(list)
    for (const item of list.children) observer.observe(item)
    return () => {
      list.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  const slideTo = (end: 'start' | 'end') => {
    const list = listRef.current
    if (!list) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    list.scrollTo({
      left: end === 'start' ? 0 : list.scrollWidth,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }

  // Both arrows show whenever the strip can scroll at all; the one with nowhere to go dims
  const scrollable = canSlide.back || canSlide.forward
  const arrowClass = (active: boolean) =>
    `p-2.5 text-3xl leading-none transition-opacity duration-800 ${!scrollable ? 'opacity-0' : active ? 'opacity-100' : 'opacity-30'}`

  return (
    <div>
      {/* Bleeds to the screen edges so images scroll off the side rather than stop short */}
      <ul
        ref={listRef}
        className="-mx-2.5 flex snap-x scroll-px-2.5 gap-5 overflow-x-auto px-2.5 pb-2 md:-mx-5 md:scroll-px-5 md:px-5"
      >
        {images.map((src, i) => (
          <li key={src} className="shrink-0 snap-start">
            <Image
              src={imageSrc(src)}
              alt={`${name} image ${i + 1}`}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 480px, 80vw"
              className="h-64 w-auto max-w-none lg:h-80"
            />
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-between">
        <button
          type="button"
          onClick={() => slideTo('start')}
          aria-label="Slide back to the first image"
          className={arrowClass(canSlide.back)}
          disabled={!canSlide.back}
          inert={!scrollable}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => slideTo('end')}
          aria-label="Slide to the last image"
          className={arrowClass(canSlide.forward)}
          disabled={!canSlide.forward}
          inert={!scrollable}
        >
          →
        </button>
      </div>
    </div>
  )
}
