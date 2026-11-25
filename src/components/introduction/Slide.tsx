import { SlideFrame, T } from '@/components/introduction/Deck'
import DeviceRender from '@/components/work/DeviceRender'
import { placeholderFor } from '@/lib/placeholder'
import type { IntroSlide } from '@/types'

export default function Slide({ slide }: { slide: IntroSlide }) {
  const { id, title, body, blocks, device } = slide
  const text = (
    <>
      <h2 className="max-w-5xl font-caslon text-[1.75rem] leading-[1.15] md:text-5xl lg:text-6xl">
        <T text={title} />
      </h2>

      {body && (
        <p className="mt-8 max-w-3xl text-base leading-relaxed md:mt-12 md:text-xl">
          <T text={body} />
        </p>
      )}

      {blocks && (
        <ul
          className={`mt-10 grid gap-8 ${
            device ? 'md:mt-12 md:gap-6' : `md:mt-16 md:gap-[3vw] ${blocks.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`
          }`}
        >
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
    </>
  )

  if (!device) return <SlideFrame>{text}</SlideFrame>

  // A case: the text on the left, its screenshot on one device on the right (above the text on phones); the angled pose turns it in towards the text
  return (
    <SlideFrame>
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.3fr] md:gap-[3vw]">
        <div>{text}</div>
        <div className="relative order-first aspect-square md:order-none md:aspect-auto md:h-[88svh]">
          <DeviceRender device={device.device} screen={placeholderFor(id)} image={device.src} view="angle" />
        </div>
      </div>
    </SlideFrame>
  )
}
