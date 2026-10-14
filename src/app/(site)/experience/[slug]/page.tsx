import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { STAGE_CONTENT_FADE, Stage, StageLayout } from '@/components/stage/Stage'
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

  // Like the Experience index, private work keeps its stage image but not its extra images
  const gallery = item.isPrivate ? [] : (item.gallery ?? [])

  return (
    <StageLayout
      alignTops
      contentClassName={STAGE_CONTENT_FADE}
      stage={
        <Stage
          entries={[{ id: null, title, image: item.detailImage || item.image || undefined }]}
          active={null}
          fadeIn
        />
      }
    >
      <Link
        href="/experience"
        aria-label="Back to Experience"
        className="text-3xl leading-none transition-opacity duration-800 hover:opacity-50"
      >
        ←
      </Link>
      <div className="flex max-w-[616px] flex-col gap-[1lh] lg:text-right">
        {/* The stage carries the title from 1024px up; below that it is hidden */}
        <h1 className="text-[clamp(2.5rem,10vw,4rem)] leading-none tracking-tight lg:sr-only">
          {title}
        </h1>
        {meta && <p className="text-foreground/50">{meta}</p>}
        {item.description.map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
        {item.skills.length > 0 && (
          <section>
            <h2 className="font-bold">Skills</h2>
            <p>{item.skills.join(', ')}</p>
          </section>
        )}
        {gallery.map((src, i) => (
          <Image
            key={src}
            src={imageSrc(src)}
            alt={`${title} image ${i + 1}`}
            width={1280}
            height={960}
            sizes="(min-width: 1024px) 616px, 100vw"
            className="h-auto w-full"
          />
        ))}
      </div>
    </StageLayout>
  )
}
