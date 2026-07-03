'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type HoverContextType = {
  hoveredSlug: string | null
  setHoveredSlug: (slug: string | null) => void
}

const HoverContext = createContext<HoverContextType | null>(null)

export function HoverProvider({ children }: { children: ReactNode }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <HoverContext.Provider value={{ hoveredSlug, setHoveredSlug }}>
      {children}
    </HoverContext.Provider>
  )
}

export function useHover() {
  const ctx = useContext(HoverContext)
  if (!ctx) throw new Error('useHover must be used within HoverProvider')
  return ctx
}
