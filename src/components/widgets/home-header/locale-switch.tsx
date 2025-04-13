'use client';

import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Locale, useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import krFlag from '@/assets/icons/ko-flag.svg';
import ukFlag from '@/assets/icons/uk-flag.svg';
import vnFlag from '@/assets/icons/vn-flag.svg';
import Tooltip from '@/components/widgets/tooltip';

const LocalImageMapper: Record<string, string> = {
  vi: vnFlag,
  en: ukFlag,
  ko: krFlag,
};

export function LocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const locale = useLocale();
  const localeSwitcherTranslation = useTranslations('LocaleSwitcher');

  const [isPending, startTransition] = useTransition();

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.push({ pathname: `${pathname}?${params.toString()}` }, { locale: nextLocale });
    });
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button className="rounded overflow-hidden flex items-center gap-2" disabled={isPending}>
          <Tooltip title={localeSwitcherTranslation('label')} zIndex={1100}>
            <Image
              className="inline-block w-[32px] h-[32px]"
              src={LocalImageMapper[locale]}
              alt="locale icon"
            />
          </Tooltip>
          <span className="hidden sm:inline-block text-sm font-medium">
            {localeSwitcherTranslation('locale', { locale })}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[160px] p-0"
        align="end"
        sideOffset={10}
        alignOffset={-20}
        style={{ zIndex: 1100 }}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {routing.locales.map((option) => (
                <CommandItem value={option} key={option} onSelect={onSelectChange}>
                  <Image
                    className="inline-block w-[24px] h-[24px]"
                    src={LocalImageMapper[option]}
                    alt="locale icon"
                  />
                  {localeSwitcherTranslation('locale', { locale: option })}
                  <Check
                    className={cn('ml-auto', locale === option ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
