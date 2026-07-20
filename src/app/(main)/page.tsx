import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import { portfolioItems } from '@/data/items'

export default function HomePage() {
  return (
    <PageShell lockHeight>
      <div className="relative hidden md:flex gap-8">
        <ItemList items={portfolioItems} />

        <div className="relative flex-1 max-w-4xl mt-12 -ml-24">
          <HeroImage src="images/portrait.jpg" alt="Gianni Mendonça Semedo" priority />
          <PreviewImage items={portfolioItems} />
        </div>
      </div>

      <div className="relative md:hidden">
        <ItemList items={portfolioItems} widthClassName="w-[72%]" scrollHeightClassName="h-[calc(100vh-176px)]" />
        <div className="fixed top-[240px] right-6 w-[55%] origin-bottom-right scale-125">
          <HeroImage src="images/portrait.jpg" alt="Gianni Mendonça Semedo" layoutId="hero-mobile" priority />
        </div>
      </div>
    </PageShell>
  )
}
