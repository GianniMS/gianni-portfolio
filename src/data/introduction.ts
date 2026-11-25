import { Localized } from '@/types'

export const introduction = {
  role: 'Junior AI Platform Engineer',
  organization: 'Hogeschool Rotterdam',
  date: { nl: '27 november 2026', en: '27 November 2026' } satisfies Localized,
  hint: {
    nl: '↓ of spatie voor de volgende slide',
    en: '↓ or space for the next slide',
  } satisfies Localized,
}

export const deckLabels = {
  prev: { nl: 'Vorige slide', en: 'Previous slide' },
  next: { nl: 'Volgende slide', en: 'Next slide' },
  fullscreen: { nl: 'Volledig scherm', en: 'Full screen' },
  language: { nl: 'Taal', en: 'Language' },
} satisfies Record<string, Localized>
