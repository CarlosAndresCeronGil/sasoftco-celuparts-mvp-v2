import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const UserViews = () => {
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
    <DashCard title="User Views" subtitle="Last 5 Months Views">
      <div className="mt-4 pb-1" style={{ height: '250px' }}>
        <Chart options={optionsnewslatter} series={seriesnewslatter} type="area" height="270px" />
      </div>
      <div className="hstack gap-2 mt-4 justify-content-center pt-3">
        <div className="d-flex align-items-center text-success fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Positive View
        </div>
        <div className="d-flex align-items-center text-primary fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Negative View
        </div>
      </div>
    </DashCard>
  );
};

export default UserViews;
