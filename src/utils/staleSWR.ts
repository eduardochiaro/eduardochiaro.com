import useSWR from 'swr';
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

const useStaleSWR = (dataKey: any, overrideRevalidation = {}) => {
  const revalidationOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...overrideRevalidation,
  };

  return useSWR(dataKey, fetcher, revalidationOptions);
};
export { fetcher };

export default useStaleSWR;
