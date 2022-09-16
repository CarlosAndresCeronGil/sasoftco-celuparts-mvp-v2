import React, { useState } from 'react';
import {
  Button,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader,
  Spinner,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const Toasts = () => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

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
          <ComponentCard title="Regular Toast">
            <Toast>
              <ToastHeader>Reactstrap</ToastHeader>
              <ToastBody>This is a toast on a white background — check it out!</ToastBody>
            </Toast>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Toast with HeaderIcon">
            <Toast>
              <ToastHeader icon="danger">Reactstrap</ToastHeader>
              <ToastBody>This is a toast with a danger icon — check it out!</ToastBody>
            </Toast>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-5*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Toast with Spinner">
            <Toast>
              <ToastHeader icon={<Spinner size="sm" />}>Reactstrap</ToastHeader>
              <ToastBody>This is a toast with a custom icon — check it out!</ToastBody>
            </Toast>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-5*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Dismissible Toast">
            <Button color="primary" onClick={toggle.bind(null)}>
              Show Toast
            </Button>
            <br />
            <br />
            <Toast isOpen={show}>
              <ToastHeader toggle={toggle.bind(null)}>Toast title</ToastHeader>
              <ToastBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ToastBody>
            </Toast>
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

export default Toasts;
