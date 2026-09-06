import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import HomeLoaderGate from '@/components/layout/HomeLoaderGate'
import PanelOverlays from '@/components/layout/PanelOverlays'
import { SocialsProvider } from '@/context/SocialsContext'
import { PanelProvider } from '@/context/PanelContext'
import { getCV } from '@/lib/content'

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
        <PanelOverlays data={cv} />
      </PanelProvider>
    </SocialsProvider>
  )
}
