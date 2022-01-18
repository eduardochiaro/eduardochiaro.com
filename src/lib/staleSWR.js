import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json())

const useStaleSWR = (dataKey) => {
  const revalidationOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  };

  return useSWR(dataKey, fetcher, revalidationOptions);
}

export default useStaleSWR