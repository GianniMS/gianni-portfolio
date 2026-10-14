'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  credentialsMatch,
  verifySessionToken,
} from '@/lib/auth'
import {
  getHomeFresh,
  getItemsFresh,
  getProductsFresh,
  saveCV,
  saveHome,
  saveItems,
  saveProducts,
} from '@/lib/content'
import { HOME_TILE_COUNT, LINK_TILE, PRODUCTS_PAGE_TILE_COUNT, decodeTileRef } from '@/lib/home'
import { GALLERY_MAX } from '@/lib/images'
import { RESERVED_SLUGS } from '@/data/products'
import { CVData, HomeConfig, PickedTile, PortfolioItem, Product } from '@/types'
import { toLines, toParagraphs } from '@/lib/text'

export type LoginState = { error?: string } | undefined

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get('username')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''

  const valid = await credentialsMatch(username, password)
  if (!valid) return { error: 'Invalid username or password.' }

  const token = await createSessionToken()
  const store = await cookies()
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  })

  redirect('/dashboard')
}

export async function logout() {
  const store = await cookies()
  store.delete(SESSION_COOKIE_NAME)
  redirect('/dashboard/login')
}

async function requireAuth() {
  const store = await cookies()
  const ok = await verifySessionToken(store.get(SESSION_COOKIE_NAME)?.value)
  if (!ok) redirect('/dashboard/login')
}

function galleryFromFormData(formData: FormData): { gallery?: string[] } {
  const gallery = formData
    .getAll('gallery')
    .map(String)
    .filter(Boolean)
    .slice(0, GALLERY_MAX)
  return gallery.length ? { gallery } : {}
}

function itemFromFormData(formData: FormData, id: string): PortfolioItem {
  const title = String(formData.get('title') ?? '')
  const category = formData.get('category') as PortfolioItem['category']
  const linkType = formData.get('linkType') as 'internal' | 'external'
  const isPrivate = formData.get('isPrivate') !== null
  const organization = String(formData.get('organization') ?? '').trim()

  if (linkType === 'external') {
    return {
      id,
      title,
      category,
      ...(isPrivate ? { isPrivate } : {}),
      ...(organization ? { organization } : {}),
      link: 'external',
      href: String(formData.get('href') ?? ''),
      year: Number(formData.get('year') ?? new Date().getFullYear()),
    }
  }

  const skills = String(formData.get('skills') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const description = toParagraphs(String(formData.get('description') ?? ''))
  const detailImage = String(formData.get('detailImage') ?? '')
  const linkOut = String(formData.get('linkOut') ?? '').trim()

  const base = {
    id,
    title,
    category,
    ...(isPrivate ? { isPrivate } : {}),
    ...(organization ? { organization } : {}),
    link: 'internal' as const,
    slug: String(formData.get('slug') ?? ''),
    description,
    skills,
    image: String(formData.get('image') ?? ''),
    ...(detailImage ? { detailImage } : {}),
    ...(linkOut ? { linkOut } : {}),
    ...galleryFromFormData(formData),
  }

  const dateType = formData.get('dateType') as 'single' | 'range'
  if (dateType === 'range') {
    return {
      ...base,
      dateType: 'range',
      dateStart: String(formData.get('dateStart') ?? ''),
      dateEnd: String(formData.get('dateEnd') ?? ''),
    }
  }
  return { ...base, dateType: 'single', date: String(formData.get('date') ?? '') }
}

export async function createItem(formData: FormData) {
  await requireAuth()
  const item = itemFromFormData(formData, crypto.randomUUID())
  const items = await getItemsFresh()
  items.push(item)
  await saveItems(items)
  redirect(`/dashboard/items/${item.category}`)
}

export async function updateItem(id: string, formData: FormData) {
  await requireAuth()
  const items = await getItemsFresh()
  const index = items.findIndex((i) => i.id === id)
  if (index === -1) redirect('/dashboard')

  const updated = itemFromFormData(formData, id)
  items[index] = updated
  await saveItems(items)
  redirect(`/dashboard/items/${updated.category}`)
}

export async function deleteItem(id: string, category: string) {
  await requireAuth()
  const items = await getItemsFresh()
  await saveItems(items.filter((i) => i.id !== id))
  revalidatePath(`/dashboard/items/${category}`)
}

export async function saveCVAction(formData: FormData) {
  await requireAuth()
  const data: CVData = {
    name: String(formData.get('name') ?? ''),
    about: toParagraphs(String(formData.get('about') ?? '')),
    involvedWith: toLines(String(formData.get('involvedWith') ?? '')),
    cvPdfPath: String(formData.get('cvPdfPath') ?? ''),
    email: String(formData.get('email') ?? ''),
    socials: {
      linkedin: String(formData.get('linkedin') ?? ''),
      instagram: String(formData.get('instagram') ?? ''),
    },
  }
  await saveCV(data)
  redirect('/dashboard/cv')
}

function productFromFormData(formData: FormData, existing?: Product): Product {
  const image = String(formData.get('image') ?? '')
  const icon = String(formData.get('icon') ?? '')
  return {
    // Support, privacy and terms are not edited here yet, so an update keeps them
    ...existing,
    slug: String(formData.get('slug') ?? '').trim(),
    name: String(formData.get('name') ?? ''),
    description: String(formData.get('description') ?? '').trim(),
    link: String(formData.get('link') ?? ''),
    image: image || undefined,
    icon: icon || undefined,
    gallery: undefined,
    ...galleryFromFormData(formData),
  }
}

function assertFreeSlug(products: Product[], slug: string) {
  if (RESERVED_SLUGS.includes(slug)) {
    throw new Error(`"${slug}" is already a page on the site; pick another slug.`)
  }
  if (products.some((p) => p.slug === slug)) {
    throw new Error(`A product with the slug "${slug}" already exists.`)
  }
}

export async function createProduct(formData: FormData) {
  await requireAuth()
  const products = await getProductsFresh()
  const product = productFromFormData(formData)
  assertFreeSlug(products, product.slug)
  products.push(product)
  await saveProducts(products)
  redirect('/dashboard/products')
}

export async function updateProduct(slug: string, formData: FormData) {
  await requireAuth()
  const products = await getProductsFresh()
  const index = products.findIndex((p) => p.slug === slug)
  if (index === -1) redirect('/dashboard/products')

  const updated = productFromFormData(formData, products[index])
  if (updated.slug !== slug) assertFreeSlug(products, updated.slug)
  products[index] = updated
  await saveProducts(products)

  // Home and Products page tiles point at products by slug, so a rename must carry them along
  const home = await getHomeFresh()
  if (home && updated.slug !== slug) {
    const rename = (tiles: PickedTile[]): PickedTile[] =>
      tiles.map((tile) =>
        tile.ref.kind === 'product' && tile.ref.slug === slug
          ? { ...tile, ref: { kind: 'product', slug: updated.slug } }
          : tile
      )
    await saveHome({
      ...home,
      tiles: rename(home.tiles),
      ...(home.productsPage ? { productsPage: { tiles: rename(home.productsPage.tiles) } } : {}),
    })
  }
  redirect('/dashboard/products')
}

export async function deleteProduct(slug: string) {
  await requireAuth()
  const products = await getProductsFresh()
  await saveProducts(products.filter((p) => p.slug !== slug))
  revalidatePath('/dashboard/products')
}

function tilesFromFormData(formData: FormData, count: number): PickedTile[] {
  const text = (key: string) => String(formData.get(key) ?? '').trim()
  return Array.from({ length: count }, (_, i) => i).flatMap((i) => {
    const value = text(`tile${i}`)
    const href = text(`tile${i}Href`)
    const ref =
      value === LINK_TILE
        ? href && { kind: 'link' as const, href, image: text(`tile${i}Image`) }
        : decodeTileRef(value)
    if (!ref) return []
    return [{ ref, title: text(`tile${i}Title`), description: text(`tile${i}Description`) }]
  })
}

export async function saveHomeAction(formData: FormData) {
  await requireAuth()
  const text = (key: string) => String(formData.get(key) ?? '').trim()
  const existing = await getHomeFresh()

  const home: HomeConfig = {
    ...existing,
    about: {
      image: text('aboutImage'),
      title: text('aboutTitle'),
      description: text('aboutDescription'),
    },
    tiles: tilesFromFormData(formData, HOME_TILE_COUNT),
  }
  await saveHome(home)
  redirect('/dashboard/home')
}

export async function saveProductsPageAction(formData: FormData) {
  await requireAuth()
  const existing = await getHomeFresh()
  await saveHome({
    about: { image: '', title: '', description: '' },
    tiles: [],
    ...existing,
    productsPage: { tiles: tilesFromFormData(formData, PRODUCTS_PAGE_TILE_COUNT) },
  })
  redirect('/dashboard/products/tiles')
}
