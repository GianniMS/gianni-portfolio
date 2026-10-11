import { ReactNode } from 'react'

// Big title held on the left from 1024px up, a reading column on the right
export default function ProductShell({
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
      <header className="lg:sticky lg:top-10 lg:self-start">
        <h1 className="text-[clamp(3rem,7.4vw,8rem)] leading-none tracking-tight">{title}</h1>
        {aside && <div className="mt-4 text-foreground/50">{aside}</div>}
      </header>
      <div className="mt-12 lg:mt-0">{children}</div>
    </div>
  )
}
