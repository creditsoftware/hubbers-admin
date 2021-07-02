import React, { useState } from 'react';
import { Drawer, Form, Button, Col, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import AllProductTypes from './all_product_types';
import * as Actions from '../../../../redux/actions';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

const ProductType = ({ match }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.createProductionType({ ...values, index: 0 }));
    setVisible(false);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="product-type.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <div>
            <Button type="primary" onClick={showDrawer}>
              <PlusOutlined /> New Product Type
            </Button>

            <Drawer
              title="New Product Type"
              width={720}
              onClose={onClose}
              visible={visible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <Form
                layout="vertical"
                hideRequiredMark
                onFinish={onSubmit}
                className="p-4 mt-4"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter Innovation Type name',
                        },
                      ]}
                    >
                      <Input placeholder="Please enter Innovation Type name" />
                    </Form.Item>
                  </Col>
                </Row>

                <div style={{ textAlign: 'right' }}>
                  <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Drawer>

            <div className="all-property-admins" style={{ marginTop: 10 }}>
              <AllProductTypes />
            </div>
          </div>
        </Colxx>
      </Row>
    </>
  );
};

export default ProductType;
