import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ko', 'en', 'vi'],
  // Used when no locale matches
  defaultLocale: 'vi',
  localeCookie: true,
  localePrefix: 'as-needed',
});
