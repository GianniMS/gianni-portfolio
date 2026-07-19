'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import HomeLoader from '@/components/layout/HomeLoader'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <Navbar />
      {pathname === '/' && <HomeLoader />}
      {children}
    </>
  )
}
