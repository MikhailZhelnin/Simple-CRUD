import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Col, Row, Layout, Typography, Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

interface IPostDetails {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<IPostDetails>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [postId, setPostId] = useState();
  const [postUserId, setPostUserId] = useState();
  const [postTitle, setPostTitle] = useState();
  const [postBody, setPostBody] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
        setPostId(json.id);
        setPostUserId(json.userId);
        setPostTitle(json.title);
        setPostBody(json.body);
        setLoading(false);
      });
  }, [id]);

  const deletePost = (id: number | undefined): void => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    navigate('/');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updatePost = (values: IPostDetails) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: values.id,
        title: values.title,
        body: values.body,
        userId: values.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    setIsModalVisible(false);
    window.location.reload();
  };

  return (
    <Content style={{ margin: '24px' }}>
      {loading ? (
        <Typography.Title>Loading</Typography.Title>
      ) : (
        <>
          <Row>
            <Typography.Text>{post?.id}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text>{post?.title}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text>{post?.body}</Typography.Text>
          </Row>
          <Row>
            <Col>
              <Button type="primary" style={{ marginRight: '10px' }} onClick={showModal}>
                Update
              </Button>
              <Button danger type="primary" onClick={() => deletePost(post?.id)}>
                Delete
              </Button>
            </Col>
          </Row>
          <Modal
            title="Update post"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
            ]}>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              onFinish={updatePost}
              fields={[
                {
                  name: ['postId'],
                  value: postId,
                },
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
              <Form.Item label="Id" name="postId">
                <Input type={'number'} onChange={(e: any) => setPostId(e.target.value)} disabled />
              </Form.Item>
              <Form.Item label="UserId" name="postUserId">
                <Input onChange={(e: any) => setPostUserId(e.target.value)} disabled />
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
              <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </Content>
  );
};

export default Details;
