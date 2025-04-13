import { VariantProps } from 'class-variance-authority';
import { ToggleGroupItem } from '../../ui/toggle-group';
import { toggleVariants } from '@/components/ui/toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import React from 'react';
import { cn } from '@/lib/utils';

export function SortItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupItem
      className={cn('flex-[unset] shadow-none text-xs sm:text-sm', className)}
      {...props}
    >
      {children}
    </ToggleGroupItem>
  );
}
