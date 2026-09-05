'use client'

import { useEffect } from 'react'
import { Panel, usePanel } from '@/context/PanelContext'

// Each route declares which panel it represents, so a real navigation always
// lands on the right state while the desktop overlays can toggle without one.
export default function SetPanel({ panel }: { panel: Panel }) {
  const { setPanel } = usePanel()

  useEffect(() => {
    setPanel(panel)
  }, [panel, setPanel])

  return null
}
