import React, { useCallback, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch.js';

const Posts = () => {
  const { data, error, isLoading, isEmpty } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
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

  if (isLoading) {
    return <div>ロード中です</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (isEmpty) {
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
