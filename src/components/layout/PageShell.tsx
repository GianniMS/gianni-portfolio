import LocationTime from './LocationTime'
import { ReactNode } from 'react'

export default function PageShell({
  children,
  showBack = false,
  lockHeight = false,
}: {
  children: ReactNode
  showBack?: boolean
  lockHeight?: boolean
}) {
  const heightClass = lockHeight ? 'h-screen overflow-hidden' : 'min-h-screen md:h-screen md:overflow-hidden'

  return (
    <div className={`relative ${heightClass} bg-background text-foreground font-body px-6 pt-24 md:pt-35 pb-20`}>
      {children}
      <LocationTime showBack={showBack} />
    </div>
  )
}
