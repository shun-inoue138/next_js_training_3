import React, { useCallback, useEffect } from 'react';

const Posts = ({ postData: { posts, isLoading, error }, setPostData }) => {
  const getPosts = useCallback(async () => {
    try {
      setPostData((prevData) => {
        return { ...prevData, isLoading: true };
      });
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) {
        throw new Error('データを取得できませんでした。');
      }
      const json = await res.json();
      console.log(json);
      setPostData((prevData) => {
        return { ...prevData, posts: json, isLoading: false };
      });
      console.log(posts);
    } catch (error) {
      setPostData((prevData) => {
        return { ...prevData, isLoading: false, error: error.message };
      });
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
