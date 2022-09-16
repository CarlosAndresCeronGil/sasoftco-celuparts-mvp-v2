import React from 'react';
import { Card, Col, Row, CardImgOverlay } from 'reactstrap';
import img1 from '../../../assets/images/background/weatherbg.jpg';

const WeatherCard = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1                                                            */
    /*--------------------------------------------------------------------------------*/
    <Card className="overflow-hidden">
      <img src={img1} alt="" className="city-img" />
      <CardImgOverlay>
        <h3 className="text-dark-white">New Delhi</h3>
        <span className="text-dark-white">Sunday 15 March</span>
      </CardImgOverlay>
      <div className="p-3">
        <Row>
          <Col xs="8" className="border-end align-self-center">
            <div className="d-flex">
              <div className="display-6 text-primary">
                <i className="bi bi-cloud-drizzle" />
              </div>
              <div className="ms-3">
                <h1 className="fw-light text-primary mb-0">
                  32
                  <sup>0</sup>
                </h1>
                <small className="text-muted">Sunny day</small>
              </div>
            </div>
          </Col>
          <Col xs="4" className="text-center">
            <h1 className="fw-light mb-0">
              25
              <sup>0</sup>
            </h1>
            <small className="text-muted">Tonight</small>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default WeatherCard;
