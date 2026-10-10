import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import BackToTop from '@/components/layout/BackToTop'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <BackToTop />
    </>
  )
}
