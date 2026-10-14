import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import ProductFooterNav from '@/components/product/ProductFooterNav'
import { DOC_KINDS, DOC_NAV_LABELS } from '@/components/product/productDocs'
import { getProduct } from '@/lib/content'

export default async function ProductLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  const product = await getProduct((await params).slug)
  if (!product) notFound()

  const docs = DOC_KINDS.filter((kind) => product[kind]).map((kind) => ({
    href: `/${product.slug}/${kind}`,
    label: DOC_NAV_LABELS[kind],
  }))

  return (
    <div className="px-2.5 pb-16 pt-16 md:px-5 lg:pt-24">
      {children}
      {docs.length > 0 && (
        <ProductFooterNav product={{ href: `/${product.slug}`, label: product.name }} docs={docs} />
      )}
    </div>
  )
}
