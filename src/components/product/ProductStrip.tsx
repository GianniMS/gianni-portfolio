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

  const arrowClass = (visible: boolean) =>
    `p-2.5 text-3xl leading-none transition-opacity duration-800 ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`

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
      <div className="mt-2 flex justify-between lg:pr-[calc(640px+2.5rem+10rem)]">
        <button
          type="button"
          onClick={() => slideTo('start')}
          aria-label="Slide back to the first image"
          className={arrowClass(canSlide.back)}
          inert={!canSlide.back}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => slideTo('end')}
          aria-label="Slide to the last image"
          className={arrowClass(canSlide.forward)}
          inert={!canSlide.forward}
        >
          →
        </button>
      </div>
    </div>
  )
}
