'use client'

import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { usePanel } from '@/context/PanelContext'
import { CVModal } from '@/components/panels/CVPanel'
import { CVData } from '@/types'

export default function CVOverlay({ data }: { data: CVData | null }) {
  const { panel, setPanel } = usePanel()
  const pathname = usePathname()
  const router = useRouter()

  // on /cv the modal is the page itself, so closing it leaves the route
  const close = () => {
    setPanel(null)
    if (pathname === '/cv') router.push('/')
  }

  return (
    <AnimatePresence>
      {panel === 'cv' && data && <CVModal key="cv" data={data} onClose={close} />}
    </AnimatePresence>
  )
}
