import React from 'react';
import { Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SearchChat } from '../../../store/apps/chat/ChatSlice';

const ChatSearch = () => {
  const searchTerm = useSelector((state) => state.chatReducer.chatSearch);

  const dispatch = useDispatch();

  return (
    <div className="p-3 border-bottom">
      <Form>
        <Input
          className="form-control mb-2"
          id="searchUser"
          name="searchUser"
          type="text"
          onChange={(e) => dispatch(SearchChat(e.target.value))}
          value={searchTerm}
          placeholder="Search Contact..."
        />
      </Form>
    </div>
  );
};

export default ChatSearch;
