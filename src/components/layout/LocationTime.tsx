'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useImageBounds } from '@/context/ImageBoundsContext'
import CollisionText from '@/components/image/CollisionText'

export default function LocationTime({ showBack = false }: { showBack?: boolean }) {
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
      {showBack && (
        <Link href="/" className="fixed z-20 bottom-[30px] left-6 text-foreground text-2xl leading-none md:hidden">
          <CollisionText>←</CollisionText>
        </Link>
      )}
      <div className="fixed z-20 bottom-6 text-right text-sm" style={{ right: `${rightPx}px` }}>
        <p><CollisionText crossColor="var(--color-background)" listCollision>Rotterdam, The Netherlands</CollisionText></p>
        <p><CollisionText crossColor="var(--color-background)" listCollision>{time}</CollisionText></p>
      </div>
    </>
  )
}
