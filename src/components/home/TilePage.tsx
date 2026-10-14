import { ReactNode } from 'react'
import TileStrip, { Tile } from './TileStrip'

// Matches the tile fades in TileStrip: the last starts 0.8s + 0.3s per earlier tile, then takes 0.8s
export function tilesDoneMs(count: number) {
  return 800 + 300 * Math.max(count - 1, 0) + 800
}

// Intro text on the right, the tiles, then the big label. With an odd tile count the label
// fills the free cell beside the last tile on mobile, so the page ends on that row.
export default function TilePage({
  intro,
  tiles,
  label,
}: {
  intro: string
  tiles: Tile[]
  // Rendered twice: sized to the free mobile cell, and full size below the tiles
  label: (className?: string) => ReactNode
}) {
  const fillsGap = tiles.length % 2 === 1

  return (
    <>
      <p className="ml-auto mt-40 max-w-[335px] pr-3.5 text-right intro:animate-fade-in md:mt-[15vw] md:max-w-[656px] md:px-5">
        {intro}
      </p>
      <div className="mt-2 md:mt-5">
        <TileStrip tiles={tiles} mobileFiller={label('text-[15cqw]')} />
      </div>
      <div
        className={`mb-10 mt-5 px-3.5 intro:animate-fade-in md:block md:px-5 ${fillsGap ? 'hidden' : ''}`}
      >
        {label()}
      </div>
    </>
  )
}
