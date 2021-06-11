import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Button,
  Select,
  Upload,
  Checkbox,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../../redux/actions';
import AvatarUpload from '../../../components/util-components/Upload/AvatarUpload';

const { Option } = Select;

const EditUser = () => {
  const history = useHistory();
  const params = useParams();

  const [uploadedImg, setImage] = useState('');

  const { singleUser } = useSelector((state) => state.users);
  const { userRoleData } = useSelector((state) => state.userRole);
  console.log('sxxxx =>', userRoleData);
  console.log('single user =>', singleUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getSingleUser(params.id));
    dispatch(Actions.getAllUserRoles());
  }, [dispatch, params.id]);

  useEffect(() => {
    if (singleUser) {
      setImage(singleUser.avatar);
    }
  }, [singleUser]);

  const onUpdateItem = (values) => {
    values.avatar = uploadedImg;
    console.log('update user =>', values);
    // dispatch(Actions.updateUser(params.id, values));
    history.push('/app/users');
  };

  const onClose = () => {
    history.push('/app/users');
  };

  const onChangeAvatar = (imageUrl) => {
    setImage(imageUrl);
  };

  const onChangePassword = () => {
    console.log('change password');
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="User Information">
          {singleUser && (
            <Form
              layout="vertical"
              name="permission-form"
              onFinish={onUpdateItem}
              initialValues={{
                firstname: singleUser.firstname,
                lastname: singleUser.lastname,
                email: singleUser.email,
                status: singleUser.status,
                preferedRole: singleUser.preferedRole?.name,
                role: singleUser.role,
              }}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12} md={6}>
                  <AvatarUpload
                    statusChange={onChangeAvatar}
                    image={uploadedImg}
                  />
                </Col>
                <Col xs={24} sm={12} md={2} />
                <Col xs={24} sm={12} md={16}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstname"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter First Name',
                          },
                        ]}
                      >
                        <Input placeholder="Please enter First Name" />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="lastname"
                        label="Last Name"
                        rules={[
                          { required: true, message: 'Please enter Last Name' },
                        ]}
                      >
                        <Input placeholder="Please enter Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Please enter email' },
                        ]}
                      >
                        <Input placeholder="Please enter email" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                          {
                            required: true,
                            message: 'Please choose the status',
                          },
                        ]}
                      >
                        <Select placeholder="Please choose the status">
                          <Option value="PENDING">PENDING</Option>
                          <Option value="ACTIVATED">ACTIVATED</Option>
                          <Option value="DECLINED">DECLINED</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="preferedRole"
                        label="preferedRole"
                        rules={[
                          {
                            required: true,
                            message: 'Please choose the preferedRole',
                          },
                        ]}
                      >
                        <Select placeholder="Please choose the value">
                          {userRoleData &&
                            userRoleData.map((item, index) => {
                              return (
                                <Option value={item.id} key={index}>
                                  {item.name}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="role"
                        label="Role"
                        rules={[
                          { required: true, message: 'Please choose the Role' },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          style={{ width: '100%' }}
                          placeholder="Enter Role"
                          defaultValue={[]}
                          onChange={() => {}}
                          optionLabelProp="label"
                        >
                          {userRoleData.map((item, i) => {
                            return (
                              <Option value={item.id} label={item.name} key={i}>
                                <span>{item.name}</span>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <div style={{ textAlign: 'right' }}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  Back
                </Button>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Card>

        <Card title="Detail Information" className="mt-2">
          d
        </Card>
        <Card title="Education" className="mt-2" />

        <Card title="Reset Password" className="mt-2">
          <Form layout="vertical" onFinish={onChangePassword}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="old_password"
                  label="Old Password"
                  rules={[
                    { required: true, message: 'Please Enter old password' },
                  ]}
                >
                  <Input placeholder="old password" type="password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="new_password"
                  label="New Password"
                  rules={[{ required: true, message: 'Please enter Password' }]}
                >
                  <Input placeholder="New Password" type="password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirm_password"
                  label="Confirm New Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Confirm New Password',
                    },
                  ]}
                >
                  <Input placeholder="Confirm New Password" type="password" />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Rest Password
            </Button>
          </Form>
        </Card>

        <Card
          title="Transactions"
          className="mt-2"
          extra={<Button type="primary">Add New</Button>}
        />
      </Col>
    </Row>
  );
};

export default EditUser;
