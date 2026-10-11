import { put, head } from '@vercel/blob'
import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache'
import { PortfolioItem, CVData, Product, HomeConfig } from '@/types'
import { getItemTimestamp } from '@/data/itemDates'
import { defaultProducts } from '@/data/products'

const ITEMS_PATH = 'data/items.json'
const CV_PATH = 'data/cv.json'
const PRODUCTS_PATH = 'data/products.json'
const HOME_PATH = 'data/home.json'
const ITEMS_TAG = 'items'
const CV_TAG = 'cv'
const PRODUCTS_TAG = 'products'
const HOME_TAG = 'home'

async function readJson<T>(pathname: string): Promise<T | null> {
  const blob = await head(pathname).catch(() => null)
  if (!blob) return null
  // uploadedAt lags the write, so it is not a reliable cache buster: a unique
  // query per read is what keeps the blob CDN from serving the pre-save body.
  const res = await fetch(`${blob.url}?v=${Date.now()}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json() as Promise<T>
}

// Reading a document costs two round trips to the blob store, so every render
// paid ~600ms before this. Cached until a save invalidates the tag.
function cachedRead<T>(pathname: string, tag: string) {
  return unstable_cache(() => readJson<T>(pathname), [`blob-${tag}`], {
    tags: [tag],
    revalidate: 300,
  })
}

const readItems = cachedRead<PortfolioItem[]>(ITEMS_PATH, ITEMS_TAG)

type StoredCV = Partial<CVData> & { bio?: string[]; clients?: string[] }

const readCV = cachedRead<StoredCV>(CV_PATH, CV_TAG)
const readProducts = cachedRead<Product[]>(PRODUCTS_PATH, PRODUCTS_TAG)
const readHome = cachedRead<HomeConfig>(HOME_PATH, HOME_TAG)

async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  })
}

// 'max' would serve the pre-save document once more (stale-while-revalidate), which
// reads as a save that did not take; expire: 0 makes the next visitor wait for fresh data.
function purge(tag: string) {
  revalidateTag(tag, { expire: 0 })
  revalidatePath('/', 'layout')
}

export async function getItems(): Promise<PortfolioItem[]> {
  return (await readItems()) ?? []
}

export async function saveItems(items: PortfolioItem[]): Promise<void> {
  await writeJson(ITEMS_PATH, items)
  purge(ITEMS_TAG)
}

// The dashboard never reads through unstable_cache: it can serve a stale entry
// while revalidating in the background, and a read-modify-write on that snapshot
// both shows old values in the form and writes the previous save back out.
export async function getItemsFresh(): Promise<PortfolioItem[]> {
  return (await readJson<PortfolioItem[]>(ITEMS_PATH)) ?? []
}

export async function getCVFresh(): Promise<CVData | null> {
  return normalizeCV(await readJson<StoredCV>(CV_PATH))
}

export async function getCV(): Promise<CVData | null> {
  return normalizeCV(await readCV())
}

function normalizeCV(raw: StoredCV | null): CVData | null {
  if (!raw) return null
  return {
    name: raw.name ?? '',
    // `bio` is the pre-About-Me field name; still in the stored document until the next save
    about: raw.about ?? raw.bio ?? [],
    // `clients` is the pre-Involved-With field name, kept so a document written by an
    // older build is still read rather than silently coming back empty
    involvedWith: raw.involvedWith ?? raw.clients ?? [],
    cvPdfPath: raw.cvPdfPath ?? '',
    email: raw.email ?? '',
    socials: {
      linkedin: raw.socials?.linkedin ?? '',
      instagram: raw.socials?.instagram ?? '',
    },
  }
}

export async function saveCV(data: CVData): Promise<void> {
  await writeJson(CV_PATH, data)
  purge(CV_TAG)
}

export async function getProducts(): Promise<Product[]> {
  return (await readProducts()) ?? defaultProducts
}

export async function getProductsFresh(): Promise<Product[]> {
  return (await readJson<Product[]>(PRODUCTS_PATH)) ?? defaultProducts
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug)
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeJson(PRODUCTS_PATH, products)
  purge(PRODUCTS_TAG)
}

export async function getHome(): Promise<HomeConfig | null> {
  return readHome()
}

export async function getHomeFresh(): Promise<HomeConfig | null> {
  return readJson<HomeConfig>(HOME_PATH)
}

export async function saveHome(home: HomeConfig): Promise<void> {
  await writeJson(HOME_PATH, home)
  purge(HOME_TAG)
}

export type Project = PortfolioItem & { category: 'project' }
export type DetailItem = Extract<PortfolioItem, { link: 'internal' }>

export async function getProjects(): Promise<Project[]> {
  return (await getItems())
    .filter((i): i is Project => i.category === 'project')
    .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))
}

export async function getDetailItems(): Promise<DetailItem[]> {
  return (await getItems()).filter((i): i is DetailItem => i.link === 'internal')
}

export async function getDetailItem(slug: string): Promise<DetailItem | undefined> {
  return (await getDetailItems()).find((i) => i.slug === slug)
}
