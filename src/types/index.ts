export type DateInfo =
  | { dateType: 'single'; date: string }
  | { dateType: 'range'; dateStart: string; dateEnd: string }

export type PortfolioItem = {
  id: string
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

export type SocialLinks = {
  linkedin: string
  instagram: string
}

export type CVData = {
  name: string
  about: string[]
  clients: string[]
  cvPdfPath: string
  email: string
  socials: SocialLinks
}
