import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getDetailItem, getDetailItems } from '@/lib/content'
import { formatItemYear } from '@/data/itemDates'
import { imageSrc } from '@/lib/images'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getDetailItems()).map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getDetailItem((await params).slug)
  if (!project) return { title: 'Project' }

  const description = project.description[0] ?? 'Project by Gianni Mendonça Semedo.'
  const url = `/experience/${project.slug}`

  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description,
      url,
      type: 'article',
      images: [imageSrc(project.image)],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getDetailItem((await params).slug)
  if (!project) notFound()

  return (
    <article>
      <h1>{project.title}</h1>
      <p>
        {project.isPrivate ? 'Private' : 'Public'} {formatItemYear(project)}
      </p>
      <Image
        src={imageSrc(project.image)}
        alt={project.title}
        width={1600}
        height={1000}
        className="h-auto w-full max-w-3xl"
        priority
      />
      {project.description.map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
      {project.skills.length > 0 && <p>{project.skills.join(', ')}</p>}
      {project.gallery?.map((src, i) => (
        <Image
          key={src}
          src={imageSrc(src)}
          alt={`${project.title} image ${i + 1}`}
          width={1600}
          height={1000}
          className="h-auto w-full max-w-3xl"
        />
      ))}
    </article>
  )
}
