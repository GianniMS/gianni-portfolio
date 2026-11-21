'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Back to wherever the visitor came from on this site (the Work list, or the CV for a job), or to
// the Work list when they landed here directly
export default function BackLink() {
  const router = useRouter()
  return (
    <Link
      href="/work"
      onClick={(e) => {
        if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
          e.preventDefault()
          router.back()
        }
      }}
      className="group inline-flex items-center gap-2 font-sf text-base md:text-lg"
    >
      <span aria-hidden className="transition-transform duration-300 [.group:hover_&]:-translate-x-1">
        ←
      </span>
      <span className="pulse-underline">
        Back
      </span>
    </Link>
  )
}
