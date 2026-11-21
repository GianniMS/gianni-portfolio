import Link from 'next/link'
import GooReveal from '@/components/home/GooReveal'

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      {/* The number, the line and the way home melt in together, as text does across the site */}
      <GooReveal play="load" className="flex flex-col items-center">
        <h1 className="font-caslon text-[clamp(6rem,22vw,16rem)] leading-none tracking-[-0.04em]">404</h1>
        <p className="mt-4 font-sf text-lg md:mt-6 md:text-xl">Page not found</p>
        <Link href="/" className="group mt-10 inline-flex items-center gap-2 font-sf text-base md:mt-12 md:text-lg">
          <span aria-hidden className="transition-transform duration-300 [.group:hover_&]:-translate-x-1">
            ←
          </span>
          <span className="pulse-underline">Home</span>
        </Link>
      </GooReveal>
    </main>
  )
}
