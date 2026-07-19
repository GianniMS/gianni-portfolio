'use client'

import { createContext, useContext, useRef, useState, ReactNode, useCallback } from 'react'

type Rect = { top: number; left: number; bottom: number; right: number }
export type CursorImageColor = 'white' | 'black'
export type CursorImageHit = { rect: Rect; color: CursorImageColor }

type CursorContextType = {
  cursorRect: Rect | null
  cursorImageHit: CursorImageHit | null
  setCursorState: (rect: Rect | null, imageHit: CursorImageHit | null) => void
}

const CursorContext = createContext<CursorContextType | null>(null)

function rectsEqual(a: Rect | null, b: Rect | null) {
  if (a === b) return true
  if (!a || !b) return false
  return a.top === b.top && a.left === b.left && a.bottom === b.bottom && a.right === b.right
}

function imageHitsEqual(a: CursorImageHit | null, b: CursorImageHit | null) {
  if (a === b) return true
  if (!a || !b) return false
  return a.color === b.color && rectsEqual(a.rect, b.rect)
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorRect, setCursorRect] = useState<Rect | null>(null)
  const [cursorImageHit, setCursorImageHit] = useState<CursorImageHit | null>(null)
  const lastRef = useRef<{ rect: Rect | null; imageHit: CursorImageHit | null }>({
    rect: null,
    imageHit: null,
  })

  const setCursorState = useCallback((rect: Rect | null, imageHit: CursorImageHit | null) => {
    if (rectsEqual(lastRef.current.rect, rect) && imageHitsEqual(lastRef.current.imageHit, imageHit)) return
    lastRef.current = { rect, imageHit }
    setCursorRect(rect)
    setCursorImageHit(imageHit)
  }, [])

  return (
    <CursorContext.Provider value={{ cursorRect, cursorImageHit, setCursorState }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used within CursorProvider')
  return ctx
}
