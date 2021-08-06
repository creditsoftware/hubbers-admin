import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  Form,
  Button,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Tooltip,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import * as Actions from '../../../../redux/actions';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import UploadImage from '../../../../components/UploadImage';

const { TextArea } = Input;
const { Option } = Select;

const EditPartner = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [isGlobal, setIsGlobal] = useState(null);
  const [typeList, setTypeList] = useState(null);
  const [partnerContact, setPartnerContact] = useState(null);
  const [languageList, setLanguageList] = useState(null);
  const { partnerTypeList } = useSelector((state) => state.partnerType);
  const { list } = useSelector((state) => state.language);

  useEffect(() => {
    dispatch(Actions.getAllPartnerType());
    dispatch(Actions.getAllLanguage());
  }, [dispatch]);

  useEffect(() => {
    setTypeList(partnerTypeList);
  }, [partnerTypeList]);

  useEffect(() => {
    setLanguageList(list);
  }, [list]);

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        ...filterData[0],
        startDate: filterData[0].startDate
          ? moment(filterData[0].startDate)
          : '',
        endDate: filterData[0].endDate ? moment(filterData[0].endDate) : '',
        partnerContact: filterData[0].contacts?.map((item) => item.userId),
      });
      setIsGlobal(filterData[0].isGlobal);
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    if (values.isGlobal) values.ifLocal = '';
    dispatch(Actions.updatePartner({ ...values, id }));
    onClose();
  };

  const changeIsGlobal = (value) => {
    setIsGlobal(value);
  };

  return (
    <>
      <Tooltip title="View / Edit">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={showDrawer}
          size="small"
        />
      </Tooltip>
      <Drawer
        title="Edit a Partner"
        width={500}
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
            name="name"
            label="Partner Name"
            rules={[{ required: true, message: 'Please enter Partner Name' }]}
          >
            <Input placeholder="Please enter Partner Name" />
          </Form.Item>
          <Form.Item
            name="typeId"
            label="Partner Type"
            rules={[{ required: true, message: 'Please choose a type' }]}
          >
            <Select placeholder="Please select a type">
              {typeList?.map((item) => {
                return (
                  <Option key={item.id} values={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter Address' }]}
          >
            <Input placeholder="Please enter Address" />
          </Form.Item>
          <Form.Item
            name="language"
            label="Language"
            rules={[{ required: true, message: 'Please choose a language' }]}
          >
            <Select placeholder="Please select a language">
              {languageList?.map((item) => {
                return (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Row>
            <Col span={12} className="pr-2">
              <Form.Item
                name="isGlobal"
                label="Global/Local"
                rules={[{ required: true, message: 'Select Global or Local' }]}
              >
                <Select
                  placeholder="Select Global or Local"
                  onChange={changeIsGlobal}
                >
                  <Option key value>
                    Global
                  </Option>
                  <Option key={false} value={false}>
                    Local
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} className="pr-2">
              <Form.Item
                name="ifLocal"
                label="If Local"
                rules={[
                  {
                    required: !isGlobal,
                    message: 'Select a community',
                  },
                ]}
              >
                <CommunitySelect
                  idValue={false}
                  placeholder="Select a community"
                  disabled={isGlobal}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="pr-2">
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'Select start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12} className="pr-2">
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Select end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="partnerContact"
            label="Partner Contact"
            rules={[
              { required: true, message: 'Please choose a partner contact' },
            ]}
          >
            <UserSelect mode="multiple" />
          </Form.Item>
          <Form.Item name="contactDetail" label="Contact Detail">
            <TextArea rows={3} placeholder="Please enter contact detail" />
          </Form.Item>
          <Form.Item name="description" label="Sponsor Description">
            <TextArea rows={3} placeholder="Please enter sponsor description" />
          </Form.Item>
          <label>Contact Reason</label>
          <Form.List name="contactReason" label="Contact Reason">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Row key={key}>
                    <Col flex="auto">
                      <Form.Item
                        name={[name]}
                        {...restField}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter a contact reason',
                          },
                        ]}
                      >
                        <Input placeholder="Please enter a contact reason" />
                      </Form.Item>
                    </Col>
                    <Col flex="30px" style={{ textAlign: 'right' }}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add More
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Form.Item
              name="featuredImageUrl"
              label="Featured Image"
              className="mb-0"
            >
              <UploadImage />
            </Form.Item>
            <div className="pb-2">
              <Button onClick={onClose} style={{ marginRight: 12 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default EditPartner;
