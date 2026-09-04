import Link from 'next/link'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { getItems } from '@/lib/content'

export default async function DashboardHomePage() {
  const items = await getItems()

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {CATEGORIES.map((category) => {
          const count = items.filter((i) => i.category === category).length
          return (
            <Link
              key={category}
              href={`/dashboard/items/${category}`}
              className="border border-foreground/20 rounded p-4 hover:border-blue"
            >
              <p className="font-bold">{CATEGORY_LABELS[category]}</p>
              <p className="text-sm text-foreground/60">{count} item{count === 1 ? '' : 's'}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
