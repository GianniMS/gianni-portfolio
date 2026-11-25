import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/metadata'
import { getCV } from '@/lib/content'
import Deck from '@/components/introduction/Deck'
import { Slide, SlideFrame } from '@/components/introduction/Slide'
import { introduction, introSlides } from '@/data/introduction'

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Introductie · ${introduction.role}`,
    description: `Hoe de ervaring van Gianni Mendonça Semedo aansluit bij de rol van ${introduction.role} bij ${introduction.organization}.`,
    path: '/introduction',
  }),
  // Made for one interview, not for search
  robots: { index: false, follow: false },
}

const pad = (n: number) => String(n).padStart(2, '0')

export default async function IntroductionPage() {
  const cv = await getCV()

  return (
    <div lang="nl">
      <Deck>
        <SlideFrame>
          <p className="font-sf text-xs tracking-wide text-foreground/60 uppercase md:text-sm">
            {introduction.organization} · {introduction.date}
          </p>
          <h1 className="mt-6 font-caslon text-[2.5rem] leading-[1.05] md:mt-10 md:text-7xl lg:text-8xl">
            {cv.name}
          </h1>
          <p className="mt-6 text-xl md:mt-10 md:text-3xl">
            Introductie voor de rol van <span className="text-spray">{introduction.role}</span>
          </p>
          <p className="mt-16 hidden font-sf text-xs text-foreground/50 md:block">
            ↓ of spatie voor de volgende slide · F voor volledig scherm
          </p>
        </SlideFrame>

        {introSlides.map((slide, i) => (
          <Slide key={slide.id} slide={slide} number={pad(i + 1)} />
        ))}

        <SlideFrame>
          <h2 className="font-caslon text-[2.5rem] leading-[1.05] md:text-7xl lg:text-8xl">Dank je wel.</h2>
          <p className="mt-6 max-w-2xl text-base md:mt-10 md:text-xl">
            Vragen? Ik loop graag door een van de projecten heen, of laat zien hoe ik iets heb opgezet.
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-base md:mt-16 md:text-xl">
            <li>
              <Link href="/work" className="pulse-underline">
                Work
              </Link>
            </li>
            <li>
              <Link href="/cv" className="pulse-underline">
                CV
              </Link>
            </li>
            <li>
              <a href={`mailto:${cv.email}`} className="pulse-underline">
                {cv.email}
              </a>
            </li>
            <li>
              <a href={cv.socials.linkedin} target="_blank" rel="noopener noreferrer" className="pulse-underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </SlideFrame>
      </Deck>
    </div>
  )
}
