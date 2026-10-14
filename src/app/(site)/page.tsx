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

  return (
    <>
      <IntroDone />
      <h1 className="sr-only">Gianni Mendonça Semedo</h1>
      <p className="ml-auto mt-40 max-w-[335px] pr-3.5 text-right intro:animate-fade-in md:mt-[15vw] md:max-w-[656px] md:px-5">
        {INTRO}
      </p>
      <div className="mt-2 md:mt-5">
        <TileStrip tiles={tiles} />
      </div>
      {/* The bottom margin on mobile keeps the back-to-top arrow from covering it */}
      <div className="mb-20 mt-5 px-3.5 intro:animate-fade-in md:mb-10 md:px-5">
        <RoleCycle startAfterMs={tilesDoneMs} />
      </div>
    </>
  )
}
