import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { STAGE_CONTENT_FADE, Stage, StageLayout } from '@/components/stage/Stage'
import { navLinkClass } from '@/components/layout/NavLink'
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
    <StageLayout
      contentClassName={STAGE_CONTENT_FADE}
      mobileLabel="Contact"
      stage={<Stage entries={[{ id: null, title: 'Contact' }]} active={null} fadeIn />}
    >
      <h1 className="sr-only">Contact</h1>
      <div className="flex max-w-[616px] flex-col gap-[1lh] lg:text-right">
        <p>For project inquiries, collaborations or anything else, reach me here:</p>
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className={navLinkClass}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </StageLayout>
  )
}
