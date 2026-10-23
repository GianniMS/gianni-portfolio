import { HomeConfig } from '@/types'

export const home: HomeConfig = {
  about: {
    image: 'images/tiles/about.svg',
    title: 'Gianni Mendonça Semedo',
    description: 'I translate the complex, to something simple. Born and raised in Rotterdam, The Netherlands.',
  },
  tiles: [
    {
      ref: {
        kind: 'item',
        id: '65fa326b-9a05-4fbc-9b2c-eb9212dadb27',
      },
      title: '',
      description: 'A browser extension that brings your favorite characters to every page.',
    },
    {
      ref: {
        kind: 'item',
        id: 'soundcheckd',
      },
      title: '',
      description: 'A social media app where users can discover and rate music, share their concert experiences and track their collection.',
    },
    {
      ref: {
        kind: 'item',
        id: 'nursitree',
      },
      title: '',
      description: 'A visual registry of trees, tree pits and leveling units. Managed through an excel import and export system.',
    },
    {
      ref: {
        kind: 'item',
        id: 'c36e4fbc-7c5f-47a8-b075-fb5fff5424b8',
      },
      title: '',
      description: 'A dashboard to manage inventory and inbound and outbound containers. Connected with mail integration and various 3rd parties.',
    },
  ],
  productsPage: {
    tiles: [
      {
        ref: {
          kind: 'link',
          href: 'https://soundcheckd.app/',
          image: 'images/tiles/sccrd.webp',
        },
        title: 'SoundCheckd',
        description: 'A social media app where users can discover and rate music, share their concert experiences and track their collection.',
      },
      {
        ref: {
          kind: 'product',
          slug: 'tabcraft',
        },
        title: '',
        description: '',
      },
    ],
  },
}
