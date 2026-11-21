import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { privacyPolicy } from '@/data/legal'
import LegalPage from '@/components/list/LegalPage'

export const metadata: Metadata = pageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return <LegalPage page={privacyPolicy} related={{ href: '/cookie-policy', label: 'Cookie Policy' }} />
}
