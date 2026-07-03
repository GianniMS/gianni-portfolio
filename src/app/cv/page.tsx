import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import CVPanel from '@/components/panels/CVPanel'
import { portfolioItems } from '@/data/items'
import { cvData } from '@/data/cv'

export default function CVPage() {
  return (
    <PageShell>
      <div className="relative flex gap-8 pt-16">
        <div className="absolute top-0 left-0">
          <span className="font-title text-blue text-4xl tracking-wide">GIANNI</span>
        </div>

        <ItemList items={portfolioItems} />

        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative">
            <HeroImage src="images/portrait.png" alt="Gianni Mendonça Semedo" />
            <PreviewImage items={portfolioItems} />
          </div>
          <CVPanel data={cvData} />
        </div>

        <div className="md:hidden flex flex-col gap-6 w-full mt-8">
          <div className="relative w-full h-72">
            <HeroImage src="images/portrait.png" alt="Gianni Mendonça Semedo" />
          </div>
          <CVPanel data={cvData} />
        </div>
      </div>
    </PageShell>
  )
}
