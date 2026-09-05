'use client'

import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { usePanel } from '@/context/PanelContext'
import { ContactModal } from '@/components/panels/ContactPanel'
import { CVData } from '@/types'

export default function ContactOverlay({ data }: { data: CVData }) {
  const { panel, setPanel } = usePanel()
  const pathname = usePathname()
  const router = useRouter()

  // on /contact the modal is the page itself, so closing it leaves the route
  const close = () => {
    setPanel(null)
    if (pathname === '/contact') router.push('/')
  }

  return (
    <AnimatePresence>
      {panel === 'contact' && <ContactModal key="contact" data={data} onClose={close} />}
    </AnimatePresence>
  )
}
