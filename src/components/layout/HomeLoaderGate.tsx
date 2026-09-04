'use client'

import { usePathname } from 'next/navigation'
import HomeLoader from '@/components/layout/HomeLoader'

export default function HomeLoaderGate() {
  return usePathname() === '/' ? <HomeLoader /> : null
}
