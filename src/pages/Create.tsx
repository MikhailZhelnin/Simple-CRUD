import React, { useState } from 'react';

import { Button, Layout, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

interface IPostCreate {
  userId: number;
  title: string;
  body: string;
}

const Create = () => {
  const navigate = useNavigate();

  const [postUserId, setPostUserId] = useState<number>();
  const [postTitle, setPostTitle] = useState<string>('');
  const [postBody, setPostBody] = useState<string>('');

  const onFinish = (values: IPostCreate) => {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: values.title,
        body: values.body,
        userId: values.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    navigate('/');
  };

  return (
    <Content style={{ margin: '24px' }}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        fields={[
          {
            name: ['postUserId'],
            value: postUserId,
          },
          {
            name: ['postTitle'],
            value: postTitle,
          },
          {
            name: ['postBody'],
            value: postBody,
          },
        ]}
        autoComplete="off">
        <Form.Item
          label="UserId"
          name="postUserId"
          rules={[{ required: true, message: 'Please input your user id!' }]}>
          <Input onChange={(e: any) => setPostUserId(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Title"
          name="postTitle"
          rules={[{ required: true, message: 'Please input your title!' }]}>
          <Input onChange={(e: any) => setPostTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Body"
          name="postBody"
          rules={[{ required: true, message: 'Please input your body!' }]}>
          <Input onChange={(e: any) => setPostBody(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 12, span: 18 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Create;
