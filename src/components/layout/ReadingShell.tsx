import { ReactNode } from 'react'

// Big title held on the left from 1024px up, a reading column on the right
export default function ReadingShell({
  title,
  icon,
  aside,
  strip,
  children,
}: {
  title: string
  icon?: ReactNode
  aside?: ReactNode
  // Runs sideways under the title and slides beneath the reading column, which fades it out
  strip?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] lg:gap-x-10">
      <div className="lg:sticky lg:top-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:grid lg:grid-cols-subgrid lg:self-start">
        {/* Sized against its own column so a long title never spills into the text */}
        <header className="@container">
          <h1 className="flex items-center gap-[0.15em] text-[clamp(2.5rem,18cqw,8rem)] leading-none tracking-tight [overflow-wrap:anywhere] hyphens-auto">
            {icon}
            <span className="min-w-0">{title}</span>
          </h1>
          {aside && <div className="mt-4 text-foreground/50">{aside}</div>}
        </header>
        {strip && (
          <>
            <div className="mt-12 lg:col-span-2 lg:col-start-1 lg:row-start-2">{strip}</div>
            <div
              aria-hidden
              className="pointer-events-none relative mt-12 hidden bg-background before:absolute before:inset-y-0 before:right-full before:w-40 before:bg-linear-to-r before:from-transparent before:to-background lg:col-start-2 lg:row-start-2 lg:block"
            />
          </>
        )}
      </div>
      <div className="relative z-10 mt-12 [overflow-wrap:anywhere] lg:col-start-2 lg:row-start-1 lg:mt-0">
        {children}
      </div>
    </div>
  )
}
