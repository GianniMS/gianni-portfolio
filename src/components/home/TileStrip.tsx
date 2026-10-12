import Image from 'next/image'
import Link from 'next/link'
import { imageSrc } from '@/lib/images'

// Each tile starts 0.3s after the previous one, once the 0.8s text fade has finished
const INTRO_DELAYS = [
  'intro:[animation-delay:0.8s]',
  'intro:[animation-delay:1.1s]',
  'intro:[animation-delay:1.4s]',
  'intro:[animation-delay:1.7s]',
  'intro:[animation-delay:2s]',
]

export type Tile = {
  key: string
  href: string
  image: string
  title: string
  description: string
}

export default function TileStrip({ tiles }: { tiles: Tile[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {tiles.map((tile, i) => (
        <li key={tile.key} className={`intro:animate-fade-in ${INTRO_DELAYS[i] ?? ''}`}>
          <Link href={tile.href} className="group relative block aspect-[346/450] overflow-hidden">
            {tile.image ? (
              <Image
                src={imageSrc(tile.image)}
                alt={tile.title}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 34vw, 50vw"
                className="object-cover"
                priority={i < 2}
              />
            ) : (
              <div className="absolute inset-0 bg-placeholder" />
            )}
            <div className="absolute inset-0 flex flex-col items-end justify-end bg-foreground/70 pb-6 pl-10 pr-3.5 text-right text-background opacity-0 transition-opacity duration-800 group-hover:opacity-100 group-focus-visible:opacity-100">
              <p>{tile.title}</p>
              {tile.description && <p className="mt-[1lh] line-clamp-4">{tile.description}</p>}
              <p className="mt-[1lh]">See more →</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
