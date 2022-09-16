import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const OurVisitors = () => {
  const optionsvisitors = {
    labels: ['Tablet', 'Desktop', 'Other', 'Mobile'],
    chart: {
      fontFamily: "'Poppins', sans-serif",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
      borderColor: 'transparent',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '82px',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '18px',
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              color: '#99abb4',
            },
            total: {
              show: true,
              label: 'Our Visitors',
              color: '#99abb4',
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: 'transparent',
    },
    legend: {
      show: false,
    },
    colors: ['#1e88e5', '#26c6da', '#eceff1', '#745af2'],
    tooltip: {
      fillSeriesColor: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
        },
      },
    ],
  };

  const seriesvisitors = [50, 40, 30, 10];
  return (
    <DashCard title="Our Visitors">
      <div className="mt-4 position-relative" style={{ height: '305px' }}>
        <Chart options={optionsvisitors} series={seriesvisitors} type="donut" height="255px" />
      </div>
      <div className="hstack gap-2 mt-2 pt-1 justify-content-center">
        <div className="d-flex align-items-center text-primary fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Tablet
        </div>
        <div className="d-flex align-items-center text-success fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Desktop
        </div>
        <div className="d-flex align-items-center text-info fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Mobile
        </div>
      </div>
    </DashCard>
  );
};

export default OurVisitors;
