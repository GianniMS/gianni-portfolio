import { Fragment } from 'react'
import { ProductDoc } from '@/types'

const LINKABLE = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+\w)/g

function Linked({ text }: { text: string }) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part
    return (
      <a key={i} href={href}>
        {part}
      </a>
    )
  })
}

export default function ProductDocView({ title, doc }: { title: string; doc: ProductDoc }) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        {doc.updated && <p>Last updated: {doc.updated}</p>}
      </header>
      {doc.sections.map((section, i) => (
        <section key={i}>
          {section.heading && <h2>{section.heading}</h2>}
          {section.blocks.map((block, j) =>
            typeof block === 'string' ? (
              <p key={j} className="whitespace-pre-line">
                <Linked text={block} />
              </p>
            ) : (
              <ul key={j}>
                {block.map((item, k) => (
                  <li key={k}>
                    <Linked text={item} />
                  </li>
                ))}
              </ul>
            )
          )}
        </section>
      ))}
    </article>
  )
}
