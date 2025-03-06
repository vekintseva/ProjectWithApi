import { Comment } from "../types/comments.types";
import { initialApiService } from "./initialApiService";

export const extendedCommentsApi = initialApiService.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => ({
        url: "/comments",
        params: { postId },
      }),
    }),
  }),
});

export const { useGetCommentsByPostIdQuery } = extendedCommentsApi;
