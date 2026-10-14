'use client'

import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import NavLink from '@/components/layout/NavLink'

type FooterLink = { href: string; label: string }

// The product itself is only linked from its documents, as the way back
export default function ProductFooterNav({
  product,
  docs,
}: {
  product: FooterLink
  docs: FooterLink[]
}) {
  const pathname = usePathname()
  const links = pathname === product.href ? docs : [product, ...docs]

  return (
    <nav aria-label={`${product.label} pages`} className="mt-16 text-center">
      {links.map((link, i) => (
        <Fragment key={link.href}>
          {i > 0 && ' | '}
          <NavLink href={link.href} exact>
            {link.label}
          </NavLink>
        </Fragment>
      ))}
    </nav>
  )
}
