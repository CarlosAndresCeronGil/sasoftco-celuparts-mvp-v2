import React from 'react';
import { Card, CardBody } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const StarterKit = () => {
  return (
    <>
      <BreadCrumbs />
      <Card>
        <CardBody className='p-4'>
          <p className='mb-0'>This is some text within a card block.</p>
        </CardBody>
      </Card>
    </>
  );
};

export default StarterKit;
