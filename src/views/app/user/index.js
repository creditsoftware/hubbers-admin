
import React, { useState, useEffect } from "react";
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Drawer, Form, Button, Col, Input, Select, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import AllUsers from './all-users';
import AvatarUpload from "../../../components/util-components/Upload/AvatarUpload";
import * as Actions from '../../../redux/actions';

const { Option } = Select;

const Users = ({ match }) => {

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
          <Breadcrumb heading="users.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Colxx xxs="12" className="mb-4">
        <div>
          <div className="all-users" style={{ marginTop: 10 }}>
            <AllUsers />
          </div>
        </div>
      </Colxx>

    </>
  );
};

export default Users;
