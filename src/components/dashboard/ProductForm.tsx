import Link from 'next/link'
import ImageUploadField from './ImageUploadField'
import { Product } from '@/types'
import {
  buttonPrimary,
  buttonSecondary,
  hintClass,
  inputClass,
  labelClass,
  panelClass,
  panelTitle,
} from './styles'

export default function ProductForm({
  product,
  action,
}: {
  product?: Product
  action: (formData: FormData) => void
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-10">
      <div className={panelClass}>
        <p className={panelTitle}>Basics</p>
        <label className={labelClass}>
          Name
          <input name="name" defaultValue={product?.name} required className={inputClass} />
        </label>
        <label className={labelClass}>
          Slug
          <span className={hintClass}>Used in the page URL: /products/slug</span>
          <input
            name="slug"
            defaultValue={product?.slug}
            required
            pattern="[a-z0-9-]+"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Description
          <textarea
            name="description"
            rows={4}
            defaultValue={product?.description}
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Link
          <span className={hintClass}>Where people get the product, e.g. its store page</span>
          <input name="link" type="url" defaultValue={product?.link} className={inputClass} />
        </label>
      </div>

      <div className={panelClass}>
        <p className={panelTitle}>Image</p>
        <ImageUploadField name="image" defaultValue={product?.image} />
      </div>

      <div className="flex items-center gap-6">
        <button type="submit" className={buttonPrimary}>
          {product ? 'Save changes' : 'Add product'}
        </button>
        <Link href="/dashboard/products" className={buttonSecondary}>
          Cancel
        </Link>
      </div>
    </form>
  )
}
