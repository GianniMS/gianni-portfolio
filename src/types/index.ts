export type DateInfo =
  | { dateType: 'single'; date: string }
  | { dateType: 'range'; dateStart: string; dateEnd: string }

export type PortfolioItem = {
  id: string
  title: string
  category: 'project' | 'experience' | 'certificate' | 'press' | 'award'
  isPrivate?: boolean
  organization?: string
} & (
  | { link: 'external'; href: string; year: number }
  | ({
      link: 'internal'
      slug: string
      description: string[]
      skills: string[]
      image: string
      detailImage?: string
      gallery?: string[]
      // Clicking through opens this site instead of the detail page, which is then not built
      linkOut?: string
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
  image?: string
  icon?: string
  gallery?: string[]
  support?: ProductDoc
  privacy?: ProductDoc
  terms?: ProductDoc
}

export type HoverText = { title: string; description: string }

export type HomeTileRef =
  | { kind: 'product'; slug: string }
  | { kind: 'item'; id: string }
  // Straight out to another site, with its own image
  | { kind: 'link'; href: string; image: string }

export type PickedTile = { ref: HomeTileRef } & HoverText

// The about tile always comes first and links to /about; the picked tiles follow it.
// The Products page keeps its own picked tiles in the same document.
export type HomeConfig = {
  about: { image: string } & HoverText
  tiles: PickedTile[]
  productsPage?: { tiles: PickedTile[] }
}
