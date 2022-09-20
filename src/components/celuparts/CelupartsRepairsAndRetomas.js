import Chart from 'react-apexcharts';
import DashCard from './dashboardCards/DashCard';

const CelupartsRepairsAndRetomas = () => {
  const optionsvisitors = {
    labels: ['Reparaciones', 'Retomas'],
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
              label: 'Tus solicitudes',
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
    colors: ['#1e88e5', '#26c6da'],
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

  const seriesvisitors = [5, 2];
  return (
    <DashCard title="Tus reparaciones y retomas">
      <div className="mt-4 position-relative" style={{ height: '305px' }}>
        <Chart options={optionsvisitors} series={seriesvisitors} type="donut" height="255px" />
      </div>
      <div className="hstack gap-2 mt-2 pt-1 justify-content-center">
        <div className="d-flex align-items-center text-primary fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Reparaciones
        </div>
        <div className="d-flex align-items-center text-success fs-6">
          <i className="bi bi-circle-fill fs-7 me-2"></i>Retomas
        </div>
      </div>
    </DashCard>
  );
};

export default CelupartsRepairsAndRetomas;
