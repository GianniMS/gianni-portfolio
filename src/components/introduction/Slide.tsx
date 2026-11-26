import Image from 'next/image'
import { SlideFrame, T } from '@/components/introduction/Deck'
import { logoRatio, logoSize } from '@/lib/logos'
import DeviceRender from '@/components/work/DeviceRender'
import { placeholderFor } from '@/lib/placeholder'
import type { IntroSlide } from '@/types'

// A square badge sits among wordmarks here, so it may grow taller than the CV allows to match their weight
const SQUARE_MAX_HEIGHT = 75

export default function Slide({ slide }: { slide: IntroSlide }) {
  const { id, title, body, bullets, tags, devices, logos } = slide
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

      {bullets && (
        <ul className="mt-8 max-w-3xl space-y-3 text-base leading-relaxed md:mt-12 md:space-y-4 md:text-xl">
          {bullets.map((bullet) => (
            <li key={bullet.en} className="flex items-baseline gap-3 md:gap-4">
              <span aria-hidden className="size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-foreground md:size-2" />
              <T text={bullet} />
            </li>
          ))}
        </ul>
      )}

      {tags && (
        <ul className="mt-10 flex max-w-4xl flex-wrap gap-2 md:mt-14 md:gap-3">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-foreground/30 px-3 py-1 font-sf text-sm md:px-4 md:py-1.5 md:text-lg"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </>
  )

  // One device turns in towards the text; a pair faces you square on
  const aside = devices ? (
    <div
      className={`order-first grid aspect-square md:order-none md:aspect-auto md:h-[88svh] ${devices.length > 1 ? 'grid-cols-2' : ''}`}
    >
      {devices.map(({ device, src }) => (
        <div key={src} className="relative">
          <DeviceRender
            device={device}
            screen={placeholderFor(id)}
            image={src}
            view={devices.length > 1 ? 'straight' : 'angle'}
            snug={devices.length > 1}
          />
        </div>
      ))}
    </div>
  ) : logos ? (
    // Sized by area, as in the CV's Involved With, then scaled up for the slide
    <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-12 [--logo-scale:1] md:gap-y-20 lg:[--logo-scale:1.5]">
      {logos.map(({ name, src, keepColors }) => {
        const size = logoSize(logoRatio(src), SQUARE_MAX_HEIGHT)
        return (
          <li key={name} className="flex justify-center">
            <Image
              src={src}
              alt={name}
              width={size.width}
              height={size.height}
              unoptimized
              style={{
                width: `calc(${size.width}px * var(--logo-scale))`,
                height: `calc(${size.height}px * var(--logo-scale))`,
              }}
              className={`max-w-full object-contain ${keepColors ? '' : 'brightness-0'}`}
            />
          </li>
        )
      })}
    </ul>
  ) : null

  if (!aside) return <SlideFrame>{text}</SlideFrame>

  // Text on the left, the device or logos on the right (a device goes above the text on phones, turned
  // in towards the text by its angled pose)
  return (
    <SlideFrame>
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.3fr] md:gap-[3vw]">
        <div>{text}</div>
        {aside}
      </div>
    </SlideFrame>
  )
}
