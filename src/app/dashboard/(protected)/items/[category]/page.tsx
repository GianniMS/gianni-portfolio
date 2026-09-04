import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getItems } from '@/lib/content'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { getItemTimestamp } from '@/data/itemDates'
import { PortfolioItem } from '@/types'
import { deleteItem } from '@/app/dashboard/actions'
import DeleteButton from '@/components/dashboard/DeleteButton'
import {
  buttonCompact,
  buttonPrimary,
  buttonSecondary,
  tdClass,
  thClass,
} from '@/components/dashboard/styles'

function isCategory(value: string): value is PortfolioItem['category'] {
  return (CATEGORIES as string[]).includes(value)
}

function whenLabel(item: PortfolioItem): string {
  if (item.link === 'external') return String(item.year)
  return item.dateType === 'single' ? item.date : `${item.dateStart} – ${item.dateEnd}`
}

export default async function CategoryItemsPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!isCategory(category)) notFound()

  const items = (await getItems())
    .filter((i) => i.category === category)
    .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{CATEGORY_LABELS[category]}</h1>
          <p className="text-sm text-foreground/60">
            {items.length} item{items.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link href={`/dashboard/items/${category}/new`} className={buttonPrimary}>
          Add new
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded border border-foreground/10 p-8">
          <p className="text-sm text-foreground/60">
            No {CATEGORY_LABELS[category].toLowerCase()} yet.
          </p>
          <Link href={`/dashboard/items/${category}/new`} className={buttonPrimary}>
            Add the first one
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded border border-foreground/10">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={thClass}>Title</th>
                <th className={thClass}>Type</th>
                <th className={thClass}>Date</th>
                <th className={thClass}>Image tone</th>
                <th className={`${thClass} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-foreground/[0.03]">
                  <td className={`${tdClass} font-bold`}>
                    {item.title}
                    {item.link === 'internal' && (
                      <span className="block text-xs font-normal text-foreground/50">
                        /{item.slug}
                      </span>
                    )}
                  </td>
                  <td className={tdClass}>
                    {item.link === 'internal' ? 'Detail page' : 'External link'}
                  </td>
                  <td className={`${tdClass} whitespace-nowrap`}>{whenLabel(item)}</td>
                  <td className={`${tdClass} text-foreground/60`}>
                    {item.link === 'internal' ? item.imageTone ?? 'Auto' : '—'}
                  </td>
                  <td className={tdClass}>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/items/${category}/${item.id}`}
                        className={`${buttonSecondary} ${buttonCompact}`}
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteItem.bind(null, item.id, category)}
                        confirmMessage={`Delete "${item.title}"? This cannot be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
