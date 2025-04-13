import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LanguageCode } from './constants/language-code';
import { APP_ENV } from '@/configs/app-env';
import { FileSchema } from './api/types';

const MAX_PAGINATION_ITEMS = 7;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertCurrency(value: number): string {
  return `${value}₩`;
}

export function generatePagination(
  firstPage: number,
  lastPage: number,
  currentPage: number
): (number | '...')[] {
  // Validate input
  if (currentPage < firstPage || currentPage > lastPage) {
    throw new Error('Current page must be between first and last page');
  }

  // If total pages are 7 or fewer, return full list
  if (lastPage - firstPage + 1 <= MAX_PAGINATION_ITEMS) {
    return Array.from({ length: lastPage - firstPage + 1 }, (_, i) => firstPage + i);
  }

  // Initialize the pagination list
  const paginationList: (number | '...')[] = [];

  paginationList.push(firstPage);

  // Current page place near the first page
  // It take 4 places for first page, last page and 2 ellipses
  const totalUsedSpaces = 4;
  const remainSpaces = MAX_PAGINATION_ITEMS - totalUsedSpaces;

  // If current page is close to the start, replace an ellipsis near start by a number
  if (currentPage <= firstPage + remainSpaces) {
    for (let page = firstPage + 1; page <= firstPage + remainSpaces + 1; page++) {
      paginationList.push(page);
    }
    paginationList.push('...');
  }
  // If current page is close to the end, replace an ellipsis near start by a number
  else if (currentPage >= lastPage - remainSpaces) {
    paginationList.push('...');
    for (let page = lastPage - remainSpaces - 1; page < lastPage; page++) {
      paginationList.push(page);
    }
  }
  // If current page is in the middle
  else {
    paginationList.push('...');
    for (
      let page = currentPage - Math.floor((remainSpaces - 1) / 2);
      page <= currentPage + Math.floor(remainSpaces / 2);
      page++
    ) {
      paginationList.push(page);
    }
    paginationList.push('...');
  }

  paginationList.push(lastPage);

  return paginationList;
}

export function getLanguageCode(locale: string) {
  const map: Record<string, LanguageCode> = {
    vi: LanguageCode.VI,
    ko: LanguageCode.KO,
    en: LanguageCode.EN,
  };

  if (map[locale]) {
    return map[locale];
  }

  return LanguageCode.VI;
}

export function getImageLink(image: string | FileSchema | undefined) {
  if (!image) {
    return '';
  }

  if (typeof image === 'string') {
    return `${APP_ENV.DIRECTUS_ASSETS}/${image}`;
  }

  if (image.storage === 'local') {
    return `${APP_ENV.DIRECTUS_ASSETS}/${image.id}/${image.filename_disk}`;
  }

  return ``;
}

export function delay(ms = 1000) {
  return new Promise((rs) => {
    setTimeout(() => {
      rs(true);
    }, ms);
  });
}
