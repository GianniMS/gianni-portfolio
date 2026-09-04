'use client'

import Link from 'next/link'
import { useState } from 'react'
import ImageUploadField from './ImageUploadField'
import { PortfolioItem } from '@/types'
import {
  buttonPrimary,
  buttonSecondary,
  hintClass,
  inputClass,
  labelClass,
  panelClass,
  panelTitle,
} from './styles'

const radioLabel = 'flex items-center gap-2 text-sm font-normal'

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
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <input type="hidden" name="category" value={category} />

      <div className={panelClass}>
        <p className={panelTitle}>Basics</p>

        <label className={labelClass}>
          Title
          <input name="title" defaultValue={item?.title} required className={inputClass} />
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-bold">Link type</legend>
          <label className={radioLabel}>
            <input
              type="radio"
              name="linkType"
              value="internal"
              checked={linkType === 'internal'}
              onChange={() => setLinkType('internal')}
            />
            Detail page on this site
          </label>
          <label className={radioLabel}>
            <input
              type="radio"
              name="linkType"
              value="external"
              checked={linkType === 'external'}
              onChange={() => setLinkType('external')}
            />
            Link to an external URL
          </label>
        </fieldset>
      </div>

      {linkType === 'external' ? (
        <div className={panelClass}>
          <p className={panelTitle}>External link</p>
          <label className={labelClass}>
            URL
            <input
              name="href"
              type="url"
              defaultValue={item?.link === 'external' ? item.href : ''}
              required
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Year
            <input
              name="year"
              type="number"
              defaultValue={item?.link === 'external' ? item.year : new Date().getFullYear()}
              required
              className={inputClass}
            />
          </label>
        </div>
      ) : (
        <>
          <div className={panelClass}>
            <p className={panelTitle}>Content</p>
            <label className={labelClass}>
              Slug
              <span className={hintClass}>Used in the page URL</span>
              <input
                name="slug"
                defaultValue={item?.link === 'internal' ? item.slug : ''}
                required
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Description
              <span className={hintClass}>One paragraph per line</span>
              <textarea
                name="description"
                rows={5}
                defaultValue={item?.link === 'internal' ? item.description.join('\n') : ''}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Skills
              <span className={hintClass}>Comma-separated</span>
              <input
                name="skills"
                defaultValue={item?.link === 'internal' ? item.skills.join(', ') : ''}
                className={inputClass}
              />
            </label>
          </div>

          <div className={panelClass}>
            <p className={panelTitle}>Image</p>
            <ImageUploadField
              name="image"
              defaultValue={item?.link === 'internal' ? item.image : undefined}
            />
            <label className={labelClass}>
              Image tone
              <span className={hintClass}>
                Sets the colour of text crossing this image; auto samples the pixels
              </span>
              <select
                name="imageTone"
                defaultValue={item?.link === 'internal' ? item.imageTone ?? '' : ''}
                className={inputClass}
              >
                <option value="">Auto-detect from pixels</option>
                <option value="light">Light image</option>
                <option value="dark">Dark image</option>
              </select>
            </label>
          </div>

          <div className={panelClass}>
            <p className={panelTitle}>Dates</p>
            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-bold">Date type</legend>
              <label className={radioLabel}>
                <input
                  type="radio"
                  name="dateType"
                  value="single"
                  checked={dateType === 'single'}
                  onChange={() => setDateType('single')}
                />
                Single date
              </label>
              <label className={radioLabel}>
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
              <label className={labelClass}>
                Date
                <input
                  name="date"
                  type="date"
                  defaultValue={
                    item?.link === 'internal' && item.dateType === 'single' ? item.date : ''
                  }
                  required
                  className={inputClass}
                />
              </label>
            ) : (
              <div className="flex flex-col gap-4 sm:flex-row">
                <label className={`${labelClass} flex-1`}>
                  Start
                  <input
                    name="dateStart"
                    type="date"
                    defaultValue={
                      item?.link === 'internal' && item.dateType === 'range' ? item.dateStart : ''
                    }
                    required
                    className={inputClass}
                  />
                </label>
                <label className={`${labelClass} flex-1`}>
                  End
                  <span className={hintClass}>A date, or the word Today</span>
                  <input
                    name="dateEnd"
                    defaultValue={
                      item?.link === 'internal' && item.dateType === 'range' ? item.dateEnd : ''
                    }
                    required
                    className={inputClass}
                  />
                </label>
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex items-center gap-3">
        <button type="submit" className={buttonPrimary}>
          {item ? 'Save changes' : 'Add item'}
        </button>
        <Link href={`/dashboard/items/${category}`} className={buttonSecondary}>
          Cancel
        </Link>
      </div>
    </form>
  )
}
