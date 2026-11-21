import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pageMetadata } from '@/lib/metadata'
import { getDetailItem, getDetailItems } from '@/lib/content'
import { placeholderFor } from '@/lib/placeholder'
import SiteFooter from '@/components/layout/SiteFooter'
import BackLink from '@/components/work/BackLink'
import GooReveal from '@/components/home/GooReveal'
import DeviceRender from '@/components/work/DeviceRender'
import { CATEGORY_LABELS } from '@/data/categories'
import { splitTitle } from '@/data/itemText'
import type { MockupDevice } from '@/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getDetailItems()).map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getDetailItem((await params).slug)
  if (!item) return { title: 'Work' }

  const { title, organization } = splitTitle(item)
  // The page's own story makes the best summary; the first screenshot (when it can be shown) the share image
  const description =
    item.summary ??
    (item.story ? `${item.story.challenge} ${item.story.result}` : item.description[0]) ??
    `${title}${organization ? ` at ${organization}` : ''}, by Gianni Mendonça Semedo.`
  const shot = item.isPrivate ? undefined : item.screens?.[0]?.src
  return pageMetadata({
    title: organization ? `${title} | ${organization}` : title,
    description,
    path: `/work/${item.slug}`,
    type: 'article',
    image: shot,
  })
}

export default async function DetailPage({ params }: Props) {
  const item = await getDetailItem((await params).slug)
  if (!item) notFound()

  const { title, organization } = splitTitle(item)
  const screen = placeholderFor(item.id)
  // Each render takes the next screenshot on the device it was taken for; one screenshot shows in both,
  // and without any it's a placeholder on the laptop (the phone for mobile work)
  const fallback: MockupDevice = item.tags?.includes('Mobile') ? 'iphone' : 'macbook'
  const shots = item.screens ?? []
  const panels = [0, 1].map((i) => shots[i] ?? shots[0] ?? { device: fallback, src: undefined })

  // Without a written story the description paragraphs fill the three columns in order
  const [challenge, approach, result] = item.story
    ? [item.story.challenge, item.story.approach, item.story.result]
    : item.description
  // A role tells one story in one wide column; a project splits it in three
  const columns =
    item.category === 'experience'
      ? [{ heading: 'What I did', text: item.summary ?? item.description.join(' '), wide: true }]
      : [
          { heading: 'Challenge', text: challenge, wide: false },
          { heading: 'Toolkit', text: approach, wide: false },
          { heading: 'Result', text: result, wide: false },
        ].filter((column) => column.text)

  return (
    <>
      <div className="px-6 pt-28 pb-32 md:px-[4vw] md:pt-32">
        <GooReveal play="load" className="w-fit">
          <BackLink />
        </GooReveal>

        <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-6">
          {(
            [
              ['front', panels[0]],
              ['angle', panels[1]],
            ] as const
          ).map(([view, { device, src }]) => (
            // The renders fade in once the text has melted in (its 0.4s pause plus 1.2s melt)
            <div
              key={view}
              role="img"
              aria-label={`${title} on ${device === 'iphone' ? 'a phone' : 'a laptop'}`}
              className="relative aspect-4/3 animate-fade-in overflow-hidden bg-foreground/5 [animation-delay:1.6s] md:aspect-auto md:h-[62svh]"
            >
              <DeviceRender device={device} screen={screen} image={src} view={view} />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-10 font-sf md:mt-10 md:grid-cols-[1.2fr_1fr_1.2fr_1fr] md:gap-[3vw]">
          <GooReveal play="load">
            <p className="font-caslon text-2xl md:text-[2rem]">
              {organization ?? CATEGORY_LABELS[item.category].replace(/s$/, '')}
            </p>
            <h1 className="mt-3 text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:mt-4 md:text-[3.25rem]">
              {title}
            </h1>
          </GooReveal>
          {columns.map(({ heading, text, wide }) => (
            <GooReveal key={heading} play="load" className={wide ? 'md:col-span-3' : undefined}>
              <section>
                <h2 className="font-caslon text-2xl md:text-[2rem]">{heading}</h2>
                <p className="mt-3 text-lg leading-snug text-pretty md:mt-4 md:text-[1.375rem]">{text}</p>
              </section>
            </GooReveal>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
