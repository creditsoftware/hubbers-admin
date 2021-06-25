import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Drawer, Form, Button, Col, Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Actions from '../../../../redux/actions';
import CKEditor5 from '../../../../components/util-components/CkEditor';

const { Option } = Select;

const Create = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [memberList, setMemberList] = useState(null);
  const [topicList, setTopicList] = useState(null);
  const [communityList, setCommunityList] = useState(null);
  const [allMemberList, setAllMemberList] = useState(null);
  const [allTopicList, setAllTopicList] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [content, setContent] = useState(null);
  const [cate, setCate] = useState(null);
  const [form] = Form.useForm();
  const { communityAll, topic, member } = useSelector((state) => state);

  useEffect(() => {
    dispatch(Actions.getAllMember());
    dispatch(Actions.getAllTopics());
    dispatch(Actions.getAllCommunity());
  }, [dispatch]);

  useEffect(() => {
    setAllMemberList(member.list);
    setAllTopicList(topic.list);
    setCommunityList(communityAll.community);
    setMemberList(member.list);
    setTopicList(topic.list);
  }, [member, communityAll, topic]);

  useEffect(() => {
    if (allMemberList && selectedCommunity) {
      const filteredMembers = allMemberList.filter(
        (m) => Number(m.communityId) === selectedCommunity
      );
      setMemberList(filteredMembers);
    }
    if (allTopicList && selectedCommunity) {
      const filteredTopics = allTopicList.filter(
        (t) => Number(t.communityId) === selectedCommunity
      );
      setTopicList(filteredTopics);
    }
  }, [allMemberList, allTopicList, selectedCommunity]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createPost({ ...values, content }));
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Create New Post / Article
      </Button>
      <Drawer
        title="Create a New Community Post / Article"
        width={1024}
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
            <Col span={11}>
              <Form.Item
                name="communityId"
                label="Community"
                rules={[{ required: true, message: 'Please select!' }]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Community"
                  onChange={(e) => setSelectedCommunity(e)}
                >
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
            <Col span={2} />
            <Col span={11}>
              <Form.Item name="topicId" label="Topic">
                <Select style={{ width: '100%' }} placeholder="Topic">
                  {topicList &&
                    topicList.map((t) => {
                      return (
                        <Option key={t.id} value={t.id}>
                          {`${t.community?.name} / ${t.name}`}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                name="category"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the Type',
                  },
                ]}
              >
                <Select
                  placeholder="Please choose the Type"
                  onChange={(e) => setCate(e)}
                >
                  <Option value="post">Post</Option>
                  <Option value="article">Article</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                name="createdBy"
                label="Creator"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the creator',
                  },
                ]}
              >
                <Select placeholder="Please choose the creator">
                  {memberList &&
                    memberList.map((item) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {`${item.community?.name} / ${item.user?.email}`}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {cate === 'article' && (
            <div>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Title',
                  },
                ]}
              >
                <Input type="text" placeholder="Title" />
              </Form.Item>
            </div>
          )}
          <div>
            <CKEditor5 onChange={(e) => setContent(e)} />
          </div>
          <div
            style={{
              textAlign: 'right',
              marginTop: '1rem',
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
