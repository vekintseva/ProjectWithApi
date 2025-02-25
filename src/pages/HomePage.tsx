import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { AddPostForm } from "../components/AddPostForm";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleShowAllPosts = () => {
    navigate("/posts");
  };

  return (
    <div className="content-box">
      <Typography.Title level={3}>Добавление поста</Typography.Title>
      <AddPostForm />
      <Button type="primary" onClick={handleShowAllPosts}>
        Показать все посты
      </Button>
    </div>
  );
};

export default HomePage;
