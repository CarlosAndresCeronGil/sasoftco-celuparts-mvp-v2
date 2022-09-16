import { Row, Col } from 'reactstrap';

import TopCardsData from './TopCardsData';

const TopCards = () => {
  return (
    <Row>
      <Col sm="6" lg="3">
        <TopCardsData
          bg="primary"
          icon="wallet2"
          title="2,064"
          subtitle="Total Revenue"
        />
      </Col>
      <Col sm="6" lg="3">
        <TopCardsData
          bg="warning"
          icon="people"
          title="1,738"
          subtitle="Online Revenue"
        />
      </Col>
      <Col sm="6" lg="3">
        <TopCardsData
          bg="info"
          icon="cart"
          title="5,963"
          subtitle="Offline Revenue"
        />
      </Col>      
      <Col sm="6" lg="3">
        <TopCardsData
          bg="danger"
          icon="bullseye"
          title="4,464"
          subtitle="Ad. Expense"
        />
      </Col>
    </Row>
  );
};

export default TopCards;
