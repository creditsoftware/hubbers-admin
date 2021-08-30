import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Drawer, Form, Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as Actions from '../../../../redux/actions';
import ContestConfirm from './component/ContestConfirm';
import ContestDescription from './component/ContestDescription';

const EditContestList = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [form] = Form.useForm();
  const [editValue, setEditValue] = useState();
  useEffect(() => {
    const v = data.filter((d) => d.id === id)[0];
    setEditValue({ ...v });
  }, [data, id, form]);
  const showDrawer = () => {
    const productId = editValue.products.map((val) => {
      return val.id;
    });
    const innovationId = editValue.innovations.map((val) => {
      return val.id;
    });
    const techId = editValue.techs.map((val) => {
      return val.id;
    });
    const countryId = editValue.country.map((val) => {
      return val.id;
    });
    form.setFieldsValue({
      ...editValue,
      productId,
      innovationId,
      techId,
      countryId,
    });
    setVisible(true);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenClose = () => {
    setChildrenDrawer(false);
  };
  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };
  const onSubmit = (values) => {
    dispatch(Actions.updateContestList({ ...values, id }));
    onClose();
  };

  return (
    <>
      <Tooltip title="View / Edit">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={showDrawer}
          size="small"
        />
      </Tooltip>
      <Drawer
        title="Edit a New Contest"
        width={1024}
        onClose={onClose}
        visible={visible}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="px-4 py-5"
        >
          <ContestConfirm form={form} />
          <ContestDescription
            childrenVisible={childrenDrawer}
            onChildrenShow={showChildrenDrawer}
            onChildrenClose={onChildrenClose}
            form={form}
          />
          <div className="pb-2">
            <Button onClick={onClose} style={{ marginRight: 12 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default EditContestList;
