import { PortfolioItem } from '@/types'

export const items: PortfolioItem[] = [
  {
    id: 'csi-fresh',
    title: 'CSI Fresh',
    category: 'project',
    tags: ['Web', 'Dashboard'],
    keywords: ['web', 'web app', 'dashboard', 'map', 'ships', 'vessels', 'logistics', 'customs'],
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/csi-desktop-1.webp' },
      { device: 'macbook', src: '/images/screens/csi-desktop-2.webp' },
    ],
    story: {
      challenge:
        'A dashboard full of numbers tells you what is happening, but not where. CSI Fresh wanted insight that speaks to the imagination a bit more.',
      approach:
        'I built an interactive Mapbox map in Next.js that shows the ships on their way, live from a third-party vessel data API. Click a ship and a detail panel shows its name, position, course and when it was last updated.',
      result:
        'A more dynamic way of getting insight: the shipments behind the numbers, visible on the map as they move.',
    },
    slug: 'csi-fresh',
    description: [
      'An interactive map with a live ship view and a detail panel for every visible vessel, added to the CSI Fresh dashboard.',
    ],
    skills: ['Next.js', 'TypeScript', 'Mapbox API', 'Third-party API'],
    dateType: 'single',
    date: '2025-11-01',
  },
  {
    id: 'soundcheckd',
    title: 'SoundCheckd',
    category: 'project',
    tags: ['Mobile', 'iOS', 'Web', 'Dashboard'],
    keywords: ['mobile', 'app', 'iOS', 'iPhone', 'native', 'social', 'music'],
    link: 'internal',
    screens: [
      { device: 'iphone', src: '/images/screens/soundcheckd-mobile.webp' },
      { device: 'macbook', src: '/images/screens/soundcheckd-desktop.webp' },
    ],
    story: {
      challenge:
        'Music lives everywhere: in streaming apps, on shelves full of records and in the memory of a concert. But there was no single place to rate it, keep track of it and share it with friends.',
      approach:
        'A native iOS app built in Swift and SwiftUI, so it feels at home on an iPhone. It runs on a Symfony backend with a PostgreSQL database.',
      result:
        "Live in the App Store: one app to rate music, track a collection and the concerts you've been to, and connect with friends. Already 20+ installs, before any marketing.",
    },
    slug: 'soundcheckd',
    description: [
      'An iOS native app where users can rate music, track their collection, track their cocerts and connect with friends.',
      'Built with Swift and SwiftUI. Running on a Symfony backend with a PostgreSQL database.',
    ],
    skills: ['Swift', 'SwiftUI', 'Symfony', 'PostgreSQL'],
    dateType: 'single',
    date: '2026-07-01',
  },
  {
    id: 'nursitree',
    title: 'NursiTree',
    category: 'project',
    tags: ['Web', 'Internal tool'],
    keywords: ['web', 'web app', 'dashboard', 'management', 'map', 'internal tool', 'design'],
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/nursitree-desktop-1.webp' },
      { device: 'macbook', src: '/images/screens/nursitree-desktop-2.webp' },
    ],
    story: {
      challenge:
        "A tree nursery keeps a registry of its trees, tree pits and leveling units. It needed to be clear at a glance and easy to keep up to date, within the client's budget.",
      approach:
        'I designed and built an interactive Mapbox map in Next.js and TypeScript that shows every entity and its details. Managing the registry goes through an Excel sheet the client already knows: download it, make the changes, upload it, and the Symfony backend picks up the new data.',
      result:
        "A registry that's clear on the map and simple to maintain, without the cost of a full management interface. I was also the client's main point of contact.",
    },
    slug: 'nursitree',
    description: [
      'While working at Louvels.dev I designed and developed a management interface for a tree nursery company. I created a visualization of their current registery of trees, tree pits and leveling units in which the details of each respective entity can be viewed on an interactive map.',
      'To make the registery easy to interact with, while considering the clients budget, I made management possible through an excel sheet. The client can download the sheet, make the desired changes, and then upload the changed excel sheet. The backend then picks up the new data and adds it to the registery.',
      'Aside from design and development I also had a key role in client contact.',
    ],
    skills: ['Next.js', 'TypeScript', 'Symfony', 'PHP', 'Excel', 'Mapbox API', 'Azure DevOps'],
    dateType: 'single',
    date: '2025-11-01',
  },
  {
    id: 'louvels-dev',
    title: 'Fullstack Developer',
    category: 'experience',
    keywords: ['web', 'fullstack', 'frontend', 'backend', 'AI', 'automation'],
    organization: 'Louvels.dev',
    link: 'internal',
    // The company's logo, then its website
    screens: [
      { device: 'macbook', src: '/images/screens/louvels-logo.webp' },
      { device: 'macbook', src: '/images/screens/louvels-site.webp' },
    ],
    summary:
      'At Louvels.dev I develop custom software for small and medium-sized businesses, within an agile Kanban team. Every business has its own processes and its own problems, so every solution is built to fit, with Next.js, TypeScript, Symfony, Docker and Azure DevOps. Where it adds real value I implement AI to optimize business processes and workflows: large language models, retrieval-augmented generation, prompt engineering and AI APIs.',
    slug: 'louvels-dev',
    description: [
      'Developed custom software solutions for SMEs across various industries. Designed and developed an Excel validation tool for a client, increasing validation capacity by 110% and significantly improving operational efficiency. Developed a dashboard to provide real-time visibility into order statuses. By enabling PDF documents to be linked directly to deliveries within the dashboard, the process was accelerated by 20%.',
      'Collaborated within an Agile team following the Kanban methodology, utilizing Jira and Tempo for project management. Applied AI-driven solutions throughout the software development lifecycle, including Large Language Models (LLMs), AI automation, prompt engineering, and API integrations to optimize business processes, automate workflows, and enhance web application functionality.',
    ],
    skills: ['Next.js', 'TypeScript', 'Symfony (PHP)', 'Docker', 'Azure DevOps', 'Jira', 'Tempo', 'LLMs'],
    dateType: 'range',
    dateStart: '2025-06-01',
    dateEnd: 'Today',
  },
  {
    id: 'outlier-ai',
    title: 'Dutch Expert',
    category: 'experience',
    keywords: ['AI', 'language', 'Dutch'],
    organization: 'Outlier.ai',
    link: 'internal',
    // The company's logo, then its website
    screens: [
      { device: 'macbook', src: '/images/screens/outlier-logo.webp' },
      { device: 'macbook', src: '/images/screens/outlier-site.webp' },
    ],
    summary:
      'At Outlier I helped improve large language models for the Dutch language. Language is more than grammar, it carries culture. So in the prompt engineering process I made sure answers were not only correct, but culturally relevant too, and gave feedback on response models to sharpen them further.',
    slug: 'outlier-ai',
    description: [
      'Contributed to the improvement of Large Language Models (LLMs) for the Dutch language by ensuring grammatical accuracy and cultural relevance throughout the prompt engineering process, as well as providing feedback on model-generated responses.',
    ],
    skills: ['LLMs', 'Prompt Engineering'],
    dateType: 'range',
    dateStart: '2025-01-15',
    dateEnd: '2025-06-30',
  },
  {
    id: 'jem-id',
    title: 'Frontend Developer',
    category: 'experience',
    keywords: ['web', 'frontend', 'dashboard', 'design', 'UI', 'UX', 'internship'],
    organization: 'Jem-id',
    link: 'internal',
    // The company's logo, then its website
    screens: [
      { device: 'macbook', src: '/images/screens/jem-id-logo.webp' },
      { device: 'macbook', src: '/images/screens/jem-id-site.webp' },
    ],
    summary:
      'During my internship at Jem-id I designed and developed a customer information dashboard, made to be easy to use for the people who work with it every day. It started with wireframes and prototypes, validated with the target audience through different forms of testing before anything got built. That design was then realized in React and TypeScript, working within an agile Scrum team.',
    slug: 'jem-id',
    description: [
      'During an internship I designed and developed an intuitive customer information dashboard using Figma, React, and TypeScript.',
      'Collaborated within an Agile Scrum environment, utilizing Monday.com for project management and team coordination.',
    ],
    skills: ['Figma', 'React', 'TypeScript'],
    dateType: 'range',
    dateStart: '2024-09-01',
    dateEnd: '2025-02-27',
  },
  {
    id: 'cert-digital-marketing',
    title: 'Fundamentals of digital marketing - Google',
    year: 2025,
    category: 'certificate',
    link: 'external',
    href: 'https://skillshop.exceedlms.com/student/award/iWAFeEYvrcApctsMhvSZgKU9',
  },
  {
    id: 'cert-google-analytics',
    title: 'Google Analytics - Google',
    year: 2026,
    category: 'certificate',
    link: 'external',
    href: 'https://skillshop.credential.net/75dd2365-9e70-424a-93bc-367139357364#acc.L7DreHQF',
  },
  {
    id: 'cert-claude-101',
    title: 'Claude 101 - Anthropic',
    year: 2026,
    category: 'certificate',
    link: 'external',
    href: 'https://verify.skilljar.com/c/in8covtiqp7p',
  },
  {
    id: '4498f607-0571-4690-a942-12ea89e363a5',
    title: 'FiDocs B.V.',
    category: 'project',
    tags: ['Web', 'Internal tool'],
    keywords: ['web', 'web app', 'internal tool', 'automation', 'validation', 'logistics'],
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/fidocs-desktop-1.webp' },
      { device: 'macbook', src: '/images/screens/fidocs-desktop-2.webp' },
    ],
    story: {
      challenge:
        'FiDocs validated e-commerce import documents by hand before they could be submitted to customs. Slow, repetitive work, at a scale where every minute counts.',
      approach:
        'An internal validation tool I designed and built in Next.js and TypeScript on a Symfony backend, that checks the Excel import documents automatically.',
      result:
        'Internal validation became 200% faster. In August 2026 the tool validated around 1.55 million of the roughly 13 million e-commerce goods lines processed in the Netherlands: almost 12% of the national total.',
    },
    slug: 'fidocs-bv',
    description: [
      'While working at Louvels.dev I designed and developed an internal excel validation tool for FiDocs B.V. In their previous workflow they manually validated E-commerce import documents before being able to submit these documents to customs.',
      'After the implementation of the tool I built they sped up their internal validation proces by 200%.',
      'An amazing feature of this project: In the month of August 2026 the total national amount of E-commerce goods lines processed was around 13.000.000. Of which around 1.550.000 lines were validated by the validation tool I built. That month the tool validated almost 12% of the national E-commerce goods that were processed nationally.',
    ],
    skills: ['Next.js', 'TypeScript', 'Symfony', 'PHP', 'Azure DevOps', 'Excel'],
    dateType: 'single',
    date: '2026-01-04',
  },
  {
    id: 'c36e4fbc-7c5f-47a8-b075-fb5fff5424b8',
    title: 'Marlog Automotive',
    category: 'project',
    tags: ['Web', 'Dashboard'],
    keywords: ['web', 'web app', 'dashboard', 'management', 'internal tool', 'logistics'],
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/marlog-desktop.webp' },
      { device: 'iphone', src: '/images/screens/marlog-mobile.webp' },
    ],
    story: {
      challenge:
        'Marlog Automotive needed insight into its incoming containers and current inventory of vehicles, on desktop as well as on the mobile devices the team works with.',
      approach:
        'An internal management tool in Next.js and TypeScript on Symfony, optimized for mobile devices and set up to scale. A third party was needed to make it work, and I took on a large part of that communication.',
      result:
        "A more streamlined way of working for their employees: one place to see what's arriving and what's in stock, built to grow along with the business.",
    },
    slug: 'marlog-automotive',
    description: [
      'While working at Louvels.dev I developed an internal management tool for Marlog Automotive allowing them to gain insight into the incoming containers and their current inventory of vehicles. Aside from standard responsiveness this product had to be optimized for mobile devices.',
      'I setup this project in a scalable way and I took on a good part of the communication with a 3rd party that was required to make this project succeed.',
    ],
    skills: ['Next.js', 'TypeScript', 'Symfony', 'PHP', 'Azure DevOps'],
    dateType: 'single',
    date: '2026-07-04',
  },
  {
    id: '0d1abee0-a46a-4b7e-947a-e5f5da50faee',
    title: 'De Tilburgse Voedselbank',
    category: 'project',
    tags: ['Web', 'Migration'],
    keywords: ['web', 'frontend', 'migration', 'non-profit'],
    isPrivate: true,
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/tvb-desktop-1.webp' },
      { device: 'macbook', src: '/images/screens/tvb-desktop-2.webp' },
    ],
    story: {
      challenge: 'The application De Tilburgse Voedselbank relies on ran on an outdated version of Next.js.',
      approach:
        'I migrated the frontend to the latest LTS version of Next.js, resolved the conflicts that came up along the way, and advised the senior developer on migrating the production container (Docker, Azure DevOps).',
      result: "An up-to-date frontend codebase that's easier to maintain, so the food bank can keep relying on it.",
    },
    slug: 'tilburgse-voedselbank',
    description: [
      'While working at Louvels it was my task to migrate the outdated frontend of the TVB application to the latest LTS version of Next.js. I resolved conflicts that emerged during the migration. And gave recommendations to the senior regarding the migration of the production container.',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'Azure DevOps', 'Docker'],
    dateType: 'single',
    date: '2025-12-18',
  },
  {
    id: 'a3c7b4a9-48db-4f74-8672-d915e925da32',
    title: 'Storax B.V.',
    category: 'project',
    tags: ['Web', 'Integration'],
    keywords: ['web', 'integration', 'email', 'automation', 'backend'],
    isPrivate: true,
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/storax-desktop-1.webp' },
      { device: 'macbook', src: '/images/screens/coming-soon-desktop.webp' },
    ],
    story: {
      challenge:
        'Requests reach Storax through WeTransfer links in their email. Those links expire, and the request goes with them.',
      approach:
        'A mail integration in the existing Symfony and Next.js project: when an incoming email contains a WeTransfer link, its content is downloaded automatically into temporary storage and made accessible in the frontend.',
      result: 'Requests can be downloaded or processed whenever it suits, without the risk of an expired link.',
    },
    slug: 'storax-bv',
    description: [
      'While working at Louvels it was my task to make a WeTransfer implementation in the existing Storax project.',
      'The implementation worked as follows: We determine if an incoming email contains a WeTransfer link. If it does, the content of the WeTransfer gets downloaded automatically and stored in a temporary storage container. And from the temporary container we made the request inside the WeTransfer content accessible in the frontend. This enables the client to download or process the request when they want, without the risk of the WeTransfer links expiration.',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'PHP', 'Symfony', 'Azure DevOps', 'Mail Integration'],
    dateType: 'single',
    date: '2026-06-23',
  },
  {
    id: '65fa326b-9a05-4fbc-9b2c-eb9212dadb27',
    title: 'TabCraft',
    category: 'project',
    tags: ['Browser extension'],
    keywords: ['browser extension', 'Chrome', 'extension', 'product'],
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/tabcraft-desktop-1.webp' },
      { device: 'macbook', src: '/images/screens/tabcraft-desktop-2.webp' },
    ],
    story: {
      challenge: 'The web can feel a little empty. TabCraft brings some life to every page you visit.',
      approach:
        'A Chrome extension I designed and built that puts a character on the pages you visit and on your new tab page. It walks, sits, watches videos with you and reacts when you click or drag it.',
      result:
        "A companion that's truly yours: upload up to 8 skins and give them names. At its peak, a little over 1,000 installs.",
    },
    slug: 'tabcraft',
    description: [
      'Bring your favorite characters to every page! They walk, sit, watch videos with you and you can interact with them by clicking or dragging. Upload up to 8 skins and give them names.',
    ],
    skills: [],
    dateType: 'single',
    date: '2026-10-11',
  },
  {
    id: 'van-der-haas',
    title: 'Van der Haas Transport',
    category: 'project',
    isPrivate: true,
    tags: ['Web', 'Dashboard'],
    keywords: ['web', 'web app', 'dashboard', 'logistics', 'transport', 'internal tool'],
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/vanderhaas-desktop-1.webp' },
      { device: 'macbook', src: '/images/screens/vanderhaas-desktop-2.webp' },
    ],
    story: {
      challenge:
        'Van der Haas Transport needed real-time insight into its shipments, and one place for the documents that come with them.',
      approach:
        'A dashboard in Next.js on a Symfony backend, signed into with Microsoft SSO, that shows the status of every shipment. Documents can be added and linked directly to the delivery they belong to.',
      result:
        'Real-time visibility into shipments, and with documents linked straight to deliveries, a process that became 20% faster.',
    },
    slug: 'van-der-haas',
    description: ['A dashboard for shipment insights and adding documents, built for Van der Haas Transport.'],
    skills: ['Next.js', 'Symfony', 'Microsoft SSO'],
    dateType: 'single',
    date: '2025-01-01',
  },
  {
    id: 'skai-customs',
    title: 'Skai Customs',
    category: 'project',
    tags: ['Web', 'Internal tool'],
    keywords: ['web', 'web app', 'internal tool', 'customs', 'logistics'],
    link: 'internal',
    screens: [
      { device: 'macbook', src: '/images/screens/skai-desktop-1.webp' },
      { device: 'macbook', src: '/images/screens/skai-desktop-2.webp' },
    ],
    story: {
      challenge:
        'Skai Customs needed to support its customers with the EU Deforestation Regulation (EUDR), next to a steady flow of customer requests for new features.',
      approach:
        'I created an EUDR module for acquisition, and developed new features based on what customers asked for.',
      result: 'A platform that helps its customers meet the EUDR, and keeps growing with what its users need.',
    },
    slug: 'skai-customs',
    description: ['An EUDR module and new customer-requested features for Skai Customs.'],
    skills: [],
    dateType: 'single',
    date: '2026-01-01',
  },
]
