// random values for demo
const rFactor = () => {
  return Math.round(Math.random() * 100);
};

const chartData = {
  doughnutData: {
    data: [400, 50, 100, 80, 150],
  },
  pieData: {
    data: [300, 50, 100],
  },
  barData: {
    data: {
      a: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()],
      b: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()],
    },
  },
  lineData: {
    data: {
      a: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()],
      b: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()],
    },
  },
  radarData: {
    data: {
      a: [65, 59, 90, 81, 56, 55, 40],
      b: [28, 48, 40, 19, 96, 27, 100],
    },
  },
  polarData: {
    data: [11, 16, 7, 3],
  },
};

export default chartData;
