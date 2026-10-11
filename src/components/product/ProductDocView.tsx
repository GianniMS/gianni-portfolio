import { Fragment } from 'react'
import { ProductDoc } from '@/types'
import ReadingShell from '@/components/layout/ReadingShell'

const LINKABLE = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+\w)/g

function Linked({ text }: { text: string }) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part
    return (
      <a
        key={i}
        href={href}
        className="underline decoration-foreground/30 underline-offset-4 transition-[text-decoration-color] duration-800 hover:decoration-foreground"
      >
        {part}
      </a>
    )
  })
}

export function ProductDocSections({ doc }: { doc: ProductDoc }) {
  return (
    <div className="flex flex-col gap-12">
      {doc.sections.map((section, i) => (
        <section key={i} className="flex flex-col gap-[1lh] leading-relaxed">
          {section.heading && <h2 className="font-bold">{section.heading}</h2>}
          {section.blocks.map((block, j) =>
            typeof block === 'string' ? (
              <p key={j} className="whitespace-pre-line">
                <Linked text={block} />
              </p>
            ) : (
              <ul key={j} className="flex flex-col gap-2">
                {block.map((item, k) => (
                  <li key={k} className="grid grid-cols-[1.5rem_1fr]">
                    <span aria-hidden>—</span>
                    <span>
                      <Linked text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            )
          )}
        </section>
      ))}
    </div>
  )
}

export default function ProductDocView({ title, doc }: { title: string; doc: ProductDoc }) {
  return (
    <ReadingShell title={title} aside={doc.updated && `Last updated ${doc.updated}`}>
      <ProductDocSections doc={doc} />
    </ReadingShell>
  )
}
