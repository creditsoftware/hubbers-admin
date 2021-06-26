import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space, Table, Tooltip, Popconfirm, Button, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import utils from '../../../../helpers/utils/index';
import * as Actions from '../../../../redux/actions';
import CreateEvent from './create';
import EditEvent from './edit';

const EventList = () => {
  const dispatch = useDispatch();
  const [events, SetEvents] = useState(null);
  const { list } = useSelector((state) => state.event);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(Actions.getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    SetEvents(list);
  }, [list]);
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Header Image',
      dataIndex: 'headerImageUrl',
      /* eslint-disable */
      render: (_, record) => (
        record.headerImageUrl && <Image width={100} src={record.headerImageUrl} />
      ),
      /* eslint-enable */
    },
    {
      title: 'Title',
      dataIndex: 'title',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.title}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'title'),
    },
    {
      title: 'Community',
      dataIndex: 'community',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.community?.name}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'community'),
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.topic?.name}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Timezone',
      dataIndex: 'timezone',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.timezone}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'timezone'),
    },
    {
      title: 'Created By',
      dataIndex: 'created',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.creator.email}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Published',
      dataIndex: 'published',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.published}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.startDate}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.endDate}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Type',
      dataIndex: 'eventType',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.eventType}</span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditEvent id={elm.id} data={list} />
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
        <CreateEvent />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={events}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};
export default EventList;
