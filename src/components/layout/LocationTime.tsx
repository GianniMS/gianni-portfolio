'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function LocationTime({ showBack = false }: { showBack?: boolean }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('nl-NL', { hour12: false }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
      {showBack ? (
        <Link href="/" className="text-foreground text-sm pointer-events-auto md:hidden">
          ←
        </Link>
      ) : (
        <div />
      )}
      <div className="text-right text-sm pointer-events-auto">
        <p>Rotterdam, The Netherlands</p>
        <p>{time}</p>
      </div>
    </div>
  )
}
