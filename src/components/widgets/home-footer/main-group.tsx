'use client';

import Image from 'next/image';
import fallbackLogo from '@/assets/icons/logo.svg';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Mail, MapPinHouse, Phone } from 'lucide-react';

type Props = {
  siteName: string;
  logo?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
};

export function MainGroup(props: Props) {
  const { siteName, logo, email, address, phoneNumber } = props;
  const footerTranslations = useTranslations('HomeLayout.Footer');
  return (
    <div>
      <h6 className="flex items-center gap-2 mb-4">
        <Image
          className="h-[48px] w-auto"
          width={480}
          height={480}
          src={logo || fallbackLogo}
          alt="logo"
        />
        <span className="block font-semibold text-md">{siteName || 'Site Name'}</span>
      </h6>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="hover:text-primary text-sm"
            href={phoneNumber ? `tel:${phoneNumber}` : '#'}
          >
            <Phone size={20} className="inline-block mr-2" />
            {footerTranslations('phone_number')} {phoneNumber}
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-primary text-sm"
            href={email ? `mailto:Email: ${email}` : '#'}
          >
            <Mail size={20} className="inline-block mr-2" />
            {footerTranslations('email')} {email}
          </Link>
        </li>
        <li>
          <p className="hover:text-primary text-sm">
            <MapPinHouse size={20} className="inline-block mr-2" />
            {footerTranslations('address')} {address}
          </p>
        </li>
      </ul>
    </div>
  );
}
