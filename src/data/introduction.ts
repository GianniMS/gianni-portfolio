import { IntroSlide } from '@/types'

export const introduction = {
  role: 'Junior AI Platform Engineer',
  organization: 'Hogeschool Rotterdam',
  date: '27 november 2026',
}

export const introSlides: IntroSlide[] = [
  {
    id: 'wie',
    kicker: 'Wie ik ben',
    title: 'Rotterdammer, developer, en alumnus van deze hogeschool.',
    body: [
      'In juli 2026 afgestudeerd aan Hogeschool Rotterdam. Sinds juni 2025 full stack developer bij Louvels.dev, waar ik maatwerksoftware bouw voor het mkb en AI inzet waar het echt waarde toevoegt.',
      'Ik kijk naar een probleem vanuit development, design, onderzoek en strategie, en breng die kanten samen tot één heldere richting. Direct, met communicatie en vriendelijkheid als basis.',
    ],
  },
  {
    id: 'rol',
    kicker: 'Hoe ik de rol lees',
    title: 'Eén platform voor de docent die experimenteert én de toepassing die duizenden gebruiken.',
    stats: [
      { value: '39.000', label: 'studenten' },
      { value: '4.200', label: 'medewerkers' },
      { value: '1', label: 'veilig en verantwoord AI-platform' },
    ],
    body: [
      'Ruimte voor experiment, met de beveiliging, privacy, betrouwbaarheid en het beheer die horen bij schaal. Precies die balans tussen snel bouwen en zorgvuldig beheren zoek ik op.',
    ],
  },
  {
    id: 'match',
    kicker: 'De aansluiting',
    title: 'Wat jullie vragen, en waar ik sta.',
    match: [
      { need: 'Git, CI/CD', have: 'Dagelijks Git en Azure DevOps voor alle klantprojecten bij Louvels.dev', level: 'strong' },
      { need: 'Docker', have: 'Projecten draaien in containers; productiecontainer-migratie TVB mee geadviseerd', level: 'strong' },
      { need: 'API-koppelingen & data', have: 'Vessel-API, Mapbox, mailintegratie, Excel-import naar Symfony-backend', level: 'strong' },
      { need: 'AI / LLMs', have: 'LLM-evaluatie bij Outlier.ai; LLMs, RAG en prompt engineering in klantwerk', level: 'strong' },
      { need: 'Entra ID / identity', have: 'Microsoft SSO-login gebouwd voor het Van der Haas-dashboard', level: 'basis' },
      { need: 'Azure', have: 'Azure DevOps dagelijks; Azure-resources zelf beheren wil ik verdiepen', level: 'basis' },
      { need: 'AVG / GDPR', have: 'Werken met klant- en douanedata; privacy- en cookiebeleid voor eigen site', level: 'basis' },
      { need: 'Python, IaC, RBAC, Foundry', have: 'Mijn eerste leerdoelen in het team', level: 'growth' },
    ],
  },
  {
    id: 'ai',
    kicker: 'AI-ervaring',
    title: 'Ik heb AI van twee kanten gezien: als bouwer en als beoordelaar.',
    points: [
      {
        label: 'Outlier.ai · LLM-evaluatie',
        text: 'Nederlandstalige LLMs verbeterd: antwoorden beoordeeld op juistheid én culturele relevantie, en feedback gegeven op modelresponses. Verantwoorde, uitlegbare AI begint bij weten waar een model de mist in gaat.',
      },
      {
        label: 'Louvels.dev · AI in productie',
        text: 'LLMs, retrieval-augmented generation, prompt engineering en AI-API’s ingezet om bedrijfsprocessen en workflows te automatiseren. Alleen waar het echte waarde toevoegt.',
      },
      {
        label: 'Bijblijven',
        text: 'Claude 101-certificaat van Anthropic (2026). Ik volg de ontwikkelingen zelf en probeer nieuwe tools direct uit in mijn eigen projecten.',
      },
    ],
  },
  {
    id: 'schaal',
    kicker: 'Case · FiDocs',
    title: 'Software die op nationale schaal draait.',
    stats: [
      { value: '1,55 mln', label: 'goederenregels gevalideerd in augustus 2026' },
      { value: '~12%', label: 'van alle e-commerce goederen in Nederland die maand' },
      { value: '200%', label: 'snellere interne validatie' },
    ],
    body: [
      'Een validatietool in Next.js en TypeScript op een Symfony-backend, die Excel-importdocumenten automatisch controleert voordat ze naar de douane gaan. Ontworpen en gebouwd door mij.',
    ],
    note: 'Sluit aan op: toepassingen die door duizenden gebruikers worden gebruikt, betrouwbaarheid en kwaliteit.',
  },
  {
    id: 'platform',
    kicker: 'Platform & beheer',
    title: 'Identity, deployments en koppelingen: het werk achter de schermen.',
    points: [
      {
        label: 'Van der Haas Transport · Identity',
        text: 'Dashboard met Microsoft SSO: real-time inzicht in zendingen, documenten direct gekoppeld aan leveringen. Het proces werd 20% sneller.',
      },
      {
        label: 'De Tilburgse Voedselbank · Migratie',
        text: 'Frontend gemigreerd naar de nieuwste LTS van Next.js, conflicten opgelost en de senior geadviseerd over de productiecontainer (Docker, Azure DevOps).',
      },
      {
        label: 'Storax · Data-ontsluiting',
        text: 'Mailintegratie die WeTransfer-inhoud automatisch veiligstelt in tijdelijke opslag en ontsluit in de frontend, voordat een link verloopt.',
      },
    ],
    note: 'Sluit aan op: standaard deployments, API-koppelingen, data-ontsluiting, security- en identityrichtlijnen.',
  },
  {
    id: 'zelfstandig',
    kicker: 'Zelfstandig',
    title: 'Van idee tot publicatie, zonder dat iemand het me vraagt.',
    points: [
      {
        label: 'SoundCheckd',
        text: 'Concept, architectuur, Symfony-API met PostgreSQL, webapp en native iOS-app in Swift. Live in de App Store, 20+ installs zonder marketing.',
      },
      {
        label: 'TabCraft',
        text: 'Een Chrome-extensie, ontworpen en gebouwd van begin tot eind. Op het hoogtepunt ruim 1.000 installs.',
      },
      {
        label: 'Afgebakend werk bij klanten',
        text: 'Analyse, aanpak en planning zelf oppakken, zoals de EUDR-module voor Skai Customs en de kaartweergave voor CSI Fresh.',
      },
    ],
    note: 'Sluit aan op: kleine projecten zelfstandig oppakken, inclusief analyse, aanpak en planning.',
  },
  {
    id: 'team',
    kicker: 'In een team',
    title: 'Ik weet wanneer ik moet schakelen.',
    points: [
      {
        label: 'Agile',
        text: 'Kanban bij Louvels.dev (Jira, Tempo), Scrum tijdens mijn stage bij Jem-id. Gewend aan korte cycli en gedeeld eigenaarschap.',
      },
      {
        label: 'Communicatie',
        text: 'Aanspreekpunt voor de klant bij NursiTree, en een groot deel van het overleg met een derde partij bij Marlog Automotive.',
      },
      {
        label: 'Gebruiker centraal',
        text: 'Bij Jem-id eerst wireframes en prototypes getest met de doelgroep, en pas daarna gebouwd. Een platform werkt pas als mensen het snappen.',
      },
    ],
  },
  {
    id: 'groei',
    kicker: 'Mijn eerste maanden',
    title: 'Een goede basis, en een duidelijk plan om te groeien.',
    points: [
      { label: 'Maand 1', text: 'Het platform, de architectuur en de afspraken leren kennen. Meedraaien in deployments en monitoring.' },
      { label: 'Maand 2–3', text: 'Python, Entra ID en RBAC verdiepen. Eerste afgebakende taken zelfstandig oppakken en documenteren.' },
      { label: 'Maand 4–6', text: 'Infrastructure as Code en Microsoft Foundry. Richting AZ-900 en AI-900 certificering.' },
    ],
    note: 'Leergierig, en eerlijk over wat ik nog niet beheers.',
  },
  {
    id: 'waarom',
    kicker: 'Waarom hier',
    title: 'Ik was een van die studenten. Nu wil ik bouwen aan wat zij gebruiken.',
    body: [
      'Hogeschool Rotterdam heeft mij gevormd. Een AI-platform dat veilig, verantwoord en uitlegbaar is, voor 39.000 studenten en 4.200 medewerkers, is werk waar ik trots op zou zijn.',
    ],
  },
]
