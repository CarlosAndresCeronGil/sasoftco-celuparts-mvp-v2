/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import '../../assets/scss/style.css';
import img1 from '../../assets/images/bg/bg1.jpg';
import img2 from '../../assets/images/bg/bg2.jpg';
import img3 from '../../assets/images/bg/bg3.jpg';


const cards = [
  {
    img: img1,
    title: 'Mis reparaciones.',
    subtitle: 'Lista de tus reparaciones registradas en el sistema, podrás aceptar o rechazar las cotizaciones que se asignen a tus productos.',
    role: [ 'admin', 'tecnico', 'mensajero', 'user', ],
    href: [
    	'/home/repair-requests-table',
      '/home/repair-requests-table',
      '/home/repair-requests-table',
      '/home/user-repair-requests',
    ],
  },
  {
    img: img2,
    title: 'Mis retomas.',
    subtitle: 'Lista de tus retomas registradas, donde podras aceptar o rechazar el valor al que te ofrecemos vender tu dispositivo.',
    role: [ 'admin', 'tecnico', 'mensajero', 'user', ],
    href: [
      '/home/retoma-requests-table',
      '/home/retoma-requests-table',
      '/home/retoma-requests-table',
      '/home/user-retoma-requests',
    ],
  },
  {
    img: img3,
    title: 'Mis notificaciones',
    subtitle: 'Página en donde podras ver tus notificaciones referentes a tus reparaciones o retomas activas en el sistema.',
    role: [ 'admin', 'tecnico', 'mensajero', 'user', ],
    href: [
    	'/home/admin-alerts',
      '/home/technician-alerts',
      '/home/courier-alerts',
      '/home/user-alerts',
    ],
  },
];

const style = {
  cursor: 'pointer',
};

const BlogsToCelupartsPages = () => {

  const currentRole = JSON.parse(localStorage.getItem('user')).role;
  
  return (
    <Row>
      {
        cards.map(( { img, title, subtitle, role, href } ) => (
          <Col lg="4" key={ title }>
            <Card className='hover-zoom mt-3 img-wrapper' style={{ height: "340px" }} >
              <img src={ img } alt={ img } className='mx-3 rounded mt-n3 img-fluid' />
              <Link to={ href[ role.indexOf( currentRole ) ] } style={{ textDecoration: 'none',  }}>
                <CardBody style={ style }>
                  <CardTitle className='mt-2' tag="h4">{ title }</CardTitle>
                  <CardSubtitle className="text-muted mt-1">{ subtitle }</CardSubtitle>
                </CardBody>
              </Link>
            </Card>
          </Col>
        ))
      }
    </Row>
  );
};

export default BlogsToCelupartsPages;
