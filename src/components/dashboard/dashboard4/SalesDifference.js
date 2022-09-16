import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const SalesDifference = () => {
  const optionssalesdifference = {
    labels: ['Increase', 'Decrease'],
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    chart: {},
    plotOptions: {
      pie: {
        donut: {
          size: '60px',
        },
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    colors: ['rgb(38, 198, 218)', 'rgb(242, 244, 248)'],
    tooltip: {
      enabled: false,
      theme: 'dark',
    },
  };
  const seriessalesdifference = [25, 10];
  return (
    <DashCard title="Sales Difference">
      <div className="d-flex flex-row mt-4">
        <div className="align-self-center">
          <span className="fs-1 text-success fw-light">$4,316</span>
          <h6 className="text-muted">10% Increased</h6>
          <h5 className="mb-1">(150-165 Sales)</h5>
        </div>
        <div className="ms-auto">
          <div
            className="float-end mt-n3 mb-3"
            style={{
              height: '80px',
              width: '150px',
            }}
          >
            <Chart
              options={optionssalesdifference}
              series={seriessalesdifference}
              type="donut"
              width="140px"
            />
          </div>
        </div>
      </div>
    </DashCard>
  );
};

export default SalesDifference;
