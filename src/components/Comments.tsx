import React, { useEffect, useState } from "react";
import { List, Typography } from "antd";
import axios from "axios";
import { Comment } from "../types/comments.types";

interface CommentsProps {
  postId: number | null;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке комментариев:", error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <>
      <Typography.Title level={5}>Комментарии:</Typography.Title>
      <List
        bordered
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              title={`${comment.name} (${comment.email})`}
              description={comment.body}
            />
          </List.Item>
        )}
      />
    </>
  );
};
