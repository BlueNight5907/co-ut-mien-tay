'use client';

import fallbackLogo from '@/assets/icons/logo.svg';
import { Button } from '@/components/ui/button';
import { LocaleSwitch } from './locale-switch';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { useGlobalConfig } from '@/lib/global-configs/context';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const globalConfig = useGlobalConfig();
  const headerTranslations = useTranslations('HomeLayout.Header');

  const headerLeft = () => (
    <div className="flex shrink-0 items-center gap-4">
      <Link className="flex items-center gap-2" href="/">
        <Image
          className="h-[48px] w-auto"
          width={480}
          height={480}
          src={globalConfig.logo || fallbackLogo}
          alt="logo"
        />
        <span className="hidden md:inline-block font-bold">
          {globalConfig.siteName || 'Site Name'}
        </span>
      </Link>
    </div>
  );

  const headerRight = () => (
    <div className="flex flex-grow shrink-0 items-center gap-4">
      <div className="flex-grow"></div>
      <Button
        className={cn('text-sm sm:text-md', { hidden: pathname.startsWith('/search') })}
        variant="ghost"
        onClick={() => router.push('/search')}
      >
        <Search className="size-5 text-foreground" /> {headerTranslations('search')}
      </Button>
      <LocaleSwitch />
    </div>
  );

  return (
    <header className="contents">
      <nav className="sticky top-0 left-0 right-0 bg-background border-b-1 shadow-sm z-1000">
        <div className="container m-auto px-6 py-1.5 md:py-4 flex flex-row gap-2">
          {headerLeft()}
          {headerRight()}
        </div>
      </nav>
    </header>
  );
}
