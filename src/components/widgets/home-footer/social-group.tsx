'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export type SocialItemDef = {
  label: string;
  image: string;
  href: string;
};

export type SocialGroupProps = {
  headline: string;
  items: SocialItemDef[];
};

export function SocialGroup(props: SocialGroupProps) {
  const { headline, items } = props;

  return (
    <div>
      <h6 className="font-semibold text-sm mb-2">{headline}</h6>
      <ul className="flex flex-row gap-2 flex-wrap">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              className="hover:text-primary flex flex-col items-center gap-1"
              href={item.href}
              target="_blank"
            >
              <Image
                className="h-12 w-12 round-sm"
                width={48}
                height={48}
                src={item.image}
                alt="social image"
              />
              <span className="text-xs">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
