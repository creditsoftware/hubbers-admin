import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space, Table, Tooltip, Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import utils from '../../../../helpers/utils/index';
import * as Actions from '../../../../redux/actions';
import CreatePost from './create';
import EditPost from './edit';

const Post = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(null);
  const { list } = useSelector((state) => state.post);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(Actions.getAllPost());
  }, [dispatch]);

  useEffect(() => {
    setPosts(list);
  }, [list]);
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Community',
      dataIndex: 'communtiy',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.community?.name}</span>
      ),
      sorter: (a, b) => {
        return a.community?.name.toLowerCase() > b.community?.name.toLowerCase()
          ? -1
          : b.community?.name.toLowerCase() > a.community?.name.toLowerCase()
          ? 1
          : 0;
      },
      /* eslint-enable */
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.topic?.name}</span>
      ),
      sorter: (a, b) => {
        return a.topic?.name.toLowerCase() > b.topic?.name.toLowerCase()
          ? -1
          : b.topic?.name.toLowerCase() > a.topic?.name.toLowerCase()
          ? 1
          : 0;
      },
      /* eslint-enable */
    },
    {
      title: 'Type',
      dataIndex: 'post',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.category}</span>
        ),
        /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'category'),
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      /* eslint-disable */
        render: (_, record) => (
          <span>{`${record.creator?.user?.firstname && record.creator?.user?.firstname} ${record.creator?.user?.lastname && record.creator?.user?.lastname}`}</span>
        ),
        sorter: (a, b) => {
          return a.creator?.user?.firstname.toLowerCase() > b.creator?.user?.firstname.toLowerCase()
            ? -1
            : b.creator?.user?.firstname.toLowerCase() > a.creator?.user?.firstname.toLowerCase()
            ? 1
            : 0;
        },
        /* eslint-enable */
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.createdAt}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditPost id={elm.id} data={list} />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => console.log('delete')}
              onCancel={() => console.log('Canceled to delete')}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
      /* eslint-enable */
    },
  ];
  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };
  return (
    <Card>
      <div className="text-right mb-3">
        <CreatePost />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={posts}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};
export default Post;
