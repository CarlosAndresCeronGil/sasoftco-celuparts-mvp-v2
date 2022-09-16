import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import Chart from "react-apexcharts";

const VisitorsCards = () => {
    const optionsvisit1 = {
        colors: ["#26c6da"],
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "flat",
            columnWidth: "65%",
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
          sparkline: { enabled: true },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          show: false,
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
          stroke: {
            show: false,
          },
          padding: {
            top: 0,
            bottom: 0,
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          enabled: true,
          theme: "dark",
          x: {
            show: false,
          },
        },
      };
      const seriesvisit1 = [
        {
          name: "",
          data: [4, 5, 2, 10, 9, 12, 4, 9],
        },
      ];
      // 2
      const optionsvisit2 = {
        colors: ["#7460ee"],
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "flat",
            columnWidth: "65%",
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
          sparkline: { enabled: true },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          show: false,
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
          stroke: {
            show: false,
          },
          padding: {
            top: 0,
            bottom: 0,
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          enabled: true,
          theme: "dark",
          x: {
            show: false,
          },
        },
      };
      const seriesvisit2 = [
        {
          name: "",
          data: [2, 5, 6, 10, 9, 12, 4, 9],
        },
      ];
      //   3
      const optionsvisit3 = {
        colors: ["#03a9f3"],
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "flat",
            columnWidth: "65%",
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
          sparkline: { enabled: true },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          show: false,
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
          stroke: {
            show: false,
          },
          padding: {
            top: 0,
            bottom: 0,
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          enabled: true,
          theme: "dark",
          x: {
            show: false,
          },
        },
      };
      const seriesvisit3 = [
        {
          name: "",
          data: [4, 5, 6, 10, 9, 12, 4, 9],
        },
      ];
      //   4
      const optionsvisit4 = {
        colors: ["#f62d51"],
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "flat",
            columnWidth: "65%",
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
          sparkline: { enabled: true },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          show: false,
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
          stroke: {
            show: false,
          },
          padding: {
            top: 0,
            bottom: 0,
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          enabled: true,
          theme: "dark",
          x: {
            show: false,
          },
        },
      };
      const seriesvisit4 = [
        {
          name: "",
          data: [2, 5, 6, 10, 9, 12, 4, 9],
        },
      ];
  return (
    <Card>
      <Row className="gx-0">
        <Col md="3" className="border-end">
          <CardBody className="text-center">
            <CardTitle tag="h4">Unique Visit</CardTitle>
            <div style={{ width: '100px', margin: '0 auto' }}>
              <Chart options={optionsvisit1} series={seriesvisit1} type="bar" height="65px" />
            </div>
          </CardBody>
          <div className="border-top p-2 text-center">
            <h4 className="mb-0">
              <i className="bi bi-caret-up-fill text-success" /> 2,456
            </h4>
          </div>
        </Col>
        <Col md="3" className="border-end">
          <CardBody className="text-center">
            <CardTitle tag="h4">Total Visit</CardTitle>
            <div style={{ width: '100px', margin: '0 auto' }}>
              <Chart options={optionsvisit2} series={seriesvisit2} type="bar" height="65px" />
            </div>
          </CardBody>
          <div className="border-top p-2 text-center">
            <h4 className="mb-0">
              <i className="bi bi-caret-down-fill text-danger" /> 6,300
            </h4>
          </div>
        </Col>
        <Col md="3" className="border-end">
          <CardBody className="text-center">
            <CardTitle tag="h4">Bounce rate</CardTitle>
            <div style={{ width: '100px', margin: '0 auto' }}>
              <Chart options={optionsvisit3} series={seriesvisit3} type="bar" height="65px" />
            </div>
          </CardBody>
          <div className="border-top p-2 text-center">
            <h4 className="mb-0">
              <i className="bi bi-caret-up-fill text-success" /> 5,458
            </h4>
          </div>
        </Col>
        <Col md="3">
          <CardBody className="text-center">
            <CardTitle tag="h4">Page Views</CardTitle>
            <div style={{ width: '100px', margin: '0 auto' }}>
              <Chart options={optionsvisit4} series={seriesvisit4} type="bar" height="65px" />
            </div>
          </CardBody>
          <div className="border-top p-2 text-center">
            <h4 className="mb-0">
              <i className="bi bi-caret-down-fill text-danger" /> 7,150
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default VisitorsCards;
