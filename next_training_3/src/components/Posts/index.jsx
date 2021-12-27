import React, { useCallback, useEffect } from 'react';

const Posts = ({ state: { posts, isLoading, error }, dispatch }) => {
  const getPosts = useCallback(async () => {
    try {
      dispatch({ type: 'start' });
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) {
        throw new Error('データを取得できませんでした。');
      }
      const json = await res.json();
      console.log(json);
      dispatch({ type: 'end', posts: json });
      console.log(posts);
    } catch (error) {
      dispatch({ type: 'error', error: error.message });
    }
  }, []);

  useEffect(() => {
    getPosts();
    // return () => {
    //   cleanup;
    // };
  }, [getPosts]);

  if (isLoading) {
    return <div>ロード中です</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (posts.length === 0) {
    return <div>データが空です</div>;
  }

  return (
    <ol>
      {posts.map((post) => {
        return <li key={post.id}>{post.title}</li>;
      })}
    </ol>
  );
};

export default Posts;
