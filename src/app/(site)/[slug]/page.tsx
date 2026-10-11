import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/content'
import { imageSrc } from '@/lib/images'

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
    openGraph: product.image ? { images: [imageSrc(product.image)] } : undefined,
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
      <Image
        src={imageSrc(product.image)}
        alt={product.name}
        width={692}
        height={900}
        className="aspect-[346/450] w-[346px] max-w-full object-cover"
        priority
      />
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
