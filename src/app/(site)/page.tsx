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
      <p className="ml-auto mt-24 max-w-[616px] px-5 text-right text-base md:mt-[15vw]">{INTRO}</p>
      <div className="mt-5">
        <ProjectStrip projects={featured} />
      </div>
      <h1 className="px-5 pb-5 pt-12 text-[clamp(4rem,7.4vw,8rem)] leading-normal md:pt-20">GianniMS</h1>
    </>
  )
}
