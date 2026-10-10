import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TabCraft Terms of Use',
  description: 'The terms that apply to the TabCraft browser extension.',
  alternates: { canonical: '/tabcraft/terms' },
}

export default function TabCraftTermsPage() {
  return (
    <>
      <header>
        <h1>TabCraft Terms of Use</h1>
        <p className="mt-2 text-sm">Last updated: 10 October 2026</p>
      </header>
      <section>
        <p>
          These terms apply to TabCraft, a browser extension made by GMS Development (Gianni Mendonça
          Semedo, Rotterdam, the Netherlands, VAT ID NL005216156B50). By installing or buying
          TabCraft you agree to them.
        </p>
      </section>
      <section>
        <h2>What you get</h2>
        <p>
          TabCraft brings a character to the web pages you visit and to your new tab page. After a
          one-time payment you can use TabCraft in your browser, including uploading up to 8 skins
          and naming them.
        </p>
      </section>
      <section>
        <h2>Price and payment</h2>
        <ul>
          <li>TabCraft is a one-time purchase. There is no subscription and no recurring charge.</li>
          <li>The price is shown before you pay, including VAT where it applies.</li>
          <li>
            Payments are handled by ExtensionPay and processed by Stripe. You can restore your
            purchase on another browser with the email address you used to pay.
          </li>
        </ul>
      </section>
      <section>
        <h2>Refunds</h2>
        <p>
          Not happy? Email us within 14 days of your purchase and we will refund you in full, no
          questions asked. After 14 days refunds are at our discretion.
        </p>
      </section>
      <section>
        <h2>Your skins</h2>
        <p>
          You may only upload skins you are allowed to use. Skins you upload stay on your device; we
          never receive them. TabCraft is not affiliated with, endorsed by or connected to any game
          or game publisher.
        </p>
      </section>
      <section>
        <h2>Fair use</h2>
        <p>
          TabCraft is for your personal use. You may not resell it, share your purchase with others,
          or copy, modify or redistribute the extension or its artwork.
        </p>
      </section>
      <section>
        <h2>Availability and changes</h2>
        <p>
          We work to keep TabCraft running well, but we cannot guarantee it works on every website
          (for example, Chrome does not allow extensions on its own pages, and some fullscreen video
          players can&apos;t show your character). We may update TabCraft to improve it or to keep it
          working with Chrome.
        </p>
      </section>
      <section>
        <h2>Liability</h2>
        <p>
          TabCraft is provided &quot;as is&quot;. To the extent the law allows, GMS Development is not
          liable for indirect damage, and our total liability is limited to the amount you paid for
          TabCraft. Nothing in these terms limits your rights as a consumer under the law.
        </p>
      </section>
      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by Dutch law. If you are a consumer in the EU, you also keep the
          protection of the consumer laws of your own country.
        </p>
      </section>
      <section>
        <h2>Changes to these terms</h2>
        <p>
          If these terms change, the new version will be published on this page with a new date.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          GMS Development
          <br />
          Clazina Kouwenberzoom 215, 3065 GK Rotterdam, the Netherlands
          <br />
          Email: <a href="mailto:giannims2002@gmail.com">giannims2002@gmail.com</a>
        </p>
      </section>
    </>
  )
}
