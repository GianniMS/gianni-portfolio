import Link from 'next/link'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { getItems } from '@/lib/content'
import { buttonCompact, buttonPrimary, buttonSecondary, tdClass, thClass } from '@/components/dashboard/styles'

export default async function DashboardHomePage() {
  const items = await getItems()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Content overview</h1>
        <p className="text-sm text-foreground/60">
          {items.length} item{items.length === 1 ? '' : 's'} published
        </p>
      </div>

      <div className="overflow-x-auto rounded border border-foreground/10">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className={thClass}>Category</th>
              <th className={thClass}>Items</th>
              <th className={`${thClass} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((category) => {
              const count = items.filter((i) => i.category === category).length
              return (
                <tr key={category} className="transition-colors hover:bg-foreground/[0.03]">
                  <td className={`${tdClass} font-bold`}>{CATEGORY_LABELS[category]}</td>
                  <td className={tdClass}>{count}</td>
                  <td className={tdClass}>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/items/${category}`}
                        className={`${buttonSecondary} ${buttonCompact}`}
                      >
                        Manage
                      </Link>
                      <Link
                        href={`/dashboard/items/${category}/new`}
                        className={`${buttonPrimary} ${buttonCompact}`}
                      >
                        Add new
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
            <tr className="transition-colors hover:bg-foreground/[0.03]">
              <td className={`${tdClass} font-bold`}>CV page</td>
              <td className={`${tdClass} text-foreground/60`}>About Me, Involved With, socials</td>
              <td className={tdClass}>
                <div className="flex justify-end gap-2">
                  <Link href="/dashboard/cv" className={`${buttonSecondary} ${buttonCompact}`}>
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
