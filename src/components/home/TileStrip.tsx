import Image from 'next/image'
import Link from 'next/link'
import { imageSrc } from '@/lib/images'

export type Tile = {
  key: string
  href: string
  image: string
  title: string
  description: string
}

export default function TileStrip({ tiles }: { tiles: Tile[] }) {
  return (
    <ul className="grid grid-cols-2 md:flex">
      {tiles.map((tile, i) => (
        <li key={tile.key} className="md:w-1/5">
          <Link href={tile.href} className="group relative block aspect-[346/450] overflow-hidden">
            <Image
              src={imageSrc(tile.image)}
              alt={tile.title}
              fill
              sizes="(min-width: 768px) 20vw, 50vw"
              className="object-cover"
              priority={i < 2}
            />
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
