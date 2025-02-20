// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../store/store";
// import { deletePost, setPosts } from "../store/postsSlice";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const PostList = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const posts = useSelector((state: RootState) => state.posts.posts);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
//       dispatch(setPosts(response.data));
//     };

//     fetchPosts();
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Posts</h1>
//       <ul>
//     {posts.map((post) => (
//     <li key={post.id}>
//       <Link to={`/posts/${post.id}`}>{post.title}</Link>
//       <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
//     </li>
//   ))}
// </ul>
//     </div>
//   );
// };

// export default PostList;
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button } from 'antd';
import { fetchPosts, deletePost } from '../store/postsSlice';
import { RootState, AppDispatch } from '../store/store';

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <List
      bordered
      dataSource={posts}
      renderItem={(post) => (
        <List.Item
          actions={[
            <Button danger onClick={() => dispatch(deletePost(post.id))}>
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta title={post.title} description={post.body} />
        </List.Item>
      )}
    />
  );
};

export default PostList;