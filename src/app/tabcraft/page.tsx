import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TabCraft',
  description:
    'TabCraft is a browser extension that brings a character to the web pages you visit and to your new tab page.',
  alternates: { canonical: '/tabcraft' },
}

export default function TabCraftPage() {
  return (
    <>
      <h1>TabCraft</h1>
      <section>
        <p>
          TabCraft is a browser extension that brings a character to the web pages you visit and to
          your new tab page.
        </p>
        <p>
          Your character follows your cursor, looks at the text field while you type, sits down to
          watch videos with you and steps out of view when you go fullscreen. Upload up to 8 skins,
          give them names and switch between them whenever you like.
        </p>
      </section>
      <section>
        <h2>One-time purchase</h2>
        <p>No subscription, no ads, no tracking. Pay once and TabCraft is yours.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions or feedback? Email <a href="mailto:giannims2002@gmail.com">giannims2002@gmail.com</a>.
        </p>
        <p>
          Read the <Link href="/tabcraft/privacy">privacy policy</Link> and{' '}
          <Link href="/tabcraft/terms">terms of use</Link>.
        </p>
      </section>
    </>
  )
}
