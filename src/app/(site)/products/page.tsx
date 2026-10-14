import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import TilePage from '@/components/home/TilePage'
import { BIG_LABEL_SIZE } from '@/components/home/bigLabel'
import { getHome, getItems, getProducts } from '@/lib/content'
import { resolvePickedTiles } from '@/lib/home'

export const metadata: Metadata = pageMetadata({
  title: 'Products',
  description:
    'Products by Gianni Mendonça Semedo, each tailored to its audience while preserving the value of the brand behind it.',
  path: '/products',
})

const INTRO =
  'A product should be tailored to it’s target audience, while preserving the value of the brand associated with it. Here’s what I put on the market.'

export default async function ProductsPage() {
  const [home, items, products] = await Promise.all([getHome(), getItems(), getProducts()])
  const tiles = resolvePickedTiles(home?.productsPage?.tiles ?? [], items, products)

  return (
    <>
      <h1 className="sr-only">Products</h1>
      <TilePage
        intro={INTRO}
        tiles={tiles}
        label={(className = BIG_LABEL_SIZE) => (
          <p aria-hidden className={`${className} leading-none tracking-tight`}>
            Products
          </p>
        )}
      />
    </>
  )
}
