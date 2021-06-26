import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { Drawer, Form, Button, Col, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;

const Create = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [userList, SetUserList] = useState(null);
  const [communityList, setCommunityList] = useState(null);
  const [memberRoleList, setMemberRoleList] = useState(null);
  const { users } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const { communityAll, memberRole } = useSelector((state) => state);

  useEffect(() => {
    dispatch(Actions.getAllUsers());
    dispatch(Actions.getAllCommunity());
    dispatch(Actions.getAllMemberRoles());
  }, [dispatch]);

  useEffect(() => {
    SetUserList(users);
    setCommunityList(communityAll.community);
    setMemberRoleList(memberRole.list);
  }, [users, communityAll, memberRole]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createMember(values));
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Create New Community Member
      </Button>
      <Drawer
        title="Create a New Community Member"
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
          className="p-4 mt-4"
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="communityId"
                label="Community"
                rules={[{ required: true, message: 'Please select!' }]}
              >
                <Select style={{ width: '100%' }} placeholder="Community">
                  {communityList &&
                    communityList.map((community) => {
                      return (
                        <Option key={community.id} value={community.id}>
                          {community.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="userId"
                label="User"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the User',
                  },
                ]}
                className="ml-2"
              >
                <Select placeholder="Please choose the User">
                  {userList &&
                    userList.map((item) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {item.email}
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
                name="roleId"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the role',
                  },
                ]}
                className="ml-2"
              >
                <Select placeholder="Please choose the role">
                  {memberRoleList &&
                    memberRoleList.map((item) => {
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
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
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

export default Create;
