import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import MainView from '@/components/layout/MainView'
import SetPanel from '@/components/layout/SetPanel'
import ContactPanel from '@/components/panels/ContactPanel'
import { getItems, getCV } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Gianni Mendonça Semedo for project inquiries, collaborations or anything else.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const [portfolioItems, cvData] = await Promise.all([getItems(), getCV()])
  if (!cvData) notFound()

  return (
    <PageShell variant="contact">
      <SetPanel panel="contact" />
      <MainView
        items={portfolioItems}
        cv={cvData}
        mobile={
          <div className="md:hidden mt-8">
            <ContactPanel data={cvData} />
          </div>
        }
      />
    </PageShell>
  )
}
