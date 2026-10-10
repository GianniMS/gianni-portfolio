import { PortfolioItem } from '@/types'

// Press and award items may still sit in the stored document; they are no longer managed or shown
export const CATEGORIES: PortfolioItem['category'][] = ['project', 'experience', 'certificate']

export const CATEGORY_LABELS: Record<PortfolioItem['category'], string> = {
  project: 'Projects',
  experience: 'Experience',
  certificate: 'Certificates',
  press: 'Press',
  award: 'Awards',
}

export function isCategory(value: string): value is PortfolioItem['category'] {
  return (CATEGORIES as string[]).includes(value)
}
