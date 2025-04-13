import { Link } from '@/i18n/navigation';
import React from 'react';

export type FooterLinkDef = {
  label: string;
  href: string;
};

export type FooterLinkGroupProps = {
  headline: string;
  items: FooterLinkDef[];
};

export function FooterLinkGroup(props: FooterLinkGroupProps) {
  const { headline, items } = props;
  return (
    <div>
      <h6 className="font-semibold text-md mb-2">{headline}</h6>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, index) => (
          <li key={index}>
            <Link className="hover:text-primary text-sm" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
