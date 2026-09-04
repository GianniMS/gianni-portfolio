import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getItems } from '@/lib/content'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { PortfolioItem } from '@/types'
import { deleteItem } from '@/app/dashboard/actions'

function isCategory(value: string): value is PortfolioItem['category'] {
  return (CATEGORIES as string[]).includes(value)
}

export default async function CategoryItemsPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!isCategory(category)) notFound()

  const items = (await getItems()).filter((i) => i.category === category)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">{CATEGORY_LABELS[category]}</h1>
        <Link
          href={`/dashboard/items/${category}/new`}
          className="bg-blue text-background rounded px-3 py-2 text-sm"
        >
          Add new
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border border-foreground/10 rounded px-3 py-2"
          >
            <span className="text-sm">{item.title}</span>
            <div className="flex items-center gap-3">
              <Link href={`/dashboard/items/${category}/${item.id}`} className="text-sm text-blue">
                Edit
              </Link>
              <form action={deleteItem.bind(null, item.id, category)}>
                <button type="submit" className="text-sm text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
        {items.length === 0 && <p className="text-sm text-foreground/60">No items yet.</p>}
      </ul>
    </div>
  )
}
