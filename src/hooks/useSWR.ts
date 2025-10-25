import useSWR from 'swr';

// Custom hook for data fetching with SWR
export function useData<T>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<T>(url);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

// Custom hook for API calls
export function useAPI<T>(endpoint: string) {
  return useData<T>(`/api${endpoint}`);
}

