import React from 'react';
import Chart from 'react-apexcharts';
import {
  Row,
  Col,
  Card,
  CardBody,
  Media,
  Badge,
  Button,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import img1 from '../../../assets/images/users/user1.jpg';
import img2 from '../../../assets/images/users/user2.jpg';
import img3 from '../../../assets/images/users/user3.jpg';
import img4 from '../../../assets/images/users/user4.jpg';

const TicketDetail = () => {
  const optionsorder = {
    chart: {
      id: 'donut-chart',
      fontFamily: '"Nunito", sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tickets',
              color: '#99abb4',
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
    labels: ['In Progress', 'Opened', 'Closed', 'In Queue'],
    legend: {
      show: false,
    },
    colors: ['rgb(64, 196, 255)', 'rgb(255, 130, 28)', 'rgb(126, 116, 251)', 'rgb(41, 97, 255)'],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriesorder = [45, 27, 15, 18];
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col lg="8">
          <Card>
            <CardBody>
              <h5>Ticket</h5>
              <p className="mt-3 mb-0">
                Hi There, i was wondering, do you provide a service to build custom pages. I need
                some pages for a ticket system similar to the one you have. Please advise if you
                provide this service and i will send through my requirements. Regards.
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h5 className="mb-4">Ticket Replies</h5>
              <Media className="d-flex">
                <Media left href="#">
                  <Media object src={img1} alt="Generic placeholder image" width="100" />
                </Media>
                <Media body className="ms-3">
                  <Media heading>Ticket title</Media>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                  sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                  turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                  felis in faucibus.
                  <Media className="d-flex mt-4">
                    <Media left href="#">
                      <Media object src={img2} alt="Generic placeholder image" width="100" />
                    </Media>
                    <Media body className="ms-3">
                      <Media heading>Ticket Reply</Media>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                      sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus
                      viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                      lacinia congue felis in faucibus.
                    </Media>
                  </Media>
                </Media>
              </Media>

              <Media className="d-flex mt-5">
                <Media left href="#">
                  <Media object src={img3} alt="Generic placeholder image" width="100" />
                </Media>
                <Media body className="ms-3">
                  <Media heading>Ticket title</Media>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                  sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                  turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                  felis in faucibus.
                </Media>
              </Media>
              <Media className="d-flex mt-5">
                <Media left href="#">
                  <Media object src={img4} alt="Generic placeholder image" width="100" />
                </Media>
                <Media body className="ms-3">
                  <Media heading>Ticket title</Media>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                  sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                  turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                  felis in faucibus.
                </Media>
              </Media>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card>
            <CardBody>
              <h5>Ticket Info</h5>
              <Row className="bg-light my-3 align-items-center">
                <Col sm="6">
                  <div className="py-3">
                    <Badge color="warning">In-Progress</Badge>
                  </div>
                </Col>
                <Col sm="6" className="text-end">
                  May 2, 2018 9:49
                </Col>
              </Row>
              <h6>Ticket Creator</h6>
              <span>Username</span>
              <br />
              <br />
              <h6>Support Staff</h6>
              <span>Agent Name</span>
              <br />
              <br />
              <Button color="success">Update</Button>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center p-4 border-bottom">
              <img src={img1} className="rounded-circle" width="90" alt="avatar" />
              <CardTitle tag="h4" className="fw-bold mt-3 mb-0">
                Daniel Kristeen
              </CardTitle>
              <CardSubtitle className="text-muted">danielkristeen@gmail.com</CardSubtitle>
              <Row className="mt-4 pt-3">
                <Col xs="4" className="text-center border-end">
                  <h4 className="fw-bold mb-0">4</h4>
                  <p className="text-muted mb-0 fs-6">Total</p>
                </Col>
                <Col xs="4" className="text-center border-end">
                  <h4 className="fw-bold mb-0">2</h4>
                  <p className="text-muted mb-0 fs-6">Open</p>
                </Col>
                <Col xs="4" className="text-center">
                  <h4 className="fw-bold mb-0">3</h4>
                  <p className="text-muted mb-0 fs-6">Closed</p>
                </Col>
              </Row>
            </CardBody>
            <CardBody>
              <Row>
                <Col xs="6" className="text-center border-end">
                  <a
                    href="/"
                    className="text-dark d-flex align-items-center justify-content-center text-decoration-none fw-bold"
                  >
                    <i className="bi bi-chat-left-fill me-2"></i>
                    Message
                  </a>
                </Col>
                <Col xs="6" className="text-center">
                  <a
                    href="/"
                    className="text-dark d-flex align-items-center justify-content-center text-decoration-none fw-bold"
                  >
                    <i className="bi bi-columns me-2"></i>
                    Portfolio
                  </a>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardBody className='p-4'>
              <CardTitle tag="h4">Ticket Statestics</CardTitle>
              <Chart options={optionsorder} series={seriesorder} type="donut" height="245" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TicketDetail;
