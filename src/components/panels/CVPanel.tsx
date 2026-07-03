import CollisionText from '@/components/image/CollisionText'
import { CVData } from '@/types'

export default function CVPanel({ data }: { data: CVData }) {
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h1 className="text-blue font-bold text-lg leading-tight">
        <CollisionText>{data.name}</CollisionText>
      </h1>
      <p className="text-sm">
        <CollisionText>{data.dob}</CollisionText>
      </p>
      {data.bio.map((paragraph, i) => (
        <p key={i} className="text-sm leading-relaxed">
          <CollisionText>{paragraph}</CollisionText>
        </p>
      ))}
      <a href={data.cvPdfPath} download className="text-blue underline text-sm w-fit">
        <CollisionText>Download CV</CollisionText>
      </a>
      <p className="text-sm">
        <CollisionText>Message me: </CollisionText>
        <a href={`mailto:${data.email}`} className="text-blue underline">
          <CollisionText>{data.email}</CollisionText>
        </a>
      </p>
    </div>
  )
}
