import { getHomeFresh, getItemsFresh, getProductsFresh } from '@/lib/content'
import { tileOptions } from '@/lib/home'
import { saveProductsPageAction } from '@/app/dashboard/actions'
import ProductsPageForm from '@/components/dashboard/ProductsPageForm'
import PageHeader from '@/components/dashboard/PageHeader'

export default async function ProductsPageTilesPage() {
  const [home, items, products] = await Promise.all([
    getHomeFresh(),
    getItemsFresh(),
    getProductsFresh(),
  ])
  const tiles = home?.productsPage?.tiles ?? []

  return (
    <>
      <PageHeader
        title="Products page tiles"
        back={{ href: '/dashboard/products', label: 'Products' }}
      />
      {/* Keyed on the saved tiles so the form remounts with what was stored after a save */}
      <ProductsPageForm
        key={JSON.stringify(tiles)}
        tiles={tiles}
        options={tileOptions(items, products)}
        action={saveProductsPageAction}
      />
    </>
  )
}
