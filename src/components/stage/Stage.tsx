import Image from 'next/image'
import { ReactNode } from 'react'
import { imageSrc } from '@/lib/images'

export type StageEntry = {
  id: string | null
  title: string
  image?: string
}

// Positions are taken from the 427×556 stage in the design, so the title keeps
// crossing the stage's right edge at the same point at every width. Its width is
// whatever the column leaves after the stage offset, so a long title wraps instead
// of running into the content on the right.
const titleClass =
  'pointer-events-none absolute left-[48.5%] top-[67.6%] w-[calc(100cqw-1.75rem-11.98vw)] text-[5.56vw] leading-none transition-opacity duration-800'

// The opening fade sits on an inner span: an animation's end state would otherwise
// pin the paragraph's opacity and stop the default title crossfading out on hover
const TITLE_FADE = 'motion-safe:animate-fade-in motion-safe:[animation-delay:0.8s]'

// Every entry is rendered up front and crossfaded, so switching never waits on a load.
// The entry with id null is the resting state. With fadeIn the square fades in first,
// then the resting title.
export function Stage({
  entries,
  active,
  fadeIn = false,
}: {
  entries: StageEntry[]
  active: string | null
  fadeIn?: boolean
}) {
  const shown = (id: string | null) => (id === active ? 'opacity-100' : 'opacity-0')
  const title = (e: StageEntry) =>
    fadeIn && e.id === null ? <span className={`block ${TITLE_FADE}`}>{e.title}</span> : e.title

  return (
    <div className="relative aspect-[427/556] w-[24.7vw]">
      {/* The black title sits behind the stage, which paints its own copy in the
          background colour, so the colour flips exactly at the stage edge */}
      {entries.map((e) => (
        <p key={e.id ?? 'default'} aria-hidden className={`${titleClass} ${shown(e.id)}`}>
          {title(e)}
        </p>
      ))}
      <div
        className={`absolute inset-0 overflow-hidden bg-placeholder ${fadeIn ? 'motion-safe:animate-fade-in' : ''}`}
      >
        {entries.map(
          (e) =>
            e.image && (
              <Image
                key={e.id ?? 'default'}
                src={imageSrc(e.image)}
                alt=""
                fill
                sizes="25vw"
                className={`object-cover transition-opacity duration-800 ${shown(e.id)}`}
              />
            ),
        )}
        {entries.map((e) => (
          <p
            key={e.id ?? 'default'}
            aria-hidden
            className={`${titleClass} text-background ${shown(e.id)}`}
          >
            {title(e)}
          </p>
        ))}
      </div>
    </div>
  )
}

// Content beside a fading-in stage follows with its title; it only waits from 1024px up,
// where the stage is visible to fade in ahead of it
export const STAGE_CONTENT_FADE =
  'motion-safe:lg:animate-fade-in motion-safe:lg:[animation-delay:0.8s]'

// Stage on the left from 1024px up, content on the right; below that only the content
export function StageLayout({
  stage,
  contentClassName = '',
  alignTops = false,
  mobileLabel,
  mobileImage,
  children,
}: {
  stage: ReactNode
  contentClassName?: string
  // Starts the content level with the top of the stage instead of above it
  alignTops?: boolean
  // Below 1024px the stage is hidden; this closes the page with a small block in its colours
  mobileLabel?: string
  // Sits behind the label block on mobile, overlapping it from the left
  mobileImage?: string
  children: ReactNode
}) {
  const labelClass =
    'flex aspect-[330/180] w-1/2 items-center bg-placeholder px-4 text-[7.5vw] leading-none tracking-tight text-background'

  return (
    // On mobile the page fills at least the screen below the header, so the label block
    // always lands at the same low point however short the content is
    <div className="flex min-h-[calc(100svh-3rem)] flex-col px-2.5 pb-20 md:px-5 lg:min-h-0 lg:flex-row lg:items-start lg:gap-10">
      <div className="@container hidden min-w-0 flex-1 lg:sticky lg:top-[13.4vw] lg:mt-[13.4vw] lg:block">
        <div className="ml-7">{stage}</div>
      </div>
      <div
        className={`mt-16 flex shrink-0 flex-col gap-[1lh] [overflow-wrap:anywhere] lg:items-end ${alignTops ? 'lg:mt-[13.4vw]' : 'lg:mt-36'} ${contentClassName}`}
      >
        {children}
      </div>
      {mobileLabel && <div className="h-16 shrink-0 lg:hidden" />}
      {mobileLabel &&
        (mobileImage ? (
          <div aria-hidden className="relative mt-auto lg:hidden">
            <div className="relative ml-[9%] aspect-[264/385] w-[48%]">
              <Image src={imageSrc(mobileImage)} alt="" fill sizes="50vw" className="object-cover" />
            </div>
            <div className={`absolute bottom-[9%] -right-2.5 md:-right-5 ${labelClass}`}>
              {mobileLabel}
            </div>
          </div>
        ) : (
          <div aria-hidden className={`-mr-2.5 ml-auto mt-auto md:-mr-5 lg:hidden ${labelClass}`}>
            {mobileLabel}
          </div>
        ))}
    </div>
  )
}
