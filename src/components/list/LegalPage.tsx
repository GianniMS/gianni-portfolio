import Link from 'next/link'
import SiteFooter from '@/components/layout/SiteFooter'
import { LIST_PAGE, ListPageTitle, ListSection, ListText } from '@/components/list/ItemList'
import type { LegalPage as LegalPageData } from '@/types'

export default function LegalPage({ page, related }: { page: LegalPageData; related: { href: string; label: string } }) {
  return (
    <>
      <div className={LIST_PAGE}>
        <ListPageTitle melt>{page.title}</ListPageTitle>
        {page.sections.map((section) => (
          <ListSection key={section.title} title={section.title} melt>
            <ListText paragraphs={section.paragraphs} melt />
          </ListSection>
        ))}
        <div className="flex flex-col gap-3 text-sm md:text-base">
          <p className="text-foreground/60">Last updated {page.updated}</p>
          <Link href={related.href} className="pulse-underline self-start">
            {related.label}
          </Link>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
