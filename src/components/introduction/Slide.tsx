import { SlideFrame, T } from '@/components/introduction/Deck'
import type { IntroSlide } from '@/types'

export default function Slide({ slide, number }: { slide: IntroSlide; number: number }) {
  const { kicker, title, body, blocks } = slide
  return (
    <SlideFrame>
      <p className="mb-6 flex gap-4 font-sf text-xs tracking-wide text-foreground/60 uppercase md:mb-10 md:text-sm">
        <span className="tabular-nums">{String(number).padStart(2, '0')}</span>
        <T text={kicker} />
      </p>
      <h2 className="max-w-5xl font-caslon text-[1.75rem] leading-[1.15] md:text-5xl lg:text-6xl">
        <T text={title} />
      </h2>

      {body && (
        <p className="mt-8 max-w-3xl text-base leading-relaxed md:mt-12 md:text-xl">
          <T text={body} />
        </p>
      )}

      {blocks && (
        <ul className={`mt-10 grid gap-8 md:mt-16 md:gap-[3vw] ${blocks.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {blocks.map(({ label, text, tags }) => (
            <li key={label.en} className="border-t border-foreground pt-3">
              <h3 className="text-base font-medium md:text-lg">
                <T text={label} />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80 md:text-base">
                <T text={text} />
              </p>
              {tags && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-foreground/30 px-2.5 py-0.5 font-sf text-xs">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </SlideFrame>
  )
}
