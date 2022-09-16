import React from 'react';
import { useDispatch } from 'react-redux';
import { NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToggleInnerRightPart } from '../../../store/customizer/CustomizerSlice';

const ContactListItem = ({
  onContactClick,
  onStarredClick,
  onDeleteClick,
  id,
  firstname,
  lastname,
  image,
  department,
  starred,
  active,
}) => {
  const dispatch = useDispatch();
  return (
    <NavItem
      onClick={onContactClick}
      className={`w-100 cursor-pointer ${active === id ? 'bg-light' : ''}`}
    >
      <div
        className="d-flex align-items-center p-3 mb-1"
        onClick={() => dispatch(ToggleInnerRightPart())}
      >
        <div>
          <img src={image} alt="user" className="rounded-circle" width="50" />
        </div>
        <div className="mx-2 flex-grow-1">
          <h5 className="mb-0 text-truncate" style={{ width: '140px' }}>
            {firstname}&nbsp;
            {lastname}
          </h5>
          <small>{department}</small>
        </div>
        <div className="d-flex flex-shrink-0">
          <i
            className="bi bi-star-fill mx-2"
            onClick={onStarredClick}
            style={{ color: starred ? '#FFC107' : '#495057' }}
          />
          <i onClick={onDeleteClick} className="bi bi-trash" />
        </div>
      </div>
    </NavItem>
  );
};

ContactListItem.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  image: PropTypes.string,
  department: PropTypes.string,
  starred: PropTypes.bool,
  id: PropTypes.number,
  active: PropTypes.any,
  onStarredClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onContactClick: PropTypes.func,
};

export default ContactListItem;
