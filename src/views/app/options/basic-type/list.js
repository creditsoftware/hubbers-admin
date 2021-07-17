import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space, Table, Popconfirm, Button, Select } from 'antd';
import { DeleteOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import utils from '../../../../helpers/utils/index';
import * as Actions from '../../../../redux/actions';
import CreateBasicType from './create';
import EditBasicType from './edit';

const { Option } = Select;

const BasicTypeList = () => {
  const dispatch = useDispatch();
  const [basicTypeList, setBasicTypeList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const { list } = useSelector((state) => state.basicType);
  const { typeList } = useSelector((state) => state.basicTypeCategory);
  const [pagination, setPagenation] = React.useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(Actions.getAllBasicTypeCategory());
    dispatch(Actions.getAllBasicType(0));
  }, [dispatch]);

  useEffect(() => {
    setCategoryList(typeList);
  }, [typeList]);

  useEffect(() => {
    setBasicTypeList(list);
  }, [list]);

  const deleteBasicType = (id) => {
    dispatch(Actions.deleteBasicType(id));
  };

  const handleCategory = (value) => {
    dispatch(Actions.getAllBasicType(value));
  }

  const handleOrder = (id, flag) => {
    dispatch(Actions.orderBasicType(id, flag));
  };

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: ' Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      /* eslint-disable */
      render: (_, elm) => (
        <Space>
          <EditBasicType id={elm.id} data={basicTypeList} category={categoryList} />
          <Popconfirm
            title="Are you sure delete this Item?"
            onConfirm={() => deleteBasicType(elm.id)}
            onCancel={() => console.log('Canceled to delete')}
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
  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };
  return (
    <Card>
      <div className="d-flex mb-3" style={{ justifyContent: 'space-between' }}>
        <Select style={{ width: 200 }} onChange={handleCategory} placeholder="Type Category">
          <Option key={0} value={0}>All</Option>
          {
            categoryList?.map((item,index)=>{
              return(
                <Option key={index+1} value={item.id}>{item.name}</Option>
              );
            })
          }
        </Select>
        <CreateBasicType categoryList={categoryList} />
      </div>
      <div className="table-responsive">
        <Table
          rowKey="id"
          columns={tableColumns}
          dataSource={basicTypeList}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  );
};
export default BasicTypeList;