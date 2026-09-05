import LocationTime from './LocationTime'
import { ReactNode } from 'react'

export default function PageShell({
  children,
  showBack = false,
  lockHeight = false,
  variant = 'default',
}: {
  children: ReactNode
  showBack?: boolean
  lockHeight?: boolean
  variant?: 'default' | 'contact'
}) {
  const heightClass = lockHeight ? 'h-screen overflow-hidden' : 'min-h-screen md:h-screen md:overflow-hidden'
  const surfaceClass =
    variant === 'contact'
      ? 'bg-blue text-background md:bg-background md:text-foreground'
      : 'bg-background text-foreground'

  return (
    <div className={`relative ${heightClass} ${surfaceClass} font-body px-6 pt-24 md:pt-35 pb-20`}>
      {children}
      <LocationTime showBack={showBack} />
    </div>
  )
}
