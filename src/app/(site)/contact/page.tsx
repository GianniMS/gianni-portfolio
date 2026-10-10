import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCV } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Gianni Mendonça Semedo for project inquiries, collaborations or anything else.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const cv = await getCV()
  if (!cv) notFound()

  const links = [
    { label: cv.email, href: cv.email && `mailto:${cv.email}` },
    { label: 'LinkedIn', href: cv.socials.linkedin },
    { label: 'Instagram', href: cv.socials.instagram },
  ].filter((link) => link.href)

  return (
    <>
      <h1>Contact</h1>
      <p>For project inquiries, collaborations or anything else, reach me here:</p>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
