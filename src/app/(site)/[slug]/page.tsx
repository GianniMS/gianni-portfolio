import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/content'
import ProductShell from '@/components/product/ProductShell'
import { ProductDocSections } from '@/components/product/ProductDocView'

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

  return (
    <ProductShell title={product.name}>
      <p className="text-[clamp(1.25rem,1.7vw,1.75rem)] leading-snug">{product.description}</p>
      {product.link && (
        <p className="mt-10">
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-foreground px-5 py-3 text-background transition-opacity duration-800 hover:opacity-70"
          >
            Get {product.name} →
          </a>
        </p>
      )}
      {product.support && (
        <section className="mt-16 border-t border-foreground pt-4">
          {/* The support document's sections double as the product's feature copy */}
          <ProductDocSections doc={product.support} />
        </section>
      )}
    </ProductShell>
  )
}
