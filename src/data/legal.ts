import type { LegalPage } from '@/types'
import { cv } from '@/data/cv'

const UPDATED = '21 November 2026'

export const privacyPolicy: LegalPage = {
  title: 'Privacy Policy',
  description: 'How giannims.com handles personal data: no tracking, no analytics, no forms. Only what the host needs to serve the site and what you send by email.',
  updated: UPDATED,
  sections: [
    {
      title: 'Who is responsible',
      paragraphs: [
        `This website (giannims.com) is the personal portfolio of ${cv.name}, based in Rotterdam, the Netherlands. I am the controller of the personal data described here, as meant in the General Data Protection Regulation (GDPR). You can reach me at ${cv.email}.`,
      ],
    },
    {
      title: 'What this site does not do',
      paragraphs: [
        'There are no analytics, no tracking pixels, no advertising, no accounts and no forms on this site. It sets no cookies and stores nothing in your browser. Fonts, images and 3D models are served from this site itself, so visiting it does not send your data to Google or other third parties.',
      ],
    },
    {
      title: 'Server logs',
      paragraphs: [
        'The site is hosted by Vercel Inc. Like any web host, Vercel processes technical data needed to deliver pages and keep the site secure, such as your IP address, browser type, the page requested and the time of the request. This data is used only to serve the site and protect it against abuse, is kept for a short period only, and is not used to identify or profile you.',
        'The legal basis is my legitimate interest in running a secure, working website (Article 6(1)(f) GDPR). Vercel acts as my processor and may process data in the United States under the EU-U.S. Data Privacy Framework and the European Commission\'s Standard Contractual Clauses.',
      ],
    },
    {
      title: 'When you email me',
      paragraphs: [
        'If you contact me by email, I receive your email address, your name if you include it, and whatever you write. I use this only to reply and to follow up on what you asked, based on my legitimate interest in answering you or on steps towards an agreement you ask for (Article 6(1)(b) and (f) GDPR). I do not share it with anyone, and delete it once it is no longer needed for that conversation or any work that came from it, unless I am required by law to keep it longer.',
      ],
    },
    {
      title: 'Links to other sites',
      paragraphs: [
        'This site links to other sites, such as LinkedIn, Instagram, certificate pages and projects I have worked on. Once you follow a link, that site\'s own privacy policy applies; I have no control over what they collect.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        'You have the right to access, correct or delete your personal data, to restrict or object to its processing, and to data portability. To use any of these rights, email me and I will respond within one month. I may ask you to confirm your identity first.',
        'If you think your data is not handled properly, you can file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) at autoriteitpersoonsgegevens.nl.',
      ],
    },
    {
      title: 'Security',
      paragraphs: [
        'The site is served only over an encrypted connection (HTTPS). Because it collects so little, there is little to protect, and what there is stays limited to the host and my own mailbox.',
      ],
    },
    {
      title: 'Changes',
      paragraphs: [
        'If this site changes in a way that affects your data, for example by adding analytics, this policy will be updated first. The date at the top shows when it last changed.',
      ],
    },
  ],
}

export const cookiePolicy: LegalPage = {
  title: 'Cookie Policy',
  description: 'giannims.com sets no cookies and stores nothing in your browser. No analytics, no tracking, no consent banner needed.',
  updated: UPDATED,
  sections: [
    {
      title: 'No cookies',
      paragraphs: [
        'This site does not use cookies. Not for analytics, not for advertising, and not for remembering preferences. It also does not use similar techniques such as local storage, session storage, tracking pixels or fingerprinting.',
        'That is why you do not see a cookie banner here: there is nothing to consent to.',
      ],
    },
    {
      title: 'Third parties',
      paragraphs: [
        'Everything on this site, including fonts, images and 3D models, is served from the site itself, so no third party can set cookies while you browse it. Sites I link to, such as LinkedIn or Instagram, may use cookies once you visit them; their own cookie policies apply there.',
      ],
    },
    {
      title: 'Hosting',
      paragraphs: [
        'The host, Vercel, processes technical data such as your IP address to deliver the site and keep it secure, without placing cookies for this. The Privacy Policy explains this in more detail.',
      ],
    },
    {
      title: 'Changes',
      paragraphs: [
        `If cookies are ever added, this policy will be updated first and, where required, your consent will be asked before any are set. Questions? Email ${cv.email}.`,
      ],
    },
  ],
}
