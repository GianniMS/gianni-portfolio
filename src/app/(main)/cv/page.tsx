import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import MainView from '@/components/layout/MainView'
import SetPanel from '@/components/layout/SetPanel'
import CVPanel from '@/components/panels/CVPanel'
import { getItems, getCV } from '@/lib/content'

export const metadata: Metadata = { title: 'CV' }

export default async function CVPage() {
  const [portfolioItems, cvData] = await Promise.all([getItems(), getCV()])
  if (!cvData) notFound()

  return (
    <PageShell>
      <SetPanel panel="cv" />
      <MainView
        items={portfolioItems}
        cv={cvData}
        mobile={
          <div className="md:hidden mt-8">
            <CVPanel data={cvData} />
          </div>
        }
      />
    </PageShell>
  )
}
