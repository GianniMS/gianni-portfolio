import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import MainView from '@/components/layout/MainView'
import { getItems, getCV } from '@/lib/content'

export const metadata: Metadata = { title: 'CV' }

export default async function CVPage() {
  const [portfolioItems, cvData] = await Promise.all([getItems(), getCV()])
  if (!cvData) notFound()

  return (
    <PageShell showBack>
      <MainView items={portfolioItems} cv={cvData} showCV />
    </PageShell>
  )
}
