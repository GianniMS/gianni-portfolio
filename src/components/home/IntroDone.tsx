'use client'

import { useEffect } from 'react'

// Long enough for the last tile: 0.8s text, then up to four 0.3s staggers, then 0.8s
const INTRO_MS = 3000

// Clears the intro marker once it has played, so returning to home later
// (a client-side navigation) shows the page straight away
export default function IntroDone() {
  useEffect(() => {
    const root = document.documentElement
    if (!('intro' in root.dataset)) return
    const timer = setTimeout(() => delete root.dataset.intro, INTRO_MS)
    return () => {
      clearTimeout(timer)
      delete root.dataset.intro
    }
  }, [])
  return null
}
