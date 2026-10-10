import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCV } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About Gianni Mendonça Semedo, full stack developer in Rotterdam, The Netherlands.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const cv = await getCV()
  if (!cv) notFound()

  return (
    <>
      <h1>About Me</h1>
      {cv.about.map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
      {cv.involvedWith.length > 0 && (
        <section>
          <h2>Involved With</h2>
          <ul>
            {cv.involvedWith.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      )}
      {cv.cvPdfPath && (
        <a href={cv.cvPdfPath} download>
          Download CV
        </a>
      )}
    </>
  )
}
