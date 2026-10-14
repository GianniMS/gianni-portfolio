import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import TilePage, { tilesDoneMs } from '@/components/home/TilePage'
import IntroDone from '@/components/home/IntroDone'
import RoleCycle from '@/components/home/RoleCycle'
import { getCV, getHome, getItems, getProducts } from '@/lib/content'
import { resolveHomeTiles } from '@/lib/home'

export const metadata: Metadata = pageMetadata({
  title: 'Gianni Mendonça Semedo | Full Stack Developer',
  absoluteTitle: true,
  description:
    'Gianni Mendonça Semedo, full stack developer in Rotterdam. Research, design and development: from a complex problem to a structured solution.',
  path: '/',
})

const INTRO =
  'Research, design, development. From the thought to the realization. From a complex problem, to a structured solution. That’s what I specialize in.'

export default async function HomePage() {
  const [home, cv, items, products] = await Promise.all([getHome(), getCV(), getItems(), getProducts()])
  const tiles = resolveHomeTiles(home, cv, items, products)
  const startAfterMs = tilesDoneMs(tiles.length)

  return (
    <>
      <IntroDone />
      <h1 className="sr-only">Gianni Mendonça Semedo</h1>
      <TilePage
        intro={INTRO}
        tiles={tiles}
        label={(className) => <RoleCycle startAfterMs={startAfterMs} className={className} />}
      />
    </>
  )
}
