import type { Metadata } from 'next'
import TileStrip from '@/components/home/TileStrip'
import IntroDone from '@/components/home/IntroDone'
import RoleCycle from '@/components/home/RoleCycle'
import { getCV, getHome, getItems, getProducts } from '@/lib/content'
import { resolveHomeTiles } from '@/lib/home'

export const metadata: Metadata = {
  title: { absolute: 'Gianni Mendonça Semedo | Full Stack Developer' },
  description:
    'Gianni Mendonça Semedo, full stack developer in Rotterdam, The Netherlands. Products, experience and contact.',
  alternates: { canonical: '/' },
}

const INTRO =
  'Research, design, development. From the thought to the realization. From a complex problem, to a structured solution. That’s what I specialize in.'

export default async function HomePage() {
  const [home, cv, items, products] = await Promise.all([getHome(), getCV(), getItems(), getProducts()])
  const tiles = resolveHomeTiles(home, cv, items, products)
  // Matches the tile fades in TileStrip: the last starts 0.8s + 0.3s per earlier tile, then takes 0.8s
  const tilesDoneMs = 800 + 300 * Math.max(tiles.length - 1, 0) + 800
  const fillsGap = tiles.length % 2 === 1

  return (
    <>
      <IntroDone />
      <h1 className="sr-only">Gianni Mendonça Semedo</h1>
      <p className="ml-auto mt-40 max-w-[335px] pr-3.5 text-right intro:animate-fade-in md:mt-[15vw] md:max-w-[656px] md:px-5">
        {INTRO}
      </p>
      {/* With an odd tile count the roles fill the free cell beside the last tile on mobile;
          the bottom margin keeps the back-to-top arrow off whichever comes last */}
      <div className={`mt-2 md:mt-5 ${fillsGap ? 'mb-20 md:mb-0' : ''}`}>
        <TileStrip
          tiles={tiles}
          mobileFiller={<RoleCycle startAfterMs={tilesDoneMs} className="text-[15cqw]" />}
        />
      </div>
      <div
        className={`mb-20 mt-5 px-3.5 intro:animate-fade-in md:mb-10 md:block md:px-5 ${fillsGap ? 'hidden' : ''}`}
      >
        <RoleCycle startAfterMs={tilesDoneMs} />
      </div>
    </>
  )
}
