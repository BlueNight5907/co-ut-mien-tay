'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

export type SearchSectionProps = {
  search?: string;
};

const TEXT_AND_NUMBER_ONLY_REGEX = /^[\p{L}\p{N} ]+$/u;

export function SearchSection(props: SearchSectionProps) {
  const { search } = props;
  const router = useRouter();
  const exploreTranslations = useTranslations('ExplorePage');

  const [input, setInput] = useState(search ?? '');

  const renderDefault = () => (
    <div className="text-center px-4">
      <h1 className="font-bold text-xl md:text-3xl mb-3">{exploreTranslations('title')}</h1>
      <h2 className="font-normal text-md md:text-lg">
        {exploreTranslations('search_description')}
      </h2>
    </div>
  );

  const renderWithSearch = (value: string) => (
    <div className="text-center px-4">
      <h1 className="font-bold text-xl md:text-3xl mb-3">
        <Search className="font-bold size-8 inline-block mr-2" />
        {search}
      </h1>

      <h2 className="font-normal text-md md:text-lg text-foreground">
        {exploreTranslations('search_result_description', { search: value })}
      </h2>
    </div>
  );

  return (
    <div className="flex flex-col py-4 items-center gap-6">
      {search ? renderWithSearch(search) : renderDefault()}
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input
          placeholder={exploreTranslations('search_placeholder')}
          value={input}
          onChange={(e) => {
            if (e.target.value.length === 0 || TEXT_AND_NUMBER_ONLY_REGEX.test(e.target.value)) {
              setInput(e.target.value);
            }
          }}
          pattern="^[A-Za-z0-9 ]+$"
        />
        <Button
          disabled={input.length === 0}
          onClick={() => router.push(`/search?q=${encodeURI(input.trim())}`)}
        >
          <Search />
        </Button>
      </div>
    </div>
  );
}
