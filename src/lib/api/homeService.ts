import { GetHomeOptions } from '@/types/home/GetHomeOptions';
import { Home } from '@/types/home/Home';
import { readSingleton } from '@directus/sdk';
import { getLanguageCode } from '../utils';
import { getRestClient } from './directusClient';
import { parseHomePage } from './helper';
import { HomePageSchema } from './types';

function toDomain(schema: HomePageSchema): Home {
  return parseHomePage(schema);
}

export async function getHomePage(options: GetHomeOptions): Promise<Home> {
  const { locale } = options;
  const languageCode = getLanguageCode(locale);

  const client = getRestClient();

  try {
    const raw = (await client.request(
      readSingleton('Home_Page', {
        fields: [
          '*',
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
                  Category_Slides: [
                    '*',
                    'translations.*',
                    'categories.*',
                    'categories.category.*',
                    'categories.category.translations.*',
                    'categories.category.image.*',
                  ],
                  Group_Categories: [
                    '*',
                    'translations.*',
                    'categories.*',
                    'categories.category.*',
                    'categories.category.translations.*',
                    'categories.category.image.*',
                  ],
                  Product_Slides: [
                    '*',
                    'translations.*',
                    'products.*',
                    'products.product.*',
                    'products.product.translations.*',
                    'products.product.thumbnail.*',
                    'products.product.category.*',
                    'products.product.images.*',
                    'products.product.images.file.*',
                    'products.product.variants.*',
                    'products.product.variants.image.*',
                    'products.product.variants.price.*',
                    'products.product.variants.origin_price.*',
                    'products.product.variants.translations.*',
                    'products.product.variants.unit.*',
                    'products.product.variants.unit.translation.*',
                  ],
                  Group_Products: [
                    '*',
                    'translations.*',
                    'products.*',
                    'products.product.*',
                    'products.product.translations.*',
                    'products.product.thumbnail.*',
                    'products.product.category.*',
                    'products.product.images.*',
                    'products.product.images.file.*',
                    'products.product.variants.*',
                    'products.product.variants.image.*',
                    'products.product.variants.price.*',
                    'products.product.variants.origin_price.*',
                    'products.product.variants.translations.*',
                    'products.product.variants.unit.*',
                    'products.product.variants.unit.translation.*',
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
        deep: {
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
            'item:Category_Slides': {
              translations: {
                _filter: {
                  languages_code: {
                    _eq: languageCode,
                  },
                },
              },
              categories: {
                category: {
                  translations: {
                    _filter: {
                      languages_code: {
                        _eq: languageCode,
                      },
                    },
                  },
                },
                _filter: {
                  category: {
                    status: {
                      _eq: 'published',
                    },
                  },
                },
              },
            },
            'item:Group_Categories': {
              translations: {
                _filter: {
                  languages_code: {
                    _eq: languageCode,
                  },
                },
              },
              categories: {
                category: {
                  translations: {
                    _filter: {
                      languages_code: {
                        _eq: languageCode,
                      },
                    },
                  },
                },
                _filter: {
                  category: {
                    status: {
                      _eq: 'published',
                    },
                  },
                },
              },
            },
            'item:Product_Slides': {
              translations: {
                _filter: {
                  languages_code: {
                    _eq: languageCode,
                  },
                },
              },
              products: {
                product: {
                  translations: {
                    _filter: {
                      languages_code: {
                        _eq: languageCode,
                      },
                    },
                  },
                  variants: {
                    _sort: ['product_status', 'price.value'],
                    translations: {
                      _filter: {
                        languages_code: {
                          _eq: languageCode,
                        },
                      },
                    },
                    unit: {
                      translations: {
                        _filter: {
                          languages_code: {
                            _eq: languageCode,
                          },
                        },
                      },
                    },
                    _filter: {
                      status: {
                        _eq: 'published',
                      },
                    },
                  },
                },
                _filter: {
                  product: {
                    status: {
                      _eq: 'published',
                    },
                  },
                },
              },
            },
            'item:Group_Products': {
              translations: {
                _filter: {
                  languages_code: {
                    _eq: languageCode,
                  },
                },
              },
              products: {
                product: {
                  translations: {
                    _filter: {
                      languages_code: {
                        _eq: languageCode,
                      },
                    },
                  },
                  variants: {
                    _sort: ['product_status', 'price.value'],
                    translations: {
                      _filter: {
                        languages_code: {
                          _eq: languageCode,
                        },
                      },
                    },
                    unit: {
                      translations: {
                        _filter: {
                          languages_code: {
                            _eq: languageCode,
                          },
                        },
                      },
                    },
                    _filter: {
                      status: {
                        _eq: 'published',
                      },
                    },
                  },
                },
                _filter: {
                  product: {
                    status: {
                      _eq: 'published',
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
    )) as HomePageSchema;

    return toDomain(raw);
  } catch (error) {
    console.error(error);
    return {
      blocks: [],
    };
  }
}
