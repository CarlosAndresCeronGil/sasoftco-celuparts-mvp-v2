import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const RevenueStatistics = () => {
  const optionsrevenue = {
    grid: {
      show: true,
      borderColor: 'rgba(0,0,0,.3)',
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        endingShape: 'flat',
      },
    },
    colors: ['#1e88e5', '#26c6da'],
    fill: {
      type: 'solid',
      opacity: 1,
    },
    chart: {
      fontFamily: "'Poppins', sans-serif",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: 'category',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      show: true,
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
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const seriesrevenue = [
    {
      name: 'Nice',
      data: [9, 5, 3, 7, 5, 10, 3],
    },
    {
      name: 'Xtreme',
      data: [6, 3, 9, 5, 4, 6, 4],
    },
  ];
  return (
    <DashCard title="Revenue Statistics" subtitle="Xtreme Admin Vs Nice Admin">
      <Chart options={optionsrevenue} series={seriesrevenue} type="bar" height="250px" />

      <div className="hstack gap-2 mt-4 justify-content-center pt-2">
        <div className="d-flex align-items-center text-success fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Xtreme
        </div>
        <div className="d-flex align-items-center text-primary fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Nice
        </div>
      </div>
    </DashCard>
  );
};

export default RevenueStatistics;
