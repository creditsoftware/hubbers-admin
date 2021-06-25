import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Space,
  Table,
  Tooltip,
  Popconfirm,
  Button,
  Avatar,
  Image,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import utils from '../../../../helpers/utils/index';
import * as Actions from '../../../../redux/actions';
import CreateCommunity from './create';
import EditCommunity from './edit';

const Member = () => {
  const dispatch = useDispatch();
  const [memberList, SetMemberList] = useState(null);
  const { member } = useSelector((state) => state);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 5,
  });
  useEffect(() => {
    dispatch(Actions.getAllMember());
  }, [dispatch]);

  useEffect(() => {
    SetMemberList(member.list);
  }, [member]);
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      /* eslint-disable */
      render: (_, record) => (
        record.user?.avatar && <Avatar src={<Image src={record.user?.avatar}/>} size={70}/>
      ),
      /* eslint-enable */
    },
    {
      title: ' Name',
      dataIndex: 'name',
      /* eslint-disable */
      render: (_, record) => (
        <span>{`${record.user?.firstname && record.user?.firstname} ${record.user?.lastname && record.user?.lastname}`}</span>
      ),
      sorter: (a, b) => {
        return a.user?.firstname.toLowerCase() > b.user?.firstname.toLowerCase()
          ? -1
          : b.user?.firstname.toLowerCase() > a.user?.firstname.toLowerCase()
          ? 1
          : 0;
      },
      /* eslint-enable */
    },
    {
      title: 'Email',
      dataIndex: 'email',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.user?.email}</span>
      ),
      sorter: (a, b) => {
        return a.user?.email.toLowerCase() > b.user?.email.toLowerCase()
          ? -1
          : b.user?.email.toLowerCase() > a.user?.email.toLowerCase()
          ? 1
          : 0;
      },
      /* eslint-enable */
    },
    {
      title: 'Community',
      dataIndex: 'community',
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
      title: 'Role',
      dataIndex: 'role',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.role?.name}</span>
      ),
      sorter: (a, b) => {
        return a.role?.name.toLowerCase() > b.role?.name.toLowerCase()
          ? -1
          : b.role?.name.toLowerCase() > a.role?.name.toLowerCase()
          ? 1
          : 0;
      },
      /* eslint-enable */
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinedDate',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.joinedDate}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'joinedDate'),
    },
    {
      title: 'Published',
      dataIndex: 'pubished',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.published ? 'Published' : 'Not Published'}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'published'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      /* eslint-disable */
      render: (_, record) => (
        <span>{record.status}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditCommunity id={elm.id} data={memberList} />
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
        <CreateCommunity />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={memberList}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};
export default Member;
