'use client'

import { useState } from 'react'
import ImageUploadField from './ImageUploadField'
import { HomeConfig, HoverText } from '@/types'
import { HOME_TILE_COUNT, encodeTileRef } from '@/lib/home'
import { imageSrc } from '@/lib/images'
import { buttonPrimary, hintClass, inputClass, labelClass, panelClass, panelTitle } from './styles'

export type TileOption = { value: string; label: string; group: string; image: string } & HoverText

function HoverFields({
  prefix,
  value,
  fallback,
}: {
  prefix: string
  value?: HoverText
  fallback: HoverText
}) {
  return (
    <>
      <label className={labelClass}>
        Hover title
        <input
          name={`${prefix}Title`}
          defaultValue={value?.title}
          placeholder={fallback.title}
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Hover description
        <textarea
          name={`${prefix}Description`}
          rows={3}
          defaultValue={value?.description}
          placeholder={fallback.description}
          className={inputClass}
        />
      </label>
    </>
  )
}

export default function HomeForm({
  home,
  options,
  aboutFallback,
  action,
}: {
  home: HomeConfig | null
  options: TileOption[]
  aboutFallback: HoverText
  action: (formData: FormData) => void
}) {
  const [picked, setPicked] = useState(() =>
    Array.from({ length: HOME_TILE_COUNT }, (_, i) => {
      const tile = home?.tiles[i]
      return tile ? encodeTileRef(tile.ref) : ''
    })
  )
  const groups = [...new Set(options.map((o) => o.group))]

  return (
    <form action={action} className="flex max-w-2xl flex-col gap-10">
      <p className={hintClass}>
        Five tiles show on the home page, left to right. Blank hover text falls back to the
        greyed-out text, taken from the linked entry.
      </p>

      <div className={panelClass}>
        <p className={panelTitle}>Tile 1 · About Me</p>
        <p className={hintClass}>Always links to the About Me page</p>
        <ImageUploadField name="aboutImage" defaultValue={home?.about.image} />
        <HoverFields prefix="about" value={home?.about} fallback={aboutFallback} />
      </div>

      {picked.map((value, i) => {
        const option = options.find((o) => o.value === value)
        const saved = home?.tiles[i]
        const keepText = saved && encodeTileRef(saved.ref) === value
        return (
          <div key={i} className={panelClass}>
            <p className={panelTitle}>Tile {i + 2}</p>
            <label className={labelClass}>
              Links to
              <select
                name={`tile${i}`}
                value={value}
                onChange={(e) =>
                  setPicked((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                }
                className={inputClass}
              >
                <option value="">Nothing (tile hidden)</option>
                {groups.map((group) => (
                  <optgroup key={group} label={group}>
                    {options
                      .filter((o) => o.group === group)
                      .map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label} ({o.group})
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>
            {option &&
              (option.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSrc(option.image)}
                  alt={`${option.label} thumbnail`}
                  className="aspect-[346/450] w-40 object-cover"
                />
              ) : (
                <div className="aspect-[346/450] w-40 bg-placeholder" />
              ))}
            {option && (
              <HoverFields
                key={value}
                prefix={`tile${i}`}
                value={keepText ? saved : undefined}
                fallback={option}
              />
            )}
          </div>
        )
      })}

      <button type="submit" className={buttonPrimary}>
        Save changes
      </button>
    </form>
  )
}
