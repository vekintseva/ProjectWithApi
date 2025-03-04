import React from "react";
import { Form, Input, Button, Modal } from "antd";

interface AddPostFormProps {
  visible: boolean;
  onAddPost: (values: { title: string; body: string }) => void;
  onClose: () => void;
}

export const AddPostForm: React.FC<AddPostFormProps> = ({
  visible,
  onAddPost,
  onClose,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { title: string; body: string }) => {
    onAddPost(values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title="Добавить пост"
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="title" label="Название" rules={[{ required: true }]}>
          <Input placeholder="Введите название для поста" />
        </Form.Item>
        <Form.Item name="body" label="Описание" rules={[{ required: true }]}>
          <Input.TextArea placeholder="Введите описание поста" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить новый пост
        </Button>
      </Form>
    </Modal>
  );
};
