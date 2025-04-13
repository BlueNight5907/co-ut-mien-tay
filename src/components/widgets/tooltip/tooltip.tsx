'use client';

import React from 'react';
import { Tooltip as OriginTooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ALIGN_OPTIONS, SIDE_OPTIONS } from '@radix-ui/react-popper';

export type TooltipProps = {
  children: React.ReactNode;
  title: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  zIndex?: number;
  side?: (typeof SIDE_OPTIONS)[number];
  align?: (typeof ALIGN_OPTIONS)[number];
  className?: string;
};

export function Tooltip(props: TooltipProps) {
  const { children, title, open, onOpenChange, zIndex, side, align, className } = props;
  return (
    <OriginTooltip open={open} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent style={{ zIndex }} side={side} align={align} className={className}>
        <span>{title}</span>
      </TooltipContent>
    </OriginTooltip>
  );
}
