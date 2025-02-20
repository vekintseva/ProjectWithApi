// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store/store";
// import { addPost } from "../store/postsSlice";

// const AddPostForm = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newPost = {
//       id: Date.now(),
//       title,
//       body,
//     };
//     dispatch(addPost(newPost));
//     setTitle("");
//     setBody("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Тут можно добавить пост</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <textarea
//         placeholder="Body"
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//       />
//       <button type="submit">Добавить</button>
//     </form>
//   );
// };

// export default AddPostForm;

import { useDispatch } from 'react-redux';
import { Input, Button, Form } from 'antd';
import { AppDispatch } from '../store/store';
import { addPost } from '../store/postsSlice';

const AddPostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const handleSubmit = (values: { title: string; body: string }) => {
    dispatch(addPost(values));
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="title" label="Название" rules={[{ required: true, message: 'Please enter a title' }]}>
        <Input placeholder="Введите название поста" />
      </Form.Item>
      <Form.Item name="body" label="Содержание" rules={[{ required: true, message: 'Please enter text to the post' }]}>
        <Input.TextArea placeholder="Введите содержание поста" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Добавить пост
      </Button>
    </Form>
  );
};

export default AddPostForm;