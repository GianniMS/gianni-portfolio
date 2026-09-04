import { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import HomeLoaderGate from '@/components/layout/HomeLoaderGate'
import { getCV } from '@/lib/content'

export default async function MainLayout({ children }: { children: ReactNode }) {
  const cv = await getCV()

  return (
    <>
      <Navbar
        email={cv?.email ?? ''}
        socials={cv?.socials ?? { linkedin: '', instagram: '' }}
      />
      <HomeLoaderGate />
      {children}
    </>
  )
}
