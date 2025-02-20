import { createContext, useState, useContext, ReactNode } from "react";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  deletePost: (id: number) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts((prev) => [...prev, post]);
  };

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};