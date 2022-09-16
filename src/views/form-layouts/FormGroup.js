import React, { useState } from 'react';

import {
  Row,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const FormGroups = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);
  const [splitButtonOpen1, setSplitButtonOpen1] = useState(false);

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropDown1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  };

  const toggleSplit = () => {
    setSplitButtonOpen(!splitButtonOpen);
  };

  const toggleSplit1 = () => {
    setSplitButtonOpen1(!splitButtonOpen1);
  };

  return (
    <div>
      <BreadCrumbs />
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Addons Left"
            subtitle={
              <p>
                Add span with <code>input-group-text</code>
              </p>
            }
          >
            <Form className="mt-4">
              <InputGroup>
                <InputGroupText>@</InputGroupText>
                <Input placeholder="UserName" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Addons Both Side"
            subtitle={
              <p>
                Add span with <code>InputGroupAddon</code> class before & after
              </p>
            }
          >
            <Form>
              <InputGroup>
                <InputGroupText>$</InputGroupText>
                <Input type="text" />
                <InputGroupText>0.00</InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Addons Right"
            subtitle={
              <p>
                Add span with <code>input-group-text</code>
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Input placeholder="UserName" />
                <InputGroupText>@</InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Addons Left Icon">
            <Form>
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-person" />
                </InputGroupText>
                <Input placeholder="UserName" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Addons Both Side Icon">
            <Form>
              <InputGroup>
                <InputGroupText>
                  <i className="bi bi-person" />
                </InputGroupText>
                <Input placeholder="UserName" />
                <InputGroupText>
                  <i className="bi bi-cloud-drizzle" />
                </InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Addons Right Icon">
            <Form>
              <InputGroup>
                <Input placeholder="UserName" />
                <InputGroupText>
                  <i className="bi bi-person" />
                </InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Addons With Checkbox</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Addons With Right Checkbox"
            subtitle={
              <p>
                To use add <code>input-group-prepend</code> before input field
              </p>
            }
          >
            <Form>
              <InputGroup>
                <InputGroupText>
                  <Input addon type="checkbox" />
                </InputGroupText>
                <Input type="text" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Addons With Checkbox &amp; Button"
            subtitle={
              <p>
                To use add <code>input-group-prepend &amp; append</code> before and afetr input
                field
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Button color="primary">Go!</Button>
                <Input type="text" />
                <InputGroupText>
                  <Input addon type="checkbox" />
                </InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Addons With Right Checkbox"
            subtitle={
              <p>
                To use add <code>input-group-prepend</code> before input field
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Input type="text" />
                <InputGroupText>
                  <Input addon type="checkbox" />
                </InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Addons With Radio Button</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With Right Radio Button">
            <Form>
              <InputGroup>
                <InputGroupText>
                  <Input type="radio" />
                </InputGroupText>
                <Input type="text" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With Radio &amp; Button">
            <Form>
              <InputGroup>
                <Button color="primary">Go!</Button>
                <Input type="text" />
                <InputGroupText>
                  <Input addon type="radio" />
                </InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With Right Radio Button">
            <Form>
              <InputGroup>
                <Input type="text" />
                <InputGroupText>
                  <Input addon type="radio" />
                </InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Addons With Button</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With Color Button Left">
            <Form>
              <InputGroup>
                <Button color="primary">Go!</Button>
                <Input type="text" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With Color Buttons Both">
            <Form>
              <InputGroup>
                <Button color="danger">Love It!</Button>
                <Input type="text" />
                <Button color="primary">Hate It!</Button>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With Color Button Right">
            <Form>
              <InputGroup>
                <Input type="text" />
                <Button color="primary">Go!</Button>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With icon Button Left">
            <Form>
              <InputGroup>
                <Button color="primary">
                  <i className="bi bi-person"></i>
                </Button>
                <Input type="text" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With icon Buttons Both">
            <Form>
              <InputGroup>
                <Button color="primary">
                  <i className="bi bi-pencil"></i>
                </Button>
                <Input type="text" />
                <Button color="success">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Addons With icon Button Right">
            <Form>
              <InputGroup>
                <Input type="text" />
                <Button color="danger">
                  <i className="bi bi-heart"></i>
                </Button>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Multiple Addons</h4>
      <Row>
        <Col sm="12" md="6">
          <ComponentCard
            title="Addons With Left Side"
            subtitle={
              <p>
                To use add <code>InputGroupText</code> 2 times in prepend.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <InputGroupText>$</InputGroupText>
                <InputGroupText>0.00</InputGroupText>
                <Input type="text" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Addons With Right Side"
            subtitle={
              <p>
                To use add <code>InputGroupText</code> 2 times in append.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Input type="text" />
                <InputGroupText>$</InputGroupText>
                <InputGroupText>0.00</InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Multiple Inputs with Addons</h4>
      <Row>
        <Col sm="12" md="6">
          <ComponentCard
            title="Input With Right Side"
            subtitle={
              <p>
                To use add <code>Input</code> 2 times in prepend.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <InputGroupText>First and last name</InputGroupText>
                <Input type="text" />
                <Input type="text" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Addons With Right Side"
            subtitle={
              <p>
                To use add <code>Input</code> 2 times in append.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Input type="text" />
                <Input type="text" />
                <InputGroupText>First and last name</InputGroupText>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Button Addons</h4>
      <Row>
        <Col sm="12" md="6">
          <ComponentCard
            title="Button With Left Side"
            subtitle={
              <p>
                To use add <code>Button</code> in prepend.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Button color="outline-secondary">Button</Button>
                <Input type="text" placeholder="Left Side" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Button With Right Side"
            subtitle={
              <p>
                To use add <code>Button</code> in append.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Input type="text" placeholder="Right Side" />
                <Button color="outline-secondary">Button</Button>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Multiple Buttons With Left Side"
            subtitle={
              <p>
                To use add <code>Button</code> 2 times in prepend.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Button color="outline-secondary">Button</Button>
                <Button color="outline-secondary">Button</Button>
                <Input type="text" placeholder="Left Side" />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Multiple Buttons With Right Side"
            subtitle={
              <p>
                To use add <code>Button</code> 2 times in append.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Input type="text" placeholder="Right Side" />
                <Button color="outline-secondary">Button</Button>
                <Button color="outline-secondary">Button</Button>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Addons With Dropdown Buttons</h4>
      <Row>
        <Col sm="12" md="6">
          <ComponentCard
            title="Addons With Left Side Dropdown"
            subtitle={
              <p>
                To use add <code>Dropdown</code> in prepend.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropDown.bind(null)}>
                  <DropdownToggle caret>Dropdown</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <Input />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Addons With Right Side Dropdown"
            subtitle={
              <p>
                To use add <code>Dropdown</code> in append.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Input />
                <ButtonDropdown isOpen={dropdownOpen1} toggle={toggleDropDown1.bind(null)}>
                  <DropdownToggle caret>Dropdown</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Addons With Left Side Dropdown Segments"
            subtitle={
              <p>
                To use add <code>Dropdown</code> in prepend.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <ButtonDropdown isOpen={splitButtonOpen} toggle={toggleSplit.bind(null)}>
                  <Button outline>Split Button</Button>
                  <DropdownToggle split outline />
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <Input />
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Addons With Right Side Dropdown Segments"
            subtitle={
              <p>
                To use add <code>Dropdown</code> in append.
              </p>
            }
          >
            <Form>
              <InputGroup>
                <Input />
                <ButtonDropdown isOpen={splitButtonOpen1} toggle={toggleSplit1.bind(null)}>
                  <Button outline>Split Button</Button>
                  <DropdownToggle split outline />
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default FormGroups;
