'use client'

import { createContext, useContext, useMemo, ReactNode } from 'react'
import { SocialLinks } from '@/types'

export type SocialLink = { label: string; href: string; external: boolean }

const SocialsContext = createContext<SocialLink[]>([])

export function SocialsProvider({
  email,
  socials,
  children,
}: {
  email: string
  socials: SocialLinks
  children: ReactNode
}) {
  const links = useMemo(
    () =>
      [
        { label: 'Mail', href: email ? `mailto:${email}` : '', external: false },
        { label: 'LinkedIn', href: socials.linkedin, external: true },
        { label: 'Instagram', href: socials.instagram, external: true },
      ].filter((link) => link.href),
    [email, socials.linkedin, socials.instagram]
  )

  return <SocialsContext.Provider value={links}>{children}</SocialsContext.Provider>
}

export function useSocials() {
  return useContext(SocialsContext)
}
