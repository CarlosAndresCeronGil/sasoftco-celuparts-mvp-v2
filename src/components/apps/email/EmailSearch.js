import React from 'react';
import { Form, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SearchEmail } from '../../../store/apps/email/EmailSlice';

const EmailSearch = () => {
  const searchTerm = useSelector((state) => state.emailReducer.emailSearch);

  const dispatch = useDispatch();

  return (
    <div className="p-3 border-bottom d-flex">
      <Button close className="d-xs-block d-xl-none me-2" />
      <Form className="flex-grow-1">
        <Input
          className="form-control "
          id="searchEmail"
          name="searchEmail"
          type="text"
          onChange={(e) => dispatch(SearchEmail(e.target.value))}
          value={searchTerm}
          placeholder="Search Email..."
        />
      </Form>
    </div>
  );
};

export default EmailSearch;
