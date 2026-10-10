'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const header = document.getElementById('site-header')
    if (!header) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting))
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

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
