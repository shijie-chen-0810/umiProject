import React, { useState, useEffect, useCallback, FC } from 'react';
import { formatTime } from '@/utils';
import { request, connect, ConnectProps, HeroModelState } from 'umi';
import styles from './index.less';
import { Button, Row, Col, Card, Table, Radio } from 'antd';

interface ProjectProps extends ConnectProps {
  hero: HeroModelState;
}

interface columnFormat {
  codeType: number;
  createdReport: number;
  databaseType: number;
  endTime: object;
  id: number;
  imageUrl: object;
  name: string;
  nickName: string;
  reportReviewer: object;
  reportWriter: object;
  startTime: number;
  workPlace: string;
}

const ProjectList: FC<ProjectProps> = (props) => {
  const [data, setData] = useState([]);
  const goToDetail = useCallback((row) => {
    return () => {
      console.log(row);
    };
  }, []);
  useEffect(() => {
    (async () => {
      const list = await request('/getprojectlist');
      setData(list);
    })();
  }, []);
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '项目简称',
      dataIndex: 'nickName',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      render: (text: number) => {
        return (text && formatTime(text)) || '未开始';
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render: (text: number) => {
        return (text && formatTime(text)) || '未结束';
      },
    },
    {
      title: '工作地点',
      dataIndex: 'workPlace',
    },
    {
      title: '开发语言',
      dataIndex: 'codeType',
    },
    {
      title: '数据库类型',
      dataIndex: 'databaseType',
    },
    {
      title: '报告状态',
      dataIndex: 'createdReport',
    },
    {
      title: '操作',
      render: (text: string, row: object) => (
        <Radio.Group buttonStyle="solid">
          <Radio.Button onClick={goToDetail(row)}>详情</Radio.Button>
        </Radio.Group>
      ),
    },
  ];
  return (
    <div className="project">
      <div>{props.hero.heroName}</div>
      <Card title="项目信息列表" className={styles.content}>
        <Card type="inner">
          <Button type="primary">新增项目信息</Button>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: columnFormat) => record.id}
          />
        </Card>
      </Card>
      <Row className={styles.footer}>
        <Col span={24}>Footer</Col>
      </Row>
    </div>
  );
};

export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(
  ProjectList,
);
