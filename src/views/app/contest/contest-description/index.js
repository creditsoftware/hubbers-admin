import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import ContestDescriptionList from './list';

const ContestDescription = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="contest-description.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Colxx xxs="12" className="mb-4">
        <div>
          <div style={{ marginTop: 10 }}>
            <ContestDescriptionList />
          </div>
        </div>
      </Colxx>
    </>
  );
};

export default ContestDescription;
