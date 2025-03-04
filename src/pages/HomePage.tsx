import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { POST_LIST } from "../router/posts";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleShowAllPosts = () => {
    navigate(POST_LIST);
  };

  return (
    <div className="content-box">
      <Typography.Title level={3}>
        Тут можно работать с постами
      </Typography.Title>
      <Button type="primary" onClick={handleShowAllPosts}>
        Показать все посты
      </Button>
    </div>
  );
};

export default HomePage;
