import React, { useEffect, useState } from "react";
import { Button, Flex, List } from "antd";
import { PostDetail } from "./PostDetail";
import { Post } from "../types/posts.types";
import { AddPostForm } from "./AddPostForm";
import { useGetPostsQuery } from "../store/postsSlice";
export const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const { data } = useGetPostsQuery();

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else if (data) {
      setPosts(data);
      localStorage.setItem("posts", JSON.stringify(data));
    }
  }, [data]);

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

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
    localStorage.setItem(
      "posts",
      JSON.stringify(posts.filter((post) => post.id !== id))
    );
  };

  const handleAddPost = (values: { title: string; body: string }) => {
    const newPost: Post = {
      id: posts.length + 1,
      title: values.title,
      body: values.body,
    };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setIsAddFormOpen(false);
  };

  const handleCloseAddForm = () => {
    setIsAddFormOpen(false);
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
                  Delete
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
