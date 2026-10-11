import { Fragment, ReactNode } from 'react'
import { notFound } from 'next/navigation'
import NavLink from '@/components/layout/NavLink'
import { DOC_KINDS, DOC_NAV_LABELS } from '@/components/product/productDocs'
import { getProduct } from '@/lib/content'

export default async function ProductLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  const product = await getProduct((await params).slug)
  if (!product) notFound()

  const links = [
    { href: `/${product.slug}`, label: product.name },
    ...DOC_KINDS.filter((kind) => product[kind]).map((kind) => ({
      href: `/${product.slug}/${kind}`,
      label: DOC_NAV_LABELS[kind],
    })),
  ]

  return (
    <div className="px-2.5 pb-24 md:px-5">
      <nav aria-label={`${product.name} pages`} className="mt-16 lg:mt-24">
        {links.map((link, i) => (
          <Fragment key={link.href}>
            {i > 0 && ' | '}
            <NavLink href={link.href} exact>
              {link.label}
            </NavLink>
          </Fragment>
        ))}
      </nav>
      {children}
    </div>
  )
}
