import React from 'react';
import { NavItem, NavLink, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const NavSubItem = ({ to, icon, title, items, suffix, activeBck, suffixColor, ddType }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavItem className={`collapsed && getActive ? 'activeParent' : '' ${ddType}`}>
      <NavLink to={to} className="gap-3 cursor-pointer" onClick={Handletoggle}>
        <span className="sidebarIcon d-flex align-items-center">{icon}</span>
        <div className="d-flex flex-grow-1 align-items-center gap-2">
          <span className="me-auto">{title}</span>
          {suffix ? <span className={`badge  ${suffixColor}`}>{suffix}</span> : ''}
          <i className="bi bi-chevron-down" />
        </div>
      </NavLink>
      <Nav vertical className={`firstDD bg-${activeBck} ${isOpen ? 'showfirstDD' : ''}`}>
        {items.map((item) => (
          <NavItem
            key={item.title}
            className={`${location.pathname === item.href ? 'activeLink' : ''}`}
          >
            <NavLink tag={Link} to={item.href} className="gap-3">
              <span className="sidebarIcon">{item.icon}</span>
              <span className="">
                <span>{item.title}</span>
              </span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </NavItem>
  );
};

NavSubItem.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.node,
  items: PropTypes.array,
  suffix: PropTypes.any,
  activeBck: PropTypes.string,
  suffixColor: PropTypes.string,
  ddType: PropTypes.string,
};
export default NavSubItem;
