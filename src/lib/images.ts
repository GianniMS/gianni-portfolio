// Missing images are not resolved here: callers show the placeholder square instead
export function imageSrc(path: string): string {
  const value = path.trim()
  return value.startsWith('http') ? value : `/${value}`
}

