import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import Chart from 'react-apexcharts';

const Downloads = () => {
  const options2 = {
    chart: {
      type: 'bar',
      width: 60,
      height: 50,
      sparkline: {
        enabled: true,
      },
      fontFamily: "'Poppins', sans-serif",
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
      },
    },
    colors: ['rgba(255,255,255,0.3)'],
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {},
      marker: {
        show: false,
      },
    },
  };

  const series2 = [
    {
      name: 'Count',
      data: [4, 5, 9, 10, 9, 12, 4, 9, 4, 5, 3, 10],
    },
  ];
  return (
    <Card className="bg-success">
      <CardBody>
        <div className="d-flex">
          <div className="me-3 align-self-center">
            <h1 className="text-dark-white">
              <i className="bi bi-cloud-download"></i>
            </h1>
          </div>
          <div>
            <h4 className="text-dark-white">Downloads</h4>
            <h6 className="text-dark-white">March 2022</h6>
          </div>
        </div>
        <Row>
          <Col xs={5} className="d-flex align-items-center">
            <h2 className="text-dark-white text-truncate mb-0">35487</h2>
          </Col>
          <Col xs={7} className="d-flex justify-content-end">
            <div style={{ height: '105px', width: '100px' }}>
              <Chart options={options2} series={series2} type="bar" height="75" />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Downloads;
