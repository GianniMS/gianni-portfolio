'use client'

import { useState } from 'react'
import { upload } from '@vercel/blob/client'
import { buttonSecondary, errorClass, hintClass } from './styles'
import { TILE_MIN_WIDTH, TILE_RATIO } from '@/lib/images'

// Mirrors allowedContentTypes in /api/dashboard/upload, so the picker cannot
// offer a file the blob store will refuse
const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']

const RATIO_TOLERANCE = 0.02

function readSize(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(url)
    }
    img.onerror = () => {
      reject(new Error('Could not read the image.'))
      URL.revokeObjectURL(url)
    }
    img.src = url
  })
}

// An SVG scales without loss, so only its proportions are checked
async function checkTileFit(file: File): Promise<string | null> {
  const { width, height } = await readSize(file)
  const target = TILE_RATIO.width / TILE_RATIO.height
  if (!width || !height || Math.abs(width / height - target) / target > RATIO_TOLERANCE) {
    return `Use a ${TILE_RATIO.width}:${TILE_RATIO.height} portrait image so it fills the home tile. This one is ${width}×${height}.`
  }
  if (file.type !== 'image/svg+xml' && width < TILE_MIN_WIDTH) {
    return `Use an image at least ${TILE_MIN_WIDTH}px wide so it stays sharp. This one is ${width}px.`
  }
  return null
}

export default function ImageUploadField({
  name,
  defaultValue,
}: {
  name: string
  defaultValue?: string
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
      const misfit = await checkTileFit(file)
      if (misfit) {
        setError(misfit)
        return
      }
      const blob = await upload(file.name, file, {
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

      <label className={`${buttonSecondary} cursor-pointer`}>
        {url ? 'Replace image' : 'Choose image'}
        <input
          type="file"
          accept={ACCEPTED.join(',')}
          onChange={handleChange}
          className="hidden"
        />
      </label>

      <p className={hintClass}>
        PNG, JPEG, WebP or SVG in {TILE_RATIO.width}:{TILE_RATIO.height} portrait, at least{' '}
        {TILE_MIN_WIDTH}×{(TILE_MIN_WIDTH / TILE_RATIO.width) * TILE_RATIO.height}px
      </p>
      {uploading && <p className={hintClass}>Uploading…</p>}
      {error && <p className={errorClass}>{error}</p>}

      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="Preview"
          className="aspect-[346/450] w-40 object-cover"
        />
      ) : (
        <p className={hintClass}>No image yet</p>
      )}
    </div>
  )
}
