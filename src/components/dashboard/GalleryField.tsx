'use client'

import { useRef, useState } from 'react'
import ImageUploadField from './ImageUploadField'
import { GALLERY_MAX } from '@/lib/images'
import { buttonSecondary, hintClass } from './styles'

export default function GalleryField({ name, defaultValue = [] }: { name: string; defaultValue?: string[] }) {
  const nextKey = useRef(defaultValue.length)
  const [slots, setSlots] = useState(() => defaultValue.map((url, key) => ({ key, url })))

  return (
    <div className="flex flex-col gap-6">
      <p className={hintClass}>
        Up to {GALLERY_MAX} extra images, shown on the detail page in this order
      </p>
      {slots.map((slot, i) => (
        <div key={slot.key} className="flex flex-col gap-2">
          <p>Image {i + 1}</p>
          <ImageUploadField name={name} defaultValue={slot.url} tile={false} removable={false} />
          <button
            type="button"
            onClick={() => setSlots((prev) => prev.filter((s) => s.key !== slot.key))}
            className={`${buttonSecondary} text-foreground/50 hover:text-foreground`}
          >
            Delete image
          </button>
        </div>
      ))}
      {slots.length < GALLERY_MAX && (
        <button
          type="button"
          onClick={() => setSlots((prev) => [...prev, { key: nextKey.current++, url: '' }])}
          className={buttonSecondary}
        >
          + Add image
        </button>
      )}
    </div>
  )
}
