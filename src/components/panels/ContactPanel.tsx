'use client'

import Link from 'next/link'
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

export function ContactModal({ data }: { data: CVData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-30 w-80 bg-blue text-background p-6"
    >
      <Link href="/" aria-label="Close contact" className="block w-fit text-xl leading-none mb-6">
        ×
      </Link>

      <p className="text-sm leading-relaxed mb-6">{INTRO}</p>

      <p className="font-bold text-lg leading-tight mb-5">{data.name}</p>

      <ul className="flex flex-col gap-2">
        {contactLinks(data).map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-sm underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function ContactPanel({ data }: { data: CVData }) {
  return (
    <div className="relative z-20 flex flex-col max-w-xs">
      <h1 className="text-blue font-bold text-lg leading-tight mb-4">
        <CollisionText>Contact</CollisionText>
      </h1>

      <p className="text-sm leading-relaxed mb-6">
        <CollisionText>{INTRO}</CollisionText>
      </p>

      <p className="font-bold text-sm mb-4">
        <CollisionText>{data.name}</CollisionText>
      </p>

      <ul className="flex flex-col gap-2">
        {contactLinks(data).map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-blue font-bold text-sm w-fit"
            >
              <CollisionText crossColor="var(--color-foreground)" underline>
                {link.label}
              </CollisionText>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
