import React, { useCallback, useState } from 'react';
import {
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './index.css';
import { Tabs, Row, Col, Input, Button, Table, Radio } from 'antd';

const { TabPane } = Tabs;

export default function index(props: any) {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
  ]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'IP',
      dataIndex: 'name',
    },
    {
      title: '连接状态',
      dataIndex: 'name',
    },
    {
      title: 'CPU',
      dataIndex: 'name',
    },
    {
      title: 'Memory',
      dataIndex: 'name',
    },
    {
      title: '工作计划',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'name',
      render: (text, record) => (
        <Radio.Group size="small">
          <Radio.Button>
            <EditOutlined />
          </Radio.Button>
          <Radio.Button onClick={handleDelete(record)}>
            <DeleteOutlined />
          </Radio.Button>
        </Radio.Group>
      ),
    },
  ];
  const prevPage = useCallback(() => {
    props.history.go(-1);
  }, []);
  const handleDelete = useCallback((reccrd) => {
    return () => {
      setDataSource();
    };
  }, []);
  return (
    <>
      <button onClick={prevPage}>prev</button>
      <Tabs type="card">
        <TabPane
          tab={
            <span style={{ color: '#555', fontWeight: 700, fontSize: '18px' }}>
              <FileTextOutlined />
              测试机列表
            </span>
          }
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={2}>
              机器名:
            </Col>
            <Col className="gutter-row" span={4}>
              <Input placeholder="Basic usage" />
            </Col>
            <Col className="gutter-row" span={1}>
              IP:
            </Col>
            <Col className="gutter-row" span={4}>
              <Input placeholder="Basic usage" />
            </Col>
            <Col span={5}>
              <Button type="primary">查询</Button>
              <Button style={{ marginLeft: '10px' }}>重置</Button>
            </Col>
            <Col className="gutter-row" span={13}></Col>
          </Row>
          <Row style={{ margin: '20px 0 10px', paddingLeft: '10px' }}>
            <Button type="primary">查询</Button>
          </Row>
          <Table columns={columns} dataSource={dataSource} />
        </TabPane>
      </Tabs>
    </>
  );
}
