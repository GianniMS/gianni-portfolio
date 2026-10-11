import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/lib/content'
import { imageSrc } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products made by Gianni Mendonça Semedo.',
  alternates: { canonical: '/products' },
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/${product.slug}`}>
              <Image
                src={imageSrc(product.image)}
                alt={product.name}
                width={346}
                height={450}
                className="aspect-[346/450] w-[346px] max-w-full object-cover"
              />
              {product.name}
            </Link>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
