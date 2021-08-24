import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Popconfirm, Image, Space } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import * as Actions from '../../../../redux/actions';
import Avatar from 'antd/lib/avatar/avatar';
import CreateContestMember from './create';
// import EditContestList from './edit';
// import CreateUserButton from './create-user';
// import EditDescription from './edit';

const ContestMemberList = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState(null);
  const { contestMemberList } = useSelector((state) => state.contestList);
  useEffect(() => {
    dispatch(Actions.getAllContestMemberList());
  }, [dispatch]);

  useEffect(() => {
    setList(contestMemberList);
  }, [contestMemberList]);

  const handleDelete = (id) => {
    dispatch(Actions.deleteContestMemberList(id));
  };
  const handleChageRole = (id, isActive) => {
    dispatch(Actions.updateContestMemberList({id, isActive}))
  }

  const tableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      /* eslint-disable */
      render: (_, record) => (
        <Space>
          <Avatar width={50} preview={false} src={record.user.avatar}/>
        </Space>
      ),
      /* eslint-enable */
    },
    {
      title: 'User',
      dataIndex: 'email',
      /* eslint-disable */
      render: (_, record) => (
        <span>
          {record.user.email}
        </span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'email'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      /* eslint-disable */
      render: (_, record) => (
        <span>
          {record.role === 'contestant' ? 'contestant' : 'judge'}
        </span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'role'),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      /* eslint-disable */
      render: (_, record) => (
        <span>{Math.ceil((new Date().getTime() - new Date(record.createdAt).getTime())/1000/3600/24)} days ago.</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'time'),
    },
    {
      title: 'Contest',
      dataIndex: 'name',
      /* eslint-disable */
      render: (_, record) => (
        <span>
          {record.contest.name}
        </span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      /* eslint-disable */
      render: (_, record) => (
        <span>
          {record.isActive ? <span style={{color: 'green'}}>Active</span> :  <span style={{color: 'red'}}>InActive</span>}
        </span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'role'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          {/* <EditContestList id={elm.id} data={list} /> */}
          {
          !elm.isActive ?
            <Popconfirm
              title="Are you sure you wish to approve this contestant ?"
              onConfirm={() => handleChageRole(elm.id, true)}
              okText="Yes"
              cancelText="No"
            >
              <Button success size="small" type="primary">Accept</Button>
            </Popconfirm> : <Popconfirm
              title="Are you sure you wish to reject this contestant ?"
              onConfirm={() => handleChageRole(elm.id, false)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small">Reject</Button>
            </Popconfirm>
          }
          <Popconfirm
            title="Do you remove this admin?"
            onConfirm={() => handleDelete(elm.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
      /* eslint-enable */
    },
  ];
  return (
    <Card>
      <div className="w-100 text-right mb-3">
        <CreateContestMember />
      </div>
      <div className="table-responsive">
        <Table rowKey="id" columns={tableColumns} dataSource={list} />
      </div>
    </Card>
  );
};
export default ContestMemberList;
