// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// interface PostsState {
//   posts: Post[];
// }

// const initialState: PostsState = {
//   posts: [],
// };

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     setPosts(state, action: PayloadAction<Post[]>) {
//       state.posts = action.payload;
//     },
//     addPost(state, action: PayloadAction<Post>) {
//       state.posts.push(action.payload);
//     },
//     deletePost(state, action: PayloadAction<number>) {
//       state.posts = state.posts.filter((post) => post.id !== action.payload);
//     },
//   },
// });

// export const { setPosts, addPost, deletePost } = postsSlice.actions;
// export default postsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Асинхронное действие для получения постов
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
});

// Асинхронное действие для добавления поста
export const addPost = createAsyncThunk("posts/addPost", async (newPost: Omit<Post, "id">) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
  return response.data;
});

// Асинхронное действие для удаления поста
export const deletePost = createAsyncThunk("posts/deletePost", async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;