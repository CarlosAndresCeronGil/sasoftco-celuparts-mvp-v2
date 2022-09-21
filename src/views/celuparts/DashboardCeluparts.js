/* eslint-disable */
import { Row, Col } from 'reactstrap';
import BlogsToCelupartsPages from '../../components/celuparts/BlogsToCelupartsPages';
import BlogsToExternalCelupartsPages from '../../components/celuparts/BlogsToExternalCelupartsPages';
import CelupartsOverview from '../../components/celuparts/CelupartsOverview';
import CelupartsRepairsAndRetomas from '../../components/celuparts/CelupartsRepairsAndRetomas';

const DashboardCeluparts = () => {
  return (
    <>
      {/* <Row>
        <Col lg="8">
          <CelupartsOverview />
        </Col>
        <Col lg="4">
          <CelupartsRepairsAndRetomas />
        </Col>
      </Row> */}
      <BlogsToCelupartsPages />
      {/* <BlogsToExternalCelupartsPages /> */}
    </>
  );
};

export default DashboardCeluparts;
