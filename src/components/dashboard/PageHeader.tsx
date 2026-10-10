import Link from 'next/link'
import { ReactNode } from 'react'
import { linkClass, pageTitle } from './styles'

export default function PageHeader({
  title,
  back,
  meta,
  action,
}: {
  title: string
  back?: { href: string; label: string }
  meta?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        {back && (
          <Link href={back.href} className={`${linkClass} w-fit text-foreground/50`}>
            ← {back.label}
          </Link>
        )}
        <h1 className={pageTitle}>{title}</h1>
        {meta && <p className="text-foreground/50">{meta}</p>}
      </div>
      {action}
    </div>
  )
}
