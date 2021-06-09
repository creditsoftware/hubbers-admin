
import React, { useState, useEffect } from "react";
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Drawer, Form, Button, Col, Input, Select, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
// import AllUsers from './all-users';
import AvatarUpload from "../../../components/util-components/Upload/AvatarUpload";
import * as Actions from '../../../redux/actions';

const { Option } = Select;

const Teams = ({ match }) => {

  const [visible, setVisible] = useState(false)
  const [uploadedImg, setImage] = useState('')

  const { userRoleData } = useSelector(state => state.userRole)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Actions.getAllUserRoles());
  }, []);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  const onChangeAvatar = (imageUrl) => {
    setImage(imageUrl)
  }

  const onSubmit = values => {
    values.avatar = uploadedImg
    console.log('submit values =>', values)
    // dispatch(Actions.createUser(values));
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="hubbersteam.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Colxx xxs="12" className="mb-4">
        <div>
          <Button type="primary" onClick={showDrawer}>
            <PlusOutlined /> Create New Team
          </Button>

          <Drawer
            title="Create a New Team"
            width={1000}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <Form layout="vertical" hideRequiredMark onFinish={onSubmit} className = "p-4 mt-4">
              <Row>
                <Col span={12} >
                  <Form.Item name="firstname" label="First Name" rules={[{ required: true, message: 'Please enter First Name' }]} className = "mr-2">
                    <Input placeholder="Please enter First Name" />
                  </Form.Item>
                </Col>

                <Col span={12} >
                  <Form.Item
                    name="lastname"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter Last Name' }]}
                    className = "ml-2"
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
                    rules={[{ required: true, message: 'Please enter email' }]}
                    className = "mr-2"
                  >
                    <Input placeholder="Please enter email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please enter user Password' }]}
                    className = "ml-2"
                  >
                    <Input placeholder="Please enter user Password" type="password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please choose the status' }]}
                    className = "mr-2"
                  >
                    <Select placeholder="Please choose the status">
                      <Option value="PENDING">PENDING</Option>
                      <Option value="ACTIVATED">ACTIVATED</Option>
                      <Option value="DECLINED">DECLINED</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="preferedRole"
                    label="preferedRole"
                    rules={[{ required: true, message: 'Please choose the preferedRole' }]}
                    className = "ml-2"

                  >
                    <Select placeholder="Please choose the value">
                      {userRoleData && userRoleData.map((item, index) => {
                        return (
                          <Option value={item.id} key={index}>{item.name}</Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please choose the Role' }]}
                  >
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Enter Role"
                        defaultValue={[]}
                        onChange={() => { }}
                        optionLabelProp="label"
                      >
                        {userRoleData.map((item, i) => {
                          return (
                            <Option value={item.id} label={item.name} key={i}><span>{item.name}</span></Option>
                          )
                        })}
                      </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Card title="Avatar">
                  <AvatarUpload statusChange={onChangeAvatar} />
                </Card>
              </Row>

              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button
                  onClick={onClose}
                  style={{ marginRight: 8 }}
                >
                  Cancel
                  </Button>
                <Button type="primary" htmlType="submit">
                  Submit
            </Button>
              </div>

            </Form>
          </Drawer>
          <div className="all-users" style={{ marginTop: 10 }}>
            {/* <AllUsers /> */}
          </div>
        </div>
      </Colxx>

    </>
  );
};

export default Teams;
