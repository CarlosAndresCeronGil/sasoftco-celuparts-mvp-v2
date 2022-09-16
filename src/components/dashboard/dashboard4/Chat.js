import React, { useState } from 'react';
import { Form, Row, Col, Input, Button } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import DashCard from '../dashboardCards/DashCard';
import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';

const Chat = () => {
  const [chats, setChats] = useState([
    {
      username: 'Kevin Hsu',
      content: 'Hello World!',
      img: user1,
      id: 1,
    },
    {
      username: 'Alice Chen',
      content: 'Love it! :heart:',
      img: user1,
      id: 2,
    },
    {
      username: 'Kevin Hsu',
      content: 'Check out my Github at https://github.com/WigoHunter',
      img: user1,
      id: 3,
    },
    {
      username: 'KevHs',
      content:
        'Lorem ipsum dolor sit amet, nibh ipsum. Cum class sem inceptos incidunt sed sed. Tempus wisi enim id, arcu sed lectus aliquam, nulla vitae est bibendum molestie elit risus.',
      img: user2,
      id: 4,
    },
    {
      username: 'Kevin Hsu',
      content: 'So',
      img: user1,
      id: 5,
    },
    {
      username: 'Kevin Hsu',
      content: 'Chilltime is going to be an app for you to view videos with friends',
      img: user1,
      id: 6,
    },
    {
      username: 'Kevin Hsu',
      content: 'You can sign-up now to try out our private beta!',
      img: user1,
      id: 7,
    },
    {
      username: 'Alice Chen',
      content: 'Definitely! Sounds great!',
      img: user1,
      id: 8,
    },
  ]);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const message2 = e.target.value;
    setMessage(message2);
  };

  const submitMessage = (e) => {
    e.preventDefault();
    setChats(
      [
        ...chats,
        {
          username: 'Kevin Hsu',
          content: <span>{message}</span>,
          img: user2,
          id: chats.length + 1,
        },
      ],
      setMessage(''),
    );
  };
  const username = 'Kevin Hsu';

  return (
    <DashCard title="Recent Chats" subtitle="Message your friends">
      <ul className="list-unstyled">
        <SimpleBar style={{ height: '540px' }}>
          {chats.map((chat) => (
            <li
              className={`chat ${
                username === chat.username
                  ? 'd-flex flex-row-reverse text-end mt-2'
                  : 'd-flex gap-3 ms-auto mt-2'
              }`}
              key={chat.id}
            >
              <div>
                {username !== chat.username && (
                  <img
                    src={chat.img}
                    alt={`${chat.username}'s profile pic`}
                    width="50"
                    className="rounded-circle"
                  />
                )}
              </div>
              <div
                className={`p-2 mb-1 rounded ${
                  username === chat.username ? 'bg-light-success' : 'bg-light-primary'
                }`}
              >
                {' '}
                {chat.content}
              </div>
            </li>
          ))}
        </SimpleBar>
      </ul>
      <div className="border-top pt-4">
        <Form onSubmit={(e) => submitMessage(e)}>
          <Row className='gx-0'>
            <Col xs="10">
              <div className="input-field mt-0 mb-0">
                <Input
                  type="text"
                  placeholder="Type and enter"
                  className="form-control border-0"
                  value={message}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs="2" className="text-end">
              <Button color="primary" type="submit" value="submit">
                <i className="bi bi-send" />
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </DashCard>
  );
};

export default Chat;
