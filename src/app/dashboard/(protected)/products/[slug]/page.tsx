import { notFound } from 'next/navigation'
import { getProductsFresh } from '@/lib/content'
import { updateProduct } from '@/app/dashboard/actions'
import PageHeader from '@/components/dashboard/PageHeader'
import ProductForm from '@/components/dashboard/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = (await getProductsFresh()).find((p) => p.slug === slug)
  if (!product) notFound()

  return (
    <>
      <PageHeader title={product.name} back={{ href: '/dashboard/products', label: 'Products' }} />
      <ProductForm product={product} action={updateProduct.bind(null, slug)} />
    </>
  )
}
