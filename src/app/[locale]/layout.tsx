import { TooltipProvider } from '@/components/ui/tooltip';
import { routing } from '@/i18n/routing';
import { getGlobalConfig } from '@/lib/api/globalService';
import { GlobalConfigProvider } from '@/lib/global-configs/global-config-provider';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const globalConfig = await getGlobalConfig({ locale });

  return {
    title: globalConfig?.siteTitle,
    description: globalConfig?.siteDescription,
    icons: [
      {
        url: globalConfig?.favicon || '/favicon.ico',
      },
    ],
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const globalConfig = await getGlobalConfig({ locale });

  let mainColor;
  let mainTextColor;

  if (globalConfig) {
    mainColor = globalConfig.mainColor ?? '';
    mainTextColor = globalConfig.mainTextColor ?? '';
  }

  return (
    <html lang={locale}>
      <GlobalConfigProvider config={globalConfig}>
        <NextIntlClientProvider>
          <TooltipProvider>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
              {mainColor && (
                <style>
                  {`
                  :root {
                    --primary: ${mainColor};
                  }

                  .dark:root {
                    --primary: ${mainColor};
                  }
                `}
                </style>
              )}
              {mainTextColor && (
                <style>
                  {`
                  :root {
                    --primary-foreground: ${mainTextColor};
                  }

                  .dark:root {
                    --primary-foreground: ${mainTextColor};
                  }
                `}
                </style>
              )}

              <div id="root" className="flex flex-col min-h-[inherit]">
                {children}
              </div>
              <Toaster />
            </body>
          </TooltipProvider>
        </NextIntlClientProvider>
      </GlobalConfigProvider>
    </html>
  );
}
