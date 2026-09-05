'use client'

import { ReactNode } from 'react'
import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import { CVData, PortfolioItem } from '@/types'

const PORTRAIT = 'images/portrait.jpg'

// Every route renders this same desktop stage so nothing remounts when a panel
// opens; only the mobile half differs, where each route really is its own page.
export default function MainView({
  items,
  cv,
  mobile,
}: {
  items: PortfolioItem[]
  cv: CVData | null
  mobile?: ReactNode
}) {
  const alt = cv?.name || 'Gianni Mendonça Semedo'

  return (
    <>
      <div className="relative hidden md:flex gap-8">
        <ItemList items={items} />

        <div className="relative flex-1 max-w-4xl mt-12 -ml-24">
          <HeroImage src={PORTRAIT} alt={alt} priority />
          <PreviewImage items={items} />
        </div>
      </div>

      {mobile ?? (
        <div className="relative md:hidden">
          <ItemList
            items={items}
            widthClassName="w-[72%]"
            scrollHeightClassName="h-[calc(100vh-176px)]"
          />
          <div className="absolute top-[130px] right-0 w-[55%]">
            <HeroImage src={PORTRAIT} alt={alt} layoutId="hero-mobile" priority />
          </div>
        </div>
      )}
    </>
  )
}
