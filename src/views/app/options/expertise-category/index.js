import React from 'react';
import { Row } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

const ExpertiseCategory = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="expertise-category.title" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4" />
    </Row>
  </>
);
export default ExpertiseCategory;
