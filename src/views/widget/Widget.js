import React from 'react';
import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import Profile from '../../components/widgets/Profile';
import Feeds from '../../components/dashboard/dashboard1/Feeds';
import MyContact from '../../components/dashboard/dashboard1/MyContact';
import RecentComments from '../../components/dashboard/dashboard2/RecentComments';
import TaskList from '../../components/dashboard/dashboard2/TaskList';
import Chat from '../../components/dashboard/dashboard4/Chat';
import BrowseStats from '../../components/dashboard/dashboard4/BrowseStats';

const Widgets = () => {
  return (
    <>
      <BreadCrumbs />
      <Row>
        <Col xs="12" lg="4">
          <Profile />
          <Feeds />
          <MyContact />
        </Col>
        <Col xs="12" lg="4">
          <RecentComments />
          <TaskList />
        </Col>
        <Col xs="12" lg="4">
          <Chat />
          <BrowseStats />
        </Col>
      </Row>
    </>
  );
};

export default Widgets;
