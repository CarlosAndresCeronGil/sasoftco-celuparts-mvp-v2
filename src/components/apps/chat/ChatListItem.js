import React from 'react';
import { NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

const ChatListItem = ({ onClick, contactName, active, id, thumb, status }) => (
  <NavItem onClick={onClick} className={`w-100 cursor-pointer ${active === id ? 'bg-light' : ''}`}>
    <div className="d-flex align-items-center p-3 mb-1">
      <div>
        <img src={thumb} alt="user" className="rounded-circle" width="50" />
      </div>
      <div className="mx-3">
        <h5 className="mb-0">{contactName}</h5>
        <small>{status}</small>
      </div>
    </div>
  </NavItem>
);

ChatListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  thumb: PropTypes.string,
  active: PropTypes.any,
  id: PropTypes.any,
  contactName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default ChatListItem;
