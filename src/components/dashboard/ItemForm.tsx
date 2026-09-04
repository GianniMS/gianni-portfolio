'use client'

import { useState } from 'react'
import ImageUploadField from './ImageUploadField'
import { PortfolioItem } from '@/types'

const inputClass = 'border border-foreground/20 rounded px-3 py-2'

export default function ItemForm({
  category,
  item,
  action,
}: {
  category: PortfolioItem['category']
  item?: PortfolioItem
  action: (formData: FormData) => void
}) {
  const [linkType, setLinkType] = useState<'internal' | 'external'>(item?.link ?? 'internal')
  const [dateType, setDateType] = useState<'single' | 'range'>(
    item && item.link === 'internal' ? item.dateType : 'single'
  )

  return (
    <form action={action} className="flex flex-col gap-4 max-w-xl">
      <input type="hidden" name="category" value={category} />

      <label className="flex flex-col gap-1 text-sm">
        Title
        <input name="title" defaultValue={item?.title} required className={inputClass} />
      </label>

      <fieldset className="flex gap-4 text-sm">
        <legend className="mb-1">Link type</legend>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="linkType"
            value="internal"
            checked={linkType === 'internal'}
            onChange={() => setLinkType('internal')}
          />
          Internal (own detail page)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="linkType"
            value="external"
            checked={linkType === 'external'}
            onChange={() => setLinkType('external')}
          />
          External link
        </label>
      </fieldset>

      {linkType === 'external' ? (
        <>
          <label className="flex flex-col gap-1 text-sm">
            URL
            <input
              name="href"
              type="url"
              defaultValue={item?.link === 'external' ? item.href : ''}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Year
            <input
              name="year"
              type="number"
              defaultValue={item?.link === 'external' ? item.year : new Date().getFullYear()}
              required
              className={inputClass}
            />
          </label>
        </>
      ) : (
        <>
          <label className="flex flex-col gap-1 text-sm">
            Slug (used in the URL)
            <input
              name="slug"
              defaultValue={item?.link === 'internal' ? item.slug : ''}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Description (one paragraph per line)
            <textarea
              name="description"
              rows={4}
              defaultValue={item?.link === 'internal' ? item.description.join('\n') : ''}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Skills (comma-separated)
            <input
              name="skills"
              defaultValue={item?.link === 'internal' ? item.skills.join(', ') : ''}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Image
            <ImageUploadField name="image" defaultValue={item?.link === 'internal' ? item.image : undefined} />
          </label>

          <fieldset className="flex gap-4 text-sm">
            <legend className="mb-1">Date type</legend>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dateType"
                value="single"
                checked={dateType === 'single'}
                onChange={() => setDateType('single')}
              />
              Single date
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dateType"
                value="range"
                checked={dateType === 'range'}
                onChange={() => setDateType('range')}
              />
              Date range
            </label>
          </fieldset>

          {dateType === 'single' ? (
            <label className="flex flex-col gap-1 text-sm">
              Date
              <input
                name="date"
                type="date"
                defaultValue={item?.link === 'internal' && item.dateType === 'single' ? item.date : ''}
                required
                className={inputClass}
              />
            </label>
          ) : (
            <div className="flex gap-4">
              <label className="flex flex-col gap-1 text-sm flex-1">
                Start
                <input
                  name="dateStart"
                  type="date"
                  defaultValue={item?.link === 'internal' && item.dateType === 'range' ? item.dateStart : ''}
                  required
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm flex-1">
                End (or &quot;Today&quot;)
                <input
                  name="dateEnd"
                  defaultValue={item?.link === 'internal' && item.dateType === 'range' ? item.dateEnd : ''}
                  required
                  className={inputClass}
                />
              </label>
            </div>
          )}
        </>
      )}

      <button type="submit" className="bg-blue text-background rounded px-3 py-2 text-sm w-fit">
        {item ? 'Save changes' : 'Add item'}
      </button>
    </form>
  )
}
