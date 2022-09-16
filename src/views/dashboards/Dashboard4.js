import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import TotalRevenue from '../../components/dashboard/dashboard4/TotalRevenue';
import SalesPrediction from '../../components/dashboard/dashboard4/SalesPrediction';
import SalesDifference from '../../components/dashboard/dashboard4/SalesDifference';
import Chat from '../../components/dashboard/dashboard4/Chat';
import CalendarApp from '../apps/calendar/CalendarApp';
import RecentMessages from '../../components/dashboard/dashboard4/RecentMessages';
import BrowseStats from '../../components/dashboard/dashboard4/BrowseStats';
import TotalVisits from '../../components/dashboard/dashboard4/TotalVisits';
import VisitorsCards from '../../components/dashboard/dashboard4/VisitorsCards';

const Dashboard4 = () => {
  return (
    <>
      <BreadCrumbs />
      <VisitorsCards />
      <Row>
        <Col lg="8">
          <TotalVisits />
        </Col>
        <Col lg="4">
          <BrowseStats />
        </Col>
      </Row>
      <Row>
        <Col lg="8">
          <TotalRevenue />
        </Col>
        <Col lg="4">
          <SalesPrediction />
          <SalesDifference />
        </Col>
      </Row>
      <CalendarApp />
      <Row>
        <Col lg="6">
          <Chat />
        </Col>
        <Col lg="6">
          <RecentMessages />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard4;
