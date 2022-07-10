import React from 'react';
import { Button, Col, Row, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ color: 'white', margin: 0 }}>
            CRUD-test
          </Title>
        </Col>
        <Col>
          <Link to="/">
            <Button style={{ marginRight: '10px' }}>Home</Button>
          </Link>
          <Link to="/create">
            <Button>Create</Button>
          </Link>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
