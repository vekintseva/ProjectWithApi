import { POST_LIST } from "../router/posts";
import { Post } from "../types/posts.types";
import { initialApiService } from "./initialApiService";

export const extendedPostsApi = initialApiService.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `${POST_LIST}`,
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: `${POST_LIST}`,
        method: "POST",
        body: newPost,
      }),
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `${POST_LIST}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } =
  extendedPostsApi;
