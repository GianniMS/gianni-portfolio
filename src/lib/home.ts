import type { Tile } from '@/components/home/TileStrip'
import { CVData, HomeConfig, HomeTileRef, PortfolioItem, Product } from '@/types'

export const HOME_TILE_COUNT = 4

export function encodeTileRef(ref: HomeTileRef): string {
  return ref.kind === 'product' ? `product:${ref.slug}` : `item:${ref.id}`
}

export function decodeTileRef(value: string): HomeTileRef | null {
  const split = value.indexOf(':')
  const kind = value.slice(0, split)
  const key = value.slice(split + 1)
  if (split === -1 || !key) return null
  if (kind === 'product') return { kind, slug: key }
  if (kind === 'item') return { kind, id: key }
  return null
}

type Source = Omit<Tile, 'key'>

function sourceFor(
  ref: HomeTileRef,
  items: PortfolioItem[],
  products: Product[]
): Source | null {
  if (ref.kind === 'product') {
    const product = products.find((p) => p.slug === ref.slug)
    if (!product) return null
    return {
      href: `/products/${product.slug}`,
      image: product.image ?? '',
      title: product.name,
      description: product.description,
    }
  }
  const item = items.find((i) => i.id === ref.id)
  if (!item || item.link !== 'internal') return null
  return {
    href: `/experience/${item.slug}`,
    image: item.image,
    title: item.title,
    description: item.description[0] ?? '',
  }
}

// Blank hover text falls back to the linked entry's own title and description,
// and a tile whose entry was deleted is dropped rather than rendered empty.
export function resolveHomeTiles(
  home: HomeConfig | null,
  cv: CVData | null,
  items: PortfolioItem[],
  products: Product[]
): Tile[] {
  const about: Tile = {
    key: 'about',
    href: '/about',
    image: home?.about.image ?? '',
    title: home?.about.title || 'About Me',
    description: home?.about.description || cv?.about[0] || '',
  }

  const picked = (home?.tiles ?? []).flatMap((tile) => {
    const source = sourceFor(tile.ref, items, products)
    if (!source) return []
    return [
      {
        ...source,
        key: encodeTileRef(tile.ref),
        title: tile.title || source.title,
        description: tile.description || source.description,
      },
    ]
  })

  return [about, ...picked]
}
