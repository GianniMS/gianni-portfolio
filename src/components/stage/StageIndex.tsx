'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Stage, StageLayout } from './Stage'

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

const TYPE_STEP_MS = 150

export default function StageIndex({
  sections,
  defaultTitle,
  typeDefaultTitle = false,
}: {
  sections: IndexSection[]
  // Shown on the stage while nothing with a preview is hovered
  defaultTitle: string
  // Types the default title out one character per step when the page opens
  typeDefaultTitle?: boolean
}) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [typed, setTyped] = useState(typeDefaultTitle ? 0 : defaultTitle.length)

  useEffect(() => {
    if (!typeDefaultTitle || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => {
      setTyped((n) => {
        if (n + 1 >= defaultTitle.length) clearInterval(timer)
        return Math.min(n + 1, defaultTitle.length)
      })
    }, TYPE_STEP_MS)
    return () => clearInterval(timer)
  }, [typeDefaultTitle, defaultTitle])

  const entries = [
    { id: null, title: defaultTitle, typed: typeDefaultTitle ? typed : undefined },
    ...sections
      .flatMap((s) => s.rows)
      .flatMap((row) => (row.stage ? [{ id: row.id, ...row.stage }] : [])),
  ]

  return (
    // The list waits for the title to finish typing plus one 0.8s beat, but only where
    // the stage is visible and motion is allowed; reduced motion skips the typing altogether
    <StageLayout
      stage={<Stage entries={entries} active={hovered} />}
      contentClassName={`transition-opacity delay-800 duration-800 ${typed < defaultTitle.length ? 'motion-safe:lg:opacity-0' : ''}`}
    >
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
    </StageLayout>
  )
}
