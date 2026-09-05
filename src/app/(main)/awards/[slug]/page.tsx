import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import SetPanel from '@/components/layout/SetPanel'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import ProjectPanel from '@/components/panels/ProjectPanel'
import { getItems } from '@/lib/content'
import { PortfolioItem } from '@/types'

export const metadata: Metadata = { title: 'Awards' }

export async function generateStaticParams() {
  const portfolioItems = await getItems()
  return portfolioItems
    .filter((i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.category === 'award'
    )
    .map((i) => ({ slug: i.slug }))
}

export default async function AwardDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const portfolioItems = await getItems()
  const item = portfolioItems.find(
    (i): i is Extract<PortfolioItem, { link: 'internal' }> =>
      i.link === 'internal' && i.slug === slug
  )
  if (!item) notFound()

  return (
    <PageShell showBack>
      <SetPanel panel={null} />
      <div className="relative flex gap-8">
        <div className="hidden md:block">
          <ItemList items={portfolioItems} />
        </div>
        <div className="hidden md:flex flex-1 gap-8">
          <div className="relative flex-1">
            <HeroImage src={item.image} alt={item.title} tone={item.imageTone} />
            <PreviewImage items={portfolioItems} />
          </div>
          <ProjectPanel item={item} />
        </div>
        <div className="md:hidden flex flex-col gap-6 w-full mt-8">
          <HeroImage src={item.image} alt={item.title} layoutId="hero-mobile" tone={item.imageTone} />
          <ProjectPanel item={item} />
        </div>
      </div>
    </PageShell>
  )
}
