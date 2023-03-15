/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import "../../assets/scss/style.css";
import img1 from "../../assets/images/bg/bg1.jpg";
import img2 from "../../assets/images/bg/bg2.jpg";

import misReparaciones from "../../assets/images/misreparaciones.png";
import misRetomas from "../../assets/images/misretomas.png";
import misNotificaciones from "../../assets/images/misnotificaciones.png";
import celupartsStore from "../../assets/images/celupartsstore.png";

const cardsUser = [
  {
    img: misReparaciones,
    title: "Nueva solicitud reparación",
    subtitle: "Registra una solicitud para una nueva reparación",
    href: "/home/request-repair-form"
  },
  {
    img: misRetomas,
    title: "Solicitar retoma",
    subtitle:
      "¿Deseas vender tu equipo usado? Nosotros te lo compramos y recogemos a domicilio.  Registra aquí los datos para generarte una cotización, y para solicitar la recogida.",
    href: "/home/request-retoma-form"
  },
  {
    img: misReparaciones,
    title: "Consultar mis reparaciones",
    subtitle:
      "Consulta aquí el estado de tu reparación. Podrás consultar y aceptar o rechazar las cotizaciones propuestas. Tambien podrás ver el histórico de tus reparaciones.",
    href: "/home/user-repair-requests"
  },
  {
    img: misRetomas,
    title: "Consultar mis retomas",
    subtitle:
      "Consulta aquí el estado de tu retoma. Podrás consultar y aceptar o rechazar las retomas propuestas. Tambien podrás ver el histórico de tus retomas.",
    href: "/home/user-retoma-requests"
  },
  {
    img: celupartsStore,
    title: "Celuparts store",
    subtitle:
      "El sitío perfecto donde podrás comprar al mejor precio los dispositivos que buscas!.",
    href: "https://celuparts.co/"
  },
  {
    img: misNotificaciones,
    title: "Mis notificaciones",
    subtitle:
      "Página en donde podras ver tus notificaciones referentes a procesos nuevos o actualizaciones de tus solicitudes.",
    href: "/home/user-alerts"
  }
  // {
  //   img: blog2,
  //   title: 'Instagram.',
  //   subtitle: 'Siguenos en instagram para descubrir las novedades que tenemos para tí!.',
  //   href: 'https://www.instagram.com/celuparts/?hl=es'
  // },
  // {
  //   img: blog3,
  //   title: 'Plataforma SIIGO.',
  //   subtitle: 'Software de contable para administración financiera.',
  //   href: 'https://www.siigo.com/'
  // },
];

const cardsForAdmins = [
  {
    img: misReparaciones,
    title: "Lista de reparaciones",
    subtitle:
      "Lista de las reparaciones registradas en el sistema, donde podrás actualizar los estados de estas.",
    role: ["admin", "tecnico", "mensajero", "aux_admin", "user"],
    href: [
      "/home/repair-requests-table",
      "/home/repair-requests-table",
      "/home/repair-requests-table",
      "/home/repair-requests-table",
      "/home/user-repair-requests"
    ]
  },
  {
    img: misRetomas,
    title: "Lista de retomas",
    subtitle:
      "Lista de las retomas registradas en el sistema. Al igual que la lista de reparacione podras actualizar los estados de estos procesos.",
    role: ["admin", "tecnico", "mensajero", "aux_admin", "user"],
    href: [
      "/home/retoma-requests-table",
      "/home/retoma-requests-table",
      "/home/retoma-requests-table",
      "/home/retoma-requests-table",
      "/home/user-retoma-requests"
    ]
  },
  {
    img: misNotificaciones,
    title: "Mis notificaciones",
    subtitle:
      "Página en donde podras ver tus notificaciones referentes a procesos nuevos o actualizaciones de los clientes.",
    role: ["admin", "tecnico", "mensajero", "aux_admin", "user"],
    href: [
      "/home/admin-alerts",
      "/home/technician-alerts",
      "/home/courier-alerts",
      "/home/admin-alerts",
      "/home/user-alerts"
    ]
  }
];

const style = {
  cursor: "pointer"
};

const BlogsToCelupartsPages = () => {
  const currentRole = JSON.parse(localStorage.getItem("user")).role;

  return currentRole === "admin" ||
    currentRole === "tecnico" ||
    currentRole === "mensajero" ||
    currentRole === "aux_admin" ? (
    <Row>
      {cardsForAdmins.map(({ img, title, subtitle, role, href }) => (
        <>
          {currentRole == "mensajero" &&
          title != "Mis notificaciones" ? null : (
            <Col xl="4" lg="6" md="4" sm="6" key={title}>
              <Card
                className="hover-zoom mt-3 img-wrapper"
                style={{
                  height: "350px",
                  border: "1px solid grey",
                  paddingBottom: "0.3rem",
                  borderRadius: "5%"
                }}
              >
                <img
                  src={img}
                  alt={img}
                  className="mx-3  mt-n3 img-fluid"
                  style={{ borderRadius: "1rem" }}
                />
                <Link
                  to={href[role.indexOf(currentRole)]}
                  style={{ textDecoration: "none" }}
                >
                  <CardBody style={style}>
                    <CardTitle
                      className="mt-2"
                      tag="h4"
                      style={{
                        borderBottom: "1px solid grey",
                        paddingBottom: "0.3rem"
                      }}
                    >
                      {title}
                    </CardTitle>
                    <CardSubtitle className="text-muted mt-1">
                      {subtitle}
                    </CardSubtitle>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          )}
        </>
      ))}
    </Row>
  ) : (
    <Row>
      {cardsUser.map(({ img, title, subtitle, href }) => (
        <Col xl="4" lg="6" md="4" sm="6" key={title}>
          <Card
            className="hover-zoom mt-3 img-wrapper"
            style={{
              height: "350px",
              border: "1px solid grey",
              borderRadius: "5%"
            }}
          >
            <img
              src={img}
              alt={img}
              className="mx-3 mt-n3 img-fluid"
              style={{ borderRadius: "1rem" }}
            />
            {href.includes("https") ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <CardBody>
                  <CardTitle
                    className="mt-2"
                    tag="h4"
                    style={{
                      borderBottom: "1px solid grey",
                      paddingBottom: "0.3rem"
                    }}
                  >
                    {title}
                  </CardTitle>
                  <CardSubtitle className="text-muted mt-1">
                    {subtitle}
                  </CardSubtitle>
                </CardBody>
              </a>
            ) : (
              <Link to={href} style={{ textDecoration: "none" }}>
                <CardBody style={style}>
                  <CardTitle
                    className="mt-2"
                    tag="h4"
                    style={{
                      borderBottom: "1px solid grey",
                      paddingBottom: "0.3rem"
                    }}
                  >
                    {title}
                  </CardTitle>
                  <CardSubtitle className="text-muted mt-1">
                    {subtitle}
                  </CardSubtitle>
                </CardBody>
              </Link>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BlogsToCelupartsPages;
