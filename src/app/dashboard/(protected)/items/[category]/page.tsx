import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getItemsFresh } from '@/lib/content'
import { CATEGORY_LABELS, isCategory } from '@/data/categories'
import { getItemTimestamp } from '@/data/itemDates'
import { PortfolioItem } from '@/types'
import { deleteItem } from '@/app/dashboard/actions'
import DeleteButton from '@/components/dashboard/DeleteButton'
import PageHeader from '@/components/dashboard/PageHeader'
import { buttonPrimary, linkClass, tdClass, thClass } from '@/components/dashboard/styles'

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

  const items = (await getItemsFresh())
    .filter((i) => i.category === category)
    .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a))

  const addHref = `/dashboard/items/${category}/new`

  return (
    <>
      <PageHeader
        title={CATEGORY_LABELS[category]}
        meta={`${items.length} item${items.length === 1 ? '' : 's'}`}
        action={
          <Link href={addHref} className={buttonPrimary}>
            Add new
          </Link>
        }
      />

      {items.length === 0 ? (
        <p className="text-foreground/50">No {CATEGORY_LABELS[category].toLowerCase()} yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className={thClass}>Title</th>
                <th className={thClass}>Type</th>
                <th className={thClass}>Date</th>
                <th className={`${thClass} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className={tdClass}>
                    {item.title}
                    {item.link === 'internal' && (
                      <span className="block text-sm text-foreground/50">/{item.slug}</span>
                    )}
                  </td>
                  <td className={tdClass}>
                    {item.link === 'internal' ? 'Detail page' : 'External link'}
                    {item.isPrivate && <span className="block text-sm text-foreground/50">Private</span>}
                  </td>
                  <td className={`${tdClass} whitespace-nowrap`}>{whenLabel(item)}</td>
                  <td className={tdClass}>
                    <div className="flex justify-end gap-4">
                      <Link href={`/dashboard/items/${category}/${item.id}`} className={linkClass}>
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
    </>
  )
}
