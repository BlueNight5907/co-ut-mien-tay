import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import React from 'react';

export type ButtonLinkDef = {
  label: string;
  href: string;
} & VariantProps<typeof buttonVariants>;

export type ButtonLinkGroupProps = {
  items: ButtonLinkDef[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

export function ButtonLinkGroup(props: ButtonLinkGroupProps) {
  const { items, orientation, className = '' } = props;

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2',
        {
          'flex-col': orientation === 'vertical',
        },
        className
      )}
    >
      {items.map((item) => (
        <Button
          onClick={(e) => e.stopPropagation()}
          key={item.label}
          variant={item.variant}
          asChild
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </div>
  );
}
