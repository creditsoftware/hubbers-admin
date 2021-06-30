import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { Drawer, Form, Button, Col, Input, Select, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ColorPicker from '../../../../components/util-components/ColorPicker';
import UploadImage from '../../../../components/UploadImage';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;
const { TextArea } = Input;

const CreateTopic = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const [communityList, SetCommunityList] = useState(null);
  const { communityAll, member } = useSelector((state) => state);
  const [memberList, setMemberList] = useState(null);

  useEffect(() => {
    dispatch(Actions.getAllMember());
    dispatch(Actions.getAllCommunity());
  }, [dispatch]);

  useEffect(() => {
    setMemberList(member.list);
  }, [member]);

  useEffect(() => {
    SetCommunityList(communityAll.community);
  }, [communityAll]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createTopic(values));
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
              Published
              <Form.Item
                name="published"
                valuePropName="checked"
                className="mb-0"
              >
                <Switch defaultChecked />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Topic Name"
                rules={[{ required: true, message: 'Please enter Topic Name' }]}
              >
                <Input placeholder="Please enter Topic Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="topicType"
                label="Topic Type"
                rules={[{ required: true, message: 'Please choose a Type' }]}
                className="mr-2"
              >
                <Select placeholder="Please choose the Type">
                  <Option value="default">Default</Option>
                  <Option value="featured">Featured</Option>
                  <Option value="welcome">Welcome</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="communityId"
                label="Community Name"
                rules={[
                  { required: true, message: 'Please choose a Community' },
                ]}
                className="ml-2"
              >
                <Select placeholder="Please choose the Community">
                  {communityList &&
                    communityList.map((item) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contributorRole"
                label="Contributor Role"
                rules={[{ required: true, message: 'Please choose a Role' }]}
                className="mr-2"
              >
                <Select placeholder="Please choose the Role">
                  <Option value="all_members">All Members</Option>
                  <Option value="host_moderators">Host Moderator</Option>
                </Select>
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
                <Select style={{ width: '100%' }} placeholder="Creator">
                  {memberList &&
                    memberList.map((u) => {
                      return (
                        <Option key={u.id} value={u.id}>
                          {`${u.community?.name} / ${u.user?.email}`}
                        </Option>
                      );
                    })}
                </Select>
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

export default CreateTopic;
