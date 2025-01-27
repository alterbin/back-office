import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useQueryString = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const asPath = `${pathname}?${searchParams.toString()}`;

  const useQueries = () => {
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const searchTerm = searchParams.get('searchTerm') || '';
    return useMemo(
      () => ({
        page,
        searchTerm,
      }),
      [page, searchTerm],
    );
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  const createQueryStrings = useCallback(
    (filters: object) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(filters).forEach(([key, value]) => {
        const newParamValue = String(value)?.trim();

        if (newParamValue === '') {
          params.delete(key);
        } else {
          params.set(key, newParamValue);
        }
      });
      return params.toString();
    },
    [searchParams],
  );
  const pageParams = useQueries();

  const clearQueryParams = () => {
    push(`${pathname}?page=${pageParams.page}`);
  };

  return {
    createQueryString, asPath, clearQueryParams, createQueryStrings,
  };
};
