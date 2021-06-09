import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

const ContestType = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="contestType.title" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">

      </Colxx>
    </Row>
  </>
);
export default ContestType;
