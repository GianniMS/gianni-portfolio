'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ContactState = { open: boolean; setOpen: (open: boolean) => void }

const ContactContext = createContext<ContactState>({ open: false, setOpen: () => {} })

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return <ContactContext.Provider value={{ open, setOpen }}>{children}</ContactContext.Provider>
}

export function useContact() {
  return useContext(ContactContext)
}
