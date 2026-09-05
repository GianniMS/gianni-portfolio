import { put, head } from '@vercel/blob'
import { unstable_cache, updateTag } from 'next/cache'
import { PortfolioItem, CVData } from '@/types'

const ITEMS_PATH = 'data/items.json'
const CV_PATH = 'data/cv.json'
const ITEMS_TAG = 'items'
const CV_TAG = 'cv'

async function readJson<T>(pathname: string): Promise<T | null> {
  const blob = await head(pathname).catch(() => null)
  if (!blob) return null
  const res = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json() as Promise<T>
}

// Reading a document costs two round trips to the blob store, so every render
// paid ~600ms before this. Cached until a save invalidates the tag.
const readItems = unstable_cache(
  () => readJson<PortfolioItem[]>(ITEMS_PATH),
  ['blob-items'],
  { tags: [ITEMS_TAG] }
)

type StoredCV = Partial<CVData> & { bio?: string[]; clients?: string[] }

const readCV = unstable_cache(() => readJson<StoredCV>(CV_PATH), ['blob-cv'], { tags: [CV_TAG] })

async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  })
}

export async function getItems(): Promise<PortfolioItem[]> {
  return (await readItems()) ?? []
}

export async function saveItems(items: PortfolioItem[]): Promise<void> {
  await writeJson(ITEMS_PATH, items)
  updateTag(ITEMS_TAG)
}

export async function getCV(): Promise<CVData | null> {
  const raw = await readCV()
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
  updateTag(CV_TAG)
}
