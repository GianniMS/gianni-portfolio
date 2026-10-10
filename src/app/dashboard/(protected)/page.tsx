import Link from 'next/link'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { getHomeFresh, getItemsFresh, getProductsFresh } from '@/lib/content'
import PageHeader from '@/components/dashboard/PageHeader'
import { linkClass, tdClass, thClass } from '@/components/dashboard/styles'

export default async function DashboardHomePage() {
  const [items, products, home] = await Promise.all([
    getItemsFresh(),
    getProductsFresh(),
    getHomeFresh(),
  ])

  const groups = [
    { label: 'Home', count: `About tile + ${home?.tiles.length ?? 0} picked`, href: '/dashboard/home' },
    { label: 'Products', count: String(products.length), href: '/dashboard/products', add: '/dashboard/products/new' },
    ...CATEGORIES.map((category) => ({
      label: CATEGORY_LABELS[category],
      count: String(items.filter((i) => i.category === category).length),
      href: `/dashboard/items/${category}`,
      add: `/dashboard/items/${category}/new`,
    })),
    { label: 'Pages', count: 'About Me, CV, Contact', href: '/dashboard/cv' },
  ]

  return (
    <>
      <PageHeader title="Content" />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className={thClass}>Group</th>
              <th className={thClass}>Contents</th>
              <th className={`${thClass} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.label}>
                <td className={tdClass}>{group.label}</td>
                <td className={`${tdClass} text-foreground/50`}>{group.count}</td>
                <td className={tdClass}>
                  <div className="flex justify-end gap-4">
                    <Link href={group.href} className={linkClass}>
                      Manage
                    </Link>
                    {'add' in group && group.add && (
                      <Link href={group.add} className={linkClass}>
                        Add new
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
