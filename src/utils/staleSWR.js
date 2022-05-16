import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json())

const useStaleSWR = (dataKey, overrideRevalidation = {}) => {
  const revalidationOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...overrideRevalidation
  };

  return useSWR(dataKey, fetcher, revalidationOptions);
}

export default useStaleSWR