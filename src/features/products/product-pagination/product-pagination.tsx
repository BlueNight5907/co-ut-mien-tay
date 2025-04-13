'use client';
import Pagination from '@/components/widgets/pagination';
import useSearchParams from '@/lib/hooks/useSearchParams';
import React from 'react';

type ProductPaginationProps = {
  firstPage: number;
  lastPage: number;
  currentPage: number;
};

export function ProductPagination(props: ProductPaginationProps) {
  const { firstPage, lastPage, currentPage } = props;
  const { searchParams } = useSearchParams();

  return (
    <Pagination
      firstPage={firstPage}
      lastPage={lastPage}
      currentPage={currentPage}
      getHref={(page) => `/products/${page}?${searchParams.toString()}`}
    />
  );
}
