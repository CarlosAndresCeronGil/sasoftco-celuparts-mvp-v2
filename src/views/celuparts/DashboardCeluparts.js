/* eslint-disable */
import BlogsToCelupartsPages from "../../components/celuparts/BlogsToCelupartsPages";
// import CelupartsOverview from '../../components/celuparts/CelupartsOverview';
// import CelupartsRepairsAndRetomas from '../../components/celuparts/CelupartsRepairsAndRetomas';
import { SocialIcon } from "react-social-icons";

const DashboardCeluparts = () => {
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
      <hr style={{ color: "black" }} />
      <div className="d-flex justify-content-between  d-grid gap-3">
        {/* <a href="#" target="_blank" rel="noreferrer" className="" >
          <i className="bi bi-facebook btn btn-facebook btn-icon"  ></i>
        </a> */}
        <div className="flex" style={{ flex: 1, fontStyle: "italic" }}>
          Copyright {new Date().getFullYear()} © Celuparts. Todos los derechos
          reservados
        </div>
        <div className="flex d-flex justify-content-end" style={{ flex: 1 }}>
          <SocialIcon
            url="https://es-la.facebook.com/celuparts1/"
            target="_blank"
            style={{ height: 35, width: 35, marginRight: 5 }}
          />
          <SocialIcon
            url="https://www.instagram.com/celuparts1/"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
        </div>

        {/* <a href="#" target="_blank" rel="noreferrer" className="">
          <i className="bi bi-linkedin btn btn-linkedin btn-icon"></i>
        </a> */}
      </div>
    </>
  );
};

export default DashboardCeluparts;
