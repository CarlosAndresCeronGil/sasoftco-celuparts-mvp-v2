import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import blog1 from '../../assets/images/bg/bg1.jpg';
import blog2 from '../../assets/images/bg/bg2.jpg';
import blog3 from '../../assets/images/bg/bg3.jpg';

const blogData = [
  {
    img: blog1,
    title: 'Mis reparaciones.',
    subtitle: 'Lista de tus reparaciones registradas en el sistema, podrás aceptar o rechazar las cotizaciones que se asignen a tus productos.',
    href: '../user-repair-requests'
  },
  {
    img: blog2,
    title: 'Mis retomas.',
    subtitle: 'Lista de tus retomas registradas, donde podras aceptar o rechazar el valor al que te ofrecemos vender tu dispositivo.',
    href: '../user-retoma-requests'
  },
  {
    img: blog3,
    title: 'Mis notificaciones.',
    subtitle: 'Página en donde podras ver tus notificaciones referentes a tus reparaciones o retomas activas en el sistema.',
    href: '../user-alerts'
  },
];

const BlogsToCelupartsPages = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Blogs                                                 */
    /*--------------------------------------------------------------------------------*/
    <Row>
      {blogData.map((bdata) => (
        <Col lg="4" key={bdata.img}>
          <Card className='mt-3'>
            <img src={bdata.img} alt={bdata.img} className='mx-3 rounded mt-n3 img-fluid' />
            <CardBody>
              <CardTitle className='mt-2' tag="h4">{bdata.title}</CardTitle>
              <CardSubtitle className="text-muted mt-1">{bdata.subtitle}</CardSubtitle>
              <Link to={bdata.href}>
                <Button color='primary' className='mt-3'>Dirigeme allí</Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BlogsToCelupartsPages;
