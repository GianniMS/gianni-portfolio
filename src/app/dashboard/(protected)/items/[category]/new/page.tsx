import { notFound } from 'next/navigation'
import { CATEGORY_LABELS, isCategory } from '@/data/categories'
import { createItem } from '@/app/dashboard/actions'
import ItemForm from '@/components/dashboard/ItemForm'
import PageHeader from '@/components/dashboard/PageHeader'

export default async function NewItemPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!isCategory(category)) notFound()

  return (
    <>
      <PageHeader
        title="New item"
        back={{ href: `/dashboard/items/${category}`, label: CATEGORY_LABELS[category] }}
      />
      <ItemForm category={category} action={createItem} />
    </>
  )
}
