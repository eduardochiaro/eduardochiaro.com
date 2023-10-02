import useSWR from 'swr';
const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

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
