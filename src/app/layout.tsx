import type { Metadata } from 'next'
import { Libre_Caslon_Text } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { ReactNode } from 'react'
import FaviconGleam from '@/components/layout/FaviconGleam'

const NAME = 'Gianni Mendonça Semedo'
const HEADLINE = `${NAME} | Full Stack Developer in Rotterdam`
const DESCRIPTION =
  'Gianni Mendonça Semedo, full stack developer in Rotterdam. Development, design, research, strategy and marketing: from the thought to the realization.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.giannims.com'),
  title: { default: HEADLINE, template: '%s | GianniMS' },
  description: DESCRIPTION,
  applicationName: 'GianniMS',
  authors: [{ name: NAME, url: 'https://www.giannims.com' }],
  creator: NAME,
  keywords: [
    'Gianni Mendonça Semedo',
    'full stack developer',
    'Rotterdam',
    'Next.js',
    'TypeScript',
    'Symfony',
    'web development',
    'iOS development',
    'UX design',
    'product strategy',
  ],
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

const caslon = Libre_Caslon_Text({ weight: '400', subsets: ['latin'], variable: '--font-libre-caslon' })
const painterz = localFont({ src: './fonts/Painterz.ttf', variable: '--font-painterz-local' })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${caslon.variable} ${painterz.variable}`}>
      <body>
        {children}
        <FaviconGleam />
      </body>
    </html>
  )
}
