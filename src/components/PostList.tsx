import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../store/postsSlice";
import { AppDispatch, RootState } from "../store/store";
import { Button, Flex, List } from "antd";
import { PostDetail } from "./PostDetail";
import { useNavigate } from "react-router-dom";
import { Post } from "../types/posts.types";

export const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts } = useSelector((state: RootState) => state.posts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleShowAddForm = () => {
    navigate("/");
  };

  const handleOpenModal = async (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
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
                <Button danger onClick={() => dispatch(deletePost(post.id))}>
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
      <Button type="primary" onClick={handleShowAddForm}>
        Вернуться к форме создания поста
      </Button>
    </Flex>
  );
};
