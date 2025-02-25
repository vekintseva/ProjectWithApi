import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PostsState, Post } from "../types/posts.types";

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (newPost: Omit<Post, "id">) => {
    const response = await axios.post(`${API_URL}/posts`, newPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await axios.delete(`${API_URL}/posts/${id}`);
    return id;
  }
);

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
