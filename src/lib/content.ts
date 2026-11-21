import { PortfolioItem, CVData } from '@/types'
import { items } from '@/data/items'
import { cv } from '@/data/cv'

export async function getItems(): Promise<PortfolioItem[]> {
  return items
}

export async function getCV(): Promise<CVData> {
  return cv
}

export type DetailItem = Extract<PortfolioItem, { link: 'internal' }>

export async function getDetailItems(): Promise<DetailItem[]> {
  return items.filter((i): i is DetailItem => i.link === 'internal' && !i.linkOut)
}

export async function getDetailItem(slug: string): Promise<DetailItem | undefined> {
  return (await getDetailItems()).find((i) => i.slug === slug)
}
