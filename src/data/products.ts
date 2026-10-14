import { Product, ProductDoc } from '@/types'

const GMS_CONTACT: ProductDoc['sections'][number] = {
  heading: 'Contact',
  blocks: [
    'GMS Development\nRotterdam, the Netherlands\nEmail: giannims2002@gmail.com',
  ],
}

// Seeds the dashboard until the first products save writes data/products.json
export const defaultProducts: Product[] = [
  {
    slug: 'tabcraft',
    name: 'TabCraft',
    description:
      'A browser extension that brings a character to the web pages you visit and to your new tab page.',
    link: '',
    support: {
      sections: [
        {
          blocks: [
            'Your character follows your cursor, looks at the text field while you type, sits down to watch videos with you and steps out of view when you go fullscreen. Upload up to 8 skins, give them names and switch between them whenever you like.',
          ],
        },
        {
          heading: 'One-time purchase',
          blocks: ['No subscription, no ads, no tracking. Pay once and TabCraft is yours.'],
        },
        {
          heading: 'Contact',
          blocks: ['Questions or feedback? Email giannims2002@gmail.com.'],
        },
      ],
    },
    privacy: {
      updated: '10 October 2026',
      sections: [
        {
          blocks: [
            'TabCraft is a browser extension made by GMS Development (Gianni Mendonça Semedo, Rotterdam, the Netherlands). This policy explains what data TabCraft uses and why. In short: TabCraft does not track you, does not collect your browsing data and does not show ads.',
          ],
        },
        {
          heading: 'Data that stays on your device',
          blocks: [
            "TabCraft saves the following in your browser's extension storage. It never leaves your device and we (GMS Development) never receive it:",
            [
              'The skins you upload and the names you give them',
              'Your settings (the switches in the popup)',
              'Whether TabCraft is unlocked on this browser',
            ],
            'Uninstalling TabCraft deletes this data.',
          ],
        },
        {
          heading: 'What TabCraft looks at on web pages',
          blocks: [
            'To bring your character to life, TabCraft runs on the pages you visit. It only reacts to what happens on the page, on your device:',
            [
              'Your cursor position, so your character can look at it',
              'That you are typing (not what you type: key presses are never read, stored or sent), so he can look at the text field',
              'Whether a video is playing and where it is on the page, so he can sit down and watch it',
              'Whether a page is in fullscreen, so he can step out of view',
            ],
            'None of this is recorded, stored or sent anywhere.',
            "The TabCraft new tab page shows your most visited sites as shortcuts, using Chrome's own list. This list is only used to show the shortcuts and stays on your device.",
          ],
        },
        {
          heading: 'Payments',
          blocks: [
            'TabCraft is a one-time purchase, handled by ExtensionPay (extensionpay.com), with payments processed by Stripe (stripe.com). When you buy TabCraft:',
            [
              'Stripe processes your payment details (such as your card or bank). We never see them.',
              'ExtensionPay stores your email address and whether you have paid, so TabCraft can unlock and you can restore your purchase on another browser.',
              'TabCraft checks with ExtensionPay whether it is unlocked. This check sends an anonymous ID for this installation, not your browsing data.',
            ],
            'See the privacy policies of ExtensionPay (https://extensionpay.com/privacy) and Stripe (https://stripe.com/privacy) for how they handle your data. As the seller, GMS Development receives your email address and purchase details through Stripe, and uses them only to handle your purchase, refunds and support questions, and to meet legal (tax) requirements.',
          ],
        },
        {
          heading: 'No tracking, no selling',
          blocks: [
            'TabCraft contains no analytics, no advertising and no third-party trackers. We do not sell or share your data.',
          ],
        },
        {
          heading: 'Your rights',
          blocks: [
            'Under the GDPR you can ask to see, correct or delete the personal data we hold about you (your email address and purchase details). Contact us at the address below.',
          ],
        },
        GMS_CONTACT,
        {
          heading: 'Changes',
          blocks: ['If this policy changes, the new version will be published on this page with a new date.'],
        },
      ],
    },
    terms: {
      updated: '10 October 2026',
      sections: [
        {
          blocks: [
            'These terms apply to TabCraft, a browser extension made by GMS Development (Gianni Mendonça Semedo, Rotterdam, the Netherlands, VAT ID NL005216156B50). By installing or buying TabCraft you agree to them.',
          ],
        },
        {
          heading: 'What you get',
          blocks: [
            'TabCraft brings a character to the web pages you visit and to your new tab page. After a one-time payment you can use TabCraft in your browser, including uploading up to 8 skins and naming them.',
          ],
        },
        {
          heading: 'Price and payment',
          blocks: [
            [
              'TabCraft is a one-time purchase. There is no subscription and no recurring charge.',
              'The price is shown before you pay, including VAT where it applies.',
              'Payments are handled by ExtensionPay and processed by Stripe. You can restore your purchase on another browser with the email address you used to pay.',
            ],
          ],
        },
        {
          heading: 'Refunds',
          blocks: [
            'Not happy? Email us within 14 days of your purchase and we will refund you in full, no questions asked. After 14 days refunds are at our discretion.',
          ],
        },
        {
          heading: 'Your skins',
          blocks: [
            'You may only upload skins you are allowed to use. Skins you upload stay on your device; we never receive them. TabCraft is not affiliated with, endorsed by or connected to any game or game publisher.',
          ],
        },
        {
          heading: 'Fair use',
          blocks: [
            'TabCraft is for your personal use. You may not resell it, share your purchase with others, or copy, modify or redistribute the extension or its artwork.',
          ],
        },
        {
          heading: 'Availability and changes',
          blocks: [
            "We work to keep TabCraft running well, but we cannot guarantee it works on every website (for example, Chrome does not allow extensions on its own pages, and some fullscreen video players can't show your character). We may update TabCraft to improve it or to keep it working with Chrome.",
          ],
        },
        {
          heading: 'Liability',
          blocks: [
            'TabCraft is provided "as is". To the extent the law allows, GMS Development is not liable for indirect damage, and our total liability is limited to the amount you paid for TabCraft. Nothing in these terms limits your rights as a consumer under the law.',
          ],
        },
        {
          heading: 'Governing law',
          blocks: [
            'These terms are governed by Dutch law. If you are a consumer in the EU, you also keep the protection of the consumer laws of your own country.',
          ],
        },
        {
          heading: 'Changes to these terms',
          blocks: ['If these terms change, the new version will be published on this page with a new date.'],
        },
        GMS_CONTACT,
      ],
    },
  },
]

// Products live at the site root, so a slug must not shadow a page or redirect
export const RESERVED_SLUGS = [
  'products',
  'experience',
  'about',
  'contact',
  'dashboard',
  'api',
  'cv',
  'portfolio',
  'projects',
]
