import { CVData } from '@/types'

export default function StructuredData({ cv }: { cv: CVData | null }) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gianni Mendonça Semedo',
    url: 'https://www.giannims.com',
    jobTitle: 'Full Stack Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rotterdam',
      addressCountry: 'NL',
    },
    ...(cv?.email ? { email: cv.email } : {}),
    sameAs: [cv?.socials.linkedin, cv?.socials.instagram].filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  )
}
