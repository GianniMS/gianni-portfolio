export type DateInfo =
  | { dateType: 'single'; date: string }
  | { dateType: 'range'; dateStart: string; dateEnd: string }

export type PortfolioItem = {
  title: string
  category: 'project' | 'experience' | 'certificate' | 'press' | 'award'
} & (
  | { link: 'external'; href: string; year: number }
  | ({
      link: 'internal'
      slug: string
      description: string[]
      skills: string[]
      image: string
    } & DateInfo)
)

export type CVData = {
  name: string
  dob: string
  bio: string[]
  cvPdfPath: string
  email: string
}
