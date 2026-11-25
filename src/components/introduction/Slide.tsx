import type { ReactNode } from 'react'
import type { IntroSlide } from '@/types'

const LEVEL = {
  strong: { label: 'Ervaring', className: 'bg-foreground text-background' },
  basis: { label: 'Basis', className: 'border border-foreground' },
  growth: { label: 'Groeipunt', className: 'border border-dashed border-foreground/50 text-foreground/60' },
}

export function SlideFrame({ number, kicker, children }: { number?: string; kicker?: string; children: ReactNode }) {
  return (
    <section className="flex min-h-svh snap-start flex-col justify-center px-4 py-20 md:px-[6vw] md:py-24">
      {kicker && (
        <p className="mb-6 flex gap-4 font-sf text-xs tracking-wide text-foreground/60 uppercase md:mb-10 md:text-sm">
          {number && <span className="tabular-nums">{number}</span>}
          <span>{kicker}</span>
        </p>
      )}
      {children}
    </section>
  )
}

export function Slide({ slide, number }: { slide: IntroSlide; number: string }) {
  const { kicker, title, body, points, stats, match, note } = slide
  return (
    <SlideFrame number={number} kicker={kicker}>
      <h2 className="max-w-5xl font-caslon text-[1.75rem] leading-[1.15] md:text-5xl lg:text-6xl">{title}</h2>

      {stats && (
        <dl className="mt-10 grid gap-6 sm:grid-cols-3 md:mt-16 md:gap-[4vw]">
          {stats.map(({ value, label }) => (
            <div key={label} className="border-t border-foreground pt-3">
              <dt className="sr-only">{label}</dt>
              <dd className="text-4xl font-medium tracking-tight tabular-nums md:text-6xl">{value}</dd>
              <dd className="mt-2 text-sm text-foreground/70 md:text-base">{label}</dd>
            </div>
          ))}
        </dl>
      )}

      {body && (
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed md:mt-12 md:text-xl">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      {points && (
        <ul className="mt-10 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-[3vw]">
          {points.map(({ label, text }) => (
            <li key={label} className="border-t border-foreground pt-3">
              <h3 className="text-base font-medium md:text-lg">{label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80 md:text-base">{text}</p>
            </li>
          ))}
        </ul>
      )}

      {match && (
        <ul className="mt-8 md:mt-12">
          {match.map(({ need, have, level }) => (
            <li
              key={need}
              className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-foreground/15 py-3 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-x-8"
            >
              <span className="text-sm font-medium md:text-lg">{need}</span>
              <span className="col-span-2 row-start-2 text-sm text-foreground/70 md:col-span-1 md:row-start-auto md:text-base">
                {have}
              </span>
              <span
                className={`col-start-2 row-start-1 self-start rounded-full px-2.5 py-0.5 font-sf text-[0.6875rem] md:col-start-3 md:self-center md:text-xs ${LEVEL[level].className}`}
              >
                {LEVEL[level].label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {note && <p className="mt-10 max-w-3xl font-sf text-xs text-foreground/50 md:mt-14 md:text-sm">{note}</p>}
    </SlideFrame>
  )
}
