import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { setVisibilityFilter } from '../../../store/apps/email/EmailSlice';
import EmailCompose from './EmailCompose';

const filterData = [
  {
    filterbyTitle: 'Filter By',
  },
  {
    name: 'inbox',
    icon: 'bi-inbox',
  },
  {
    name: 'sent',
    icon: 'bi-send',
  },
  {
    name: 'draft',
    icon: 'bi-archive',
  },
  {
    name: 'spam',
    icon: 'bi-exclamation-circle',
  },
  {
    name: 'trash',
    icon: 'bi-trash',
  },
  {
    devider: true,
  },
  {
    name: 'starred',
    icon: 'bi-star',
  },
  {
    name: 'important',
    icon: 'bi-bookmark',
  },
  {
    devider: true,
    id: 1,
  },
  {
    name: 'Promotional',
    icon: 'bi-folder',
  },
  {
    name: 'Social',
    icon: 'bi-folder',
  },
  {
    name: 'Health',
    icon: 'bi-folder',
  },
];

const EmailFilter = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.emailReducer.currentFilter);

  return (
    <>
      <div className="p-3 border-bottom">
        <EmailCompose />
      </div>
      <ListGroup flush>
        {filterData.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <h6 className="px-3 pt-3" key={filter.filterbyTitle}>
                {filter.filterbyTitle}
              </h6>
            );
          }
          if (filter.devider) {
            return <div className="border-bottom py-2 mb-2" key={`${filter.id}`} />;
          }
          return (
            <ListGroupItem
              href="#"
              tag="a"
              key={filter.name}
              className={
                active === `${filter.name}`
                  ? 'bg-light py-3 border-0 text-capitalize'
                  : 'py-3 border-0 text-capitalize'
              }
              onClick={() => dispatch(setVisibilityFilter(`${filter.name}`))}
            >
              <i className={`bi ${filter.icon} mx-1`} /> {filter.name}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </>
  );
};

export default EmailFilter;
