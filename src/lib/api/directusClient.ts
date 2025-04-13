import { APP_ENV } from '@/configs/app-env';
import { createDirectus, rest } from '@directus/sdk';

export const getRestClient = () => {
  const client = createDirectus(APP_ENV.DIRECTUS_BACKEND).with(rest());

  return client;
};
