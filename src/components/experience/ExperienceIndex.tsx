'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { imageSrc } from '@/lib/images'

export type IndexRow = {
  id: string
  title: string
  isPrivate: boolean
  year: string
  href: string
  external: boolean
  preview?: string
}

export type IndexSection = { label: string; rows: IndexRow[] }

const DEFAULT_TITLE = 'Experience'

// Positions are taken from the 427×556 stage in the design, so the title keeps
// crossing the stage's right edge at the same point at every width
const titleClass =
  'pointer-events-none absolute left-[48.5%] top-[67.6%] whitespace-nowrap text-[5.56vw] leading-none transition-opacity duration-800'

function Stage({ sections, active }: { sections: IndexSection[]; active: string | null }) {
  const previews = sections.flatMap((s) => s.rows).filter((row) => row.preview)
  const titles = [{ id: null, title: DEFAULT_TITLE }, ...previews]

  const shown = (id: string | null) => (id === active ? 'opacity-100' : 'opacity-0')

  return (
    <div className="relative aspect-[427/556] w-[24.7vw]">
      {/* The black title sits behind the stage, which paints its own copy in the
          background colour, so the colour flips exactly at the stage edge */}
      {titles.map((t) => (
        <p key={t.id ?? 'default'} aria-hidden className={`${titleClass} ${shown(t.id)}`}>
          {t.title}
        </p>
      ))}
      <div className="absolute inset-0 overflow-hidden bg-earth">
        {previews.map((row) => (
          <Image
            key={row.id}
            src={imageSrc(row.preview)}
            alt=""
            fill
            sizes="25vw"
            className={`object-cover transition-opacity duration-800 ${shown(row.id)}`}
          />
        ))}
        {titles.map((t) => (
          <p
            key={t.id ?? 'default'}
            aria-hidden
            className={`${titleClass} text-background ${shown(t.id)}`}
          >
            {t.title}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function ExperienceIndex({ sections }: { sections: IndexSection[] }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="md:flex md:items-start md:justify-between">
      <div className="hidden md:sticky md:top-[13.4vw] md:ml-7 md:mt-[13.4vw] md:block">
        <Stage sections={sections} active={hovered} />
      </div>

      <div className="mt-16 flex flex-col gap-[1lh] md:mt-36 md:items-end">
        {sections.map((section) => (
          <section
            key={section.label}
            className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 md:grid-cols-[auto_auto] md:text-right"
          >
            <h2 className="col-span-2 font-bold">{section.label}</h2>
            {section.rows.map((row) => {
              const preview = row.preview ? row.id : null
              return (
                <Link
                  key={row.id}
                  href={row.href}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onMouseEnter={() => setHovered(preview)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(preview)}
                  onBlur={() => setHovered(null)}
                  className="col-span-2 grid grid-cols-subgrid border-b border-transparent transition-colors duration-800 hover:border-foreground focus-visible:border-foreground focus-visible:outline-none"
                >
                  <span>
                    {row.title}
                    {row.isPrivate && ' (private)'}
                  </span>
                  <span className="text-right">{row.year}</span>
                </Link>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  )
}
