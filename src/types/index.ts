export type PortfolioItem = {
  title: string
  year: number
  category: 'project' | 'press' | 'award'
} & (
  | { link: 'external'; href: string }
  | {
      link: 'internal'
      slug: string
      date: string
      description: string
      image: string
    }
)

export type CVData = {
  name: string
  dob: string
  bio: string[]
  cvPdfPath: string
  email: string
}
