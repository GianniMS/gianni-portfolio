'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Rect = { top: number; left: number; bottom: number; right: number }

type ImageBoundsContextType = {
  heroBounds: Rect | null
  previewBounds: Rect | null
  setHeroBounds: (bounds: Rect | null) => void
  setPreviewBounds: (bounds: Rect | null) => void
}

const ImageBoundsContext = createContext<ImageBoundsContextType | null>(null)

export function ImageBoundsProvider({ children }: { children: ReactNode }) {
  const [heroBounds, setHeroBounds] = useState<Rect | null>(null)
  const [previewBounds, setPreviewBounds] = useState<Rect | null>(null)

  return (
    <ImageBoundsContext.Provider value={{ heroBounds, previewBounds, setHeroBounds, setPreviewBounds }}>
      {children}
    </ImageBoundsContext.Provider>
  )
}

export function useImageBounds() {
  const ctx = useContext(ImageBoundsContext)
  if (!ctx) throw new Error('useImageBounds must be used within ImageBoundsProvider')
  return ctx
}
