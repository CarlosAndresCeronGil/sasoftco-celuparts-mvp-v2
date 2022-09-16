import React, { useEffect } from 'react';
import { Nav } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SelectChat, fetchChats } from '../../../store/apps/chat/ChatSlice';
import Chat from './ChatListItem';

const ChatList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const filterChats = (chats, chatSearch) => {
    if (chats)
      return chats.filter((t) =>
        t.name.toLocaleLowerCase().includes(chatSearch.toLocaleLowerCase()),
      );
    return chats;
  };

  const chats = useSelector((state) =>
    filterChats(state.chatReducer.chats, state.chatReducer.chatSearch),
  );
  const active = useSelector((state) => state.chatReducer.chatContent);

  return (
    <Nav className="">
      {chats.map((chat) => (
        <Chat
          key={chat.id}
          {...chat}
          active={active}
          onClick={() => dispatch(SelectChat(chat.id))}
          thumb={chat.thumb}
          status={chat.status}
          contactName={chat.name}
          chatExcerpt={chat.excerpt}
        />
      ))}
    </Nav>
  );
};

export default ChatList;
