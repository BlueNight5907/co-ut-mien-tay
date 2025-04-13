import messages from './messages/vi.json';

declare module 'next-intl' {
  interface AppConfig {
    // ...
    Messages: typeof messages;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DIRECTUS_BACKEND: string;
      DIRECTUS_ASSETS: string;
      IMAGE_ASSETS_PROTOCOL: 'http' | 'https';
      IMAGE_ASSETS_HOST: string;
      IMAGE_ASSETS_PORT: string;
      IMAGE_ASSETS_PATH: string;
    }
  }
}
