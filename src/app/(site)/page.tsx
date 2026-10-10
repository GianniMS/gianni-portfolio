import type { Metadata } from 'next'
import ProjectStrip from '@/components/home/ProjectStrip'
import { getProjects, InternalProject } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Gianni Mendonça Semedo | Full Stack Developer' },
  description:
    'Gianni Mendonça Semedo, full stack developer in Rotterdam, The Netherlands. Products, experience and contact.',
  alternates: { canonical: '/' },
}

const STRIP_SIZE = 5

const INTRO =
  'Research, design, development. From the thought to the realization. From a complex problem, to a structured solution. That’s what I specialize in.'

export default async function HomePage() {
  const projects = await getProjects()
  const featured = projects
    .filter((p): p is InternalProject => p.link === 'internal')
    .slice(0, STRIP_SIZE)

  return (
    <>
      <h1 className="sr-only">Gianni Mendonça Semedo</h1>
      <p className="ml-auto mt-40 max-w-[335px] pr-3.5 text-right md:mt-[15vw] md:max-w-[656px] md:px-5">
        {INTRO}
      </p>
      <div className="mt-2 md:mt-5">
        <ProjectStrip projects={featured} />
      </div>
    </>
  )
}
