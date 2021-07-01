import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import { Drawer, Form, Button, Col, Input, Select, Switch, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ColorPicker from '../../../../components/util-components/ColorPicker';
import UploadImage from '../../../../components/UploadImage';
import * as Actions from '../../../../redux/actions';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import CommunityMemberSelect from '../../../../components/util-components/selector/CommunityMemberSelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';

const { Option } = Select;
const { TextArea } = Input;

const Create = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createGroup(values));
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Create New Topic
      </Button>
      <Drawer
        title="Create a New Topic"
        width={500}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="p-4"
        >
          <Row>
            <Col span={24} className="text-right">
              <Space>
                <Form.Item
                  name="published"
                  label="Published"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch defaultChecked />
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter Title' }]}
              >
                <Input placeholder="Please enter Title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="communityId"
                label="Community Name"
                rules={[
                  { required: true, message: 'Please choose a Community' },
                ]}
                className="ml-2"
              >
                <CommunitySelect />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="createdBy"
                label="Created By"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the User',
                  },
                ]}
                className="ml-2"
              >
                <UserSelect />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <TextArea rows={3} placeholder="Please enter Description" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="backgroundImageUrl"
                label="Background Image"
                className="mr-2 mb-0"
              >
                <UploadImage />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="color" label="Color" className="ml-2 mb-0">
                <ColorPicker />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-right">
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Create;
