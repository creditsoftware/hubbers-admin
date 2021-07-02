import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { Drawer, Form, Button, Col, Input, Select, Switch, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as Actions from '../../../../redux/actions';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';

const { Option } = Select;
const { TextArea } = Input;

const GroupEdit = ({ id, data }) => {

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [published, setPublished] = useState(true);
  const [privacyOption, setPrivacyOption] = useState(null);
  const { groupPrivacyOptionList } = useSelector((state) => state.groupPrivacyOption);

  useEffect(() => {
    dispatch(Actions.getAllGroupPrivacyOption());
  }, [dispatch]);

  useEffect(() => {
    setPrivacyOption(groupPrivacyOptionList);
  }, [groupPrivacyOptionList]);

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        title: filterData[0].title,
        communityId: filterData[0].communityId,
        privacyOptionId: filterData[0].privacyOptionId,
        createdBy: filterData[0].createdBy,
        tagLine: filterData[0].tagLine,
        description: filterData[0].description,
        published: filterData[0].published,
      });
    }
    setPublished(filterData[0].published);
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = (values) => {
    values.id = id;
    values.published = published;
    dispatch(Actions.updateGroup(values));
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<EditOutlined />} size="small"/>
      <Drawer
        title="Update a Group"
        width={542}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="p-4 pt-5"
        >
          <Row>
            <Col span={24} className="text-right">
              <Space>
                <label className="mb-0 mt-1">Published</label>
                <Form.Item
                  name="published"
                  className="mb-0"
                >
                  <Switch checked={published} onChange={setPublished} />
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Group Title"
                rules={[{ required: true, message: 'Please enter Group Title' }]}
              >
                <Input placeholder="Please enter Group Title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="communityId"
                label="Community Name"
                rules={[
                  { required: true, message: 'Please choose a community' },
                ]}
                className="mr-2"
              >
                <CommunitySelect />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="privacyOptionId"  
                label="Privacy Option"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the Option',
                  },
                ]}
                className="ml-2"
              >
                <Select style={{ width: '100%' }} placeholder="Please choose the Option">
                  {privacyOption &&
                    privacyOption.map((item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="createdBy"
                label="Created By"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the User',
                  },
                ]}
              >
                <UserSelect />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="tagLine" label="Tag Line">
                <TextArea rows={3} placeholder="Please enter Tag Line" />
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
            <Col span={24} className="text-right">
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default GroupEdit;
