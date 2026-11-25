import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { getCV } from '@/lib/content'
import Deck, { SlideFrame, T } from '@/components/introduction/Deck'
import Slide from '@/components/introduction/Slide'
import GooReveal from '@/components/home/GooReveal'
import SprayText from '@/components/home/SprayText'
import { introduction, introSlides } from '@/data/introduction'

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Introduction · ${introduction.role}`,
    description: `How the experience of Gianni Mendonça Semedo fits the ${introduction.role} role at ${introduction.organization}.`,
    path: '/introduction',
  }),
  // Made for one interview, not for search
  robots: { index: false, follow: false },
}

// A wide, single-line box for the spray across the name
const COVER_SPRAY = { width: 600, height: 140, fontSize: 96 }

export default async function IntroductionPage() {
  const cv = await getCV()

  return (
    <Deck>
      <SlideFrame>
        <GooReveal play="load" className="text-center">
          <p className="font-sf text-xs tracking-wide text-foreground/60 uppercase md:text-sm">
            {introduction.organization} · <T text={introduction.date} />
          </p>
          <div className="relative mt-8 md:mt-12">
            <h1 className="font-caslon text-[2.5rem] leading-[1.05] text-balance md:text-7xl lg:text-8xl">{cv.name}</h1>
            {/* Over the lower half of the name, sprayed once it has melted in */}
            <div className="absolute inset-x-0 top-[30%] h-full">
              <SprayText words={introduction.spray} box={COVER_SPRAY} delay={1600} />
            </div>
          </div>
          <p className="mt-10 text-xl md:mt-16 md:text-3xl">{introduction.role}</p>
          <p className="mt-16 hidden font-sf text-xs text-foreground/50 md:block">
            <T text={introduction.hint} />
          </p>
        </GooReveal>
      </SlideFrame>

      {introSlides.map((slide, i) => (
        <Slide key={slide.id} slide={slide} number={i + 2} />
      ))}
    </Deck>
  )
}
