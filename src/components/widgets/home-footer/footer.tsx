'use client';

import { FooterLinkGroup } from '@/components/widgets/home-footer/footer-link-group';
import { SocialGroup } from '@/components/widgets/home-footer/social-group';
import { useGlobalConfig } from '@/lib/global-configs/context';
import React from 'react';
import { MainGroup } from './main-group';
import { useTranslations } from 'next-intl';

export function Footer() {
  const { socialLinks, footerSections, siteName, logo, address, email, phoneNumber } =
    useGlobalConfig();

  const footerTranslations = useTranslations('HomeLayout.Footer');
  return (
    <div className="bg-transparent border-t-2 border-t-primary">
      <div className="min-h-[280px] screen-min-width px-3 py-4 sm:px-4 md:px-6 container mx-auto flex flex-col gap-4">
        <div className="flex-grow grid col-start-1 row-start-1 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 justify-items-stretch pb-6">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
            <MainGroup
              siteName={siteName}
              logo={logo}
              address={address}
              email={email}
              phoneNumber={phoneNumber}
            />
            <SocialGroup
              headline={footerTranslations('connect_with_us')}
              items={socialLinks.map((item) => ({
                href: item.href,
                image: item.image,
                label: item.name,
              }))}
            />
          </div>
          {footerSections.map((section) => (
            <div className="col-span-2 md:col-span-1" key={section.id}>
              <FooterLinkGroup
                headline={section.headline}
                items={section.items.map((item) => ({
                  label: item.text,
                  href: item.url,
                }))}
              />
            </div>
          ))}
        </div>
        <p className="container text-center">
          Copyright © 2025{' '}
          <a className="text-primary" href="https://www.facebook.com/Bluenight0/" target="_blank">
            BlueNight5907
          </a>
          . All Right Reserved
        </p>
      </div>
      <div className="h-20"></div>
    </div>
  );
}
