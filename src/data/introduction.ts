import { IntroSlide, Localized } from '@/types'

export const introduction = {
  role: 'Junior AI Platform Engineer',
  organization: 'Hogeschool Rotterdam',
  date: { nl: '27 november 2026', en: '27 November 2026' } satisfies Localized,
  // The role, sprayed over the name on the cover; alternating case on purpose, Painterz only drips on lowercase
  spray: ['JuNiOr AI', 'PlAtFoRm EnGiNeEr'],
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
    kicker: { nl: 'Over mij', en: 'About me' },
    title: {
      nl: 'Elk probleem heeft meerdere kanten. Ik breng ze samen.',
      en: 'Every problem has more than one side. I bring them together.',
    },
    body: {
      nl: 'Opgegroeid in Rotterdam, met een gemengde culturele achtergrond. Development, design, onderzoek en strategie: ik kijk vanuit elke hoek en maak er één heldere richting van. Direct, met communicatie en vriendelijkheid als basis.',
      en: 'Raised in Rotterdam, with a mixed cultural background. Development, design, research and strategy: I look from every angle and turn it into one clear direction. Direct, with communication and kindness at its core.',
    },
  },
  {
    id: 'soundcheckd',
    kicker: { nl: 'SoundCheckd · Zelfstandig', en: 'SoundCheckd · Independent' },
    title: { nl: 'Van idee tot App Store. Volledig zelf.', en: 'From idea to App Store. Entirely my own.' },
    blocks: [
      {
        label: CHALLENGE,
        text: {
          nl: 'Muziek beoordelen, je collectie en concerten bijhouden en delen met vrienden. Er was geen plek die dat samenbracht.',
          en: 'Rating music, tracking your collection and concerts, and sharing it with friends. No single place brought that together.',
        },
      },
      {
        label: APPROACH,
        text: {
          nl: 'Analyse, planning en architectuur. Een Symfony-API met PostgreSQL en een native iOS-app in Swift. Zelf getest, gedeployd en beheerd, met security en AVG vanaf de eerste regel.',
          en: 'Analysis, planning and architecture. A Symfony API with PostgreSQL and a native iOS app in Swift. Tested, deployed and run by me, with security and GDPR from the first line.',
        },
      },
      {
        label: RESULT,
        text: {
          nl: 'Live in de App Store. 20+ installs, zonder marketing.',
          en: 'Live in the App Store. 20+ installs, without any marketing.',
        },
      },
    ],
  },
  {
    id: 'fidocs',
    kicker: { nl: 'FiDocs · Ontwerp & research', en: 'FiDocs · Design & research' },
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
    kicker: { nl: 'Louvels.dev · Calamiteiten & herstel', en: 'Louvels.dev · Incidents & recovery' },
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
    kicker: { nl: 'De fit', en: 'The fit' },
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
