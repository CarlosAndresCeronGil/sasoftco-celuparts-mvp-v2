import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const BtnGroups = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const toggle1 = () => {
    setIsOpen1(!isOpen1);
  };

  const toggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Button Group">
            <ButtonGroup>
              <Button color='outline-primary'>Left</Button>
              <Button color='outline-primary'>Middle</Button>
              <Button color='outline-primary'>Right</Button>
            </ButtonGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-2*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Button Toolbar">
            <ButtonToolbar className="d-md-flex align-items-center gap-2">
              <ButtonGroup>
                <Button color='outline-primary'>1</Button>
                <Button color='outline-primary'>2</Button>
                <Button color='outline-primary'>3</Button>
                <Button color='outline-primary'>4</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button color='outline-primary'>5</Button>
                <Button color='outline-primary'>6</Button>
                <Button color='outline-primary'>7</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button color='outline-primary'>8</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </ComponentCard>
        </Col>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Nesting">
            <ButtonGroup>
              <Button color='outline-primary'>1</Button>
              <Button color='outline-primary'>2</Button>
              <ButtonDropdown isOpen={isOpen1} toggle={toggle1.bind(null)}>
                <DropdownToggle color='outline-primary' caret>Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Dropdown Link</DropdownItem>
                  <DropdownItem>Dropdown Link</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Sizing">
            <ButtonGroup size="lg">
              <Button color='outline-primary'>Left</Button>
              <Button color='outline-primary'>Middle</Button>
              <Button color='outline-primary'>Right</Button>
            </ButtonGroup>
            <br />
            <ButtonGroup className="mt-2">
              <Button color='outline-primary'>Left</Button>
              <Button color='outline-primary'>Middle</Button>
              <Button color='outline-primary'>Right</Button>
            </ButtonGroup>
            <br />
            <ButtonGroup className="mt-2" size="sm">
              <Button color='outline-primary'>Left</Button>
              <Button color='outline-primary'>Middle</Button>
              <Button color='outline-primary'>Right</Button>
            </ButtonGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Vertical variation">
            <ButtonGroup vertical>
              <Button color='outline-primary'>1</Button>
              <Button color='outline-primary'>2</Button>
              <ButtonDropdown isOpen={isOpen2} toggle={toggle2.bind(null)}>
                <DropdownToggle color='outline-primary' caret>Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Dropdown Link</DropdownItem>
                  <DropdownItem>Dropdown Link</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
          </ComponentCard>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default BtnGroups;
