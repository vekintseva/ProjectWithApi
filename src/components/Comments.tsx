import React from "react";
import { List, Typography } from "antd";
import { useGetCommentsByPostIdQuery } from "../store/commentsApiService";
interface CommentsProps {
  postId: number;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { data: comments } = useGetCommentsByPostIdQuery(postId);

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
