'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useImageBounds } from '@/context/ImageBoundsContext'

const HOLD_DURATION = 0.2
const BOX_DURATION = 0.9
const BLUE_HOLD_DURATION = 0.45
const IMAGE_DURATION = 0.9
const FADE_DURATION = 0.4

type Rect = { top: number; left: number; bottom: number; right: number }

declare global {
  interface Window {
    __homeLoaderPlayed?: boolean
  }
}

function consumeShouldSkip() {
  if (typeof window === 'undefined') return false
  if (window.__homeLoaderPlayed) return true
  window.__homeLoaderPlayed = true
  return false
}

type Phase = 'white' | 'blue' | 'image' | 'done'

export default function HomeLoader() {
  const [skip] = useState(consumeShouldSkip)
  const [phase, setPhase] = useState<Phase>('white')
  const [fontsReady, setFontsReady] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [frozenBounds, setFrozenBounds] = useState<Rect | null>(null)
  const { heroBounds } = useImageBounds()
  const visible = !skip && phase !== 'done'

  useEffect(() => {
    if (skip) return
    let cancelled = false
    Promise.all([document.fonts.load('900 1em "SF Pro Display"'), document.fonts.ready]).then(() => {
      if (!cancelled) setFontsReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [skip])

  useEffect(() => {
    if (skip || phase !== 'white') return
    if (heroBounds) {
      const t = setTimeout(() => {
        setFrozenBounds(heroBounds)
        setPhase('blue')
      }, HOLD_DURATION * 1000)
      return () => clearTimeout(t)
    }
    // safety net: never get stuck on a blank screen if bounds never arrive
    const fallback = setTimeout(() => setPhase('image'), 3000)
    return () => clearTimeout(fallback)
  }, [skip, phase, heroBounds])

  useEffect(() => {
    if (phase !== 'blue') return
    const t = setTimeout(() => setPhase('image'), (BOX_DURATION + BLUE_HOLD_DURATION) * 1000)
    return () => clearTimeout(t)
  }, [phase])

  const boxStyle = frozenBounds
    ? {
        top: frozenBounds.top,
        left: frozenBounds.left,
        width: frozenBounds.right - frozenBounds.left,
        height: frozenBounds.bottom - frozenBounds.top,
      }
    : null
  const needsImage = phase === 'image' && !!boxStyle

  useEffect(() => {
    if (phase !== 'image' || !fontsReady) return
    if (needsImage && !imageLoaded) return
    const t = setTimeout(() => setPhase('done'), needsImage ? IMAGE_DURATION * 1000 : 0)
    return () => clearTimeout(t)
  }, [phase, fontsReady, imageLoaded, needsImage])

  if (skip) return null

  const showImage = phase === 'image' && imageLoaded

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
        >
          {boxStyle && (phase === 'blue' || phase === 'image') && (
            <div className="fixed overflow-hidden" style={boxStyle}>
              <motion.div
                className="absolute inset-0 bg-blue"
                initial={{ opacity: 0 }}
                animate={{ opacity: showImage ? 0 : 1 }}
                transition={{ duration: showImage ? IMAGE_DURATION : BOX_DURATION, ease: 'easeInOut' }}
              />
              {phase === 'image' && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showImage ? 1 : 0 }}
                  transition={{ duration: IMAGE_DURATION, ease: 'easeInOut' }}
                >
                  <Image
                    src="/images/portrait.jpg"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
