import React from 'react';
import { NavItem, Input, Badge } from 'reactstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ToggleInnerRightPart } from '../../../store/customizer/CustomizerSlice';

const EmailListItem = ({
  id,
  from,
  subject,
  label,
  onStar,
  starred,
  important,
  onImportant,
  time,
  active,
  checked,
  trash,
  onEmailClick,
  onDelete,
  handlechecked,
}) => {
  const dispatch = useDispatch();

  return (
    <NavItem
      onClick={onEmailClick}
      className={`w-100 cursor-pointer p-3 border-bottom ${active === id ? 'bg-light' : ''}`}
    >
      <div className="d-flex mb-1 gap-2" onClick={() => dispatch(ToggleInnerRightPart())}>
        <div>
          <Input
            type="checkbox"
            id={`check${id}`}
            onChange={handlechecked}
            className="custom-control-input"
          />
        </div>
        <div className="col-11">
          <h5 className="mb-0">{from}</h5>
          <span className="text-truncate text-muted w-100 d-block">{subject}</span>
        </div>
      </div>
      <div className="d-flex mt-2 align-items-center gap-2 ms-3 ps-2">
        <Badge
          color={
            (label === 'Promotional' ? 'warning' : '') +
            (label === 'Social' ? 'success' : '') +
            (label === 'Health' ? 'danger' : '')
          }
        >
          {label}
        </Badge>
        <i
          className={`bi ${starred ? 'bi-star-fill' : 'bi-star'} ${starred ? 'text-warning' : ''}`}
          onClick={onStar}
        />
        <i
          className={`bi ${important ? 'bi-bookmark-fill' : 'bi-bookmark'} ${
            important ? 'text-warning' : ''
          }`}
          onClick={onImportant}
        />
        {checked && !trash ? <i className="bi-trash" onClick={onDelete} /> : ''}
        <div className="ms-auto">
          <small className="text-muted font-12">{time}</small>
        </div>
      </div>
    </NavItem>
  );
};

EmailListItem.propTypes = {
  id: PropTypes.number,
  from: PropTypes.string,
  subject: PropTypes.string,
  label: PropTypes.string,
  onStar: PropTypes.func,
  starred: PropTypes.bool,
  important: PropTypes.bool,
  onImportant: PropTypes.func,
  time: PropTypes.string,
  active: PropTypes.any,
  checked: PropTypes.any,
  onDelete: PropTypes.func,
  trash: PropTypes.bool,
  handlechecked: PropTypes.func,
  onEmailClick: PropTypes.func,
};

export default EmailListItem;
