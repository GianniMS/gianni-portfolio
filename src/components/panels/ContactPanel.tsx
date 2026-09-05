'use client'

import { motion } from 'framer-motion'
import CollisionText from '@/components/image/CollisionText'
import { CVData } from '@/types'

const INTRO = 'For project inquiries, collaborations or anything else, reach me here.'

function contactLinks(data: CVData) {
  return [
    { label: data.email, href: data.email ? `mailto:${data.email}` : '', external: false },
    { label: 'LinkedIn', href: data.socials.linkedin, external: true },
    { label: 'Instagram', href: data.socials.instagram, external: true },
  ].filter((link) => link.href)
}

export function ContactModal({ data, onClose }: { data: CVData; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="hidden md:block fixed bottom-6 right-6 z-40 w-80 bg-blue text-background p-6"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close contact"
        className="block w-fit text-xl leading-none mb-6"
      >
        <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
          ×
        </CollisionText>
      </button>

      <p className="text-sm leading-relaxed mb-6">
        <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
          {INTRO}
        </CollisionText>
      </p>

      <p className="font-bold text-lg leading-tight mb-5">
        <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
          {data.name}
        </CollisionText>
      </p>

      <ul className="flex flex-col gap-2">
        {contactLinks(data).map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-sm underline"
            >
              <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
                {link.label}
              </CollisionText>
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
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

      <p className="font-bold text-2xl leading-tight mb-6">
        <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
          {data.name}
        </CollisionText>
      </p>

      <ul className="flex flex-col gap-3">
        {contactLinks(data).map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-lg font-bold underline w-fit"
            >
              <CollisionText imageCollision={false} cursorColor="var(--color-blue)">
                {link.label}
              </CollisionText>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
