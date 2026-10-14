import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDocView from '@/components/product/ProductDocView'
import { getProduct, getProducts } from '@/lib/content'
import { pageMetadata } from '@/lib/metadata'

export type DocKind = 'support' | 'privacy' | 'terms'

export const DOC_KINDS: DocKind[] = ['support', 'terms', 'privacy']

export const DOC_NAV_LABELS: Record<DocKind, string> = {
  support: 'Support',
  privacy: 'Privacy Statement',
  terms: 'Terms of Service',
}

export const DOC_TITLES: Record<DocKind, string> = {
  support: 'Support',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
}

export type DocParams = { params: Promise<{ slug: string }> }

export async function docStaticParams(kind: DocKind) {
  return (await getProducts()).filter((p) => p[kind]).map((p) => ({ slug: p.slug }))
}

const DOC_DESCRIPTIONS: Record<DocKind, (name: string) => string> = {
  support: (name) => `Help and answers for ${name}, and how to get in touch.`,
  privacy: (name) => `How ${name} handles your data: what stays on your device and what is shared.`,
  terms: (name) => `The terms that apply when you buy and use ${name}.`,
}

export async function docMetadata(kind: DocKind, { params }: DocParams): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  if (!product?.[kind]) return {}
  return pageMetadata({
    title: `${product.name} ${DOC_TITLES[kind]}`,
    description: DOC_DESCRIPTIONS[kind](product.name),
    path: `/${product.slug}/${kind}`,
  })
}

export async function ProductDocPage({ kind, params }: { kind: DocKind } & DocParams) {
  const product = await getProduct((await params).slug)
  const doc = product?.[kind]
  if (!product || !doc) notFound()
  return <ProductDocView title={DOC_TITLES[kind]} doc={doc} />
}
