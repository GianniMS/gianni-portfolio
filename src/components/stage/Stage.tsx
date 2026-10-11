import Image from 'next/image'
import { ReactNode } from 'react'
import { imageSrc } from '@/lib/images'

export type StageEntry = {
  id: string | null
  title: string
  image?: string
  // While typing, how many characters of the title are shown
  typed?: number
}

// Every character is laid out from the start and fades in when typed, so the title
// never rewraps while it types
function StageTitle({ entry }: { entry: StageEntry }) {
  const { typed } = entry
  if (typed === undefined) return entry.title
  return [...entry.title].map((char, i) => (
    <span
      key={i}
      className={`transition-opacity duration-800 motion-reduce:opacity-100 ${i < typed ? 'opacity-100' : 'opacity-0'}`}
    >
      {char}
    </span>
  ))
}

// Positions are taken from the 427×556 stage in the design, so the title keeps
// crossing the stage's right edge at the same point at every width. Its width is
// whatever the column leaves after the stage offset, so a long title wraps instead
// of running into the content on the right.
const titleClass =
  'pointer-events-none absolute left-[48.5%] top-[67.6%] w-[calc(100cqw-1.75rem-11.98vw)] text-[5.56vw] leading-none transition-opacity duration-800'

// Every entry is rendered up front and crossfaded, so switching never waits on a load.
// The entry with id null is the resting state.
export function Stage({ entries, active }: { entries: StageEntry[]; active: string | null }) {
  const shown = (id: string | null) => (id === active ? 'opacity-100' : 'opacity-0')

  return (
    <div className="relative aspect-[427/556] w-[24.7vw]">
      {/* The black title sits behind the stage, which paints its own copy in the
          background colour, so the colour flips exactly at the stage edge */}
      {entries.map((e) => (
        <p key={e.id ?? 'default'} aria-hidden className={`${titleClass} ${shown(e.id)}`}>
          <StageTitle entry={e} />
        </p>
      ))}
      <div className="absolute inset-0 overflow-hidden bg-earth">
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
            )
        )}
        {entries.map((e) => (
          <p
            key={e.id ?? 'default'}
            aria-hidden
            className={`${titleClass} text-background ${shown(e.id)}`}
          >
            <StageTitle entry={e} />
          </p>
        ))}
      </div>
    </div>
  )
}

// Stage on the left from 1024px up, content on the right; below that only the content
export function StageLayout({
  stage,
  contentClassName = '',
  children,
}: {
  stage: ReactNode
  contentClassName?: string
  children: ReactNode
}) {
  return (
    <div className="px-2.5 pb-20 md:px-5 lg:flex lg:items-start lg:gap-10">
      <div className="@container hidden min-w-0 flex-1 lg:sticky lg:top-[13.4vw] lg:mt-[13.4vw] lg:block">
        <div className="ml-7">{stage}</div>
      </div>
      <div
        className={`mt-16 flex shrink-0 flex-col gap-[1lh] [overflow-wrap:anywhere] lg:mt-36 lg:items-end ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  )
}
