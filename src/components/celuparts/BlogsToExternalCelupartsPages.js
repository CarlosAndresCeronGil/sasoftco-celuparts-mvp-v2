import React from 'react';
// import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import blog1 from '../../assets/images/bg/bg1.jpg';
import blog2 from '../../assets/images/bg/bg2.jpg';
import blog3 from '../../assets/images/bg/bg3.jpg';

const blogData = [
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

const BlogsToExternalCelupartsPages = () => {
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
              <a href={bdata.href} rel="noreferrer" target='_blank'>
                <Button color='primary' className='mt-3'>Dirigeme allí</Button>
              </a>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BlogsToExternalCelupartsPages;
