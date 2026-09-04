import { notFound } from 'next/navigation'
import { getItems } from '@/lib/content'
import { CATEGORIES } from '@/data/categories'
import { PortfolioItem } from '@/types'
import { updateItem } from '@/app/dashboard/actions'
import ItemForm from '@/components/dashboard/ItemForm'

function isCategory(value: string): value is PortfolioItem['category'] {
  return (CATEGORIES as string[]).includes(value)
}

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>
}) {
  const { category, id } = await params
  if (!isCategory(category)) notFound()

  const items = await getItems()
  const item = items.find((i) => i.id === id && i.category === category)
  if (!item) notFound()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">Edit {item.title}</h1>
      <ItemForm category={category} item={item} action={updateItem.bind(null, id)} />
    </div>
  )
}
