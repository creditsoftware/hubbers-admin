/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Card, Table, Input, Button, Tooltip, message, Popconfirm, Modal, Form, Col, Row, } from 'antd';
import { FileExcelOutlined, SearchOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Flex from '../../../../components/shared-components/Flex'
import utils from '../../../../helpers/utils/index'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../../../redux/actions'
import { useHistory } from "react-router-dom";

const AllProductTypes = () => {
  const dispatch = useDispatch();

  const [dataList, SetdataList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItemId, SetEditItemId] = useState(null);
  const [index, SetIndex] = useState(null);
  const [targetName, SetTargeName] = useState('');

  const [form] = Form.useForm();

  const { productTypeData } = useSelector(state => state.productionType)

  useEffect(() => {
    dispatch(Actions.getAllProductTypes());
  }, [dispatch]);

  useEffect(() => {
    SetdataList(productTypeData);
  }, [productTypeData]);

  const editItem = (elm) => {
    setIsModalVisible(true);
    SetEditItemId(elm.id);
    SetIndex(elm.index);
    form.setFieldsValue({
      name: elm.name,
      index,
    });
  };

  const deleteItem = id => {
    dispatch(Actions.deleteInnovationType(id));
  };

  const cancel = (e) => {
    message.error('Click on No');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    let values = { id: editItemId, name: targetName }
    // dispatch(Actions.updateInnovationType(values));
    setIsModalVisible(false)
  };

  const changeName = (e) => {
    SetTargeName(e.target.value);
  };

  const plusIndex = (elm) => { };

  const downIndex = (elm) => { };

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.name}</span>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="Up">
            <Button
              type="primary"
              className="mr-2"
              icon={<ArrowUpOutlined />}
              onClick={() => plusIndex(elm)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Down">
            <Button
              type="primary"
              className="mr-2"
              icon={<ArrowDownOutlined />}
              onClick={() => downIndex(elm)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              type="primary"
              className="mr-2"
              icon={<EditOutlined />}
              onClick={() => editItem(elm)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => deleteItem(elm.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const { value } = e.currentTarget;
    const searchArray = e.currentTarget.value ? dataList : productTypeData;
    const data = utils.wildCardSearch(searchArray, value);
    SetdataList(data);
    setSelectedRowKeys([]);
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
        </Flex>
        <div>
          <Button type="primary" icon={<FileExcelOutlined />} block>
            Export All
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={dataList}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            type: 'checkbox',
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
        />

        <Modal
          title="Edit Innovation Type"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Update
            </Button>,
          ]}
        >
          <Form layout="vertical" hideRequiredMark form={form}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Innovation Type name',
                    },
                  ]}
                >
                  <Input
                    placeholder="Please enter Innovation Type name"
                    onChange={(e) => changeName(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </Card>
  );
};

export default AllProductTypes;
