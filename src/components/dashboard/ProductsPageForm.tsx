import { PickedTile } from '@/types'
import { PRODUCTS_PAGE_TILE_COUNT } from '@/lib/home'
import { TileOption, TileSlots } from './HomeForm'
import { buttonPrimary, hintClass } from './styles'

export default function ProductsPageForm({
  tiles,
  options,
  action,
}: {
  tiles: PickedTile[]
  options: TileOption[]
  action: (formData: FormData) => void
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-10">
      <p className={hintClass}>
        Up to {PRODUCTS_PAGE_TILE_COUNT} tiles show on the Products page, left to right; empty
        slots are left out. Blank hover text falls back to the greyed-out text, taken from the
        linked entry.
      </p>
      <TileSlots saved={tiles} count={PRODUCTS_PAGE_TILE_COUNT} options={options} />
      <button type="submit" className={buttonPrimary}>
        Save changes
      </button>
    </form>
  )
}
