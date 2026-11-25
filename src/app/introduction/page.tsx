import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { getCV } from '@/lib/content'
import Deck, { SlideFrame } from '@/components/introduction/Deck'
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

// A wide box for the line sprayed across the name, small enough in units that the tilted
// band still starts clear of the words
const COVER_SPRAY = { width: 400, height: 60, fontSize: 26 }

export default async function IntroductionPage() {
  const cv = await getCV()

  return (
    <Deck>
      <SlideFrame>
        <GooReveal play="load" className="relative text-center">
          <h1 className="font-caslon text-[2.5rem] leading-[1.05] text-balance md:text-7xl lg:text-8xl">{cv.name}</h1>
          {/* The role sprayed across the lower half of the name, once the name has melted in */}
          <div className="absolute top-[45%] left-1/2 aspect-[400/60] w-[min(92vw,52rem)] -translate-x-1/2">
            <SprayText words={introduction.spray} box={COVER_SPRAY} delay={1600} duration={1400} />
          </div>
        </GooReveal>
      </SlideFrame>

      {introSlides.map((slide, i) => (
        <Slide key={slide.id} slide={slide} number={i + 2} />
      ))}
    </Deck>
  )
}
