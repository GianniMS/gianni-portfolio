const PLACEHOLDER = 'images/TBD.png'

// An item saved without an image would otherwise resolve to "/" and render broken.
export function imageSrc(path?: string | null): string {
  const value = path?.trim() || PLACEHOLDER
  return value.startsWith('http') ? value : `/${value}`
}

// Home tiles are 346×450 in the design; every image that can end up in one is held to it
export const TILE_RATIO = { width: 346, height: 450 }
export const TILE_MIN_WIDTH = TILE_RATIO.width * 2
