/* eslint-disable */
import BlogsToCelupartsPages from '../../components/celuparts/BlogsToCelupartsPages';
// import CelupartsOverview from '../../components/celuparts/CelupartsOverview';
// import CelupartsRepairsAndRetomas from '../../components/celuparts/CelupartsRepairsAndRetomas';

const DashboardCeluparts = () => {

  const currentRole = JSON.parse(localStorage.getItem('user')).role;

  return (
    <>
      {/* <Row>
        <Col lg="8">
          <CelupartsOverview />
        </Col>
        <Col lg="4">
          <CelupartsRepairsAndRetomas />
        </Col>
      </Row> */}
      <BlogsToCelupartsPages />

      {/* Create buttom for social network */}
      <div className="d-flex justify-content-center d-grid gap-3">
        {/* <a href="#" target="_blank" rel="noreferrer" className="" >
          <i className="bi bi-facebook btn btn-facebook btn-icon"  ></i>
        </a> */}
        <a href="https://www.instagram.com/celuparts/" target="_blank" rel="noreferrer" className="">
          <i className="bi bi-instagram btn btn-instagram btn-icon"></i>
        </a>
        {/* <a href="#" target="_blank" rel="noreferrer" className="">
          <i className="bi bi-linkedin btn btn-linkedin btn-icon"></i>
        </a> */}
      </div>

    </>
  );
};

export default DashboardCeluparts;
