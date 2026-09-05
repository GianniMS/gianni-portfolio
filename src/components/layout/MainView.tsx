'use client'

import ItemList from '@/components/list/ItemList'
import HeroImage from '@/components/image/HeroImage'
import PreviewImage from '@/components/image/PreviewImage'
import CVPanel from '@/components/panels/CVPanel'
import FadeIn from '@/components/layout/FadeIn'
import { CVData, PortfolioItem } from '@/types'

const PORTRAIT = 'images/portrait.jpg'

// Home and /cv render this same tree so React reconciles across the navigation
// instead of tearing down the list and image and rebuilding them.
export default function MainView({
  items,
  cv,
  showCV = false,
}: {
  items: PortfolioItem[]
  cv: CVData | null
  showCV?: boolean
}) {
  const alt = cv?.name || 'Gianni Mendonça Semedo'
  const withPanel = showCV && cv

  return (
    <>
      <div className="relative hidden md:flex gap-8">
        <ItemList items={items} />

        <div className="relative flex-1 max-w-4xl mt-12 -ml-24">
          <HeroImage src={PORTRAIT} alt={alt} priority />
          <PreviewImage items={items} />
        </div>

        {withPanel && (
          <FadeIn>
            <CVPanel data={cv} />
          </FadeIn>
        )}
      </div>

      {withPanel ? (
        <div className="md:hidden flex flex-col gap-3 w-full mt-8">
          <HeroImage src={PORTRAIT} alt={alt} layoutId="hero-mobile" />
          <FadeIn>
            <CVPanel data={cv} />
          </FadeIn>
        </div>
      ) : (
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
