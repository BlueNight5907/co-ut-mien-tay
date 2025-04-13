import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const translation = await getTranslations('ExplorePage');

  return {
    title: translation('title'),
  };
}

export default async function SearchPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
