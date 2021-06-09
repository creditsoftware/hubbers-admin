import React, { useState, useEffect } from "react";
import { Drawer, Form, Button, Col, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Actions from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux'
// import AllInnovationTypes from './all_innovation';
import { useHistory } from "react-router-dom";
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';


const InnovationType = ({ match }) => {

  let history = useHistory();

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  const onSubmit = values => {
    console.log('veluse =>', values)
    values.index = 0;
    dispatch(Actions.createInnovationType(values));
    // setVisible(false)
    // dispatch(Actions.createInnovationType(values)).then(() => {
    //     history.push('/app/setting/innovation-type')
    // })
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="innovationtype.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <div>
            <Button type="primary" onClick={showDrawer}>
              <PlusOutlined /> New Innovation Type
            </Button>

            <Drawer
              title="New Innovation Type"
              width={720}
              onClose={onClose}
              visible={visible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <Form layout="vertical" hideRequiredMark onFinish={onSubmit} className = "p-4 mt-4">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter Innovation Type name' }]} >
                      <Input placeholder="Please enter Innovation Type name" />
                    </Form.Item>
                  </Col>
                </Row>

                <div style={{textAlign: 'right'}}>
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

            <div className="all-property-admins" style={{ marginTop: 10 }}>
              {/* <AllInnovationTypes /> */}
            </div>
          </div>
        </Colxx>
      </Row>
    </>

  )

}


export default InnovationType;
