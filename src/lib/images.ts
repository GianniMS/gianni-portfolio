// Missing images are not resolved here: callers show the earth square instead
export function imageSrc(path: string): string {
  const value = path.trim()
  return value.startsWith('http') ? value : `/${value}`
}

// Home tiles are 346×450 in the design; every image that can end up in one is held to it
export const TILE_RATIO = { width: 346, height: 450 }
export const TILE_MIN_WIDTH = TILE_RATIO.width * 2

export const GALLERY_MAX = 5
