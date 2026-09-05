import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import HomeLoaderGate from '@/components/layout/HomeLoaderGate'
import ContactOverlay from '@/components/layout/ContactOverlay'
import { SocialsProvider } from '@/context/SocialsContext'
import { ContactProvider } from '@/context/ContactContext'
import { getCV } from '@/lib/content'

const EMPTY_CV = {
  name: '',
  about: [],
  involvedWith: [],
  cvPdfPath: '',
  email: '',
  socials: { linkedin: '', instagram: '' },
}

export default async function MainLayout({ children }: { children: ReactNode }) {
  const cv = await getCV()

  return (
    <SocialsProvider
      email={cv?.email ?? ''}
      socials={cv?.socials ?? { linkedin: '', instagram: '' }}
    >
      <ContactProvider>
        <Navbar />
        <HomeLoaderGate />
        {children}
        <ContactOverlay data={cv ?? EMPTY_CV} />
      </ContactProvider>
    </SocialsProvider>
  )
}
