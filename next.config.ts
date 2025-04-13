import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_ASSETS_PROTOCOL,
        hostname: process.env.IMAGE_ASSETS_HOST,
        port: process.env.IMAGE_ASSETS_PORT,
        pathname: process.env.IMAGE_ASSETS_PATH,
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
