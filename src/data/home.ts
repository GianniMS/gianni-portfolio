import { Mockup } from '@/types'

export const intro = {
  title: 'From the thought to the realization.',
  body: 'A problem can have different solutions. With my expertise in software development, design, research, marketing and full scale business strategies, I find the right one. A solution with reason at its core.',
}

// The second text, under the photo
export const intro2 = {
  title: 'Built for the people it is meant for.',
  body: 'Discovering and researching the relevant target audience, market and laws allows me to find what needs to be done. Which leads to a product built with intent.',
}

// Alternating case on purpose: Painterz only drips on its lowercase letters
export const sprayWords = ['SoFtWaRe', 'DeSiGn', 'ReSeArCh', 'StRaTeGy', 'MaRkEtInG']

// The home carousel, in order; the colour shows while each screenshot loads
export const mockups: Mockup[] = [
  { device: 'macbook', screen: '#0ea5e9', image: '/images/screens/skai-desktop-1.webp' },
  { device: 'iphone', screen: '#f43f5e', image: '/images/screens/soundcheckd-mobile.webp' },
  { device: 'macbook', screen: '#10b981', image: '/images/screens/nursitree-desktop-1.webp' },
  { device: 'iphone', screen: '#fbbf24', image: '/images/screens/marlog-mobile.webp' },
  { device: 'macbook', screen: '#8b5cf6', image: '/images/screens/fidocs-desktop-1.webp' },
]
