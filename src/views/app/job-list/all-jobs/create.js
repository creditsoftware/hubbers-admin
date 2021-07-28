import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Form, Button, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { slugify } from '../../../../helpers/Utils';
import * as Actions from '../../../../redux/actions';
import CountrySelect from '../../../../components/util-components/selector/CountrySelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import CKEditor5 from '../../../../components/util-components/CkEditor';

const { Option } = Select;

const JobCreate = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [skillList, setSkillList] = useState(null);
  const { skills } = useSelector((state) => state.expertiseCategory);

  useEffect(() => {
    dispatch(Actions.getAllSkill());
  }, [dispatch]);

  useEffect(() => {
    setSkillList(skills);
  }, [skills]);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createJob(values));
    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Create New Job
      </Button>
      <Drawer
        title="Create a New Job"
        width={520}
        onClose={onClose}
        visible={visible}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="px-4 py-5"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter Title' }]}
          >
            <Input
              placeholder="Job Slug"
              onChange={(e) =>
                form.setFieldsValue({ slug: slugify(e.target.value) })
              }
            />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'Slug required' }]}
          >
            <Input placeholder="Please enter Slug" disabled />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <CKEditor5 />
          </Form.Item>
          <Form.Item name="responsibilities" label="Responsibilities">
            <CKEditor5 />
          </Form.Item>
          <Form.Item name="requirements" label="Requirements">
            <CKEditor5 />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: 'Please select Country' }]}
          >
            <CountrySelect />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input placeholder="please enter city" />
          </Form.Item>
          <Form.Item name="remote" label="Remote">
            <Input placeholder="please enter remote" />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="endDate" label="End Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="employmentType"
            label="Employment Type"
            required="Type Required"
          >
            <Select placeholder="Please choose the type">
              <Option value="full time">Full Time</Option>
              <Option value="part time">Part Time</Option>
              <Option value="contract">Contract</Option>
              <Option value="volunteer">Volunteer</Option>
              <Option value="internship">Internship</Option>
            </Select>
          </Form.Item>
          <Form.Item name="compensation" label="Compensation">
            <CKEditor5 />
          </Form.Item>
          <Form.Item name="publishFrom" label="Publish From">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="publishTo" label="Publish From">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="companyName" label="Company Name">
            <Input placeholder="please enter Company Name" />
          </Form.Item>
          <Form.Item
            name="neededSkill"
            label="Needed Skills"
            rules={[{ required: true, message: 'Please select needed skills' }]}
          >
            <Select mode="multiple">
              {skillList?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="skill"
            label="Skills you will learn"
            rules={[{ required: true, message: 'Please select needed skills' }]}
          >
            <Select mode="multiple">
              {skillList?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="postedBy"
            label="Posted By"
            rules={[{ required: true, message: 'Please select poster' }]}
          >
            <UserSelect />
          </Form.Item>
          <div className="w-100 text-right">
            <Button onClick={onClose} style={{ marginRight: 12 }}>
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

export default JobCreate;
