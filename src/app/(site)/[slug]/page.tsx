import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/content'
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
  // Contact lives on the Support page; here the support copy only sells the product
  const sections =
    product.support?.sections.filter((section) => section.heading !== 'Contact') ?? []

  return (
    <div className="mt-12 lg:mt-20">
      <h1 className="flex items-center gap-[0.15em] text-[clamp(2.5rem,9vw,8rem)] leading-none tracking-tight [overflow-wrap:anywhere]">
        {product.icon && (
          <Image
            src={imageSrc(product.icon)}
            alt=""
            width={256}
            height={256}
            className="size-[0.8em] shrink-0 object-contain"
            priority
          />
        )}
        <span className="min-w-0">{product.name}</span>
      </h1>

      <div className="mt-10 flex max-w-[640px] flex-col gap-10 lg:mt-16">
        {product.description && <p className="leading-relaxed">{product.description}</p>}
        {sections.length > 0 && <ProductDocSections doc={{ sections }} />}
        {product.link && (
          <p>
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
      </div>

      {gallery.length > 0 && (
        <div className="mt-12 lg:mt-16">
          <ProductStrip name={product.name} images={gallery} />
        </div>
      )}
    </div>
  )
}
