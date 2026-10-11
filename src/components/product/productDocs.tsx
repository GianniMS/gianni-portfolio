import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDocView from '@/components/product/ProductDocView'
import { getProduct, getProducts } from '@/lib/content'

export type DocKind = 'support' | 'privacy' | 'terms'

const DOC_TITLES: Record<DocKind, string> = {
  support: 'Support',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
}

export type DocParams = { params: Promise<{ slug: string }> }

export async function docStaticParams(kind: DocKind) {
  return (await getProducts()).filter((p) => p[kind]).map((p) => ({ slug: p.slug }))
}

export async function docMetadata(kind: DocKind, { params }: DocParams): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  if (!product?.[kind]) return {}
  return {
    title: `${product.name} ${DOC_TITLES[kind]}`,
    alternates: { canonical: `/${product.slug}/${kind}` },
  }
}

export async function ProductDocPage({ kind, params }: { kind: DocKind } & DocParams) {
  const product = await getProduct((await params).slug)
  const doc = product?.[kind]
  if (!product || !doc) notFound()
  return <ProductDocView title={`${product.name} ${DOC_TITLES[kind]}`} doc={doc} />
}
