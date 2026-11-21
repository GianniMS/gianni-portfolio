import type { Metadata } from 'next'
import Image from 'next/image'
import { pageMetadata } from '@/lib/metadata'
import HomeHero from '@/components/home/HomeHero'
import FlagSection from '@/components/layout/FlagSection'
import SiteFooter from '@/components/layout/SiteFooter'
import ArrowLink from '@/components/layout/ArrowLink'
import GooReveal from '@/components/home/GooReveal'
import SprayText from '@/components/home/SprayText'
import { cv } from '@/data/cv'
import { intro, intro2, mockups, sprayWords } from '@/data/home'

export const metadata: Metadata = pageMetadata({
  title: 'Gianni Mendonça Semedo | Full Stack Developer in Rotterdam',
  absoluteTitle: true,
  description:
    'Gianni Mendonça Semedo, full stack developer in Rotterdam. Development, design, research, strategy and marketing: from the thought to the realization.',
  path: '/',
})

// Tells search engines who the site is about, so the name links to the profiles and the work
const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: cv.name,
  url: 'https://www.giannims.com',
  image: 'https://www.giannims.com/images/about.jpg',
  jobTitle: 'Full Stack Developer',
  worksFor: { '@type': 'Organization', name: 'Louvels.dev' },
  address: { '@type': 'PostalAddress', addressLocality: 'Rotterdam', addressCountry: 'NL' },
  email: `mailto:${cv.email}`,
  sameAs: [cv.socials.linkedin, cv.socials.instagram],
  knowsAbout: ['Software development', 'Design', 'Research', 'Strategy', 'Marketing'],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
      <HomeHero mockups={mockups} />
      <FlagSection
        flag="dark"
        className="flex items-center px-6 pt-24 pb-28 md:min-h-svh md:px-[8vw] md:pt-28 md:pb-80 lg:pl-[16vw]"
      >
        <div className="flex w-full flex-col">
          {/* Its own row, so the text can stretch to the photo's height rather than the section's */}
          <div className="flex w-full flex-col items-center gap-10 md:flex-row md:items-stretch md:gap-[16vw] lg:gap-[19vw]">
            <div className="spray-host relative aspect-2/3 w-[62%] max-w-80 shrink-0 md:w-[32vw] md:max-w-none lg:w-[21vw]">
              <div className="absolute inset-0 overflow-hidden bg-placeholder">
                <Image
                  src="/images/about.jpg"
                  alt="Gianni Mendonça Semedo"
                  fill
                  sizes="(min-width: 1024px) 21vw, (min-width: 768px) 32vw, 62vw"
                  className="object-cover"
                />
              </div>
              <SprayText words={sprayWords} />
            </div>
            {/* Beside the photo the block stretches to its height with the title at the bottom, so the
            title ends where the photo does; the paragraph hangs below it, outside the row */}
            <GooReveal className="relative max-w-xl text-center md:flex md:text-left md:max-w-[36vw] md:flex-col md:justify-end lg:max-w-[30vw]">
              {/* Trimmed to the baseline, so the last line's letters (not its line box) sit on the
              photo's bottom edge */}
              <h2 className="font-caslon text-[clamp(2rem,3.6vw,4rem)] leading-[1.1] text-balance [text-box:trim-end_cap_alphabetic]">
                {intro.title}
              </h2>
              <div className="mt-5 font-sf text-[clamp(1.0625rem,1.35vw,1.375rem)] leading-relaxed md:absolute md:inset-x-0 md:top-full md:mt-6">
                <p className="text-pretty">
                  {intro.body} <ArrowLink href="/cv">Go to CV</ArrowLink>
                </p>
              </div>
            </GooReveal>
          </div>
          {/* The second text answers the first from the other side: under the photo, starting below
            where the first one's paragraph hangs, so the two read as a zigzag */}
          <GooReveal className="mx-auto mt-20 max-w-xl text-center md:mx-0 md:mt-[22vw] md:max-w-[36vw] md:text-left lg:mt-[17vw] lg:max-w-[30vw]">
            {/* Wider than the paragraph, so this longer title still breaks over two lines on desktop */}
            <h2 className="font-caslon text-[clamp(2rem,3.6vw,4rem)] leading-[1.1] text-balance md:w-[44vw] lg:w-[38vw]">
              {intro2.title}
            </h2>
            <div className="mt-5 font-sf text-[clamp(1.0625rem,1.35vw,1.375rem)] leading-relaxed md:mt-6">
              <p className="text-pretty">
                {intro2.body} <ArrowLink href="/work">Go to Work</ArrowLink>
              </p>
            </div>
          </GooReveal>
        </div>
      </FlagSection>
      <SiteFooter />
    </>
  )
}
