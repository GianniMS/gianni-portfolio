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

const DAYS_PER_MONTH = 365.25 / 12

function plural(count: number, unit: string) {
  return `${count} ${unit}${count === 1 ? '' : 's'}`
}

// How long a range lasted, e.g. "6 months" or "1 year 3 months". An end that is not
// an ISO date ("Today") counts as now. Single dates and external links keep the year.
export function formatItemDuration(item: PortfolioItem): string {
  if (item.link === 'external' || item.dateType === 'single') return formatItemYear(item)

  const start = new Date(item.dateStart).getTime()
  const end = /^\d{4}-\d{2}/.test(item.dateEnd) ? new Date(item.dateEnd).getTime() : Date.now()
  if (Number.isNaN(start) || Number.isNaN(end)) return formatItemYear(item)

  const totalMonths = Math.max(1, Math.round((end - start) / 86_400_000 / DAYS_PER_MONTH))
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (!years) return plural(months, 'month')
  return months ? `${plural(years, 'year')} ${plural(months, 'month')}` : plural(years, 'year')
}
