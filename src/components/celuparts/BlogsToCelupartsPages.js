/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import '../../assets/scss/style.css';
import blog1 from '../../assets/images/bg/bg1.jpg';
import blog2 from '../../assets/images/bg/bg2.jpg';
import blog3 from '../../assets/images/bg/bg3.jpg';


const cards = [
  {
    img: blog1,
    title: 'Mis reparaciones',
    subtitle: 'Revisa el estado de tus reparaciones.',
    users: ['usuario', 'admin', ],
    href: '/mis-reparaciones',
  },
];


const blogData = [
  {
    img: blog1,
    title: 'Mis reparaciones.',
    subtitle: 'Lista de tus reparaciones registradas en el sistema, podrás aceptar o rechazar las cotizaciones que se asignen a tus productos.',
    href: '/home/repair-requests-table'
  },
  {
    img: blog2,
    title: 'Mis retomas.',
    subtitle: 'Lista de tus retomas registradas, donde podras aceptar o rechazar el valor al que te ofrecemos vender tu dispositivo.',
    href: '/home/user-retoma-requests'
  },
  {
    img: blog3,
    title: 'Mis notificaciones.',
    subtitle: 'Página en donde podras ver tus notificaciones referentes a tus reparaciones o retomas activas en el sistema.',
    href: '/home/admin-alerts'
  },
  {
    img: blog1,
    title: 'Celuparts store.',
    subtitle: 'El sitío perfecto donde podrás comprar al mejor precio los dispositivos que buscas!.',
    href: 'https://celuparts.co/'
  },
  {
    img: blog2,
    title: 'Instagram.',
    subtitle: 'Siguenos en instagram para descubrir las novedades que tenemos para tí!.',
    href: 'https://www.instagram.com/celuparts/?hl=es'
  },
  {
    img: blog3,
    title: 'Plataforma SIIGO.',
    subtitle: 'Software de contable para administración financiera.',
    href: 'https://www.siigo.com/'
  },
];

const style = {
  cursor: 'pointer',
};

const BlogsToCelupartsPages = () => {

  
  return (
    /*--------------------------------------------------------------------------------*/
    /* Blogs                                                 */
    /*--------------------------------------------------------------------------------*/
    <Row>
      {blogData.map((bdata) => (
        <Col lg="4" key={bdata.title}>
          <Card className='hover-zoom mt-3 img-wrapper' style={{ height: "340px" }} >
            <img src={bdata.img} alt={bdata.img} className='mx-3 rounded mt-n3 img-fluid' />
            <Link to={bdata.href} style={{ textDecoration: 'none',  }}>
              <CardBody style={style} className=''>
                <CardTitle className='mt-2' tag="h4">{bdata.title}</CardTitle>
                <CardSubtitle className="text-muted mt-1">{bdata.subtitle}</CardSubtitle>
              </CardBody>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BlogsToCelupartsPages;
