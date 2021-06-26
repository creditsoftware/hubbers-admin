import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { Drawer, Form, Button, Col, Input, Card, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AvatarUpload from '../../../../components/util-components/Upload/AvatarUpload';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;

const CreateArticle = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [uploadedImg, setImage] = useState('');

  const [userList, SetUserList] = useState(null);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(Actions.getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    SetUserList(users);
  }, [users]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChangeAvatar = (imageUrl) => {
    setImage(imageUrl);
  };

  const onSubmit = (values) => {
    /* eslint-disable */
    values.featuredImage = uploadedImg;
    /* eslint-enable */
    dispatch(Actions.createCommunity(values));
    window.location.reload();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Create New Community
      </Button>
      <Drawer
        title="Create a New Community"
        width={500}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          className="p-4 mt-4"
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Community Name"
                rules={[
                  { required: true, message: 'Please enter Community Name' },
                ]}
                className="mr-2"
              >
                <Input placeholder="Please enter Community Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[{ required: true, message: 'Please enter Slug' }]}
                className="ml-2"
              >
                <Input placeholder="Please enter Slug" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: 'Please enter Country' }]}
                className="mr-2"
              >
                <Input placeholder="Please enter Country" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="state" label="State" className="ml-2">
                <Input placeholder="Please enter State" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please enter City' }]}
                className="mr-2"
              >
                <Input placeholder="Please enter City" />
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
                <Select placeholder="Please choose the User">
                  {userList &&
                    userList.map((item) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {`${item.firstname ? item.firstname : ''} ${
                            item.lastname ? item.lastname : ''
                          }`}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Card title="Featured Image">
              <AvatarUpload statusChange={onChangeAvatar} />
            </Card>
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

export default CreateArticle;