'use client';

import {
  Pagination as OriginPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn, generatePagination } from '@/lib/utils';
import { UrlObject } from 'url';

export type PaginationProps = {
  firstPage: number;
  lastPage: number;
  currentPage: number;
  getHref: (page: number) => string | UrlObject;
};

export function Pagination(props: PaginationProps) {
  const { firstPage, lastPage, currentPage, getHref } = props;

  const disablePrev = firstPage === currentPage;
  const disableNext = lastPage === currentPage;

  const items = generatePagination(firstPage, lastPage, currentPage);

  const renderItem = (item: number | string, index: number) => {
    if (typeof item === 'string') {
      return (
        <PaginationItem key={index}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    const isActive = currentPage === item;

    let href: string | UrlObject = '#';
    if (!isActive) {
      href = getHref(item);
    }

    return (
      <PaginationItem key={index}>
        <PaginationLink href={href} isActive={isActive}>
          {item}
        </PaginationLink>
      </PaginationItem>
    );
  };

  return (
    <OriginPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn({ 'pointer-events-none text-gray-500': disablePrev })}
            href={disablePrev ? '#' : getHref(currentPage - 1)}
          />
        </PaginationItem>
        {items.map(renderItem)}
        <PaginationItem>
          <PaginationNext
            className={cn({ 'pointer-events-none text-gray-500': disableNext })}
            href={disableNext ? '#' : getHref(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </OriginPagination>
  );
}
