import { put, head } from '@vercel/blob'
import { PortfolioItem, CVData } from '@/types'

const ITEMS_PATH = 'data/items.json'
const CV_PATH = 'data/cv.json'

async function readJson<T>(pathname: string): Promise<T | null> {
  const blob = await head(pathname).catch(() => null)
  if (!blob) return null
  const res = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json() as Promise<T>
}

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
  return (await readJson<PortfolioItem[]>(ITEMS_PATH)) ?? []
}

export async function saveItems(items: PortfolioItem[]): Promise<void> {
  await writeJson(ITEMS_PATH, items)
}

export async function getCV(): Promise<CVData | null> {
  const raw = await readJson<Partial<CVData> & { bio?: string[] }>(CV_PATH)
  if (!raw) return null
  return {
    name: raw.name ?? '',
    // `bio` is the pre-About-Me field name; still in the stored document until the next save
    about: raw.about ?? raw.bio ?? [],
    involvedWith: raw.involvedWith ?? [],
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
}
