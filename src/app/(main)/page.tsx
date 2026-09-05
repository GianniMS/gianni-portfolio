import type { Metadata } from 'next'
import PageShell from '@/components/layout/PageShell'
import MainView from '@/components/layout/MainView'
import { getItems, getCV } from '@/lib/content'

export const metadata: Metadata = { title: 'Home' }

export default async function HomePage() {
  const [portfolioItems, cvData] = await Promise.all([getItems(), getCV()])

  return (
    <PageShell lockHeight>
      <MainView items={portfolioItems} cv={cvData} />
    </PageShell>
  )
}
