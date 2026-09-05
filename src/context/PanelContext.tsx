'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Panel = 'cv' | 'contact' | null

type PanelState = { panel: Panel; setPanel: (panel: Panel) => void }

const PanelContext = createContext<PanelState>({ panel: null, setPanel: () => {} })

export function PanelProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null)
  return <PanelContext.Provider value={{ panel, setPanel }}>{children}</PanelContext.Provider>
}

export function usePanel() {
  return useContext(PanelContext)
}
