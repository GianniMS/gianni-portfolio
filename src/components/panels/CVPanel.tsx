'use client'

import CollisionText from '@/components/image/CollisionText'
import PanelModal, { ModalText } from '@/components/panels/PanelModal'
import { CVData } from '@/types'

export function CVModal({ data, onClose }: { data: CVData; onClose: () => void }) {
  return (
    <PanelModal onClose={onClose} label="Close CV">
      <a href={data.cvPdfPath} download className="block w-fit font-bold text-2xl leading-tight mb-8">
        <ModalText underline>Download CV</ModalText>
      </a>

      {data.involvedWith.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-lg leading-tight">
            <ModalText>Involved With</ModalText>
          </h2>
          <p className="text-sm leading-relaxed">
            <ModalText>{data.involvedWith.join(', ')}</ModalText>
          </p>
        </section>
      )}
    </PanelModal>
  )
}

export default function CVPanel({ data }: { data: CVData }) {
  return (
    <div className="relative z-20 flex flex-col max-w-md">
      <a
        href={data.cvPdfPath}
        download
        className="text-blue font-bold text-2xl leading-tight mb-8 w-fit"
      >
        <CollisionText crossColor="var(--color-foreground)" underline>Download CV</CollisionText>
      </a>

      {data.involvedWith.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-blue font-bold text-lg leading-tight">
            <CollisionText>Involved With</CollisionText>
          </h2>
          <p className="text-sm leading-relaxed">
            <CollisionText>{data.involvedWith.join(', ')}</CollisionText>
          </p>
        </section>
      )}
    </div>
  )
}
