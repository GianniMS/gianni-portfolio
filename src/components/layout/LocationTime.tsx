'use client'

import { useEffect, useState } from 'react'
import { useImageBounds } from '@/context/ImageBoundsContext'
import CollisionText from '@/components/image/CollisionText'

export default function LocationTime() {
  const [time, setTime] = useState('')
  const { heroBounds } = useImageBounds()

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('nl-NL', { hour12: false, timeZone: 'Europe/Amsterdam' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const rightPx = heroBounds && typeof window !== 'undefined' ? window.innerWidth - heroBounds.right : 24

  return (
    <>
      <div className="fixed z-20 bottom-6 text-right text-sm" style={{ right: `${rightPx}px` }}>
        <p><CollisionText>Rotterdam, The Netherlands</CollisionText></p>
        <p><CollisionText>{time}</CollisionText></p>
      </div>
    </>
  )
}
