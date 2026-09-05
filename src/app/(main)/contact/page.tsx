import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import SetPanel from '@/components/layout/SetPanel'
import ContactPanel from '@/components/panels/ContactPanel'
import { getItems, getCV } from '@/lib/content'

export const metadata: Metadata = { title: 'Contact' }

export default async function ContactPage() {
  const [portfolioItems, cvData] = await Promise.all([getItems(), getCV()])
  if (!cvData) notFound()

  return (
    <PageShell showBack variant="contact">
      <SetPanel panel="contact" />

      <div className="relative hidden md:flex gap-8">
        <ItemList items={portfolioItems} />

        <div className="relative flex-1 max-w-4xl mt-12 -ml-24">
          <HeroImage src="images/portrait.jpg" alt={cvData.name} />
          <PreviewImage items={portfolioItems} />
        </div>
      </div>

      <div className="md:hidden mt-8">
        <ContactPanel data={cvData} />
      </div>
    </PageShell>
  )
}
