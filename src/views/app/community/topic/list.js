import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space, Table, Tooltip, Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import utils from '../../../../helpers/utils/index';
import * as Actions from '../../../../redux/actions';
import CreateTopic from './create';
import EditTopic from './edit';

const TopicsAllList = () => {
  const dispatch = useDispatch();
  const [TopicList, SetTopicList] = useState(null);
  const { list } = useSelector((state) => state.topic);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(Actions.getAllTopics());
  }, [dispatch]);

  useEffect(() => {
    SetTopicList(list);
    console.log(list);
  }, [list]);
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: ' Name',
      dataIndex: 'name',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.name}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Contributor Role',
      dataIndex: 'contributorRole',
      /* eslint-disable */
      render: (_, record) => (
        <span>{`${record.contributorRole === 'all_members' ? 'All Members' : ''}${record.contributorRole === 'host_moderators' ? 'Host Moderators' : ''}`}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'contributorRole'),
    },
    {
      title: 'Community Name',
      dataIndex: 'community',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.community?.name}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'community'),
    },
    {
      title: 'Topic Type',
      dataIndex: 'type',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.topicType}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'city'),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.creator?.user?.email}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'IsGlobal',
      dataIndex: 'isGlobal',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.isGlobal ? 'True' : 'False'}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Published',
      dataIndex: 'published',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.published ? 'Published' : 'Not Published'}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.createdAt}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditTopic id={elm.id} data={TopicList} />
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
        <CreateTopic />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={TopicList}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};
export default TopicsAllList;
