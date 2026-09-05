import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import HomeLoaderGate from '@/components/layout/HomeLoaderGate'
import ContactOverlay from '@/components/layout/ContactOverlay'
import CVOverlay from '@/components/layout/CVOverlay'
import { SocialsProvider } from '@/context/SocialsContext'
import { PanelProvider } from '@/context/PanelContext'
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
      <PanelProvider>
        <Navbar />
        <HomeLoaderGate />
        {children}
        <CVOverlay data={cv} />
        <ContactOverlay data={cv ?? EMPTY_CV} />
      </PanelProvider>
    </SocialsProvider>
  )
}
