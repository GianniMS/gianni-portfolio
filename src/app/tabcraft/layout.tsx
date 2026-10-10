import Link from 'next/link'
import { ReactNode } from 'react'

export default function TabCraftLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background px-6 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <nav className="mb-12 flex gap-6 text-sm">
          <Link href="/tabcraft" className="font-title font-black text-blue">
            TabCraft
          </Link>
          <Link href="/tabcraft/privacy" className="text-foreground hover:text-blue">
            Privacy
          </Link>
          <Link href="/tabcraft/terms" className="text-foreground hover:text-blue">
            Terms
          </Link>
        </nav>
        <main className="space-y-8 text-base leading-relaxed text-foreground [&_a]:text-blue [&_a]:underline [&_h1]:font-title [&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-blue [&_h1]:tracking-tight md:[&_h1]:text-4xl [&_h2]:mb-3 [&_h2]:font-title [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-blue [&_li]:mt-1 [&_p+p]:mt-3 [&_p+ul]:mt-3 [&_ul+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </main>
      </div>
    </div>
  )
}
