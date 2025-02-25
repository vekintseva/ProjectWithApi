import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addPost } from "../store/postsSlice";

export const AddPostForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: { title: string; body: string }) => {
    const newPost = {
      userId: 1,
      id: Date.now(),
      title: values.title,
      body: values.body,
    };
    dispatch(addPost(newPost));

    notification.success({
      message: "Пост добавлен",
      description: `пост "${values.title}" добавлен, но пока непонятно куда:)`,
      placement: "topRight",
    });
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item name="title" label="Название" rules={[{ required: true }]}>
        <Input placeholder="Введите название для поста" />
      </Form.Item>
      <Form.Item name="body" label="Описание" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Введите описание поста" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Добавить пост
      </Button>
    </Form>
  );
};
