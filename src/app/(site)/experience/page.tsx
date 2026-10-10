import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjects } from '@/lib/content'
import { formatItemYear } from '@/data/itemDates'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Selected projects by Gianni Mendonça Semedo.',
  alternates: { canonical: '/experience' },
}

export default async function ExperiencePage() {
  const projects = await getProjects()

  return (
    <>
      <h1>Experience</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.link === 'internal' ? (
              <Link href={`/experience/${project.slug}`}>{project.title}</Link>
            ) : (
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
            )}{' '}
            <span>{project.isPrivate ? 'Private' : 'Public'}</span>{' '}
            <span>{formatItemYear(project)}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
