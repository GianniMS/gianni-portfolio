import Navbar from './Navbar'
import LocationTime from './LocationTime'
import { ReactNode } from 'react'

export default function PageShell({
  children,
  showBack = false,
}: {
  children: ReactNode
  showBack?: boolean
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-body px-6 pt-6 pb-20">
      <Navbar />
      {children}
      <LocationTime showBack={showBack} />
    </div>
  )
}
