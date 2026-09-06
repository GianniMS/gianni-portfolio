import type { Metadata } from 'next'
import './globals.css'
import { ImageBoundsProvider } from '@/context/ImageBoundsContext'
import { HoverProvider } from '@/context/HoverContext'
import { CursorProvider } from '@/context/CursorContext'
import CustomCursor from '@/components/layout/CustomCursor'
import { ReactNode } from 'react'

const NAME = 'Gianni Mendonça Semedo'
const HEADLINE = `${NAME} | Full Stack Developer`
const DESCRIPTION =
  'Portfolio of Gianni Mendonça Semedo, full stack developer in Rotterdam, The Netherlands. Projects, experience, certificates, press and awards.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.giannims.com'),
  title: { default: HEADLINE, template: '%s | GianniMS' },
  description: DESCRIPTION,
  applicationName: 'GianniMS',
  authors: [{ name: NAME, url: 'https://www.giannims.com' }],
  creator: NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'GianniMS',
    title: HEADLINE,
    description: DESCRIPTION,
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: HEADLINE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ImageBoundsProvider>
          <HoverProvider>
            <CursorProvider>
              <CustomCursor />
              {children}
            </CursorProvider>
          </HoverProvider>
        </ImageBoundsProvider>
      </body>
    </html>
  )
}
