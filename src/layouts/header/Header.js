/* eslint-disable */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBar from 'simplebar-react';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import * as Icon from 'react-feather';
import { ReactComponent as LogoWhite } from '../../assets/images/logos/white-logo-icon.svg';
import MessageDD from './MessageDD';
import NotificationDD from './NotificationDD';
import MegaDD from './MegaDD';
// import user1 from '../../assets/images/users/user4.jpg';
import userCeluparts from '../../assets/images/users/userCeluparts.png'
import Logo from '../logo/Logo';
import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';

import AuthContext from '../../context/AuthProvider';
import NotificationAdminDD from './NotificationAdminDD';
import NotificationCustomerDD from './NotificationCustomerDD';
import NotificationTechnicianDD from './NotificationTechnicianDD';
import NotificationCourierDD from './NotificationCourierDD';

const Header = () => {
  const { setAuth } = useContext(AuthContext)

  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);

  const dispatch = useDispatch();

  const handleLogout = () => {
    setAuth({
      email: '',
      name: '',
      role: '',
      id: 0
    })
    localStorage.clear();
  }

  return (
    <>
      <Navbar
        color='navbarcolorceluparts'
        dark={!isDarkMode}
        light={isDarkMode}
        expand="lg"
        className="topbar"
      >
        {/********Logo*******/}


        <div className="d-none d-lg-flex align-items-center logo-space">
          <Link to="./dashboards/dashboard1">
            <img src="/celuparts-transparent-3.png" alt="celuparts-logo" className="right-card-image" width="170" ></img>
          </Link>
          <Button
            close
            size="sm"
            className="ms-auto d-sm-block d-lg-none"
            onClick={() => dispatch(ToggleMobileSidebar())}
          />
        </div>
        {/******************************/}
        {/**********Toggle Buttons**********/}
        {/******************************/}
        <div className="d-flex align-items-center">
          <Button
            color={topbarColor}
            className="d-none d-lg-block mx-1 bg-transparent border-0"
            onClick={() => dispatch(ToggleMiniSidebar())}
          >
            <Icon.Menu size={18} />
          </Button>
          <Link to="./dashboards/dashboard1" className="d-sm-block d-lg-none">
            <img src="/celuparts-logo-2.png" alt="celuparts-logo" width='40' className="right-card-image" ></img>
          </Link>
          <Button
            color={topbarColor}
            className="d-sm-block d-lg-none bg-transparent border-0 mx-1"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <i className="bi bi-list" />
          </Button>
        </div>

        {/******************************/}
        {/**********Left Nav Bar**********/}
        {/******************************/}

        <Nav className="me-auto d-flex flex-row align-items-center" navbar>
          {/******************************/}
          {/**********Mega DD**********/}
          {/******************************/}
          {/* <UncontrolledDropdown className="mega-dropdown mx-1">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.Grid size={18} />
            </DropdownToggle>
            <DropdownMenu>
              <MegaDD />
            </DropdownMenu>
          </UncontrolledDropdown> */}
          {/* <NavItem className="d-md-block d-none">
            <Link to="/about" className={`nav-link ${topbarColor === 'white' ? 'text-dark' : ''}`}>
              About
            </Link>
          </NavItem> */}
        </Nav>

        <div className="d-flex align-items-center">
          {/******************************/}
          {/**********Notification DD**********/}
          {/******************************/}
          {/* <UncontrolledDropdown className="mx-1">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.MessageSquare size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <DropdownItem header>
                <span className="mb-0 fs-5">Notifications</span>
              </DropdownItem>
              <DropdownItem divider />
              <SimpleBar style={{ maxHeight: '350px' }}>
                {
                  JSON.parse(localStorage.getItem('user')).role === "admin" ?
                    <NotificationAdminDD />
                    : JSON.parse(localStorage.getItem('user')).role === "user" ?
                      <NotificationCustomerDD />
                      : JSON.parse(localStorage.getItem('user')).role === "tecnico" ?
                        <NotificationTechnicianDD />
                        : JSON.parse(localStorage.getItem('user')).role === "mensajero" ?
                          <NotificationCourierDD />
                          :
                          <NotificationDD />
                }
              </SimpleBar>
              <DropdownItem divider />
              {
                JSON.parse(localStorage.getItem('user')).role === "admin" ?
                  <div className="p-2 px-3">
                    <Link to="./admin-alerts">
                      <Button color="primary" size="sm" block>
                        Ver todas tus notificaciones.
                      </Button>
                    </Link>
                  </div>
                  : JSON.parse(localStorage.getItem('user')).role === "user" ?
                  <div className="p-2 px-3">
                    <Link to="./user-alerts">
                      <Button color="primary" size="sm" block>
                        Ver todas tus notificaciones.
                      </Button>
                    </Link>
                  </div>
                  : JSON.parse(localStorage.getItem('user')).role === "tecnico" ?
                  <div className="p-2 px-3">
                    <Link to="./technician-alerts">
                      <Button color="primary" size="sm" block>
                        Ver todas tus notificaciones.
                      </Button>
                    </Link>
                  </div>
                  : JSON.parse(localStorage.getItem('user')).role === "mensajero" ?
                  <div className="p-2 px-3">
                    <Link to="./courier-alerts">
                      <Button color="primary" size="sm" block>
                        Ver todas tus notificaciones.
                      </Button>
                    </Link>
                  </div>
                  :
                  <div className="p-2 px-3">
                    <Button color="primary" size="sm" block>
                      Check All
                    </Button>
                  </div>
              }

            </DropdownMenu>
          </UncontrolledDropdown> */}
          {/******************************/}
          {/**********Message DD**********/}
          {/******************************/}
          {/* <UncontrolledDropdown className="mx-1">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.Mail size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
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
          </UncontrolledDropdown> */}
          {/******************************/}
          {/**********Profile DD**********/}
          {/******************************/}
          <UncontrolledDropdown>
            <DropdownToggle color="transparent">
              <img src={userCeluparts} alt="profile" className="rounded-circle" width="30" />
            </DropdownToggle>
            <DropdownMenu className="ddWidth profile-dd">
              <ProfileDD />
              <div className="p-2 px-3">
                <Link to="/" onClick={handleLogout}>
                  <Button color="danger" size="sm">
                    Cerrar sesión
                  </Button>
                </Link>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
