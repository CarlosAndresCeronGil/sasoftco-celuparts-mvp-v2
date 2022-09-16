import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import blog1 from '../../../assets/images/bg/bg1.jpg';
import blog2 from '../../../assets/images/bg/bg2.jpg';
import blog3 from '../../../assets/images/bg/bg3.jpg';

const blogData = [
  {
    img: blog1,
    date: 'March 1, 2022',
    title: 'France national research council has ruled.',
    subtitle: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
  {
    img: blog2,
    date: 'March 1, 2022',
    title: 'France national research council has ruled.',
    subtitle: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
  {
    img: blog3,
    date: 'March 1, 2022',
    title: 'France national research council has ruled.',
    subtitle: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
];

const Blogs = () => {
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
              <span className="fs-6 text-muted">{bdata.date}</span>
              <CardTitle className='mt-2' tag="h4">{bdata.title}</CardTitle>
              <CardSubtitle className="text-muted mt-1">{bdata.subtitle}</CardSubtitle>
              <Button color='primary' className='mt-3'>Read More</Button>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Blogs;
