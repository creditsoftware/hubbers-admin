import React, { useState, useEffect } from 'react';
import { Card, Space, Table, Popconfirm, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../../redux/actions';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';
import MemberCreate from './create';
import MemberEdit from './edit';

const MemberList = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState(null);
  const { memberList } = useSelector((state) => state.hubbersTeam);

  useEffect(() => {
    dispatch(Actions.getAllHubbersTeam());
  }, [dispatch]);

  useEffect(() => {
    setList(memberList);
  }, [memberList]);

  const handleOrder = (id, flag) => {
    dispatch(Actions.orderHubbersTeam(id, flag));
  };

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinedDate',
    },
    {
      title: 'Terminate Date',
      dataIndex: 'terminatedDate',
    },
    {
      title: 'Published',
      dataIndex: 'published',
      /* eslint-disable */
      render: (_, record) => (
        <span
          style={{
            color: `${record.published ? '#75ac2a' : 'red'}`
          }}
        >
          {record.published ? 'Publish' : 'Not Publish'}
        </span>
      ),
      /* eslint-enable */
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <MemberEdit id={elm.id} data={list} />
          <Popconfirm
            title="Are you sure remove this member?"
            onConfirm={() => dispatch(Actions.deleteHubbersTeam(elm.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
          <Button size="small" type="default" icon={<ArrowUpOutlined />} onClick={()=>handleOrder(elm.id, 'true')} />
          <Button size="small" type="default" icon={<ArrowDownOutlined />} onClick={()=>handleOrder(elm.id, 'false')} />
        </Space>
      ),
      /* eslint-enable */
    },
  ];
  return (
    <Card>
      <div className="w-100 text-right mb-3">
        <MemberCreate />
      </div>
      <div className="table-responsive">
        <Table rowKey="id" columns={tableColumns} dataSource={list} />
      </div>
    </Card>
  );
};
export default MemberList;
