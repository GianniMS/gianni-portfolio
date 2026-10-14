import type { Tile } from '@/components/home/TileStrip'
import type { TileOption } from '@/components/dashboard/HomeForm'
import { CATEGORY_LABELS, HOME_TILE_CATEGORIES } from '@/data/categories'
import { itemHref } from '@/data/itemText'
import { CVData, HomeConfig, HomeTileRef, PickedTile, PortfolioItem, Product } from '@/types'

export const HOME_TILE_COUNT = 4
export const PRODUCTS_PAGE_TILE_COUNT = 5

export const LINK_TILE = 'link'

// Every link tile shares one picker value; its URL and image live in their own fields
export function encodeTileRef(ref: HomeTileRef): string {
  if (ref.kind === 'link') return LINK_TILE
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
        key: `${encodeTileRef(tile.ref)}-${i}`,
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

// Only entries with a detail page have an image and somewhere to link to
export function tileOptions(items: PortfolioItem[], products: Product[]): TileOption[] {
  return [
    ...products.map((p) => ({
      value: encodeTileRef({ kind: 'product', slug: p.slug }),
      label: p.name,
      group: 'Products',
      image: p.image ?? '',
      title: p.name,
      description: p.description,
    })),
    ...HOME_TILE_CATEGORIES.flatMap((category) =>
      items.flatMap((item) =>
        item.category === category && item.link === 'internal'
          ? [
              {
                value: encodeTileRef({ kind: 'item', id: item.id }),
                label: item.title,
                group: CATEGORY_LABELS[category],
                image: item.image,
                title: item.title,
                description: item.description[0] ?? '',
              },
            ]
          : []
      )
    ),
  ]
}
