import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const Breadcrumbs = () => {
  return (
    <>
      <BreadCrumbs />
      <Row>
        <Col>
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Basic Breadcrumbs">
            <Breadcrumb>
              <BreadcrumbItem active>Home</BreadcrumbItem>
            </Breadcrumb>
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="/">Home</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Library</BreadcrumbItem>
            </Breadcrumb>
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="/">Home</a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="/">Library</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Data</BreadcrumbItem>
            </Breadcrumb>
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default Breadcrumbs;
