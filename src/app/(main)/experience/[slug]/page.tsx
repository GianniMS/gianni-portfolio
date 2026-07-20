import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import ProjectPanel from '@/components/panels/ProjectPanel'
import { portfolioItems } from '@/data/items'
import { PortfolioItem } from '@/types'

export const metadata: Metadata = { title: 'Experience' }

export function generateStaticParams() {
  return portfolioItems
    .filter((i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.category === 'experience'
    )
    .map((i) => ({ slug: i.slug }))
}

export default async function ExperienceDetailPage({
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
      <div className="relative flex gap-8">
        <div className="hidden md:block">
          <ItemList items={portfolioItems} />
        </div>

        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative flex-1 max-w-4xl mt-12 -ml-24">
            <HeroImage src={item.image} alt={item.title} />
            <PreviewImage items={portfolioItems} />
          </div>
          <ProjectPanel item={item} />
        </div>

        <div className="md:hidden relative w-full">
          <div className="fixed top-24 left-6 right-6 z-0">
            <HeroImage src={item.image} alt={item.title} layoutId="hero-mobile" />
          </div>
          <div className="mt-[380px]">
            <ProjectPanel item={item} />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
