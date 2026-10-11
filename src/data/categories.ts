import { PortfolioItem } from '@/types'

export const CATEGORIES: PortfolioItem['category'][] = [
  'project',
  'experience',
  'certificate',
  'award',
  'press',
]

// Only these get a detail image and the hover preview on the Experience page
export const PREVIEW_CATEGORIES: PortfolioItem['category'][] = ['project', 'experience']

// These name the issuing or publishing organization, which the Experience stage shows
export const ORGANIZATION_CATEGORIES: PortfolioItem['category'][] = ['certificate', 'award', 'press']

export const HOME_TILE_CATEGORIES: PortfolioItem['category'][] = [
  'project',
  'experience',
  'certificate',
]

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
