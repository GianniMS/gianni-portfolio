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
  const supportSections =
    product.support?.sections.filter((section) => section.heading !== 'Contact') ?? []
  // Untitled support copy reads as the rest of the description, so it joins that paragraph
  const leading = supportSections.findIndex((section) => section.heading)
  const untitled = leading === -1 ? supportSections : supportSections.slice(0, leading)
  const sections = leading === -1 ? [] : supportSections.slice(leading)
  const intro = [
    product.description,
    ...untitled.flatMap((section) => section.blocks.filter((b) => typeof b === 'string')),
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="mt-12 lg:mt-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <h1 className="flex items-center gap-[0.15em] text-[clamp(2.5rem,6vw,6rem)] leading-none tracking-tight [overflow-wrap:anywhere]">
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

        <div className="flex max-w-[640px] flex-col gap-10">
          {intro && <p className="leading-relaxed">{intro}</p>}
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
      </div>

      {gallery.length > 0 && (
        <div className="mt-12 lg:mt-16">
          <ProductStrip name={product.name} images={gallery} />
        </div>
      )}
    </div>
  )
}
