/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Popconfirm,
  Tooltip,
  message,
  Spin,
  Upload,
  Space,
} from 'antd';
import {
  EyeOutlined,
  FileExcelOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import AvatarStatus from '../../../components/shared-components/AvatarStatus';
import Flex from '../../../components/shared-components/Flex';
import utils from '../../../helpers/utils/index';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../../redux/actions';
import { useHistory } from 'react-router-dom';
import api from '../../../ApiConfig';
import CreateUserButton from './create-user';
import { USER_STATUS } from '../../../constants/userStatus';
import { useRowState } from 'react-table';
import { API_BASE_URL } from '../../../constants/defaultValues';

const { Option } = Select;

const statusList = ['PENDING', 'ACTIVATED', 'DECLINED'];

const AllUsers = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [userList, SetUserList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userProfileVisible, SetUserProfileVisible] = useState(false);
  const [selectedUser, SetSelectedUser] = useState(null);
  const [loading, SetLoading] = useState(false);

  const { users } = useSelector((state) => state.users);
  // console.log('users =>', users)

  useEffect(() => {
    dispatch(Actions.getAllUsers());
  }, []);

  useEffect(() => {
    SetUserList(users);
  }, [users]);

  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status';
      let tagetValue = value;
      const data = utils.filterArray(users, key, tagetValue);
      SetUserList(data);
    } else {
      SetUserList(users);
    }
  };

  const showUserProfile = (userInfo) => {
    SetUserProfileVisible(true);
    SetSelectedUser(userInfo);
  };

  const closeUserProfile = () => {
    SetUserProfileVisible(false);
    SetSelectedUser(null);
  };

  const editItem = (id) => {
    // console.log('id =>', id)
    history.push(`/app/users/${id}`);
  };

  const deleteUser = (userId) => {
    // dispatch(Actions.deleteUser(userId));
  };

  const cancel = (e) => {
    message.error('Click on No');
  };

  const importAllUsersFromJson = () => {
    // console.log('yes clicked');
    const finalData = [];
    SetLoading(true);
    // console.log('final data =>', finalData)

    api.post(`/user/json`, finalData).then((res) => {
      // console.log('res data =>', res)
      SetLoading(false);
    });
  };

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: ' Name',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={30}
            src={record.avatar}
            name={
              record.firstname
                ? record.firstname
                : '' + ' ' + record.lastname
                ? record.lastname
                : ''
            }
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.email}</span>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinedDate',
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.joinedDate}</span>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'joinedDate'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => (
        <span
          style={{
            color:
              record.status === USER_STATUS.PENDING
                ? 'orange'
                : record.status === USER_STATUS.ACTIVATED
                ? '#75ac2a'
                : 'red',
          }}
        >
          {record.status}
        </span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'preferedRole',
      dataIndex: 'preferedRole',
      render: (_, record) => <span>{record.preferedRole?.name}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'preferedRoleId'),
    },
    {
      title: 'Email Verify',
      dataIndex: 'emailVerified',
      render: (_, record) => <span>{record.emailVerified}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'emailVerified'),
    },
    {
      title: 'Phone Verify',
      dataIndex: 'phoneVerified',
      render: (_, record) => <span>{record.phoneVerified}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'phoneVerified'),
    },
    {
      title: 'Linkedin Login',
      dataIndex: 'isLoginWithLinkedin',
      render: (_, record) => <span>{record.isLoginWithLinkedin}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'isLoginWithLinkedin'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Space>
          <Tooltip title="View/Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={(e) => editItem(elm.id)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteUser(elm.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? userList : users;
    const data = utils.wildCardSearch(searchArray, value);
    SetUserList(data);
  };
  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleShowStatus}
              placeholder="All"
            >
              <Option value="All"> All </Option>
              {statusList.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select>
          </div>
        </Flex>
        <div style={{ display: 'flex' }}>
          {loading && (
            <div className="loading-spinner">
              <Spin />
            </div>
          )}
          <Space>
            <Tooltip title="Create User">
              <CreateUserButton />
            </Tooltip>
            <Tooltip title="Import Users">
              <Upload showUploadList={false} action={`${API_BASE_URL}/user/json`}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  block
                >
                  Import Users
                </Button>
              </Upload>
            </Tooltip>
            {/* <Button type="primary" icon={<FileExcelOutlined />} block>Export All</Button>   */}
          </Space>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table rowKey='id' columns={tableColumns} dataSource={userList} />
      </div>
    </Card>
  );
};

export default AllUsers;
