import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const TotalRevenue = () => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: true,
      fontFamily: "'Poppins', sans-serif",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barWidth: '35%',
        endingShape: 'flat',
      },
    },
    colors: ['#1e88e5', '#26c6da', '#fc4b6c'],
    fill: {
      type: 'solid',
      opacity: 1,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.2)',
    },
    tooltip: {
      theme: 'dark',
    },
    responsive: [
      {
        breakpoint: 2500,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '30%',
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: '2021',
      data: [800000, 1200000, 1400000, 1300000, 1200000, 1400000, 1300000, 1300000, 1200000],
    },
    {
      name: '2020',
      data: [200000, 400000, 500000, 300000, 400000, 500000, 300000, 300000, 400000],
    },
    {
      name: '2019',
      data: [100000, 200000, 400000, 600000, 200000, 400000, 600000, 600000, 200000],
    },
  ];
  return (
    <DashCard
      title="Total Revenue"
      actions={
        <div className="hstack gap-2">
          <div className="d-flex align-items-center">
            <i className="bi bi-circle-fill fs-7 me-2 text-danger"></i>2019
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-circle-fill fs-7 me-2 text-success"></i>2020
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-circle-fill fs-7 me-2 text-primary"></i>2021
          </div>
        </div>
      }
    >
      <div className="total-sales" style={{ height: '335px' }}>
        <Chart options={options} series={series} type="bar" height="335" />
      </div>
    </DashCard>
  );
};

export default TotalRevenue;
