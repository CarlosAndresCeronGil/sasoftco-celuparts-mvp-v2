import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const newsData = [
  {
    title: '5,098',
    subtitle: 'Total Sent',
  },
  {
    title: '4,156',
    subtitle: 'Mail Open Rate',
  },
  {
    title: '1,369',
    subtitle: 'Click Rate',
  },
];

const NewsletterCampaign = () => {
  const optionsnewslatter = {
    chart: {
      fontFamily: "'Poppins', sans-serif",
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, .2)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#26c6da', '#1e88e5'],
    fill: {
      type: 'gradient',
      opacity: ['0.1', '0.1'],
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8'],
      labels: {
        show: true,
        style: {
          colors: '#99abb4',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: '#99abb4',
          fontSize: '12px',
        },
      },
    },
    markers: {
      size: 3,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      theme: 'dark',
    },
    legend: {
      show: false,
    },
  };
  const seriesnewslatter = [
    {
      name: 'Open Rate',
      data: [0, 5, 6, 8, 25, 9, 8, 24],
    },
    {
      name: 'Recurring Payments',
      data: [0, 3, 1, 2, 8, 1, 5, 1],
    },
  ];
  return (
    <DashCard
      title="Newsletter Campaign"
      subtitle="Overview of Newsletter Campaign"
      actions={
        <div className="hstack gap-2">
          <div className="d-flex align-items-center text-success fs-6">
            <i className="bi bi-circle-fill fs-7 me-2"></i>Open Rate
          </div>
          <div className="d-flex align-items-center text-primary fs-6">
            <i className="bi bi-circle-fill fs-7 me-2 "></i>Recurring Payments
          </div>
        </div>
      }
    >
      <div className="revenue" style={{ height: '250px' }}>
        <Chart options={optionsnewslatter} series={seriesnewslatter} type="area" height="250px" />
      </div>
      <Row className="mt-4">
        {newsData.map((rdata) => (
          <Col md="4" className="text-center mt-2 mt-md-0" key={rdata.title}>
            <h2 className="mb-0">{rdata.title}</h2>
            <span className="text-muted">{rdata.subtitle}</span>
          </Col>
        ))}
      </Row>
    </DashCard>
  );
};

export default NewsletterCampaign;
