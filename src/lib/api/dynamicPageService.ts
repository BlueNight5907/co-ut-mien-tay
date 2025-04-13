import { DynamicPage } from '@/types/dynamic-pages/DynamicPage';
import { GetDynamicPageOptions } from '@/types/dynamic-pages/GetDynamicPageOptions';
import { readItems } from '@directus/sdk';
import { getLanguageCode } from '../utils';
import { getRestClient } from './directusClient';
import { parseDynamicPage } from './helper';
import { DynamicPageSchema } from './types';
import { notFound } from 'next/navigation';

function toDomain(schema: DynamicPageSchema): DynamicPage {
  return parseDynamicPage(schema);
}

export async function getDynamicPage(options: GetDynamicPageOptions): Promise<DynamicPage> {
  const { locale, slug } = options;
  const languageCode = getLanguageCode(locale);

  const client = getRestClient();

  const raws = (await client.request(
    readItems('Pages', {
      fields: [
        '*',
        'translations.*',
        {
          blocks: [
            '*',
            {
              item: {
                Block_Alerts: ['*', 'translations.*'],
                Block_Richtexts: ['*', 'translations.*'],
                Block_Heroes: [
                  '*',
                  'image.*',
                  'translations.*',
                  'buttons.button.*',
                  'buttons.button.translations.*',
                ],
                Block_Hero_Slides: [
                  '*',
                  'heroes.*',
                  'heroes.hero.*',
                  'heroes.hero.image.*',
                  'heroes.hero.translations.*',
                  'heroes.hero.buttons.button.*',
                  'heroes.hero.buttons.button.translations.*',
                ],
                Group_Cards: [
                  '*',
                  'translations.*',
                  'cards.card.*',
                  'cards.card.image.*',
                  'cards.card.translations.*',
                  'cards.card.buttons.*',
                  'cards.card.buttons.button.*',
                  'cards.card.buttons.button.translations.*',
                ],
              },
            },
          ],
        },
      ],
      filter: {
        permalink: {
          _eq: slug,
        },
        status: {
          _eq: 'published',
        },
      },
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: languageCode,
            },
          },
        },
        blocks: {
          'item:Block_Alerts': {
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
          },
          'item:Block_Richtexts': {
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
          },
          'item:Block_Heroes': {
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
            buttons: {
              button: {
                translations: {
                  _filter: {
                    languages_code: {
                      _eq: languageCode,
                    },
                  },
                },
              },
            },
          },
          'item:Block_Hero_Slides': {
            heroes: {
              hero: {
                translations: {
                  _filter: {
                    languages_code: {
                      _eq: languageCode,
                    },
                  },
                },
                buttons: {
                  button: {
                    translations: {
                      _filter: {
                        languages_code: {
                          _eq: languageCode,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          'item:Group_Cards': {
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
            cards: {
              card: {
                translations: {
                  _filter: {
                    languages_code: {
                      _eq: languageCode,
                    },
                  },
                },
                buttons: {
                  button: {
                    translations: {
                      _filter: {
                        languages_code: {
                          _eq: languageCode,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          _filter: {
            hide_block: {
              _eq: false,
            },
          },
        },
      },
    })
  )) as DynamicPageSchema[];

  if (raws.length === 0) {
    throw notFound();
  }

  return toDomain(raws[0]);
}
