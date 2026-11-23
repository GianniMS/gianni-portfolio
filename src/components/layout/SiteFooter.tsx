import Link from 'next/link'
import FlagSection from '@/components/layout/FlagSection'
import { navLinkClass } from '@/components/layout/NavLink'
import TextureWordmark from '@/components/layout/TextureWordmark'

// The end of a page: the wordmark set huge and textured along the bottom edge, with the legal
// links over it. It flags the page as at its footer, which opens the command bar and hides the header.
export default function SiteFooter() {
  return (
    <FlagSection
      flag="footer"
      id="contact"
      aria-label="Contact"
      className="relative flex h-[60svh] items-end overflow-hidden md:h-svh"
    >
      <TextureWordmark text="GMS" texture="/images/white-texture.jpg" textureOpacity={0.25} />
      <nav aria-label="Legal" className="absolute inset-x-0 bottom-4 flex justify-center gap-6 font-sf text-xs md:bottom-6">
        <Link href="/privacy-policy" className={navLinkClass}>
          Privacy Policy
        </Link>
        <Link href="/cookie-policy" className={navLinkClass}>
          Cookie Policy
        </Link>
      </nav>
    </FlagSection>
  )
}
