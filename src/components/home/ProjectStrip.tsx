import Image from 'next/image'
import Link from 'next/link'
import { InternalProject } from '@/lib/content'
import { imageSrc } from '@/lib/images'

export default function ProjectStrip({ projects }: { projects: InternalProject[] }) {
  return (
    <ul className="grid grid-cols-2 md:flex">
      {projects.map((project, i) => (
        <li key={project.id} className="md:flex-1 md:basis-0">
          <Link
            href={`/experience/${project.slug}`}
            className="group relative block aspect-[346/450] overflow-hidden"
          >
            <Image
              src={imageSrc(project.image)}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 20vw, 50vw"
              className="object-cover"
              priority={i < 2}
            />
            <div className="absolute inset-0 flex flex-col items-end justify-end bg-foreground/70 pb-6 pl-10 pr-3.5 text-right text-background opacity-0 transition-opacity duration-800 group-hover:opacity-100 group-focus-visible:opacity-100">
              <p>{project.title}</p>
              {project.description[0] && <p className="mt-[1lh] line-clamp-4">{project.description[0]}</p>}
              <p className="mt-[1lh]">See more →</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
