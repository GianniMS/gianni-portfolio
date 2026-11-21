import { cv } from '@/data/cv'
import { items } from '@/data/items'
import { CATEGORY_LABELS } from '@/data/categories'
import { itemHref, splitTitle } from '@/data/itemText'

export type SearchResult = { title: string; kind: string; href: string }

type Entry = SearchResult & { haystack: string }

// Lowercase, accents off, and anything that isn't a letter or digit turned into a space, so
// "Outlier.ai" holds the word "ai" and "Next.js" the words "next" and "js"
const normalise = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const entry = (title: string, kind: string, href: string, ...words: (string | undefined)[]): Entry => ({
  title,
  kind,
  href,
  // Leading space, so every word in it can be found by " " + its start
  haystack: ` ${normalise([title, kind, ...words].filter(Boolean).join(' '))}`,
})

// Everything the search can find, built once from the site's own content: no service, no index
// file, just the data the pages are made from
const ENTRIES: Entry[] = [
  entry('Home', 'Page', '/', 'start landing'),
  entry('CV', 'Page', '/cv', 'resume about me experience certificates skills involved with brands'),
  entry('Work', 'Page', '/work', 'projects portfolio cases'),
  ...(cv.cvPdfPath ? [entry('Download CV', 'PDF', cv.cvPdfPath, 'resume pdf')] : []),
  entry(cv.email, 'Mail', `mailto:${cv.email}`, 'contact email hire reach message'),
  entry('LinkedIn', 'Contact', cv.socials.linkedin, 'contact social'),
  entry('Instagram', 'Contact', cv.socials.instagram, 'contact social'),
  ...items.map((item) => {
    const { title, organization } = splitTitle(item)
    const details = [
      ...(item.tags ?? []),
      ...(item.keywords ?? []),
      ...(item.link === 'internal' ? [...item.skills, ...item.description] : []),
    ]
    return entry(
      organization ? `${title} | ${organization}` : title,
      CATEGORY_LABELS[item.category].replace(/s$/, ''),
      itemHref(item),
      ...details,
    )
  }),
  ...cv.involvedWith.map((brand) => entry(brand.name, 'Involved with', '/cv')),
]

// Every word of the query has to start a word somewhere (so "ai" finds AI work, not Gmail); hits in
// the title rank above hits in the details, a title that starts with the query ranks first, and
// one thing listed twice (TabCraft is a project and a product) shows once
export function search(query: string, limit = 6): SearchResult[] {
  const words = normalise(query).split(' ').filter(Boolean)
  if (!words.length) return []
  const phrase = words.join(' ')
  const seen = new Set<string>()

  return ENTRIES.flatMap((e) => {
    if (!words.every((word) => e.haystack.includes(` ${word}`))) return []
    const title = ` ${normalise(e.title)}`
    const score =
      (title.startsWith(` ${phrase}`) ? 4 : 0) + words.filter((word) => title.includes(` ${word}`)).length * 2
    return [{ e, score }]
  })
    .sort((a, b) => b.score - a.score)
    .filter(({ e }) => !seen.has(e.title) && Boolean(seen.add(e.title)))
    .slice(0, limit)
    .map(({ e: { title, kind, href } }) => ({ title, kind, href }))
}
