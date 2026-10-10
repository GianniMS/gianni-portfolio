import type { Metadata } from 'next'
import TileStrip from '@/components/home/TileStrip'
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

  return (
    <>
      <h1 className="sr-only">Gianni Mendonça Semedo</h1>
      <p className="ml-auto mt-40 max-w-[335px] pr-3.5 text-right md:mt-[15vw] md:max-w-[656px] md:px-5">
        {INTRO}
      </p>
      <div className="mt-2 md:mt-5">
        <TileStrip tiles={tiles} />
      </div>
    </>
  )
}
