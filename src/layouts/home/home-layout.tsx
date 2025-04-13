'use client';

import BottomBar from '@/components/widgets/bottom-bar';
import React from 'react';
import Header from '@/components/widgets/home-header';
import Footer from '@/components/widgets/home-footer';

type Props = {
  children: React.ReactNode;
};
export default function HomeLayout(props: Props) {
  const { children } = props;
  return (
    <>
      <Header />
      <main className="flex-grow screen-min-width min-h-[70dvh] px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 container mx-auto">
        {children}
      </main>
      <BottomBar />
      <Footer />
    </>
  );
}
