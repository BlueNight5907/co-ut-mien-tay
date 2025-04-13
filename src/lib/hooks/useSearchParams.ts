import { useSearchParams as useOriginSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useSearchParams() {
  const searchParams = useOriginSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  return {
    searchParams,
    createQueryString,
  };
}
