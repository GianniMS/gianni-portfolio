import type { Metadata } from 'next'
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import CVPanel from '@/components/panels/CVPanel'
import { portfolioItems } from '@/data/items'
import { cvData } from '@/data/cv'

export const metadata: Metadata = { title: 'CV' }

export default function CVPage() {
  return (
    <PageShell showBack>
      <div className="relative flex gap-8">
        <div className="hidden md:block">
          <ItemList items={portfolioItems} />
        </div>

        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative flex-1 max-w-4xl mt-12 -ml-24">
            <HeroImage src="images/portrait.jpg" alt="Gianni Mendonça Semedo" />
            <PreviewImage items={portfolioItems} />
          </div>
          <CVPanel data={cvData} />
        </div>

        <div className="md:hidden flex flex-col gap-3 w-full mt-8">
          <HeroImage src="images/portrait.jpg" alt="Gianni Mendonça Semedo" layoutId="hero-mobile" />
          <CVPanel data={cvData} />
        </div>
      </div>
    </PageShell>
  )
}
