import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const SalesPrediction = () => {
  const optionssalesprediction = {
    colors: ['#7460ee'],
    chart: {
      type: 'radialBar',
      offsetY: -20,
      fontFamily: "'Rubik', sans-serif",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          shadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '22px',
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ['Average Results'],
    tooltip: {
      theme: 'dark',
    },
  };
  const seriessalesprediction = [76];
  return (
    <DashCard title="Sales Prediction">
      <div className="d-flex flex-row mt-4">
        <div className="align-self-center">
          <span className="fs-1 text-info fw-light">$3,528</span>
          <h6 className="text-muted">10% Increased</h6>
          <h5>(150-165 Sales)</h5>
        </div>
        <div className="ms-auto">
          <div
            style={{
              height: '70px',
              width: '150px',
            }}
          >
            <Chart
              options={optionssalesprediction}
              series={seriessalesprediction}
              type="radialBar"
              height="200px"
              width="150px"
            />
          </div>
        </div>
      </div>
    </DashCard>
  );
};

export default SalesPrediction;
