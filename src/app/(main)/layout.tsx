import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import HomeLoaderGate from '@/components/layout/HomeLoaderGate'
import { SocialsProvider } from '@/context/SocialsContext'
import { getCV } from '@/lib/content'

export default async function MainLayout({ children }: { children: ReactNode }) {
  const cv = await getCV()

  return (
    <SocialsProvider
      email={cv?.email ?? ''}
      socials={cv?.socials ?? { linkedin: '', instagram: '' }}
    >
      <Navbar />
      <HomeLoaderGate />
      {children}
    </SocialsProvider>
  )
}
