import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Stage, StageLayout } from '@/components/stage/Stage'
import { navLinkClass } from '@/components/layout/NavLink'
import { getCV, getHome } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About Gianni Mendonça Semedo, full stack developer in Rotterdam, The Netherlands.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const [cv, home] = await Promise.all([getCV(), getHome()])
  if (!cv) notFound()

  // The stage reuses the About Me tile image from the Home group
  const stage = (
    <Stage
      entries={[{ id: null, title: 'About Me', image: home?.about.image || undefined }]}
      active={null}
    />
  )

  return (
    <StageLayout stage={stage}>
      <h1 className="sr-only">About Me</h1>
      <div className="flex max-w-[616px] flex-col gap-[1lh] lg:text-right">
        {cv.about.map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
        {cv.involvedWith.length > 0 && (
          <section>
            <h2 className="font-bold">Involved With</h2>
            <ul>
              {cv.involvedWith.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </section>
        )}
        {cv.cvPdfPath && (
          <p>
            <a href={cv.cvPdfPath} download className={navLinkClass}>
              Download CV
            </a>
          </p>
        )}
      </div>
    </StageLayout>
  )
}
