import Link from 'next/link'
import { getProductsFresh } from '@/lib/content'
import { deleteProduct } from '@/app/dashboard/actions'
import DeleteButton from '@/components/dashboard/DeleteButton'
import PageHeader from '@/components/dashboard/PageHeader'
import { buttonPrimary, linkClass, tdClass, thClass } from '@/components/dashboard/styles'

export default async function ProductsPage() {
  const products = await getProductsFresh()

  return (
    <>
      <PageHeader
        title="Products"
        meta={`${products.length} product${products.length === 1 ? '' : 's'}`}
        action={
          <Link href="/dashboard/products/new" className={buttonPrimary}>
            Add new
          </Link>
        }
      />

      {products.length === 0 ? (
        <p className="text-foreground/50">No products yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className={thClass}>Name</th>
                <th className={thClass}>Description</th>
                <th className={`${thClass} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug}>
                  <td className={tdClass}>
                    {product.name}
                    <span className="block text-sm text-foreground/50">/{product.slug}</span>
                  </td>
                  <td className={`${tdClass} text-foreground/50`}>
                    <span className="line-clamp-2">{product.description}</span>
                  </td>
                  <td className={tdClass}>
                    <div className="flex justify-end gap-4">
                      <Link href={`/dashboard/products/${product.slug}`} className={linkClass}>
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteProduct.bind(null, product.slug)}
                        confirmMessage={`Delete "${product.name}"? This cannot be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
