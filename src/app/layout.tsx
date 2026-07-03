import type { Metadata } from 'next'
import './globals.css'
import { ImageBoundsProvider } from '@/context/ImageBoundsContext'
import { HoverProvider } from '@/context/HoverContext'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gianni',
  description: 'Portfolio of Gianni Mendonça Semedo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ImageBoundsProvider>
          <HoverProvider>
            {children}
          </HoverProvider>
        </ImageBoundsProvider>
      </body>
    </html>
  )
}
