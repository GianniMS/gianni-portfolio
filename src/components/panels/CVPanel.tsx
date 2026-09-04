import CollisionText from '@/components/image/CollisionText'
import { CVData } from '@/types'

export default function CVPanel({ data }: { data: CVData }) {
  return (
    <div className="relative z-20 flex flex-col max-w-xs md:mt-12">
      <a
        href={data.cvPdfPath}
        download
        className="text-blue font-bold text-2xl leading-tight mb-8 w-fit"
      >
        <CollisionText crossColor="var(--color-foreground)" underline>Download CV</CollisionText>
      </a>

      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-blue font-bold text-lg leading-tight">
          <CollisionText>About Me</CollisionText>
        </h2>
        {data.about.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed">
            <CollisionText>{paragraph}</CollisionText>
          </p>
        ))}
      </section>

      {data.clients.length > 0 && (
        <section className="flex flex-col gap-2 mb-8">
          <h2 className="text-blue font-bold text-lg leading-tight">
            <CollisionText>Clients</CollisionText>
          </h2>
          <ul className="flex flex-col gap-1">
            {data.clients.map((client) => (
              <li key={client} className="text-sm leading-relaxed">
                <CollisionText>{client}</CollisionText>
              </li>
            ))}
          </ul>
        </section>
      )}

      <a href={`mailto:${data.email}`} className="text-blue font-bold text-sm w-fit">
        <CollisionText crossColor="var(--color-foreground)" underline>{data.email}</CollisionText>
      </a>
    </div>
  )
}
