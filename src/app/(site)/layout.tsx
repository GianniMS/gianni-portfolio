import { ReactNode } from 'react'
import CommandBar from '@/components/layout/CommandBar'
import SiteHeader from '@/components/layout/SiteHeader'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <CommandBar />
    </>
  )
}
