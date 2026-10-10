import { createProduct } from '@/app/dashboard/actions'
import PageHeader from '@/components/dashboard/PageHeader'
import ProductForm from '@/components/dashboard/ProductForm'

export default function NewProductPage() {
  return (
    <>
      <PageHeader title="New product" back={{ href: '/dashboard/products', label: 'Products' }} />
      <ProductForm action={createProduct} />
    </>
  )
}
