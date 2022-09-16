import { Col, Row } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import TopCards from '../../components/dashboard/dashboard2/TopCards';
import RecentComments from '../../components/dashboard/dashboard2/RecentComments';
import Feeds from '../../components/dashboard/dashboard1/Feeds';
import NewsletterCampaign from '../../components/dashboard/dashboard1/NewsletterCampaign';
import Downloads from '../../components/dashboard/dashboard1/Downloads';
import BandwidthUsage from '../../components/dashboard/dashboard1/BandwidthUsage';
import OurVisitors from '../../components/dashboard/dashboard1/OurVisitors';
import ProjectTable from '../../components/dashboard/dashboard2/ProjectTable';
import TaskList from '../../components/dashboard/dashboard2/TaskList';
import ProfileCard from '../../components/dashboard/dashboard1/ProfileCard';
import Map from '../../components/dashboard/dashboard2/Map';

const Dashboard2 = () => {
  return (
    <>
      <BreadCrumbs />
      <TopCards />
      <Row>
        <Col lg="4">
          <BandwidthUsage />
          <Downloads />
        </Col>
        <Col lg="4">
          <OurVisitors />
        </Col>
        <Col lg="4">
          <Map />
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <Feeds />
        </Col>
        <Col lg="8">
          <NewsletterCampaign />
        </Col>
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

export default Dashboard2;
