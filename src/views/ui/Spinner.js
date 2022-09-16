import React from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const Spinners = () => {
  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Regular Spinners">
            <Spinner className="me-2" color="primary" />
            <Spinner className="me-2" color="secondary" />
            <Spinner className="me-2" color="success" />
            <Spinner className="me-2" color="danger" />
            <Spinner className="me-2" color="warning" />
            <Spinner className="me-2" color="info" />
            <Spinner className="me-2" color="light" />
            <Spinner className="me-2" color="dark" />
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Grow Spinners">
            <Spinner className="me-2" type="grow" color="primary" />
            <Spinner className="me-2" type="grow" color="secondary" />
            <Spinner className="me-2" type="grow" color="success" />
            <Spinner className="me-2" type="grow" color="danger" />
            <Spinner className="me-2" type="grow" color="warning" />
            <Spinner className="me-2" type="grow" color="info" />
            <Spinner className="me-2" type="grow" color="light" />
            <Spinner className="me-2" type="grow" color="dark" />
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-5*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Sizes">
            <Spinner size="sm" color="primary" /> <Spinner size="sm" color="secondary" />
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-5*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Custom Style">
            <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
          </ComponentCard>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}

      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Spinners;
