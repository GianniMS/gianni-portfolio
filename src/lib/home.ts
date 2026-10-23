import type { Tile } from '@/components/home/TileStrip'
import { itemHref } from '@/data/itemText'
import { CVData, HomeConfig, HomeTileRef, PickedTile, PortfolioItem, Product } from '@/types'

function tileKey(ref: HomeTileRef): string {
  if (ref.kind === 'link') return ref.href
  return ref.kind === 'product' ? `product:${ref.slug}` : `item:${ref.id}`
}

type Source = Omit<Tile, 'key'>

function sourceFor(
  ref: HomeTileRef,
  items: PortfolioItem[],
  products: Product[]
): Source | null {
  if (ref.kind === 'link') {
    return { href: ref.href, image: ref.image, title: '', description: '', external: true }
  }
  if (ref.kind === 'product') {
    const product = products.find((p) => p.slug === ref.slug)
    if (!product) return null
    return {
      href: `/${product.slug}`,
      image: product.image ?? '',
      title: product.name,
      description: product.description,
    }
  }
  const item = items.find((i) => i.id === ref.id)
  if (!item || item.link !== 'internal') return null
  return {
    href: itemHref(item),
    external: Boolean(item.linkOut),
    image: item.image,
    title: item.title,
    description: item.description[0] ?? '',
  }
}

// Blank hover text falls back to the linked entry's own title and description,
// and a tile whose entry was deleted is dropped rather than rendered empty.
export function resolvePickedTiles(
  tiles: PickedTile[],
  items: PortfolioItem[],
  products: Product[]
): Tile[] {
  return tiles.flatMap((tile, i) => {
    const source = sourceFor(tile.ref, items, products)
    if (!source) return []
    return [
      {
        ...source,
        key: `${tileKey(tile.ref)}-${i}`,
        title: tile.title || source.title,
        description: tile.description || source.description,
      },
    ]
  })
}

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
  return [about, ...resolvePickedTiles(home?.tiles ?? [], items, products)]
}
