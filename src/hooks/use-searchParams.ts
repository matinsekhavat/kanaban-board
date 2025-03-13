import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Hook to update a URL search parameter and navigate to the new URL
 * @param key - The search parameter key to update
 * @param value - The value to set (or null/empty to remove the parameter)
 * @param options - Additional navigation options
 */
export const useUpdateSearchParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParam = (key: string, value: string | null, options = { scroll: false }) => {
    const updatedParams = new URLSearchParams(searchParams.toString());

    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }

    const queryString = updatedParams.toString();
    const url = queryString ? `/?${queryString}` : '/';

    router.replace(url, options);
  };

  const getSearchParam = (key: string) => {
    const value = searchParams.get(key);
    return value;
  };

  return { getSearchParam, updateSearchParam };
};
