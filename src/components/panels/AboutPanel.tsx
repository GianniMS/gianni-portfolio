'use client'

import CollisionText from '@/components/image/CollisionText'
import PanelModal, { ModalText } from '@/components/panels/PanelModal'
import { CVData } from '@/types'

export function AboutModal({ data, onClose }: { data: CVData; onClose: () => void }) {
  return (
    <PanelModal onClose={onClose} label="Close about me">
      <h2 className="font-bold text-2xl leading-tight mb-6">
        <ModalText>About Me</ModalText>
      </h2>

      <div className="flex flex-col gap-4">
        {data.about.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed whitespace-pre-line">
            <ModalText>{paragraph}</ModalText>
          </p>
        ))}
      </div>
    </PanelModal>
  )
}

export default function AboutPanel({ data }: { data: CVData }) {
  return (
    <div className="relative z-20 flex flex-col max-w-md">
      <h1 className="text-blue font-bold text-2xl leading-tight mb-6">
        <CollisionText>About Me</CollisionText>
      </h1>

      <div className="flex flex-col gap-4">
        {data.about.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed whitespace-pre-line">
            <CollisionText>{paragraph}</CollisionText>
          </p>
        ))}
      </div>
    </div>
  )
}
