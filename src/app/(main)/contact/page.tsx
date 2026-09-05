import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import ContactPanel, { ContactModal } from '@/components/panels/ContactPanel'
import { getItems, getCV } from '@/lib/content'

export const metadata: Metadata = { title: 'Contact' }

export default async function ContactPage() {
  const [portfolioItems, cvData] = await Promise.all([getItems(), getCV()])
  if (!cvData) notFound()

  return (
    <PageShell showBack>
      <div className="relative flex gap-8">
        <div className="hidden md:block">
          <ItemList items={portfolioItems} />
        </div>

        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative flex-1 max-w-4xl mt-12 -ml-24">
            <HeroImage src="images/portrait.jpg" alt={cvData.name} />
            <PreviewImage items={portfolioItems} />
          </div>
          <ContactModal data={cvData} />
        </div>

        <div className="md:hidden flex flex-col gap-3 w-full mt-8">
          <HeroImage src="images/portrait.jpg" alt={cvData.name} layoutId="hero-mobile" />
          <ContactPanel data={cvData} />
        </div>
      </div>
    </PageShell>
  )
}
