import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import React from 'react';

type ItemProps = {
  label: string;
  href: string;
  icon: React.ReactNode;
  matchExact?: boolean;
};

export function Item(props: ItemProps) {
  const { label, icon, href, matchExact } = props;

  const pathname = usePathname();

  let isActive = pathname.indexOf(href) === 0;
  if (matchExact) {
    isActive = pathname === href;
  }

  return (
    <Link
      className={cn('flex flex-col gap-1 items-center hover:text-primary', {
        'text-primary': isActive,
      })}
      href={href}
    >
      <span>{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </Link>
  );
}
