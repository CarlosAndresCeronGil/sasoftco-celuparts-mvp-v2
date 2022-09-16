import { Card, CardBody } from 'reactstrap';
import ChatList from '../../../components/apps/chat/ChatList';
import ChatSearch from '../../../components/apps/chat/ChatSearch';
import ChatContent from '../../../components/apps/chat/ChatContent';
import ChatMsgForm from '../../../components/apps/chat/ChatMsgForm';
import TwoColumn from '../../../components/twoColumn/TwoColumn';

const Chat = () => {
  return (
    <Card>
      <CardBody>
        <TwoColumn
          leftContent={
            <>
              <ChatSearch />
              <ChatList />
            </>
          }
          rightContent={
            <>
              <ChatContent />
              <ChatMsgForm />
            </>
          }
        />
      </CardBody>
    </Card>
  );
};

export default Chat;
