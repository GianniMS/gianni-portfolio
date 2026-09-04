export type Rect = { top: number; left: number; bottom: number; right: number }

export function imageIsLight(imgEl: HTMLImageElement, hitRect: Rect, imgRect: Rect): boolean {
  const tone = imgEl.dataset.tone
  if (tone === 'light') return true
  if (tone === 'dark') return false
  return sampleLuminance(imgEl, hitRect, imgRect) > 0.5
}

export function intersect(a: Rect, b: Rect): Rect | null {
  const top = Math.max(a.top, b.top)
  const left = Math.max(a.left, b.left)
  const bottom = Math.min(a.bottom, b.bottom)
  const right = Math.min(a.right, b.right)
  if (left >= right || top >= bottom) return null
  return { top, left, bottom, right }
}

function sampleLuminance(imgEl: HTMLImageElement, hitRect: Rect, imgRect: Rect): number {
  try {
    const canvas = document.createElement('canvas')
    const naturalW = imgEl.naturalWidth
    const naturalH = imgEl.naturalHeight
    if (!naturalW || !naturalH) return 0.5

    canvas.width = naturalW
    canvas.height = naturalH
    const ctx = canvas.getContext('2d')
    if (!ctx) return 0.5
    ctx.drawImage(imgEl, 0, 0, naturalW, naturalH)

    const scaleX = naturalW / (imgRect.right - imgRect.left)
    const scaleY = naturalH / (imgRect.bottom - imgRect.top)

    const sx = Math.max(0, (hitRect.left - imgRect.left) * scaleX)
    const sy = Math.max(0, (hitRect.top - imgRect.top) * scaleY)
    const sw = Math.min(naturalW - sx, (hitRect.right - hitRect.left) * scaleX)
    const sh = Math.min(naturalH - sy, (hitRect.bottom - hitRect.top) * scaleY)

    if (sw <= 0 || sh <= 0) return 0.5

    const data = ctx.getImageData(sx, sy, sw, sh).data
    let luminanceSum = 0
    const pixelCount = data.length / 4
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255
      const g = data[i + 1] / 255
      const b = data[i + 2] / 255
      luminanceSum += 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    return pixelCount > 0 ? luminanceSum / pixelCount : 0.5
  } catch {
    return 0.5
  }
}

export function findVisibleImage(selector: string): HTMLImageElement | undefined {
  return Array.from(document.querySelectorAll<HTMLImageElement>(selector)).find(
    (el) => el.offsetParent !== null
  )
}
