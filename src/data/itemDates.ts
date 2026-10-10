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

// Anything that is not an ISO date passes through, so "Today" survives
function yearOf(value: string) {
  return /^\d{4}/.test(value) ? value.slice(0, 4) : value
}

export function formatItemYear(item: PortfolioItem): string {
  if (item.link === 'external') return String(item.year)
  if (item.dateType === 'single') return yearOf(item.date)
  const start = yearOf(item.dateStart)
  const end = yearOf(item.dateEnd)
  return start === end ? start : `${start} - ${end}`
}
