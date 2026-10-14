import type { Metadata } from 'next'

export const SITE_NAME = 'GianniMS'
export const PERSON = 'Gianni Mendonça Semedo'

// Next merges metadata one top-level key at a time, so a page that sets only a title
// still shares the root's Open Graph and Twitter title, description and URL. Every page
// builds its full set here instead; the share image comes from app/opengraph-image.
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = 'website',
  image,
}: {
  title: string
  description: string
  path: string
  // Used as is rather than through the root's "%s | GianniMS" template
  absoluteTitle?: boolean
  type?: 'website' | 'article'
  // A page's own picture for shares, in place of the site-wide share image
  image?: string
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  const images = image ? [image] : undefined
  description = clip(description)
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: 'en_US',
      title: fullTitle,
      description,
      url: path,
      images,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images },
  }
}

// Search results cut descriptions off around 160 characters; end on a whole word instead
function clip(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  return `${flat.slice(0, flat.lastIndexOf(' ', max - 1))}…`
}
