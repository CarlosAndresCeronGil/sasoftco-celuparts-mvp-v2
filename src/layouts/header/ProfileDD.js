/* eslint-disable */
import React, { useEffect, useState } from "react";
import { DropdownItem } from "reactstrap";
import { User, FileText, Star, Settings, Droplet, Eye } from "react-feather";
// import user1 from '../../assets/images/users/user4.jpg';
import userCeluparts from "../../assets/images/users/userCeluparts.png";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import getSingleUser from "../../services/getSingleUser";

const ProfileDD = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const user = await getSingleUser({
        id: JSON.parse(localStorage.getItem("user")).idUser
      });
      setUser(user[0]);
    };
    try {
      if (JSON.parse(localStorage.getItem("user")).idUser) {
        getUser();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img
          src={userCeluparts}
          alt="user"
          className="rounded-circle"
          width="60"
        />
        <span>
          <Row>
            <Col xs="auto">
              <p className="mb-0 text-muted text-capitalize">
                {JSON.parse(localStorage.getItem("user")).role}
              </p>
            </Col>
            {/* <Col xs="auto">
              <p className="mb-0 text-muted">|</p>
            </Col>
            <Col xs="auto">
              <p className="mb-0 text-muted">Activo</p>
            </Col> */}
          </Row>
          <h5 className="mb-0">
            {user?.names} {user?.surnames}
          </h5>
          {/* <small className='fs-6 text-muted fw-lighter'>{JSON.parse(localStorage.getItem('user')).email}</small> */}
        </span>
      </div>
      {/* <DropdownItem className="px-4 py-3">
        <User size={20} />
        &nbsp; My Profile
      </DropdownItem> */}
      {/* <DropdownItem className="px-4 py-3">
        <FileText size={20} />
        &nbsp; Edit Profile
      </DropdownItem> */}
      {JSON.parse(localStorage.getItem("user")).role === "user" ? (
        <div>
          <Link to="./request-repair-form" className="text-decoration-none">
            <DropdownItem className="px-4 py-3">
              <FileText size={20} />
              &nbsp; Solicitud de reparación
            </DropdownItem>
          </Link>
          <Link to="./request-retoma-form" className="text-decoration-none">
            <DropdownItem className="px-4 py-3">
              <FileText size={20} />
              &nbsp; Solicitud de retoma
            </DropdownItem>
          </Link>
          <Link to="./user-repair-requests" className="text-decoration-none">
            <DropdownItem className="px-4 py-3">
              <Eye size={20} />
              &nbsp; Mis reparaciones
            </DropdownItem>
          </Link>
          <Link to="./user-retoma-requests" className="text-decoration-none">
            <DropdownItem className="px-4 py-3">
              <Eye size={20} />
              &nbsp; Mis retomas
            </DropdownItem>
          </Link>
        </div>
      ) : null}
      {/* <DropdownItem className="px-4 py-3">
        <Settings size={20} />
        &nbsp; Editar perfíl
      </DropdownItem> */}
      {/* <DropdownItem className="px-4 py-3">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem> */}
      {/* <DropdownItem className="px-4 py-3">
        <Droplet size={20} />
        &nbsp; Customize
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="px-4 py-3">
        <Settings size={20} />
        &nbsp; Settings
      </DropdownItem> */}
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
