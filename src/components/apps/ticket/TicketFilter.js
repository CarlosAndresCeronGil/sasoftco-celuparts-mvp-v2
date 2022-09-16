import { Row, Col, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibilityFilter } from '../../../store/apps/ticket/TicketSlice';

const TicketFilter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.ticketReducer.tickets);
  const pendingC = counter.filter((t) => t.Status === 'Pending').length;
  const openC = counter.filter((t) => t.Status === 'Open').length;
  const closeC = counter.filter((t) => t.Status === 'Closed').length;
  return (
    <Row>
      <Col lg="3">
        <Card
          color="primary"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('total_tickets'))}
        >
          <CardBody>
            <h2>{counter.length}</h2>
            <h5>Total Tickets</h5>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3">
        <Card
          color="warning"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('Pending'))}
        >
          <CardBody>
            <h2>{pendingC}</h2>
            <h5>Pending Tickets</h5>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3">
        <Card
          color="success"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('Open'))}
        >
          <CardBody>
            <h2>{openC}</h2>
            <h5>Open Tickets</h5>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3">
        <Card
          color="danger"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('Closed'))}
        >
          <CardBody>
            <h2>{closeC}</h2>
            <h5>Closed Tickets</h5>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default TicketFilter;
