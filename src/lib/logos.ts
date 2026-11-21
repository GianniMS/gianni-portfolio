import { readFileSync } from 'node:fs'
import path from 'node:path'

// Width over height of a logo in public/, read from the file itself: a PNG's header, or an SVG's
// viewBox (else its width and height)
export function logoRatio(src: string): number {
  const file = readFileSync(path.join(process.cwd(), 'public', src))
  if (src.endsWith('.png')) return file.readUInt32BE(16) / file.readUInt32BE(20)
  const svg = file.toString('utf8')
  const box = svg.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/)
  if (box) return Number(box[1]) / Number(box[2])
  const width = svg.match(/<svg[^>]*\swidth="([\d.]+)/)
  const height = svg.match(/<svg[^>]*\sheight="([\d.]+)/)
  return width && height ? Number(width[1]) / Number(height[1]) : 3
}

// Logos look the same size when they cover the same area, not when they share a height: a long
// wordmark at the same height as a compact mark looks far bigger. So each gets the size that
// covers AREA, kept within MAX_WIDTH and MAX_HEIGHT (in px at desktop size)
const AREA = 7200
const MAX_WIDTH = 200
const MAX_HEIGHT = 60

export function logoSize(ratio: number): { width: number; height: number } {
  let height = Math.sqrt(AREA / ratio)
  height = Math.min(height, MAX_HEIGHT, MAX_WIDTH / ratio)
  return { width: Math.round(height * ratio), height: Math.round(height) }
}
