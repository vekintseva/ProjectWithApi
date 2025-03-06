import React, { useEffect, useState } from "react";
import { Button, Flex, List } from "antd";
import { PostDetail } from "./PostDetail";
import { Post } from "../types/posts.types";
import { AddPostForm } from "./AddPostForm";
import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
} from "../store/postsApiService";

export const PostList: React.FC = () => {
  const { data: initialPosts = [] } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const handleShowAddForm = () => {
    setIsAddFormOpen(true);
  };

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleCloseAddForm = () => {
    setIsAddFormOpen(false);
  };

  const handleAddPost = async (values: { title: string; body: string }) => {
    try {
      const newPost = await addPost(values).unwrap();
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setIsAddFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id).unwrap();
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex vertical gap={6}>
      <div
        className="content-box"
        style={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <List
          bordered
          dataSource={posts}
          renderItem={(post) => (
            <List.Item
              actions={[
                <Button danger onClick={() => handleDeletePost(post.id)}>
                  Удалить
                </Button>,
                <Button type="primary" onClick={() => handleOpenModal(post)}>
                  Подробнее
                </Button>,
              ]}
            >
              <List.Item.Meta title={post.title} description={post.body} />
            </List.Item>
          )}
        />

        <PostDetail
          isOpen={isModalOpen}
          post={selectedPost}
          onClose={handleCloseModal}
        />
      </div>
      {isAddFormOpen && (
        <AddPostForm
          visible={isAddFormOpen}
          onAddPost={handleAddPost}
          onClose={handleCloseAddForm}
        />
      )}
      {!isAddFormOpen && (
        <Button type="primary" onClick={handleShowAddForm}>
          Добавить пост
        </Button>
      )}
    </Flex>
  );
};
