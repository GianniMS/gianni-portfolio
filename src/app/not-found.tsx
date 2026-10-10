import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <h1>This page was not found</h1>
      <Link href="/">Back home</Link>
    </main>
  )
}
