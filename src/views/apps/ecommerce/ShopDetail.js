import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Carousel,
  CarouselItem,
  CarouselControl,
  Badge,
  Label,
  FormGroup,
  Button,
  Input,
} from 'reactstrap';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import img1 from '../../../assets/images/products/s1.jpg';
import img2 from '../../../assets/images/products/s2.jpg';
import img3 from '../../../assets/images/products/s3.jpg';

const items = [
  {
    src: img1,
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: img2,
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: img3,
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];

const ShopDetail = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 1 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width="100%" />
      </CarouselItem>
    );
  });

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col lg="6">
                  <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                    {slides}
                    <CarouselControl
                      direction="prev"
                      directionText="Previous"
                      onClickHandler={previous}
                    />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                  </Carousel>
                </Col>
                <Col lg="6">
                  <Badge color="success">Ice-cream</Badge>
                  <h3 className="mt-2 mb-3">Belgian Chocolate</h3>
                  <p className="text-muted py-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex arcu, tincidunt
                    bibendum felisadipiscing elit. Sed ex arcu.
                  </p>
                  <h2>$546.00</h2>
                  <br />
                  <div className="d-flex">
                    <FormGroup className="me-3">
                      <Label for="exampleSelect">Size</Label>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Qty</Label>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <br />
                  <h6>Colors</h6>
                  <div className="button-group">
                    <Button color="success" />
                    <Button color="danger" />
                    <Button color="dark" />
                    <Button color="warning" />
                  </div>
                  <br />
                  <br />
                  <Button color="primary" className="me-2">
                    Buy Now
                  </Button>
                  <Button color="dark">Add to Cart</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4>Description</h4>
              <br />
              <h5>
                Sed at diam elit. Vivamus tortor odio, pellentesque eu tincidunt a, aliquet sit amet
                lorem pellentesque eu tincidunt a, aliquet sit amet lorem.
              </h5>
              <br />
              <p>
                Cras eget elit semper, congue sapien id, pellentesque diam. Nulla faucibus diam nec
                fermentum ullamcorper. Praesent sed ipsum ut augue vestibulum malesuada. Duis vitae
                volutpat odio. Integer sit amet elit ac justo sagittis dignissim.
              </p>
              <br />
              <p>
                Vivamus quis metus in nunc semper efficitur eget vitae diam. Proin justo diam,
                venenatis sit amet eros in, iaculis auctor magna. Pellentesque sit amet accumsan
                urna, sit amet pretium ipsum. Fusce condimentum venenatis mauris et luctus.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                curae;
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ShopDetail;
