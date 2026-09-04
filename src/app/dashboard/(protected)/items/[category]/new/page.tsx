import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { PortfolioItem } from '@/types'
import { createItem } from '@/app/dashboard/actions'
import ItemForm from '@/components/dashboard/ItemForm'

function isCategory(value: string): value is PortfolioItem['category'] {
  return (CATEGORIES as string[]).includes(value)
}

export default async function NewItemPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!isCategory(category)) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Link
          href={`/dashboard/items/${category}`}
          className="text-sm font-bold text-blue opacity-60 transition-opacity hover:opacity-100"
        >
          ← {CATEGORY_LABELS[category]}
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">New item</h1>
      </div>
      <ItemForm category={category} action={createItem} />
    </div>
  )
}
