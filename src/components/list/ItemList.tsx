import Link from 'next/link'
import type { ReactNode } from 'react'
import { itemHref, splitTitle } from '@/data/itemText'
import type { PortfolioItem } from '@/types'
import GooReveal from '@/components/home/GooReveal'

// melt: the text melts in as the page opens (the goo effect), while the lines only fade in, since
// rules run through the goo look broken. Lines are their own elements so they can fade alone
const LINE_FADE = 'animate-fade-in [animation-delay:400ms]'

function Melt({ melt, className, children }: { melt?: boolean; className?: string; children: ReactNode }) {
  return melt ? (
    <GooReveal play="load" className={className}>
      {children}
    </GooReveal>
  ) : (
    <div className={className}>{children}</div>
  )
}

// Sized as on isaiah.now/cv: the section's name over a full black rule, then rows split by faint lines
export function ListSection({ title, melt, children }: { title: string; melt?: boolean; children: ReactNode }) {
  return (
    <section>
      <Melt melt={melt}>
        <h2 className="font-caslon text-lg md:text-[1.875rem]">{title}</h2>
      </Melt>
      <div className={`mt-2 h-px bg-foreground md:mt-2.5 ${melt ? LINE_FADE : ''}`} />
      {children}
    </section>
  )
}

function external(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

// One row: a fixed first column (how long, or the year), then "Title | Organization", sliding in a
// touch on hover, and optionally the item's tags at the far end
export function ItemRow({
  item,
  lead,
  showTags = false,
  melt,
}: {
  item: PortfolioItem
  lead: string
  showTags?: boolean
  melt?: boolean
}) {
  const { title, organization } = splitTitle(item)
  const href = itemHref(item)
  return (
    <li data-preview="noise" className="relative">
      <Link
        href={href}
        {...external(href)}
        className="group block pt-3 pb-2 text-sm md:pt-[1.125rem] md:pb-3 md:text-xl md:leading-[1.5625rem]"
      >
        <Melt melt={melt} className="flex gap-4 md:gap-[6.25rem]">
          <span className="w-28 shrink-0 text-foreground/50 tabular-nums md:w-48">{lead}</span>
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.2,0.65,0.3,1)] group-hover:translate-x-2">
            {title}
            {organization && <> | {organization}</>}
          </span>
          {showTags && item.tags && (
            <span className="ml-auto hidden shrink-0 gap-2 sm:flex">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/20 px-2.5 py-0.5 text-xs leading-normal text-foreground/70 md:text-sm"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
        </Melt>
      </Link>
      <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px bg-foreground/15 ${melt ? LINE_FADE : ''}`} />
    </li>
  )
}

// Running text under a section heading, at the rows' size
export function ListText({ paragraphs, melt }: { paragraphs: string[]; melt?: boolean }) {
  return (
    <Melt melt={melt} className="mt-3 flex flex-col gap-3 text-sm md:mt-5 md:gap-5 md:text-xl md:leading-[1.5625rem]">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </Melt>
  )
}

// The big page title the list pages open with
export function ListPageTitle({ children, aside, melt }: { children: ReactNode; aside?: ReactNode; melt?: boolean }) {
  return (
    <Melt melt={melt} className="mb-8 flex items-center justify-between gap-6 md:mb-[5.625rem]">
      <h1 className="font-caslon text-6xl leading-none md:text-8xl">{children}</h1>
      {aside}
    </Melt>
  )
}

// The column every list page sits in
export const LIST_PAGE = 'flex flex-col gap-16 px-6 pt-32 pb-40 font-sf md:gap-[3.75rem] md:px-[8vw] md:pt-40'
