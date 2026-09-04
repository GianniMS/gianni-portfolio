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
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">Add {CATEGORY_LABELS[category]} item</h1>
      <ItemForm category={category} action={createItem} />
    </div>
  )
}
