import React from "react";
import { Modal, Button, Typography } from "antd";
import { Post } from "../types/posts.types";
import { Comments } from "./Comments";

interface PostDetailProps {
  isOpen: boolean;
  post: Post | null;
  onClose: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  isOpen,
  post,
  onClose,
}) => {
  return (
    <Modal
      title={post?.title}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Закрыть
        </Button>,
      ]}
    >
      <>
        <Typography.Title level={5}>Описание:</Typography.Title>
        {post?.body}
        {post && <Comments postId={post.id} />}
      </>
    </Modal>
  );
};
