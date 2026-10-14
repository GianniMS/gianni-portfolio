import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'

const NAME = 'Gianni Mendonça Semedo'
const HEADLINE = `${NAME} | Full Stack Developer`
const DESCRIPTION =
  'Gianni Mendonça Semedo, full stack developer in Rotterdam. Research, design and development, from a complex problem to a structured solution.'

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

const INTRO_SCRIPT = `if (location.pathname === '/' && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.dataset.intro = ''`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The intro script below adds data-intro before hydration, so React must not flag it
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint, so a direct visit to home starts blank instead of flashing */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
