import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import { Drawer, Form, Button, Col, Input, Select, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as Actions from '../../../../redux/actions';
import basicTypeCategory from '../../../../constants/basicTypeCategory';
import UploadImage from '../../../../components/UploadImage';

const { Option } = Select;
const { TextArea } = Input;

const EditCountry = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isContest, setIsContest] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      setIsContest(filterData[0].category === 'contest');
      form.setFieldsValue({
        name: filterData[0].name,
        category: filterData[0].category,
        featuredImg: filterData[0].featuredImg,
        description: filterData[0].description,
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.updateBasicType({ ...values, id }));
    onClose();
  };

  return (
    <>
      <Tooltip title="View/Edit">
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={showDrawer}
        />
      </Tooltip>
      <Drawer
        title="Edit a Basic Type"
        width={500}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          className="p-4 mt-4"
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: 'Please enter Basic Type Name' },
                ]}
              >
                <Input placeholder="Please enter Country Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="category"
                label="Type Category"
                rules={[
                  { required: true, message: 'Please choose a Type Category' },
                ]}
              >
                <Select
                  placeholder="Please choose the Type Category"
                  onChange={(e) => setIsContest(e === 'contest')}
                >
                  {basicTypeCategory.map((item) => {
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

export default EditCountry;
