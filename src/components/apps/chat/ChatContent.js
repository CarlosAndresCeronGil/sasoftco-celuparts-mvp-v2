import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const ChatContent = () => {
  const chatDetails = useSelector(
    (state) => state.chatReducer.chats[state.chatReducer.chatContent - 1],
  );

  return (
    <>
      {chatDetails ? (
        <div>
          <div className="d-flex align-items-center p-3 border-bottom">
            <Button close className="d-xs-block d-lg-none me-2" />
            <div className="">
              <img src={chatDetails.thumb} alt="user" className="rounded-circle" width="46" />
            </div>
            <div className="mx-2">
              <h5 className="mb-0">{chatDetails.name}</h5>
              <small>{chatDetails.status}</small>
            </div>
          </div>

          <SimpleBar style={{ height: 'calc(100vh - 360px)' }}>
            <ul className="list-unstyled p-4">
              {Object.keys(chatDetails.chatHistory).map((chat) =>
                Object.keys(chatDetails.chatHistory[chat]).map((key) =>
                  Object.keys(chatDetails.chatHistory[chat][key]).map((k) =>
                    k === 'from' ? (
                      <li className="chat-item d-flex align-items-center" key={k}>
                        <div>
                          <img
                            src={chatDetails.thumb}
                            alt={chatDetails.name}
                            width="50"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="px-3">
                          {chatDetails.chatHistory[chat][key][k].map((v) => (
                            <div className="bg-light d-table p-2 mb-1" key={v}>
                              {v}
                            </div>
                          ))}
                        </div>
                      </li>
                    ) : (
                      <li className="flex-row-reverse text-end d-flex my-1 ms-auto" key={k}>
                        <div>
                          {chatDetails.chatHistory[chat][key][k].map((v) => (
                            <div key={v} className="p-2 d-table ms-auto bg-light mb-1">
                              {v}
                            </div>
                          ))}
                        </div>
                      </li>
                    ),
                  ),
                ),
              )}
            </ul>
          </SimpleBar>
        </div>
      ) : (
        <div>Select chat</div>
      )}
    </>
  );
};

export default ChatContent;
