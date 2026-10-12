'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { imageSrc } from '@/lib/images'

export default function ProductStrip({ name, images }: { name: string; images: string[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const [canSlide, setCanSlide] = useState(false)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const update = () => setCanSlide(list.scrollLeft < list.scrollWidth - list.clientWidth - 1)
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

  const slideToEnd = () => {
    const list = listRef.current
    if (!list) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    list.scrollTo({ left: list.scrollWidth, behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <div>
      {/* The end padding lets the last image scroll clear of the reading column */}
      <ul
        ref={listRef}
        className="-mx-2.5 flex snap-x gap-5 overflow-x-auto px-2.5 pb-2 md:-mx-5 md:px-5 lg:mx-0 lg:pr-[calc(640px+2.5rem)] lg:pl-0"
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
      <div className="mt-2 text-right lg:pr-[calc(640px+2.5rem)]">
        <button
          type="button"
          onClick={slideToEnd}
          aria-label="Slide to the last image"
          className={`p-2.5 text-3xl leading-none transition-opacity duration-800 ${canSlide ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          inert={!canSlide}
        >
          →
        </button>
      </div>
    </div>
  )
}
