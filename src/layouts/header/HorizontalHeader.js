import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Container
} from 'reactstrap';
import * as Icon from 'react-feather';
import { Bell, MessageSquare } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBar from 'simplebar-react';
import MessageDD from './MessageDD';
import NotificationDD from './NotificationDD';
import MegaDD from './MegaDD';
import user1 from '../../assets/images/users/user1.jpg';

import { ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';

import HorizontalLogo from '../logo/HorizontalLogo';

const HorizontalHeader = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const isMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const dispatch = useDispatch();

  return (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="shadow HorizontalTopbar p-0"
    >
      <Container className="d-flex align-items-center">
        {/******************************/}
        {/**********Logo**********/}
        {/******************************/}
        <div className="pe-4 py-3 ">
          <HorizontalLogo />
        </div>
        {/******************************/}
        {/**********Toggle Buttons**********/}
        {/******************************/}

        <Nav className="me-auto flex-row" navbar>
          <Button
            color={topbarColor}
            className="d-sm-block d-lg-none"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <i className={`bi ${isMobileSidebar ? 'bi-x' : 'bi-list'}`} />
          </Button>

          {/******************************/}
          {/**********Mega DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mega-dropdown mx-1">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.Grid size={18} />
            </DropdownToggle>
            <DropdownMenu>
              <MegaDD />
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem className="d-none d-md-block">
            <Link to="/about" className={`nav-link ${topbarColor === 'white' ? 'text-dark' : ''}`}>
              About
            </Link>
          </NavItem>
        </Nav>
        <div className="d-flex align-items-center">
          {/******************************/}
          {/**********Notification DD**********/}
          {/******************************/}
          <UncontrolledDropdown>
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Bell size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth" end>
              <DropdownItem header>
                <span className="mb-0 fs-5">Notifications</span>
              </DropdownItem>
              <DropdownItem divider />
              <SimpleBar style={{ maxHeight: '350px' }}>
                <NotificationDD />
              </SimpleBar>
              <DropdownItem divider />
              <div className="p-2 px-3">
                <Button color="primary" size="sm" block>
                  Check All
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/******************************/}
          {/**********Message DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mx-1">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <MessageSquare size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth" end>
              <DropdownItem header>
                <span className="mb-0 fs-5">Messages</span>
              </DropdownItem>
              <DropdownItem divider />
              <SimpleBar style={{ maxHeight: '350px' }}>
                <MessageDD />
              </SimpleBar>
              <DropdownItem divider />
              <div className="p-2 px-3">
                <Button color="primary" size="sm" block>
                  Check All
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/******************************/}
          {/**********Profile DD**********/}
          {/******************************/}
          <UncontrolledDropdown>
            <DropdownToggle tag="span" className="p-2 cursor-pointer ">
              <img src={user1} alt="profile" className="rounded-circle" width="30" />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <ProfileDD />

              <div className="p-2 px-3">
                <Button color="danger" size="sm">
                  Logout
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default HorizontalHeader;
