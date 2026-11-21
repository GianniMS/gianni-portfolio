import type { Metadata } from 'next'
import Image from 'next/image'
import { pageMetadata } from '@/lib/metadata'
import { logoRatio, logoSize } from '@/lib/logos'
import { getCV, getItems } from '@/lib/content'
import SiteFooter from '@/components/layout/SiteFooter'
import GooReveal from '@/components/home/GooReveal'
import { ItemRow, LIST_PAGE, ListPageTitle, ListSection, ListText } from '@/components/list/ItemList'
import PreviewList from '@/components/list/PreviewList'
import { formatItemDuration, formatItemYear, getItemTimestamp } from '@/data/itemDates'
import type { PortfolioItem } from '@/types'

export const metadata: Metadata = pageMetadata({
  title: 'CV',
  description:
    'CV of Gianni Mendonça Semedo, full stack developer in Rotterdam: experience at Louvels.dev, Outlier and Jem-id, certificates, and the brands he has been involved with.',
  path: '/cv',
})

export default async function CVPage() {
  const [cv, items] = await Promise.all([getCV(), getItems()])
  const newestFirst = (a: PortfolioItem, b: PortfolioItem) => getItemTimestamp(b) - getItemTimestamp(a)
  const experience = items.filter((item) => item.category === 'experience').sort(newestFirst)
  const certificates = items.filter((item) => item.category === 'certificate').sort(newestFirst)

  return (
    <>
      <div className={LIST_PAGE}>
        <ListPageTitle
          melt
          aside={
            cv.cvPdfPath && (
              <a
                href={cv.cvPdfPath}
                download
                className="pulse-underline text-base md:text-lg"
              >
                Download CV
              </a>
            )
          }
        >
          CV
        </ListPageTitle>

        <ListSection title="About Me" melt>
          <ListText paragraphs={cv.about} melt />
        </ListSection>

        <ListSection title="Experience" melt>
          <PreviewList>
            <ul>
              {experience.map((item) => (
                <ItemRow key={item.id} item={item} lead={formatItemDuration(item)} melt />
              ))}
            </ul>
          </PreviewList>
        </ListSection>

        <ListSection title="Certificates" melt>
          <PreviewList>
            <ul>
              {certificates.map((item) => (
                <ItemRow key={item.id} item={item} lead={formatItemYear(item)} melt />
              ))}
            </ul>
          </PreviewList>
        </ListSection>
        {/* Involved With follows the scroll rather than the page load */}
        <GooReveal>
          <section className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[1fr_3fr] md:items-center md:gap-[6vw]">
            <h2 className="font-caslon text-lg md:text-[1.875rem]">Involved With</h2>
            {/* Four to a row; the --logo-scale shrinks them all alike on smaller screens. Names stand in
              for brands without a logo */}
            <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-12 [--logo-scale:0.7] sm:grid-cols-4 md:gap-y-16 lg:[--logo-scale:1]">
              {cv.involvedWith.map(({ name, logo }) => {
                const size = logo ? logoSize(logoRatio(logo)) : null
                return (
                  <li
                    key={name}
                    className="flex justify-center text-center text-lg font-semibold tracking-tight md:text-xl"
                  >
                    {logo && size ? (
                      // brightness(0) turns any transparent logo solid black, whatever its colours
                      <Image
                        src={logo}
                        alt={name}
                        width={size.width}
                        height={size.height}
                        unoptimized
                        style={{
                          width: `calc(${size.width}px * var(--logo-scale))`,
                          height: `calc(${size.height}px * var(--logo-scale))`,
                        }}
                        className="max-w-full object-contain brightness-0"
                      />
                    ) : (
                      name
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        </GooReveal>
      </div>
      <SiteFooter />
    </>
  )
}
