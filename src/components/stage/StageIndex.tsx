'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { imageSrc } from '@/lib/images'

export type IndexRow = {
  id: string
  title: string
  isPrivate: boolean
  year?: string
  href: string
  external: boolean
  // What the stage shows while this row is hovered; rows without one leave the default
  stage?: { title: string; image?: string }
}

export type IndexSection = { label: string; rows: IndexRow[] }

const rowLine =
  'border-b border-transparent transition-colors duration-800 group-hover:border-foreground group-focus-visible:border-foreground'

// Positions are taken from the 427×556 stage in the design, so the title keeps
// crossing the stage's right edge at the same point at every width. Its width is
// whatever the column leaves after the stage offset, so a long title wraps instead
// of running into the list.
const titleClass =
  'pointer-events-none absolute left-[48.5%] top-[67.6%] w-[calc(100cqw-1.75rem-11.98vw)] text-[5.56vw] leading-none transition-opacity duration-800'

function Stage({
  sections,
  active,
  defaultTitle,
}: {
  sections: IndexSection[]
  active: string | null
  defaultTitle: string
}) {
  const staged = sections
    .flatMap((s) => s.rows)
    .flatMap((row) => (row.stage ? [{ id: row.id, ...row.stage }] : []))
  const titles = [{ id: null, title: defaultTitle }, ...staged]

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
        {staged.map(
          (row) =>
            row.image && (
              <Image
                key={row.id}
                src={imageSrc(row.image)}
                alt=""
                fill
                sizes="25vw"
                className={`object-cover transition-opacity duration-800 ${shown(row.id)}`}
              />
            )
        )}
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

export default function StageIndex({
  sections,
  defaultTitle,
}: {
  sections: IndexSection[]
  // Shown on the stage while nothing with a preview is hovered
  defaultTitle: string
}) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="lg:flex lg:items-start lg:gap-10">
      <div className="@container hidden min-w-0 flex-1 lg:sticky lg:top-[13.4vw] lg:mt-[13.4vw] lg:block">
        <div className="ml-7">
          <Stage sections={sections} active={hovered} defaultTitle={defaultTitle} />
        </div>
      </div>

      <div className="mt-16 flex shrink-0 flex-col gap-[1lh] lg:mt-36 lg:items-end">
        {sections.map((section) => (
          <section
            key={section.label}
            className="grid grid-cols-[1fr_auto] gap-y-1.5 lg:grid-cols-[auto_auto] lg:text-right"
          >
            <h2 className="col-span-2 font-bold">{section.label}</h2>
            {section.rows.map((row) => {
              const preview = row.stage ? row.id : null
              return (
                <Link
                  key={row.id}
                  href={row.href}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onMouseEnter={() => setHovered(preview)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(preview)}
                  onBlur={() => setHovered(null)}
                  className="group col-span-2 grid grid-cols-subgrid focus-visible:outline-none"
                >
                  {/* The name hugs its text (padding stands in for the column gap) and the
                      year fills its column, so the underline runs from the start of the
                      name to the end of the year without crossing empty column space */}
                  <span className={`justify-self-start lg:justify-self-end ${row.year ? 'pr-6' : ''} ${rowLine}`}>
                    {row.title}
                    {row.isPrivate && ' (private)'}
                  </span>
                  <span className={`text-right ${rowLine}`}>{row.year}</span>
                </Link>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  )
}
