import { GetGlobalConfigOptions } from '@/types/global/GetGlobalConfigOptions';
import { GlobalConfig } from '@/types/global/Global';
import { getLanguageCode } from '../utils';
import { getRestClient } from './directusClient';
import { GlobalSchema } from './types';
import { readSingleton } from '@directus/sdk';
import { parseGlobalConfig } from './helper';

export async function getGlobalConfig(
  options: GetGlobalConfigOptions
): Promise<GlobalConfig | undefined> {
  const { locale } = options;
  const languageCode = getLanguageCode(locale);

  const client = getRestClient();
  try {
    const raw = (await client.request(
      readSingleton('Global', {
        fields: [
          '*',
          'logo.*',
          'favicon.*',
          'translations.*',
          'social_links.*',
          'social_links.image.*',
          'social_links.translations.*',
          'footer_sections.*',
          'footer_sections.translations.*',
          'footer_sections.items.*',
          'footer_sections.items.translations.*',
        ],
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: languageCode,
              },
            },
          },
          social_links: {
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
          },
          footer_sections: {
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
            items: {
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
      })
    )) as GlobalSchema;

    return parseGlobalConfig(raw);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
