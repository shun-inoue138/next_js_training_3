import useSWR from 'swr';

export const useFetch = (url) => {
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('エラー発生');
    }
    const json = await res.json();
    return json;
  };

  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;
  const isEmpty = data && data.length === 0;

  return { data, error, isLoading, isEmpty };
};
