'use client'

import { useState } from 'react'
import { upload } from '@vercel/blob/client'
import { buttonSecondary, errorClass, hintClass } from './styles'
import { TILE_MIN_WIDTH, TILE_RATIO } from '@/lib/images'

// Mirrors allowedContentTypes in /api/dashboard/upload, so the picker cannot
// offer a file the blob store will refuse
const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']

const RATIO_TOLERANCE = 0.02

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      resolve(img)
      URL.revokeObjectURL(url)
    }
    img.onerror = () => {
      reject(new Error('Could not read the image.'))
      URL.revokeObjectURL(url)
    }
    img.src = url
  })
}

function canvasToFile(canvas: HTMLCanvasElement, file: File): Promise<File> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob ? resolve(new File([blob], file.name, { type: file.type })) : reject(new Error('Could not crop the image.')),
      file.type,
      0.92
    )
  )
}

// Raster images are centre-cropped to the tile shape so they always fill it.
// An SVG cannot be cropped this way, so it must already have the right proportions.
async function fitToTile(file: File): Promise<File> {
  const img = await loadImage(file)
  const { naturalWidth: width, naturalHeight: height } = img
  const target = TILE_RATIO.width / TILE_RATIO.height
  const ratio = width / height

  if (file.type === 'image/svg+xml') {
    if (!width || !height || Math.abs(ratio - target) / target > RATIO_TOLERANCE) {
      throw new Error(`Use an SVG in ${TILE_RATIO.width}:${TILE_RATIO.height} portrait so it fills the home tile.`)
    }
    return file
  }

  const cropWidth = ratio > target ? Math.round(height * target) : width
  const cropHeight = ratio > target ? height : Math.round(width / target)
  if (cropWidth < TILE_MIN_WIDTH) {
    throw new Error(
      `This image is too small: after cropping to the tile shape it is ${cropWidth}px wide, and at least ${TILE_MIN_WIDTH}px is needed to stay sharp.`
    )
  }
  if (Math.abs(ratio - target) / target <= RATIO_TOLERANCE) return file

  const canvas = document.createElement('canvas')
  canvas.width = cropWidth
  canvas.height = cropHeight
  canvas
    .getContext('2d')
    ?.drawImage(img, (width - cropWidth) / 2, (height - cropHeight) / 2, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
  return canvasToFile(canvas, file)
}

export default function ImageUploadField({
  name,
  defaultValue,
  tile = true,
  removable = true,
}: {
  name: string
  defaultValue?: string
  // Thumbnails can end up in a home tile and are held to its shape; extra images are not
  tile?: boolean
  // Off where the surrounding list already removes the whole slot
  removable?: boolean
}) {
  const [url, setUrl] = useState(defaultValue ?? '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    // Cleared so picking the same file again after fixing it still fires a change
    e.target.value = ''
    if (!file) return

    if (!ACCEPTED.includes(file.type)) {
      setError('Use a PNG, JPEG, WebP or SVG.')
      return
    }

    setUploading(true)
    setError(null)
    try {
      const fitted = tile ? await fitToTile(file) : file
      const blob = await upload(fitted.name, fitted, {
        access: 'public',
        handleUploadUrl: '/api/dashboard/upload',
      })
      setUrl(blob.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={url} />
      {/* Saving mid-upload would store the previous image, so the form is held invalid until it lands */}
      {uploading && (
        <input
          required
          tabIndex={-1}
          aria-hidden
          value=""
          onChange={() => {}}
          ref={(el) => el?.setCustomValidity('Wait for the image to finish uploading.')}
          className="sr-only"
        />
      )}

      <div className="flex gap-6">
        <label className={`${buttonSecondary} cursor-pointer`}>
          {url ? 'Replace image' : 'Choose image'}
          <input
            type="file"
            accept={ACCEPTED.join(',')}
            onChange={handleChange}
            className="hidden"
          />
        </label>
        {removable && url && (
          <button
            type="button"
            onClick={() => setUrl('')}
            className={`${buttonSecondary} text-foreground/50 hover:text-foreground`}
          >
            Delete image
          </button>
        )}
      </div>

      <p className={hintClass}>
        {tile ? (
          <>
            PNG, JPEG or WebP at least {TILE_MIN_WIDTH}×{(TILE_MIN_WIDTH / TILE_RATIO.width) * TILE_RATIO.height}px;
        other shapes are centre-cropped to the {TILE_RATIO.width}:{TILE_RATIO.height} tile. An SVG must
            already be {TILE_RATIO.width}:{TILE_RATIO.height}.
          </>
        ) : (
          'PNG, JPEG, WebP or SVG, any shape'
        )}
      </p>
      {uploading && <p className={hintClass}>Uploading…</p>}
      {error && <p className={errorClass}>{error}</p>}

      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="Preview"
          className={tile ? 'aspect-[346/450] w-40 object-cover' : 'h-40 w-auto'}
        />
      ) : (
        <p className={hintClass}>No image yet</p>
      )}
    </div>
  )
}
