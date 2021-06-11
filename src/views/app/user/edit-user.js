import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
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
  DatePicker,
  Space,
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
    dispatch(Actions.updateUser(params.id, values));
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
              preferedRoleId: singleUser.preferedRole?.id,
              roleIds: singleUser.roles.map((role) => role.id),
              phoneNumberCountryCode: singleUser.detail?.phoneNumberCountryCode,
              phoneNumber: singleUser.detail?.phoneNumber,
              phoneVerified: singleUser.detail?.phoneVerified,
              emailVerified: singleUser.detail?.emailVerified,
              gender: singleUser.detail?.gender,
              birthday: moment(singleUser.detail?.birthday),
              bio: singleUser.detail?.bio,
              headLine: singleUser.detail?.headLine,
              industry: singleUser.detail?.industry,
              workingContactTime: singleUser.detail?.workingContactTime,
              contactTime: singleUser.detail?.contactTime,
              doingWork: singleUser.detail?.doingWork,
              address: singleUser.detail?.address,
              nationality: singleUser.detail?.nationality,
              joinedDate: moment(singleUser.detail?.joinedDate),
            }}
          >
            <Card
              title={
                <>
                  <span>User Information</span>
                  <Space style={{ float: 'right' }}>
                    <Button onClick={onClose}>Back</Button>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Space>
                </>
              }
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
                        name="preferedRoleId"
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
                            userRoleData.map((item) => {
                              return (
                                <Option value={item.id} key={item.id}>
                                  {item.name}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="roleIds"
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
                          {userRoleData.map((item) => {
                            return (
                              <Option
                                value={item.id}
                                label={item.name}
                                key={item.id}
                              >
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
            </Card>
            <Card title="Detail Information" className="mt-2">
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name="phoneNumberCountryCode"
                    label="Phone number country code"
                  >
                    <Input placeholder="Please enter Phone number country code." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="phoneNumber" label="Phone number">
                    <Input placeholder="Please enter Phone number" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="phoneVerified" label="Phone verified">
                    <Select placeholder="Please choose verified status">
                      <Option value>Verified</Option>
                      <Option value={false}>Not verified</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="emailVerified" label="Email verified">
                    <Select placeholder="Please choose verified status">
                      <Option value>Verified</Option>
                      <Option value={false}>Not verified</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                      { required: true, message: 'Please choose gender' },
                    ]}
                  >
                    <Select placeholder="Please choose gender">
                      <Option value="man">Man</Option>
                      <Option value="woman">Woman</Option>
                      <Option value="both">Both</Option>
                      <Option value="guess">Guess</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="birthday"
                    label="Birthday"
                    rules={[
                      { required: true, message: 'Please choose birthday' },
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="bio"
                    label="Bio"
                    rules={[
                      { required: true, message: 'Please choose birthday' },
                    ]}
                  >
                    <Input placeholder="Please enter bio." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="headLine" label="headLine">
                    <Input placeholder="Please enter headLine." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="industry" label="industry">
                    <Input placeholder="Please enter industry." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="workingContactTime"
                    label="workingContactTime"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose workingContactTime',
                      },
                    ]}
                  >
                    <Input placeholder="Please enter workingContactTime." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="contactTime"
                    label="contactTime"
                    rules={[
                      { required: true, message: 'Please choose contactTime' },
                    ]}
                  >
                    <Input placeholder="Please enter contactTime." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="doingWork"
                    label="doingWork"
                    rules={[
                      { required: true, message: 'Please choose doingWork' },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Please enter doingWork."
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="address"
                    label="address"
                    rules={[
                      { required: true, message: 'Please choose address' },
                    ]}
                  >
                    <Input placeholder="Please enter address." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="nationality"
                    label="nationality"
                    rules={[
                      { required: true, message: 'Please choose nationality' },
                    ]}
                  >
                    <Input placeholder="Please enter nationality." />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="joinedDate"
                    label="joinedDate"
                    rules={[
                      { required: true, message: 'Please choose joinedDate' },
                    ]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="Please enter joinedDate."
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </div>
            </Card>
          </Form>
        )}
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
