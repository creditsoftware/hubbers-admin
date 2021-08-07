import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import * as Actions from '../../../../redux/actions';
import CreateModuleType from './create';
import EditModuleType from './edit';

const List = () => {
  const dispatch = useDispatch();
  const [moduleTypeList, setModuleTypeList] = useState(null);
  const { list } = useSelector((state) => state.moduleType);
  useEffect(() => {
    dispatch(Actions.getAllModuleType());
  }, [dispatch]);

  useEffect(() => {
    setModuleTypeList(list);
  }, [list]);

  console.log(moduleTypeList);

  const handleDelete = (id) => {
    dispatch(Actions.deleteModuleType(id));
  };
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
    },
    {
      title: 'name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'description',
      dataIndex: 'description',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'description'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditModuleType id={elm.id} data={moduleTypeList} />
          <Popconfirm
            title="Do you remove this ModuleType?"
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
        <CreateModuleType />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={moduleTypeList}
        />
      </div>
    </Card>
  );
};
export default List;
