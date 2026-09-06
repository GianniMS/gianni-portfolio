'use client'

import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { PANEL_ROUTES, usePanel } from '@/context/PanelContext'
import { AboutModal } from '@/components/panels/AboutPanel'
import { CVModal } from '@/components/panels/CVPanel'
import { ContactModal } from '@/components/panels/ContactPanel'
import { CVData } from '@/types'

export default function PanelOverlays({ data }: { data: CVData | null }) {
  const { panel, setPanel } = usePanel()
  const pathname = usePathname()
  const router = useRouter()

  // on a panel's own route the modal is the page, so closing it leaves the route
  const close = () => {
    const route = panel ? PANEL_ROUTES[panel] : null
    setPanel(null)
    if (route && pathname === route) router.push('/')
  }

  if (!data) return null

  return (
    <AnimatePresence>
      {panel === 'about' && <AboutModal key="about" data={data} onClose={close} />}
      {panel === 'cv' && <CVModal key="cv" data={data} onClose={close} />}
      {panel === 'contact' && <ContactModal key="contact" data={data} onClose={close} />}
    </AnimatePresence>
  )
}
