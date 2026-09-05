'use client'

import { useEffect } from 'react'
import { useContact } from '@/context/ContactContext'

export default function OpenContactOnMount() {
  const { setOpen } = useContact()

  useEffect(() => {
    setOpen(true)
  }, [setOpen])

  return null
}
