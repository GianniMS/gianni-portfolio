import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import MainView from '@/components/layout/MainView'
import SetPanel from '@/components/layout/SetPanel'
import AboutPanel from '@/components/panels/AboutPanel'
import { getItems, getCV } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'About Gianni Mendonça Semedo, full stack developer in Rotterdam, The Netherlands.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const [portfolioItems, cvData] = await Promise.all([getItems(), getCV()])
  if (!cvData) notFound()

  return (
    <PageShell>
      <SetPanel panel="about" />
      <MainView
        items={portfolioItems}
        cv={cvData}
        mobile={
          <div className="md:hidden mt-8">
            <AboutPanel data={cvData} />
          </div>
        }
      />
    </PageShell>
  )
}
