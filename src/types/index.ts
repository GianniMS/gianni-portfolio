export type DateInfo =
  | { dateType: 'single'; date: string }
  | { dateType: 'range'; dateStart: string; dateEnd: string }

export type PortfolioItem = {
  id: string
  title: string
  category: 'project' | 'experience' | 'certificate' | 'press' | 'award'
  isPrivate?: boolean
  organization?: string
  // Shown beside a project in the Work list (platform, kind of work); search matches on them too
  tags?: string[]
  // Extra words only the command bar search matches on, never shown
  keywords?: string[]
} & (
  | { link: 'external'; href: string; year: number }
  | ({
      link: 'internal'
      slug: string
      description: string[]
      skills: string[]
      // Clicking through opens this site instead of the detail page, which is then not built
      linkOut?: string
      // The detail page's three columns; without them it falls back to the description paragraphs
      story?: { challenge: string; approach: string; result: string }
      // Screenshots for the project page's two device renders (public/images/screens), in order, each
      // on the device it was taken for; a single one shows in both
      screens?: { device: MockupDevice; src: string }[]
      // An experience page's single wide "What I did" column
      summary?: string
    } & DateInfo)
)

export type SocialLinks = {
  linkedin: string
  instagram: string
}

export type CVData = {
  name: string
  about: string[]
  // A logo (SVG or transparent PNG in public/images/brands) replaces the name; it is shown in black
  involvedWith: { name: string; logo?: string }[]
  cvPdfPath: string
  email: string
  socials: SocialLinks
}

export type MockupDevice = 'macbook' | 'iphone'

// screen is the colour shown until (or without) a screenshot; image is the screenshot itself
export type Mockup = { device: MockupDevice; screen: string; image?: string }

export type LegalPage = {
  title: string
  description: string
  updated: string
  sections: { title: string; paragraphs: string[] }[]
}

export type Lang = 'nl' | 'en'

// A string in both languages of the /introduction deck
export type Localized = Record<Lang, string>

// One slide of the /introduction deck after its cover: a statement, then labelled blocks (a case's
// challenge, approach and result) and optionally a row of skills
export type IntroSlide = {
  id: string
  kicker: Localized
  title: Localized
  body?: Localized
  blocks?: { label: Localized; text: Localized; tags?: string[] }[]
  // A case's screenshot, shown on one 3D device beside the text
  device?: { device: MockupDevice; src: string }
}
