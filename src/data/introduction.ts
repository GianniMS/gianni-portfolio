import { IntroSlide, Localized } from '@/types'

export const introduction = {
  role: 'Junior AI Platform Engineer',
  organization: 'Hogeschool Rotterdam',
  date: { nl: '27 november 2026', en: '27 November 2026' } satisfies Localized,
  // The role, sprayed over the name on the cover; alternating case on purpose, Painterz only drips on lowercase
  spray: ['JuNiOr AI PlAtFoRm EnGiNeEr'],
  thanks: { nl: 'Bedankt voor het luisteren', en: 'Thanks for listening' } satisfies Localized,
  sendOff: ['SeE yOu SoOn'],
}

export const deckLabels = {
  prev: { nl: 'Vorige slide', en: 'Previous slide' },
  next: { nl: 'Volgende slide', en: 'Next slide' },
  fullscreen: { nl: 'Volledig scherm', en: 'Full screen' },
  exitFullscreen: { nl: 'Volledig scherm sluiten', en: 'Exit full screen' },
  language: { nl: 'Taal', en: 'Language' },
} satisfies Record<string, Localized>

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
    title: { nl: 'Idee tot App Store', en: 'Idea to App Store' },
    bullets: [
      { nl: 'Afstuderen met eigen startup', en: 'Graduating with my own startup' },
      {
        nl: 'Onderzoeken van wet- en regelgeving, de markt en de muziekindustrie',
        en: 'Researching laws and regulations, the market and the music industry',
      },
      { nl: 'Doelgroeponderzoek en usertesting', en: 'Target audience research and user testing' },
      {
        nl: 'Zelfstandig plannen, analyseren en technische afwegingen maken',
        en: 'Planning, analysing and making technical trade-offs on my own',
      },
      {
        nl: 'Security-, identity- en AVG-richtlijnen volgen',
        en: 'Following security, identity and GDPR guidelines',
      },
      {
        nl: 'Full scale development: architectuur, code, RBAC, deployment, externe API’s koppelen',
        en: 'Full scale development: architecture, code, RBAC, deployment, integrating external APIs',
      },
    ],
  },
  {
    id: 'fidocs',
    devices: [{ device: 'macbook', src: '/images/screens/fidocs-desktop-1.webp' }],
    title: { nl: 'Impact op landelijke schaal', en: 'Impact on a national scale' },
    bullets: [
      { nl: 'In dienst bij Louvels.dev', en: 'Employed at Louvels.dev' },
      { nl: 'Projectopzet en architectuur', en: 'Project setup and architecture' },
      { nl: 'API-koppeling', en: 'API integration' },
      { nl: 'Research in wet- en regelgeving van de douane', en: 'Research into customs laws and regulations' },
      { nl: 'Monitoren en oplossen van operationele problemen', en: 'Monitoring and solving operational issues' },
      { nl: 'Klantcontact', en: 'Client contact' },
    ],
  },
  {
    id: 'skills',
    title: { nl: 'Waar ik nu sta', en: 'Where I stand now' },
    body: {
      nl: 'Dagelijkse praktijk in versiebeheer, deployments, API-koppelingen en AI in productie.',
      en: 'Daily practice in version control, deployments, API integrations and AI in production.',
    },
    tags: [
      'Git',
      'CI/CD',
      'Azure DevOps',
      'Docker',
      'LLMs',
      'RAG',
      'Prompt engineering',
      'Azure',
      'RBAC',
      'IaC',
      'Entra ID (Microsoft SSO)',
    ],
  },
  {
    id: 'groei',
    title: { nl: 'Hoe ik mezelf zie groeien', en: 'How I see myself growing' },
    bullets: [
      {
        nl: 'Entra ID voorbij SSO: managed identities, Conditional Access en rechten op AI-data',
        en: 'Entra ID beyond SSO: managed identities, Conditional Access and permissions on AI data',
      },
      {
        nl: 'Microsoft Foundry leren en meer verdiepen in IaC in de praktijk',
        en: 'Learning Microsoft Foundry and going deeper into IaC in practice',
      },
      { nl: 'Certificeren richting AZ-900 en AI-900', en: 'Certifying towards AZ-900 and AI-900' },
    ],
  },
]
