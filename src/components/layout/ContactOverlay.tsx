'use client'

import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useContact } from '@/context/ContactContext'
import { ContactModal } from '@/components/panels/ContactPanel'
import { CVData } from '@/types'

export default function ContactOverlay({ data }: { data: CVData }) {
  const { open, setOpen } = useContact()
  const pathname = usePathname()
  const router = useRouter()

  // on /contact the modal is the page itself, so closing it leaves the route
  const close = () => {
    setOpen(false)
    if (pathname === '/contact') router.push('/')
  }

  return (
    <AnimatePresence>
      {open && <ContactModal key="contact" data={data} onClose={close} />}
    </AnimatePresence>
  )
}
