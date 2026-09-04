'use client'

import { useState } from 'react'
import { upload } from '@vercel/blob/client'

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
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={url} />
      <input type="file" accept="image/*" onChange={handleChange} className="text-sm" />
      {uploading && <p className="text-sm text-foreground/60">Uploading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="Preview" className="h-32 w-auto object-cover rounded" />
      )}
    </div>
  )
}
