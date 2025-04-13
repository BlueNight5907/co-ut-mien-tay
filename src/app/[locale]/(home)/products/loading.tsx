'use client';

import { Loader } from '@/components/ui/loader';
import React from 'react';

export default function Loading() {
  return (
    <div className="loading-container flex-grow min-h-[inherit] py-20">
      <Loader />
    </div>
  );
}
