'use client'

import CollisionText from '@/components/image/CollisionText'
import PanelModal, { ModalText } from '@/components/panels/PanelModal'
import { CVData } from '@/types'

const INTRO = 'For project inquiries, collaborations or anything else, reach me here:'

function contactLinks(data: CVData) {
  return [
    { label: data.email, href: data.email ? `mailto:${data.email}` : '', external: false },
    { label: 'LinkedIn', href: data.socials.linkedin, external: true },
    { label: 'Instagram', href: data.socials.instagram, external: true },
  ].filter((link) => link.href)
}

export function ContactModal({ data, onClose }: { data: CVData; onClose: () => void }) {
  return (
    <PanelModal onClose={onClose} label="Close contact">
      <p className="text-sm leading-relaxed mb-6">
        <ModalText>{INTRO}</ModalText>
      </p>

      <ul className="flex flex-col gap-2">
        {contactLinks(data).map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-sm"
            >
              <ModalText underline>{link.label}</ModalText>
            </a>
          </li>
        ))}
      </ul>
    </PanelModal>
  )
}

export default function ContactPanel({ data }: { data: CVData }) {
  return (
    <div className="relative z-20 flex flex-col max-w-md">
      <p className="text-base leading-relaxed mb-8">
        <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
          {INTRO}
        </CollisionText>
      </p>

      <ul className="flex flex-col gap-3">
        {contactLinks(data).map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-lg font-bold w-fit"
            >
              <CollisionText imageCollision={false} cursorColor="var(--color-blue)" underline>
                {link.label}
              </CollisionText>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
