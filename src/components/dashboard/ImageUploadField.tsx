'use client'

import { useState } from 'react'
import { upload } from '@vercel/blob/client'
import { buttonSecondary, hintClass }  from './styles'

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
    if (!file) return

    setUploading(true)
    setError(null)
    try {
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

      <label className={`${buttonSecondary} w-fit cursor-pointer`}>
        {url ? 'Replace image' : 'Choose image'}
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
      </label>

      {uploading && <p className={hintClass}>Uploading…</p>}
      {error && <p className="border-l-2 border-blue bg-foreground/5 px-3 py-2 text-sm">{error}</p>}

      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="Preview"
          className="h-40 w-auto rounded border border-foreground/10 object-cover"
        />
      ) : (
        <p className={hintClass}>No image yet</p>
      )}
    </div>
  )
}
