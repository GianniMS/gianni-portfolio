import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import ProjectPanel from '@/components/panels/ProjectPanel'
import { portfolioItems } from '@/data/items'
import { PortfolioItem } from '@/types'

export function generateStaticParams() {
  return portfolioItems
    .filter((i): i is Extract<PortfolioItem, { link: 'internal'; category: 'press' }> =>
      i.link === 'internal' && i.category === 'press'
    )
    .map((i) => ({ slug: i.slug }))
}

export default async function PressDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = portfolioItems.find(
    (i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.slug === slug
  )
  if (!item) notFound()

  return (
    <PageShell showBack>
      <div className="relative flex gap-8 pt-16">
        <div className="absolute top-0 left-0">
          <span className="font-title text-blue text-4xl tracking-wide">GIANNI</span>
        </div>
        <ItemList items={portfolioItems} />
        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative">
            <HeroImage src={item.image} alt={item.title} />
            <PreviewImage items={portfolioItems} />
          </div>
          <ProjectPanel item={item} />
        </div>
        <div className="md:hidden flex flex-col gap-6 w-full mt-8">
          <div className="relative w-full h-72">
            <HeroImage src={item.image} alt={item.title} />
          </div>
          <ProjectPanel item={item} />
        </div>
      </div>
    </PageShell>
  )
}
