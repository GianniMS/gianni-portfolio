import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/${product.slug}` },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).slug)
  if (!product) notFound()

  const docs = [
    { kind: 'support', label: 'Support' },
    { kind: 'privacy', label: 'Privacy Policy' },
    { kind: 'terms', label: 'Terms of Use' },
  ] as const

  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {product.link && (
        <a href={product.link} target="_blank" rel="noopener noreferrer">
          Get {product.name}
        </a>
      )}
      <ul>
        {docs
          .filter((d) => product[d.kind])
          .map((d) => (
            <li key={d.kind}>
              <Link href={`/${product.slug}/${d.kind}`}>{d.label}</Link>
            </li>
          ))}
      </ul>
    </>
  )
}
