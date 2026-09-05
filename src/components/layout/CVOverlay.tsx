'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePanel } from '@/context/PanelContext'
import { useImageBounds } from '@/context/ImageBoundsContext'
import CVPanel from '@/components/panels/CVPanel'
import { BEAT } from '@/lib/motion'
import { CVData } from '@/types'

const GAP = 32

export default function CVOverlay({ data }: { data: CVData | null }) {
  const { panel } = usePanel()
  const { heroBounds } = useImageBounds()
  const show = panel === 'cv' && data && heroBounds

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cv"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: BEAT, ease: 'easeInOut' }}
          className="hidden md:block fixed z-30"
          style={{ left: heroBounds.right + GAP, top: heroBounds.top }}
        >
          <CVPanel data={data} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
