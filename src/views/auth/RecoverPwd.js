import React from 'react';
import { FormGroup, Form, Row, Col, Input, Button } from 'reactstrap';
import img1 from '../../assets/images/logo-icon.png';
import img2 from '../../assets/images/big/auth-bg.jpg';

const sidebarBackground = {
  backgroundImage: 'url(' + img2 + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
};

const RecoverPwd = () => {
  return (
    <div className="">
      {/*--------------------------------------------------------------------------------*/}
      {/*Recover Password Cards*/}
      {/*--------------------------------------------------------------------------------*/}
      <div
        className="auth-wrapper d-flex no-block justify-content-center align-items-center"
        style={sidebarBackground}
      >
        <div className="auth-box">
          <div id="loginform">
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" />
              </span>
              <h5 className="font-medium mb-3">Recover Password</h5>
            </div>
            <Row>
              <Col xs="12">
                <Form className="mt-3" id="loginform" action="/dashbaord">
                  <FormGroup>
                    <Input
                      type="text"
                      name="uname"
                      bsSize="lg"
                      id="uname"
                      placeholder="Name"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      name="emailid"
                      bsSize="lg"
                      id="uname"
                      placeholder="Email"
                      required
                    />
                  </FormGroup>
                  <Row className="mb-4">
                    <Col xs="12">
                      <Button
                        color="primary"
                        size="lg"
                        type="submit"
                        className="text-uppercase"
                        block
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPwd;
