import { getCVFresh, getHomeFresh, getItemsFresh, getProductsFresh } from '@/lib/content'
import { CATEGORIES, CATEGORY_LABELS } from '@/data/categories'
import { encodeTileRef } from '@/lib/home'
import { saveHomeAction } from '@/app/dashboard/actions'
import HomeForm, { TileOption } from '@/components/dashboard/HomeForm'
import PageHeader from '@/components/dashboard/PageHeader'

export default async function HomeEditPage() {
  const [home, cv, items, products] = await Promise.all([
    getHomeFresh(),
    getCVFresh(),
    getItemsFresh(),
    getProductsFresh(),
  ])

  // Only entries with a detail page have an image and somewhere to link to
  const options: TileOption[] = [
    ...products.map((p) => ({
      value: encodeTileRef({ kind: 'product', slug: p.slug }),
      label: p.name,
      group: 'Products',
      image: p.image ?? '',
      title: p.name,
      description: p.description,
    })),
    ...CATEGORIES.flatMap((category) =>
      items.flatMap((item) =>
        item.category === category && item.link === 'internal'
          ? [
              {
                value: encodeTileRef({ kind: 'item', id: item.id }),
                label: item.title,
                group: CATEGORY_LABELS[category],
                image: item.image,
                title: item.title,
                description: item.description[0] ?? '',
              },
            ]
          : []
      )
    ),
  ]

  return (
    <>
      <PageHeader title="Home" />
      {/* Keyed on the saved document: React resets an action form's fields to their
          mount-time defaults, so the form remounts after a save to show what was stored */}
      <HomeForm
        key={JSON.stringify(home)}
        home={home}
        options={options}
        aboutFallback={{ title: 'About Me', description: cv?.about[0] ?? '' }}
        action={saveHomeAction}
      />
    </>
  )
}
