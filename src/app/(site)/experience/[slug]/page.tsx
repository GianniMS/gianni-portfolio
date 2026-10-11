import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReadingShell from '@/components/layout/ReadingShell'
import { getDetailItem, getDetailItems } from '@/lib/content'
import { formatItemDuration, formatItemYear } from '@/data/itemDates'
import { splitTitle } from '@/data/itemText'
import { imageSrc } from '@/lib/images'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getDetailItems()).map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getDetailItem((await params).slug)
  if (!item) return { title: 'Experience' }

  const description = item.description[0] ?? 'Work by Gianni Mendonça Semedo.'
  const url = `/experience/${item.slug}`
  const image = !item.isPrivate && (item.detailImage || item.image)

  return {
    title: item.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description,
      url,
      type: 'article',
      images: image ? [imageSrc(image)] : undefined,
    },
  }
}

export default async function DetailPage({ params }: Props) {
  const item = await getDetailItem((await params).slug)
  if (!item) notFound()

  const { title, organization } = splitTitle(item)
  const when = item.category === 'experience' ? formatItemDuration(item) : formatItemYear(item)
  const meta = [organization, when, item.isPrivate && 'Private'].filter(Boolean).join(' | ')

  // Private work never shows its images, matching the Experience index
  const hero = item.isPrivate ? undefined : item.detailImage || item.image
  const gallery = item.isPrivate ? [] : (item.gallery ?? [])

  return (
    <div className="px-2.5 pb-24 md:px-5">
      <nav className="mt-16 lg:mt-24">
        <Link
          href="/experience"
          aria-label="Back to Experience"
          className="text-3xl leading-none transition-opacity duration-800 hover:opacity-50"
        >
          ←
        </Link>
      </nav>
      <ReadingShell title={title} aside={meta}>
        <div className="flex flex-col gap-12">
          {hero ? (
            <Image
              src={imageSrc(hero)}
              alt={title}
              width={854}
              height={1112}
              sizes="(min-width: 1024px) 427px, 100vw"
              className="aspect-[427/556] w-full max-w-[427px] object-cover"
              priority
            />
          ) : (
            <div className="aspect-[427/556] w-full max-w-[427px] bg-earth" />
          )}

          {item.description.length > 0 && (
            <div className="flex flex-col gap-[1lh] leading-relaxed">
              {item.description.map((paragraph, i) => (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {item.skills.length > 0 && (
            <section className="border-t border-foreground pt-4">
              <h2 className="font-bold">Skills</h2>
              <p className="mt-2 leading-relaxed">{item.skills.join(', ')}</p>
            </section>
          )}

          {gallery.map((src, i) => (
            <Image
              key={src}
              src={imageSrc(src)}
              alt={`${title} image ${i + 1}`}
              width={1280}
              height={960}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-auto w-full"
            />
          ))}
        </div>
      </ReadingShell>
    </div>
  )
}
