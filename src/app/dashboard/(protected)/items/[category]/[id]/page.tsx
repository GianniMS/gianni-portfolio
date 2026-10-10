import { notFound } from 'next/navigation'
import { getItemsFresh } from '@/lib/content'
import { CATEGORY_LABELS, isCategory } from '@/data/categories'
import { updateItem } from '@/app/dashboard/actions'
import ItemForm from '@/components/dashboard/ItemForm'
import PageHeader from '@/components/dashboard/PageHeader'

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>
}) {
  const { category, id } = await params
  if (!isCategory(category)) notFound()

  const item = (await getItemsFresh()).find((i) => i.id === id && i.category === category)
  if (!item) notFound()

  return (
    <>
      <PageHeader
        title={item.title}
        back={{ href: `/dashboard/items/${category}`, label: CATEGORY_LABELS[category] }}
      />
      <ItemForm category={category} item={item} action={updateItem.bind(null, id)} />
    </>
  )
}
