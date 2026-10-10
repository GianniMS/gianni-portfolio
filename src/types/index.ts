export type ImageTone = 'light' | 'dark'

export type DateInfo =
  | { dateType: 'single'; date: string }
  | { dateType: 'range'; dateStart: string; dateEnd: string }

export type PortfolioItem = {
  id: string
  title: string
  category: 'project' | 'experience' | 'certificate' | 'press' | 'award'
  isPrivate?: boolean
} & (
  | { link: 'external'; href: string; year: number }
  | ({
      link: 'internal'
      slug: string
      description: string[]
      skills: string[]
      image: string
      imageTone?: ImageTone
    } & DateInfo)
)

export type SocialLinks = {
  linkedin: string
  instagram: string
}

export type CVData = {
  name: string
  about: string[]
  involvedWith: string[]
  cvPdfPath: string
  email: string
  socials: SocialLinks
}

// A string is a paragraph, a string array is a bulleted list
export type DocBlock = string | string[]

export type ProductDoc = {
  updated?: string
  sections: { heading?: string; blocks: DocBlock[] }[]
}

export type Product = {
  slug: string
  name: string
  description: string
  link: string
  support?: ProductDoc
  privacy?: ProductDoc
  terms?: ProductDoc
}
