function normalise(value: string): string {
  return value.replace(/\r\n/g, '\n')
}

// A blank line starts a new paragraph; single newlines stay inside one, so the
// display can keep them as line breaks instead of collapsing them.
export function toParagraphs(value: string): string[] {
  return normalise(value)
    .split(/\n[ \t]*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export function fromParagraphs(paragraphs: string[]): string {
  return paragraphs.join('\n\n')
}

export function toLines(value: string): string[] {
  return normalise(value)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}
