import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/content'
import ReadingShell from '@/components/layout/ReadingShell'
import { ProductDocSections } from '@/components/product/ProductDocView'
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
          // The end padding lets the last image scroll clear of the reading column
          <ul className="-mx-2.5 flex snap-x gap-5 overflow-x-auto px-2.5 pb-2 md:-mx-5 md:px-5 lg:mx-0 lg:pr-[calc(640px+2.5rem)] lg:pl-0">
            {gallery.map((src, i) => (
              <li key={src} className="shrink-0 snap-start">
                <Image
                  src={imageSrc(src)}
                  alt={`${product.name} image ${i + 1}`}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 480px, 80vw"
                  className="h-64 w-auto max-w-none lg:h-80"
                />
              </li>
            ))}
          </ul>
        )
      }
    >
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
    </ReadingShell>
  )
}
