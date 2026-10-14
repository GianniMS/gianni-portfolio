import { getCVFresh, getHomeFresh, getItemsFresh, getProductsFresh } from '@/lib/content'
import { tileOptions } from '@/lib/home'
import { saveHomeAction } from '@/app/dashboard/actions'
import HomeForm from '@/components/dashboard/HomeForm'
import PageHeader from '@/components/dashboard/PageHeader'

export default async function HomeEditPage() {
  const [home, cv, items, products] = await Promise.all([
    getHomeFresh(),
    getCVFresh(),
    getItemsFresh(),
    getProductsFresh(),
  ])

  const options = tileOptions(items, products)

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
