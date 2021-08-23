import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Popconfirm, Image, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import * as Actions from '../../../../redux/actions';
import CreateContestList from './create';
import EditContestList from './edit';
// import CreateUserButton from './create-user';
// import EditDescription from './edit';

const ContestList = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState(null);
  const { contestList } = useSelector((state) => state.contestList);
  useEffect(() => {
    dispatch(Actions.getAllContestList());
  }, [dispatch]);

  useEffect(() => {
    setList(contestList);
  }, [contestList]);

  const handleDelete = (id) => {
    dispatch(Actions.deleteContestList(id));
  };

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
          <Image width={80} preview={false} src={record.featuredImageUrl}/>
        </Space>
      ),
      /* eslint-enable */
    },
    {
      title: 'Judges',
      dataIndex: 'nbJudge',
      /* eslint-disable */
      render: (_, record) => (
        <span>
          {record.nbJudge}
        </span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'nbJudge'),
    },
    {
      title: 'Contestants',
      dataIndex: 'nbContestant',
      /* eslint-disable */
      render: (_, record) => (
        !record.nbContestant ? <span>All</span> : <span>{record.nbContestant}</span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'nbContestant'),
    },
    {
      title: 'Views',
      dataIndex: 'view',
      /* eslint-disable */
      render: (_, record) => (
        <span>
          {record.view.length}
        </span>
      ),
      /* eslint-enable */
      sorter: (a, b) => utils.antdTableSorter(a, b, 'view'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditContestList id={elm.id} data={list} />
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
        <CreateContestList />
      </div>
      <div className="table-responsive">
        <Table rowKey="id" columns={tableColumns} dataSource={list} />
      </div>
    </Card>
  );
};
export default ContestList;
