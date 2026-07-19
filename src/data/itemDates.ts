import { PortfolioItem } from '@/types'

function sortableDate(item: PortfolioItem): string {
  if (item.link === 'external') return `${item.year}`
  return item.dateType === 'single' ? item.date : item.dateStart
}

export function getItemYear(item: PortfolioItem): number {
  return new Date(sortableDate(item)).getFullYear()
}

export function getItemTimestamp(item: PortfolioItem): number {
  return new Date(sortableDate(item)).getTime()
}
