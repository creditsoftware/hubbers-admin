
import React from "react";
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux'
import AllUsers from './all-users';
import AvatarUpload from "../../../components/util-components/Upload/AvatarUpload";


const Users = ({ match }) => {

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
