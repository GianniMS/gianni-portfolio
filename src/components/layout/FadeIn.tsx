'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { BEAT } from '@/lib/motion'

export default function FadeIn({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: BEAT, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
