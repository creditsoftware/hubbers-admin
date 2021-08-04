import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import { Drawer, Form, Button, Col, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Actions from '../../../../redux/actions';
import basicTypeCategory from '../../../../constants/basicTypeCategory';
import UploadImage from '../../../../components/UploadImage';

const { Option } = Select;
const { TextArea } = Input;

const CreateBasicType = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isContest, setIsContest] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createBasicType(values));
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Create New BasicType
      </Button>
      <Drawer
        title="Create a New Basic Type"
        width={400}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="p-4 pt-5 mt-5"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="BasicType Name"
                rules={[
                  { required: true, message: 'Please enter BasicType Name' },
                ]}
              >
                <Input placeholder="Please enter BasicType Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="category"
                label="BasicType Category"
                rules={[
                  {
                    required: true,
                    message: 'Please choose BasicType Category',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Type Category"
                  onChange={(e) => setIsContest(e === 'contest')}
                >
                  {basicTypeCategory?.map((item) => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {isContest && (
            <>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter description',
                      },
                    ]}
                  >
                    <TextArea type="text" placeholder="description" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="featuredImg"
                    rules={[
                      {
                        required: true,
                        message: 'Please upload image',
                      },
                    ]}
                  >
                    <UploadImage />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
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

export default CreateBasicType;
