import type { Metadata } from 'next'
import StageIndex, { IndexSection } from '@/components/stage/StageIndex'
import { getProducts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products made by Gianni Mendonça Semedo.',
  alternates: { canonical: '/products' },
}

export default async function ProductsPage() {
  const products = await getProducts()

  const sections: IndexSection[] = [
    {
      label: 'Products',
      rows: products.map((product) => ({
        id: product.slug,
        title: product.name,
        isPrivate: false,
        href: `/${product.slug}`,
        external: false,
        stage: { title: product.name, image: product.image || undefined },
      })),
    },
  ]

  return (
    <>
      <h1 className="sr-only">Products</h1>
      <StageIndex sections={sections} defaultTitle="Products" />
    </>
  )
}
