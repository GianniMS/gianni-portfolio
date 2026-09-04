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
import { getItems, saveItems, saveCV } from '@/lib/content'
import { CVData, ImageTone, PortfolioItem } from '@/types'

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

function itemFromFormData(formData: FormData, id: string): PortfolioItem {
  const title = String(formData.get('title') ?? '')
  const category = formData.get('category') as PortfolioItem['category']
  const linkType = formData.get('linkType') as 'internal' | 'external'

  if (linkType === 'external') {
    return {
      id,
      title,
      category,
      link: 'external',
      href: String(formData.get('href') ?? ''),
      year: Number(formData.get('year') ?? new Date().getFullYear()),
    }
  }

  const skills = String(formData.get('skills') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const description = String(formData.get('description') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)

  const tone = String(formData.get('imageTone') ?? '')
  const imageTone: ImageTone | undefined =
    tone === 'light' || tone === 'dark' ? tone : undefined

  const base = {
    id,
    title,
    category,
    link: 'internal' as const,
    slug: String(formData.get('slug') ?? ''),
    description,
    skills,
    image: String(formData.get('image') ?? ''),
    ...(imageTone ? { imageTone } : {}),
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
  const items = await getItems()
  items.push(item)
  await saveItems(items)
  redirect(`/dashboard/items/${item.category}`)
}

export async function updateItem(id: string, formData: FormData) {
  await requireAuth()
  const items = await getItems()
  const index = items.findIndex((i) => i.id === id)
  if (index === -1) redirect('/dashboard')

  const updated = itemFromFormData(formData, id)
  items[index] = updated
  await saveItems(items)
  redirect(`/dashboard/items/${updated.category}`)
}

export async function deleteItem(id: string, category: string) {
  await requireAuth()
  const items = await getItems()
  await saveItems(items.filter((i) => i.id !== id))
  revalidatePath(`/dashboard/items/${category}`)
}

export async function saveCVAction(formData: FormData) {
  await requireAuth()
  const lines = (field: string) =>
    String(formData.get(field) ?? '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

  const data: CVData = {
    name: String(formData.get('name') ?? ''),
    about: lines('about'),
    involvedWith: lines('involvedWith'),
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
