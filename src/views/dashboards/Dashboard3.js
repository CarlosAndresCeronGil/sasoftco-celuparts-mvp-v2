import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ProgressCards from '../../components/dashboard/dashboard3/ProgressCards';
import RevenueStatistics from '../../components/dashboard/dashboard3/RevenueStatistics';
import UserViews from '../../components/dashboard/dashboard3/UserViews';
import ProfileCard from '../../components/dashboard/dashboard1/ProfileCard';
import Map from '../../components/dashboard/dashboard2/Map';
import ProjectTable from '../../components/dashboard/dashboard2/ProjectTable';
import Feeds from '../../components/dashboard/dashboard1/Feeds';
import MyContact from '../../components/dashboard/dashboard1/MyContact';
import Downloads from '../../components/dashboard/dashboard1/Downloads';
import BandwidthUsage from '../../components/dashboard/dashboard1/BandwidthUsage';
import RecentComments from '../../components/dashboard/dashboard2/RecentComments';
import TaskList from '../../components/dashboard/dashboard2/TaskList';

const Dashboard3 = () => {
  return (
    <>
      <BreadCrumbs />
      <ProgressCards />
      <Row>
        <Col lg="4">
          <RevenueStatistics />
        </Col>
        <Col lg="4">
          <UserViews />
        </Col>
        <Col lg="4">
          <Map />
        </Col>
      </Row>
      <Row>
        <Col lg="6"></Col>
        <Col lg="6"></Col>
      </Row>
      <Row>
        <Col lg="8">
          <ProjectTable />
        </Col>
        <Col lg="4">
          <ProfileCard />
        </Col>
      </Row>
      <Row>
      <Col lg="4">
        <BandwidthUsage />
        <Downloads />
      </Col>
      <Col lg="4">
        <Feeds />
      </Col>
      <Col lg="4">
        <MyContact />
      </Col>
      </Row>
      {/*********************Chat & comment ************************/}
      <Row>
        <Col lg="6">
          <RecentComments />
        </Col>
        <Col lg="6">
          <TaskList />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard3;
