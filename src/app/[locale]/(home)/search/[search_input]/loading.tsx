'use client';

import { Loader } from '@/components/ui/loader';
import React from 'react';

export default function Loading() {
  return (
    <div className="loading-container flex-grow min-h-[inherit]">
      <Loader />
    </div>
  );
}
