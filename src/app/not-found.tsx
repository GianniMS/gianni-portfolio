import Link from 'next/link'
import { navLinkClass } from '@/components/layout/NavLink'

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col justify-end px-2.5 pb-10 md:px-5 md:pb-16">
      <h1 className="text-[clamp(3rem,10vw,10rem)] leading-none tracking-tight">Not found</h1>
      <p className="mt-6">This page does not exist (anymore).</p>
      <Link href="/" className={`${navLinkClass} mt-2 w-fit`}>
        ← Back home
      </Link>
    </main>
  )
}
