import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const SalesOverview = () => {
  const optionssalesoverview = {
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
        columnWidth: '15%',
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
  const seriessalesoverview = [
    {
      name: 'Ample',
      data: [9, 5, 3, 7, 5, 10, 3],
    },
    {
      name: 'Pixel',
      data: [6, 3, 9, 5, 4, 6, 4],
    },
  ];
  return (
    <DashCard
      title="Sales Overview"
      subtitle="Ample Admin Vs Pixel Admin"
      actions={
        <div className="hstack gap-2">
          <div className="d-flex align-items-center fs-6 text-success">
            <i className="bi bi-circle-fill fs-7 me-2 "></i>Ample
          </div>
          <div className="d-flex align-items-center fs-6 text-primary">
            <i className="bi bi-circle-fill fs-7 me-2 "></i>Pixel
          </div>
        </div>
      }
    >
      <Chart
        options={optionssalesoverview}
        series={seriessalesoverview}
        type="bar"
        height="308px"
      />
    </DashCard>
  );
};

export default SalesOverview;
