import { PortfolioItem } from '@/types'

export const categoryPath: Record<PortfolioItem['category'], string> = {
  project: 'projects',
  experience: 'experience',
  certificate: 'certificates',
  press: 'press',
  award: 'awards',
}
