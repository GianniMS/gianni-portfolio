import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { cookiePolicy } from '@/data/legal'
import LegalPage from '@/components/list/LegalPage'

export const metadata: Metadata = pageMetadata({
  title: cookiePolicy.title,
  description: cookiePolicy.description,
  path: '/cookie-policy',
})

export default function CookiePolicyPage() {
  return <LegalPage page={cookiePolicy} related={{ href: '/privacy-policy', label: 'Privacy Policy' }} />
}
