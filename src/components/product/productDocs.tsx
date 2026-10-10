import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDocView from '@/components/product/ProductDocView'
import { getProduct, products } from '@/data/products'

export type DocKind = 'support' | 'privacy' | 'terms'

const DOC_TITLES: Record<DocKind, string> = {
  support: 'Support',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
}

export type DocParams = { params: Promise<{ slug: string }> }

export function docStaticParams(kind: DocKind) {
  return products.filter((p) => p[kind]).map((p) => ({ slug: p.slug }))
}

export async function docMetadata(kind: DocKind, { params }: DocParams): Promise<Metadata> {
  const product = getProduct((await params).slug)
  if (!product?.[kind]) return {}
  return {
    title: `${product.name} ${DOC_TITLES[kind]}`,
    alternates: { canonical: `/products/${product.slug}/${kind}` },
  }
}

export async function ProductDocPage({ kind, params }: { kind: DocKind } & DocParams) {
  const product = getProduct((await params).slug)
  const doc = product?.[kind]
  if (!product || !doc) notFound()
  return <ProductDocView title={`${product.name} ${DOC_TITLES[kind]}`} doc={doc} />
}
