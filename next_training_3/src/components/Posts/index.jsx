import React, { useCallback, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('エラー発生');
  }
  const json = await res.json();
  return json;
};

const Posts = () => {
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/post',
    fetcher
  );
  console.log({ error, data });

  // const getPosts = useCallback(async () => {
  //   try {
  //     dispatch({ type: 'start' });
  //     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  //     if (!res.ok) {
  //       throw new Error('データを取得できませんでした。');
  //     }
  //     const json = await res.json();
  //     console.log(json);
  //     dispatch({ type: 'end', posts: json });
  //     console.log(posts);
  //   } catch (error) {
  //     dispatch({ type: 'error', error: error.message });
  //   }
  // }, []);

  // useEffect(() => {
  //   getPosts();
  //   // return () => {
  //   //   cleanup;
  //   // };
  // }, [getPosts]);

  if (!data && !error) {
    return <div>ロード中です</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data.length === 0) {
    return <div>データが空です</div>;
  }

  return (
    <ol>
      {data.map((data) => {
        return <li key={data.id}>{data.title}</li>;
      })}
    </ol>
  );
};

export default Posts;
