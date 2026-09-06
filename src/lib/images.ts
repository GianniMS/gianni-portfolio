const PLACEHOLDER = 'images/TBD.png'

// An item saved without an image would otherwise resolve to "/" and render broken.
export function imageSrc(path?: string | null): string {
  const value = path?.trim() || PLACEHOLDER
  return value.startsWith('http') ? value : `/${value}`
}
