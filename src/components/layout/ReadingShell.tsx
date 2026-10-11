import { ReactNode } from 'react'

// Big title held on the left from 1024px up, a reading column on the right
export default function ReadingShell({
  title,
  aside,
  children,
}: {
  title: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] lg:gap-10">
      {/* Sized against its own column so a long title never spills into the text */}
      <header className="@container lg:sticky lg:top-10 lg:self-start">
        <h1 className="text-[clamp(2.5rem,18cqw,8rem)] leading-none tracking-tight [overflow-wrap:anywhere] hyphens-auto">
          {title}
        </h1>
        {aside && <div className="mt-4 text-foreground/50">{aside}</div>}
      </header>
      <div className="mt-12 [overflow-wrap:anywhere] lg:mt-0">{children}</div>
    </div>
  )
}
