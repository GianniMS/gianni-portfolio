import { PortfolioItem } from '@/types'

export const CATEGORIES: PortfolioItem['category'][] = [
  'project',
  'experience',
  'certificate',
  'press',
  'award',
]

export const CATEGORY_LABELS: Record<PortfolioItem['category'], string> = {
  project: 'Projects',
  experience: 'Experience',
  certificate: 'Certificates',
  press: 'Press',
  award: 'Awards',
}
