'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BackToTop() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const header = document.getElementById('site-header')
    if (!header) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting))
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  // Home ends on its last tile, with nothing below for the arrow to sit over
  if (pathname === '/') return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-2.5 right-2.5 z-30 p-2.5 text-3xl leading-none transition-opacity duration-800 md:hidden ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      inert={!visible}
    >
      ↑
    </button>
  )
}
