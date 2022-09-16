import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const Navs = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <ComponentCard title="Nav">
        <p>List Based</p>
        <Nav>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">
              Disabled Link
            </NavLink>
          </NavItem>
        </Nav>
        <hr />
        <p>Link Based</p>
        <Nav>
          <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink>{' '}
          <NavLink href="#">Another Link</NavLink>{' '}
          <NavLink disabled href="#">
            Disabled Link
          </NavLink>
        </Nav>
      </ComponentCard>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <ComponentCard title="Vertical">

        <p>List Based</p>
        <Nav vertical>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">
              Disabled Link
            </NavLink>
          </NavItem>
        </Nav>
        <hr />
        <p>Link based</p>
        <Nav vertical>
          <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink>{' '}
          <NavLink href="#">Another Link</NavLink>{' '}
          <NavLink disabled href="#">
            Disabled Link
          </NavLink>
        </Nav>
      </ComponentCard>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <ComponentCard title="Tabs">
        <Nav tabs>
          <NavItem>
            <NavLink href="" active>
              Link
            </NavLink>
          </NavItem>
          <Dropdown nav isOpen={dropdownOpen} toggle={toggle.bind(null)}>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem>
            <NavLink href="">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="">
              Disabled Link
            </NavLink>
          </NavItem>
        </Nav>
      </ComponentCard>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <ComponentCard title="Pills">
        <Nav pills>
          <NavItem>
            <NavLink href="#" active>
              Link
            </NavLink>
          </NavItem>
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">
              Disabled Link
            </NavLink>
          </NavItem>
        </Nav>
      </ComponentCard>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}

      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Navs;
