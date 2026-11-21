// Placeholder fills for list previews until rows get their own images
const PLACEHOLDERS = ['#0ea5e9', '#f43f5e', '#10b981', '#fbbf24', '#8b5cf6', '#fb923c']

// One per row, picked from its key, so a row keeps its colour
export function placeholderFor(key: string) {
  const hash = [...key].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0)
  return PLACEHOLDERS[hash % PLACEHOLDERS.length]
}
