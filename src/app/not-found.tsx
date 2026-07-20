import Link from 'next/link'
import CollisionText from '@/components/image/CollisionText'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex flex-col items-start">
        <h1 className="font-title text-blue text-2xl md:text-4xl tracking-wide">
          <CollisionText>This page was not found</CollisionText>
        </h1>
        <Link href="/" className="mt-4 text-2xl leading-none text-foreground">
          <CollisionText>←</CollisionText>
        </Link>
      </div>
    </div>
  )
}
