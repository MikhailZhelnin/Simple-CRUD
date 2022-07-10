import React, { useState, useEffect } from 'react';
import { Button, Card, Col, List, Row, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Home = () => {
  const [posts, setPosts] = useState<IPosts[] | undefined>();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  return (
    <Content style={{ margin: '24px' }}>
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card title={`Post ${post.id}`} style={{ textAlign: 'center' }}>
              <Row justify="center">
                <Col>
                  <Link to={`/details/${post.id}`}>
                    <Button>Read more</Button>
                  </Link>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </Content>
  );
};

export default Home;
