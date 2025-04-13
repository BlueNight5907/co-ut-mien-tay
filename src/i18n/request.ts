import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import deepmerge from 'deepmerge';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  const defaultLocale = routing.defaultLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : defaultLocale;

  const requestedMessages = (await import(`../../messages/${locale}.json`)).default;
  const defaultMessages = (await import(`../../messages/${defaultLocale}.json`)).default;

  const messages = deepmerge(defaultMessages, requestedMessages) as Record<string, unknown>;

  return {
    locale,
    messages,
  };
});
