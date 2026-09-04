'use client'

import CollisionText from '@/components/image/CollisionText'
import { useSocials } from '@/context/SocialsContext'

export default function SocialsSection() {
  const links = useSocials()
  if (links.length === 0) return null

  return (
    <div className="mb-2">
      <p className="text-blue font-bold text-sm mb-1">
        <CollisionText>Socials</CollisionText>
      </p>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          className="flex justify-between text-sm py-0.5 w-full"
        >
          <CollisionText>{link.label}</CollisionText>
        </a>
      ))}
    </div>
  )
}
