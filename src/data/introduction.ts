import { IntroSlide, Localized } from '@/types'

export const introduction = {
  role: 'Junior AI Platform Engineer',
  organization: 'Hogeschool Rotterdam',
  date: { nl: '27 november 2026', en: '27 November 2026' } satisfies Localized,
  // The role, sprayed over the name on the cover; alternating case on purpose, Painterz only drips on lowercase
  spray: ['JuNiOr AI PlAtFoRm EnGiNeEr'],
}

export const deckLabels = {
  prev: { nl: 'Vorige slide', en: 'Previous slide' },
  next: { nl: 'Volgende slide', en: 'Next slide' },
  fullscreen: { nl: 'Volledig scherm', en: 'Full screen' },
  language: { nl: 'Taal', en: 'Language' },
} satisfies Record<string, Localized>

const CHALLENGE = { nl: 'Uitdaging', en: 'Challenge' }
const APPROACH = { nl: 'Aanpak', en: 'Approach' }
const RESULT = { nl: 'Resultaat', en: 'Result' }

export const introSlides: IntroSlide[] = [
  {
    id: 'over-mij',
    title: { nl: 'Wie ben ik?', en: 'Who am I?' },
    bullets: [
      { nl: 'Gianni Mendonça Semedo, 24', en: 'Gianni Mendonça Semedo, 24' },
      { nl: 'Momenteel full stack developer bij Louvels.dev', en: 'Currently full stack developer at Louvels.dev' },
      { nl: 'Stage bij Jem-id', en: 'Internship at Jem-id' },
      { nl: 'Dutch Expert bij Outlier.ai: prompt engineering, LLMs', en: 'Dutch Expert at Outlier.ai: prompt engineering, LLMs' },
      {
        nl: 'Afgestudeerd aan Hogeschool Rotterdam met een 10',
        en: 'Graduated from Rotterdam University of Applied Sciences with a 10',
      },
    ],
    logos: [
      { name: 'Louvels.dev', src: '/images/brands/louvels.png' },
      { name: 'Jem-id', src: '/images/brands/jem-id.png' },
      { name: 'Outlier.ai', src: '/images/brands/outlier.svg' },
      { name: 'Hogeschool Rotterdam', src: '/images/brands/hogeschool-rotterdam.png', keepColors: true },
    ],
  },
  {
    id: 'soundcheckd',
    devices: [
      { device: 'iphone', src: '/images/screens/soundcheckd-mobile.webp' },
      { device: 'iphone', src: '/images/screens/soundcheckd-appstore.webp' },
    ],
    title: { nl: 'Van idee tot App Store. Volledig zelf.', en: 'From idea to App Store. Entirely my own.' },
    bullets: [
      { nl: 'Afstuderen met eigen startup', en: 'Graduating with my own startup' },
      {
        nl: 'Onderzoeken van wet- en regelgeving, de markt en de muziekindustrie',
        en: 'Researching laws and regulations, the market and the music industry',
      },
      {
        nl: 'Zelfstandig plannen, analyseren en technische afwegingen maken',
        en: 'Planning, analysing and making technical trade-offs on my own',
      },
      {
        nl: 'Security-, identity- en AVG-richtlijnen volgen',
        en: 'Following security, identity and GDPR guidelines',
      },
      {
        nl: 'Full scale development: architectuur, code, deployment, externe API’s koppelen',
        en: 'Full scale development: architecture, code, deployment, integrating external APIs',
      },
    ],
  },
  {
    id: 'fidocs',
    devices: [{ device: 'macbook', src: '/images/screens/fidocs-desktop-1.webp' }],
    title: { nl: 'Zelf opgezet. Landelijke schaal.', en: 'Set up by me. National scale.' },
    blocks: [
      {
        label: CHALLENGE,
        text: {
          nl: 'E-commerce importdocumenten werden met de hand gevalideerd voordat ze naar de douane gingen.',
          en: 'E-commerce import documents were validated by hand before they could go to customs.',
        },
      },
      {
        label: APPROACH,
        text: {
          nl: 'Research naar douaneregels en wetgeving, daarna zelf ontworpen en opgezet: een validatietool in Next.js en TypeScript op Symfony.',
          en: 'Research into customs rules and legislation, then designed and set up by me: a validation tool in Next.js and TypeScript on Symfony.',
        },
      },
      {
        label: RESULT,
        text: {
          nl: '200% snellere validatie. In augustus 2026 zo’n 1,55 miljoen goederenregels: bijna 12% van het landelijke totaal.',
          en: '200% faster validation. In August 2026 around 1.55 million goods lines: almost 12% of the national total.',
        },
      },
    ],
  },
  {
    id: 'louvels',
    devices: [{ device: 'macbook', src: '/images/screens/louvels-site.webp' }],
    title: { nl: 'Als het misgaat, sta ik er.', en: 'When things break, I’m there.' },
    blocks: [
      {
        label: CHALLENGE,
        text: {
          nl: 'Een kritieke PHP-kwetsbaarheid, en supportverzoeken bij Skai Customs die niet konden wachten.',
          en: 'A critical PHP vulnerability, and support requests at Skai Customs that couldn’t wait.',
        },
      },
      {
        label: APPROACH,
        text: { nl: '[Uitwerking volgt]', en: '[To be written]' },
      },
      {
        label: RESULT,
        text: { nl: '[Uitwerking volgt]', en: '[To be written]' },
      },
    ],
  },
  {
    id: 'fit',
    title: { nl: 'Wat ik meebreng. Waar ik groei.', en: 'What I bring. Where I grow.' },
    blocks: [
      {
        label: { nl: 'Meebrengen', en: 'What I bring' },
        text: {
          nl: 'Dagelijkse praktijk in versiebeheer, deployments, API-koppelingen en AI in productie.',
          en: 'Daily practice in version control, deployments, API integrations and AI in production.',
        },
        tags: ['Git', 'CI/CD', 'Azure DevOps', 'Docker', 'Microsoft SSO', 'LLMs', 'RAG', 'Prompt engineering', 'AVG/GDPR', 'Claude 101'],
      },
      {
        label: { nl: 'Groeien', en: 'Growing' },
        text: {
          nl: 'Van developer naar platform engineer. Azure, Entra ID en RBAC verdiepen, Microsoft Foundry en IaC in de praktijk, richting AZ-900 en AI-900. Samen met ervaren engineers, door naar medior.',
          en: 'From developer to platform engineer. Deepening Azure, Entra ID and RBAC, Microsoft Foundry and IaC in practice, towards AZ-900 and AI-900. Alongside experienced engineers, on to medior.',
        },
        tags: ['Azure', 'Entra ID', 'RBAC', 'Microsoft Foundry', 'IaC'],
      },
    ],
  },
]
