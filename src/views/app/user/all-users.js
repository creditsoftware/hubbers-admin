/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Button, Popconfirm, Tooltip, message, Spin, Upload, Space } from 'antd';
import { EyeOutlined, FileExcelOutlined, SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AvatarStatus from '../../../components/shared-components/AvatarStatus';
import Flex from '../../../components/shared-components/Flex'
import utils from '../../../helpers/utils/index'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../../redux/actions'
import { useHistory } from "react-router-dom";
import oldUsers from '../../../data/user'
import api from '../../../ApiConfig'
import CreateUserButton from './create-user';

const { Option } = Select

const statusList = ['PENDING', 'ACTIVATED', 'DECLINED']

const AllUsers = () => {

  let history = useHistory();
  const dispatch = useDispatch()

  const [userList, SetUserList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [userProfileVisible, SetUserProfileVisible] = useState(false)
  const [selectedUser, SetSelectedUser] = useState(null)
  const [loading, SetLoading] = useState(false)

  const { users } = useSelector(state => state.users)
  console.log('users =>', users)

  useEffect(() => {
    dispatch(Actions.getAllUsers());
  }, []);

  useEffect(() => {
    SetUserList(users)
  }, [users]);

  const handleShowStatus = value => {
    if (value !== 'All') {
      const key = 'status'
      let tagetValue = value
      const data = utils.filterArray(users, key, tagetValue)
      SetUserList(data)
    } else {
      SetUserList(users)
    }
  }

  const showUserProfile = userInfo => {
    SetUserProfileVisible(true)
    SetSelectedUser(userInfo)
  }

  const closeUserProfile = () => {
    SetUserProfileVisible(false)
    SetSelectedUser(null)
  }

  const editItem = id => {
    console.log('id =>', id)
    history.push(`/app/users/${id}`)
  } 

  const deleteUser = userId => {
    // dispatch(Actions.deleteUser(userId));
  }

  const cancel = (e) => {
    message.error('Click on No');
  }

  const importAllUsersFromJson = () => {
    console.log('yes clicked');
    const finalData = [];
    oldUsers.forEach(element => {
      const dataItem = {
       firstname: element.name,
       lastname: element.lastname,
       email: element.email,
       password: 'initial',
       avatar: element.thumbnailImageUrl,
       preferedRoleId: 1,
       rememberToken: '',
       resetPasswordToken: '',
       status: 'ACTIVATED',
       roleIds: [1],
       phoneNumberCountryCode: element.phoneNumberCountryCode,
       phoneNumber: element.phoneNumber,
       phoneVerified: element.phoneVerified,
       emailVerified: element.emailVerified,
       gender: element.gender,
       birthday: null,
       bio: element.bio,
       headLine: element.headLine,
       industry: '',
       workingContactTime: element.workingContactTime,
       contactTime: element.contactTime,
       doingWork: null,
       address: element.address,
       nationality: element.nationality,
       joinedDate: null,
       isLoginWithLinkedin: element.isLoginWithLinkedin ? element.isLoginWithLinkedin : false,
       location: {
         postCode: '',
         city: element.locations.length > 0 ? element.locations[0].city : '',
         state: element.locations.length > 0 ? element.locations[0].state : '',
         country: element.locations.length > 0 ? element.locations[0].country : '',
       }
      }
      finalData.push(dataItem)
    });

    SetLoading(true);
    console.log('final data =>', finalData)

    api.post(`/user/json`, finalData).then(res => {
      console.log('res data =>', res)
      SetLoading(false)
    })

  }

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: ' Name',
      dataIndex: 'firstname',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus size={30} src={record.avatar} name={record.firstname + ' ' + record.lastname} />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'firstname')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.email}</span>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinedDate',
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.joinedDate}</span>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'joinedDate')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => (
       <span style = {{color: record ? 'blue' : 'red'}}>{record ? 'true' : 'false'}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
    },
    {
      title: 'preferedRole',
      dataIndex: 'preferedRole',
      render: (_, record) => (
        <span>{record.preferedRole?.name}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'preferedRoleId')
    },
     {
      title: 'Email Verify',
      dataIndex: 'emailVerified',
      render: (_, record) => (
        <span>{record.emailVerified}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'emailVerified')
    },
     {
      title: 'Phone Verify',
      dataIndex: 'phoneVerified',
      render: (_, record) => (
        <span>{record.phoneVerified}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'phoneVerified')
    },

     {
      title: 'Linkedin Login',
      dataIndex: 'isLoginWithLinkedin',
      render: (_, record) => (
        <span>{record.isLoginWithLinkedin}</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'isLoginWithLinkedin')
    },

    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="View">
            <Button type="primary" className="mr-2" icon={<EditOutlined />} onClick={(e) => editItem(elm.id)} size="small" />
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
        </div>
      )
    }
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows)
      setSelectedRowKeys(key)
    }
  };

  const onSearch = e => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? userList : users
    const data = utils.wildCardSearch(searchArray, value)
    SetUserList(data)
    setSelectedRowKeys([])
  }

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
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
              {statusList.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
            </Select>
          </div>
        </Flex>
        
        <div style = {{display: 'flex'}}>
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
              <Upload>
                <Button type="primary" icon={<PlusOutlined />} block className = "mr-2">Import Users</Button>  
              </Upload>
            </Tooltip>
            {/* <Button type="primary" icon={<FileExcelOutlined />} block>Export All</Button>   */}
          </Space>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={userList}
          rowKey='id'
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: 'checkbox',
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
        />
      </div>
    </Card>
  )
}

export default AllUsers
