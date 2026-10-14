import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/content'
import ReadingShell from '@/components/layout/ReadingShell'
import { ProductDocSections } from '@/components/product/ProductDocView'
import { imageSrc } from '@/lib/images'
import ProductStrip from '@/components/product/ProductStrip'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description || `${product.name} by Gianni Mendonça Semedo.`,
    alternates: { canonical: `/${product.slug}` },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).slug)
  if (!product) notFound()

  const gallery = product.gallery ?? []

  return (
    <ReadingShell
      title={product.name}
      icon={
        product.icon && (
          <Image
            src={imageSrc(product.icon)}
            alt=""
            width={256}
            height={256}
            className="size-[0.8em] shrink-0 object-contain"
            priority
          />
        )
      }
      strip={
        gallery.length > 0 && (
          <ProductStrip name={product.name} images={gallery} />
        )
      }
    >
      {product.description && (
        <p className="text-[clamp(1.25rem,1.7vw,1.75rem)] leading-snug">{product.description}</p>
      )}
      {product.link && (
        <p className="mt-10 first:mt-0">
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
        <section className="mt-16 border-t border-foreground pt-4 first:mt-0">
          {/* The support document's sections double as the product's feature copy */}
          <ProductDocSections doc={product.support} />
        </section>
      )}
    </ReadingShell>
  )
}
