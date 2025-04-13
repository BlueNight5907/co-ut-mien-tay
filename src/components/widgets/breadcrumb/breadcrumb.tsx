'use client';

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as OriginBreadcrumb,
} from '@/components/ui/breadcrumb';
import React, { Fragment } from 'react';
import { UrlObject } from 'url';

export type BreadCrumbItemData = {
  label: string;
  href?: string | UrlObject;
};

export type BreadCrumbProps = {
  items: BreadCrumbItemData[];
};

export function Breadcrumb(props: BreadCrumbProps) {
  const { items } = props;

  const renderItem = (item: BreadCrumbItemData, index: number, arr: BreadCrumbItemData[]) => {
    const separator: React.ReactNode = index < arr.length - 1 ? <BreadcrumbSeparator /> : null;

    if (item.href) {
      return (
        <Fragment key={index}>
          <BreadcrumbItem>
            <BreadcrumbLink className="hover:text-primary" href={item.href}>
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {separator}
        </Fragment>
      );
    }

    return (
      <Fragment key={index}>
        <BreadcrumbItem>
          <BreadcrumbPage>{item.label}</BreadcrumbPage>
        </BreadcrumbItem>
        {separator}
      </Fragment>
    );
  };

  return (
    <OriginBreadcrumb>
      <BreadcrumbList>{items.map(renderItem)}</BreadcrumbList>
    </OriginBreadcrumb>
  );
}
