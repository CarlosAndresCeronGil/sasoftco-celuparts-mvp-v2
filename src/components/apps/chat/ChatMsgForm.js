import React, { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { sendMsg } from '../../../store/apps/chat/ChatSlice';

const ChatMsgForm = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  const handleChatMsgChange = (e) => {
    setMsg(e.target.value);
  };
  const id = useSelector((state) => state.chatReducer.chatContent);

  const onChatMsgSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(sendMsg(id, msg));
    setMsg('');
  };

  return (
    <Form onSubmit={onChatMsgSubmit.bind()} className="card-body border-top">
      <div className="d-flex">
        <Input
          type="text"
          className="form-control me-2"
          placeholder="Type your message"
          onChange={handleChatMsgChange.bind(null)}
          value={msg}
          required
        />
        <Button
          onClick={() => {
            dispatch(sendMsg(id, msg));
            setMsg('');
          }}
          color="primary"
          disabled={!msg}
        >
          <i className="bi bi-send" />
        </Button>
      </div>
    </Form>
  );
};

export default ChatMsgForm;
