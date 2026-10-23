import { PortfolioItem, CVData, Product, HomeConfig } from '@/types'
import { items } from '@/data/items'
import { cv } from '@/data/cv'
import { products } from '@/data/products'
import { home } from '@/data/home'

export async function getItems(): Promise<PortfolioItem[]> {
  return items
}

export async function getCV(): Promise<CVData> {
  return cv
}

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug)
}

export async function getHome(): Promise<HomeConfig> {
  return home
}

export type DetailItem = Extract<PortfolioItem, { link: 'internal' }>

export async function getDetailItems(): Promise<DetailItem[]> {
  return items.filter((i): i is DetailItem => i.link === 'internal' && !i.linkOut)
}

export async function getDetailItem(slug: string): Promise<DetailItem | undefined> {
  return (await getDetailItems()).find((i) => i.slug === slug)
}
