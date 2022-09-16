import React from 'react';
import { Form, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SearchContact } from '../../../store/apps/contacts/ContactSlice';

const ContactSearch = () => {
  const searchTerm = useSelector((state) => state.contactsReducer.contactSearch);

  const dispatch = useDispatch();

  return (
    <div className="p-3 border-bottom d-flex">
      <Button close className="d-xs-block d-xl-none me-2" />
      <Form className="flex-grow-1">
        <Input
          className="form-control mb-2"
          id="searchUser"
          name="searchUser"
          type="text"
          onChange={(e) => dispatch(SearchContact(e.target.value))}
          value={searchTerm}
          placeholder="Search Contact..."
        />
      </Form>
    </div>
  );
};

export default ContactSearch;
