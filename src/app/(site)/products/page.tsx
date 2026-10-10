import type { Metadata } from 'next'
import Link from 'next/link'
import { getProducts } from '@/lib/content'

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
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
