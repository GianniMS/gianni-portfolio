import type { Metadata } from 'next'
import PageShell from '@/components/layout/PageShell'
import MainView from '@/components/layout/MainView'
import SetPanel from '@/components/layout/SetPanel'
import StructuredData from '@/components/layout/StructuredData'
import { getItems, getCV } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Gianni Mendonça Semedo — Full Stack Developer',
  description:
    'Selected projects, experience, certificates, press and awards by Gianni Mendonça Semedo, full stack developer in Rotterdam, The Netherlands.',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [portfolioItems, cvData] = await Promise.all([getItems(), getCV()])

  return (
    <PageShell lockHeight>
      <SetPanel panel={null} />
      <StructuredData cv={cvData} />
      <MainView items={portfolioItems} cv={cvData} />
    </PageShell>
  )
}
