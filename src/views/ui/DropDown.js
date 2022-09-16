import React, { useState } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  UncontrolledDropdown,
  ButtonDropdown,
  Button,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const Dropdowns = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);

  const toggle1 = () => {
    setIsOpen1(!isOpen1);
  };

  const toggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggle3 = () => {
    setIsOpen3(!isOpen3);
  };

  const toggle4 = () => {
    setIsOpen4(!isOpen4);
  };

  const toggle5 = () => {
    setIsOpen5(!isOpen5);
  };

  const toggle6 = () => {
    setIsOpen6(!isOpen6);
  };

  const toggle7 = () => {
    setIsOpen7(!isOpen7);
  };

  const toggle8 = () => {
    setIsOpen8(!isOpen8);
  };

  const dropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };

  const toggle9 = () => {
    setIsOpen9(!isOpen9);
  };

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
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Single Button Dropdowns">
            <div className="d-flex align-items-center gap-3">
              <UncontrolledDropdown>
                <DropdownToggle caret color="primary">
                  Primary
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle caret color="warning">
                  Warning
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle caret color="success">
                  Success
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-2*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Split Button Dropdowns">
            <div className="d-flex align-items-center gap-3">
              <ButtonDropdown isOpen={isOpen1} toggle={toggle1.bind(null)}>
                <Button id="caret" color="primary">
                  Primary
                </Button>
                <DropdownToggle caret color="primary" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown isOpen={isOpen2} toggle={toggle2.bind(null)}>
                <Button id="caret" color="warning">
                  Warning
                </Button>
                <DropdownToggle caret color="warning" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown isOpen={isOpen3} toggle={toggle3.bind(null)}>
                <Button id="caret" color="success">
                  Success
                </Button>
                <DropdownToggle caret color="success" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Sizing Dropdowns">
            <div className="d-flex align-items-center gap-3">
              <ButtonDropdown isOpen={isOpen4} toggle={toggle4.bind(null)}>
                <DropdownToggle color='primary' caret size="lg">
                  Large Button
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonDropdown isOpen={isOpen5} toggle={toggle5.bind(null)}>
                <DropdownToggle color='primary' caret size="sm">
                  Small Button
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Drop Direction Variations">
            <div className="d-flex align-items-center gap-3">
              <ButtonDropdown direction="up" isOpen={isOpen6} toggle={toggle6.bind(null)}>
                <DropdownToggle color='primary' caret>Dropup</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

              <ButtonDropdown direction="left" isOpen={isOpen7} toggle={toggle7.bind(null)}>
                <DropdownToggle color='primary' caret>Dropleft</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

              <ButtonDropdown direction="right" isOpen={isOpen8} toggle={toggle8.bind(null)}>
                <DropdownToggle color='primary' caret>Dropright</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-5*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Dropdown Alignment">
            <div className="d-flex align-items-center gap-3">
              <Dropdown isOpen={dropdownOpen} toggle={dropdown.bind(null)}>
                <DropdownToggle color='primary' caret>This dropdowns menu is right-aligned</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-6*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Custom Dropdown">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="span"
                onClick={dropdown2.bind(null)}
                data-toggle="dropdown"
                aria-expanded={dropdownOpen2}
              >
                Custom Dropdown Content
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={dropdown2}>Red</DropdownItem>
                <DropdownItem onClick={dropdown2}>Yellow</DropdownItem>
                <DropdownItem onClick={dropdown2}>Blue</DropdownItem>
                <DropdownItem onClick={dropdown2}>Green</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-6*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Uncontrolled Dropdown">
            <UncontrolledDropdown>
              <DropdownToggle color='primary' caret>Dropdown</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-6*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Modifiers Dropdown">
            <Dropdown isOpen={isOpen9} toggle={toggle9.bind(null)}>
              <DropdownToggle color='primary'>Dropdown</DropdownToggle>
              <DropdownMenu
                modifiers={{
                  setMaxHeight: {
                    enabled: true,
                    fn: (data) => ({
                      ...data,
                      styles: {
                        ...data.styles,
                        overflow: 'auto',
                        maxHeight: 100,
                      },
                    }),
                    order: 890,
                  },
                }}
              >
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ComponentCard>
        </Col>
        <Col xs="12" md="12">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-6*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="setActiveFromChild">
            <Navbar color="light" light expand="md">
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Inactive Link</NavLink>
                </NavItem>
                <UncontrolledDropdown setActiveFromChild>
                  <DropdownToggle tag="a" className="nav-link" caret>
                    Dropdown
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag="a" href="/blah" active>
                      Link
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Navbar>
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

export default Dropdowns;
