import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TabCraft Privacy Policy',
  description: 'What data the TabCraft browser extension uses and why.',
  alternates: { canonical: '/tabcraft/privacy' },
}

export default function TabCraftPrivacyPage() {
  return (
    <>
      <header>
        <h1>TabCraft Privacy Policy</h1>
        <p className="mt-2 text-sm">Last updated: 10 October 2026</p>
      </header>
      <section>
        <p>
          TabCraft is a browser extension made by GMS Development (Gianni Mendonça Semedo, Rotterdam,
          the Netherlands). This policy explains what data TabCraft uses and why. In short: TabCraft
          does not track you, does not collect your browsing data and does not show ads.
        </p>
      </section>
      <section>
        <h2>Data that stays on your device</h2>
        <p>
          TabCraft saves the following in your browser&apos;s extension storage. It never leaves your
          device and we (GMS Development) never receive it:
        </p>
        <ul>
          <li>The skins you upload and the names you give them</li>
          <li>Your settings (the switches in the popup)</li>
          <li>Whether TabCraft is unlocked on this browser</li>
        </ul>
        <p>Uninstalling TabCraft deletes this data.</p>
      </section>
      <section>
        <h2>What TabCraft looks at on web pages</h2>
        <p>
          To bring your character to life, TabCraft runs on the pages you visit. It only reacts to
          what happens on the page, on your device:
        </p>
        <ul>
          <li>Your cursor position, so your character can look at it</li>
          <li>
            That you are typing (not what you type: key presses are never read, stored or sent), so
            he can look at the text field
          </li>
          <li>
            Whether a video is playing and where it is on the page, so he can sit down and watch it
          </li>
          <li>Whether a page is in fullscreen, so he can step out of view</li>
        </ul>
        <p>None of this is recorded, stored or sent anywhere.</p>
        <p>
          The TabCraft new tab page shows your most visited sites as shortcuts, using Chrome&apos;s
          own list. This list is only used to show the shortcuts and stays on your device.
        </p>
      </section>
      <section>
        <h2>Payments</h2>
        <p>
          TabCraft is a one-time purchase, handled by ExtensionPay (extensionpay.com), with payments
          processed by Stripe (stripe.com). When you buy TabCraft:
        </p>
        <ul>
          <li>Stripe processes your payment details (such as your card or bank). We never see them.</li>
          <li>
            ExtensionPay stores your email address and whether you have paid, so TabCraft can unlock
            and you can restore your purchase on another browser.
          </li>
          <li>
            TabCraft checks with ExtensionPay whether it is unlocked. This check sends an anonymous
            ID for this installation, not your browsing data.
          </li>
        </ul>
        <p>
          See the privacy policies of ExtensionPay (
          <a href="https://extensionpay.com/privacy">https://extensionpay.com/privacy</a>) and Stripe
          (<a href="https://stripe.com/privacy">https://stripe.com/privacy</a>) for how they handle
          your data. As the seller, GMS Development receives your email address and purchase details
          through Stripe, and uses them only to handle your purchase, refunds and support questions,
          and to meet legal (tax) requirements.
        </p>
      </section>
      <section>
        <h2>No tracking, no selling</h2>
        <p>
          TabCraft contains no analytics, no advertising and no third-party trackers. We do not sell
          or share your data.
        </p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>
          Under the GDPR you can ask to see, correct or delete the personal data we hold about you
          (your email address and purchase details). Contact us at the address below.
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
      <section>
        <h2>Changes</h2>
        <p>
          If this policy changes, the new version will be published on this page with a new date.
        </p>
      </section>
    </>
  )
}
