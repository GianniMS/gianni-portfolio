import CollisionText from '@/components/image/CollisionText'
import { CVData } from '@/types'

export default function CVPanel({ data }: { data: CVData }) {
  return (
    <div className="relative z-20 flex flex-col max-w-xs md:mt-12">
      <div className="mb-6">
        <h1 className="text-blue font-bold text-lg leading-tight">
          <CollisionText>{data.name}</CollisionText>
        </h1>
        <p className="text-sm">
          <CollisionText>{data.dob}</CollisionText>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {data.bio.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed">
            <CollisionText>{paragraph}</CollisionText>
          </p>
        ))}
        <a href={data.cvPdfPath} download className="text-blue font-bold text-sm w-fit">
          <CollisionText crossColor="var(--color-foreground)" underline>Download CV</CollisionText>
        </a>
        <a href={`mailto:${data.email}`} className="text-blue font-bold text-sm w-fit">
          <CollisionText crossColor="var(--color-foreground)" underline>{data.email}</CollisionText>
        </a>
      </div>
    </div>
  )
}
