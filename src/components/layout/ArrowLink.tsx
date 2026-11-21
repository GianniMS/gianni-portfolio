import Link from 'next/link'
import type { ReactNode } from 'react'

// An inline text link (it runs on in the sentence) ending in a ↗, its pulsing underline always running
// so it reads as a link without being hovered; on hover the arrow nudges up and right
export default function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group whitespace-nowrap">
      <span data-pulse className="pulse-underline">
        {children}
      </span>
      {/* Plain :hover rather than Tailwind's hover variant, which only applies where the device reports hover */}
      <span
        aria-hidden
        className="ml-1 inline-block transition-transform duration-300 ease-[cubic-bezier(0.2,0.65,0.3,1)] [.group:hover_&]:translate-x-0.5 [.group:hover_&]:-translate-y-0.5"
      >
        ↗
      </span>
    </Link>
  )
}
