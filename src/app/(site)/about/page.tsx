import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { STAGE_CONTENT_FADE, Stage, StageLayout } from '@/components/stage/Stage'
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
      fadeIn
    />
  )

  return (
    <StageLayout
      alignTops
      contentClassName={STAGE_CONTENT_FADE}
      mobileLabel="About Me"
      stage={stage}
    >
      <h1 className="sr-only">About Me</h1>
      <div className="flex max-w-[616px] flex-col gap-[1lh] lg:text-right">
        {(cv.name || cv.cvPdfPath) && (
          <p>
            <span className="text-foreground/50">
              {cv.name}
              {cv.name && cv.cvPdfPath && ' | '}
            </span>
            {cv.cvPdfPath && (
              <a href={cv.cvPdfPath} download className={`font-bold ${navLinkClass}`}>
                Download CV
              </a>
            )}
          </p>
        )}
        {cv.about.map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
        {cv.involvedWith.length > 0 && (
          <section>
            <h2 className="font-bold">Involved With</h2>
            <p>{cv.involvedWith.join(', ')}</p>
          </section>
        )}
      </div>
    </StageLayout>
  )
}
