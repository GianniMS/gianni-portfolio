'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export type Panel = 'cv' | 'contact' | null

type PanelState = { panel: Panel; setPanel: (panel: Panel) => void }

const PanelContext = createContext<PanelState>({ panel: null, setPanel: () => {} })

function panelForPath(pathname: string): Panel {
  if (pathname === '/cv') return 'cv'
  if (pathname === '/contact') return 'contact'
  return null
}

export function PanelProvider({ children }: { children: ReactNode }) {
  // seeded from the route so the panel renders server-side on a direct visit;
  // SetPanel keeps it right across navigations, where this provider stays mounted
  const pathname = usePathname()
  const [panel, setPanel] = useState<Panel>(() => panelForPath(pathname))
  return <PanelContext.Provider value={{ panel, setPanel }}>{children}</PanelContext.Provider>
}

export function usePanel() {
  return useContext(PanelContext)
}
