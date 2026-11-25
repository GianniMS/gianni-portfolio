import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { getCV } from '@/lib/content'
import Deck, { SlideFrame, T } from '@/components/introduction/Deck'
import { introduction } from '@/data/introduction'

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Introduction · ${introduction.role}`,
    description: `How the experience of Gianni Mendonça Semedo fits the ${introduction.role} role at ${introduction.organization}.`,
    path: '/introduction',
  }),
  // Made for one interview, not for search
  robots: { index: false, follow: false },
}

export default async function IntroductionPage() {
  const cv = await getCV()

  return (
    <Deck>
      <SlideFrame>
        <p className="font-sf text-xs tracking-wide text-foreground/60 uppercase md:text-sm">
          {introduction.organization} · <T text={introduction.date} />
        </p>
        <h1 className="mt-6 font-caslon text-[2.5rem] leading-[1.05] md:mt-10 md:text-7xl lg:text-8xl">{cv.name}</h1>
        <p className="mt-6 text-xl text-spray md:mt-10 md:text-3xl">{introduction.role}</p>
        <p className="mt-16 hidden font-sf text-xs text-foreground/50 md:block">
          <T text={introduction.hint} />
        </p>
      </SlideFrame>
    </Deck>
  )
}
