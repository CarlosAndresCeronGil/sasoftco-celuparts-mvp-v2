import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import './Timeline.scss';

import img1 from '../../../assets/images/users/user1.jpg';
import img2 from '../../../assets/images/users/user2.jpg';
import img3 from '../../../assets/images/users/user3.jpg';
import img4 from '../../../assets/images/users/user4.jpg';

import time1 from '../../../assets/images/bg/bg1.jpg';
import time2 from '../../../assets/images/bg/bg2.jpg';
import time3 from '../../../assets/images/bg/bg3.jpg';
import time4 from '../../../assets/images/bg/bg4.jpg';

const Timeline = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <Card>
        <Nav tabs className="profile-tab">
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active bg-transparent' : 'cursor-pointer text-muted'}
              onClick={() => {
                toggle('1');
              }}
            >
              Activity
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active bg-transparent' : 'cursor-pointer text-muted'}
              onClick={() => {
                toggle('2');
              }}
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active bg-transparent' : 'cursor-pointer text-muted'}
              onClick={() => {
                toggle('3');
              }}
            >
              Setting
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="p-4">
                  <div className="steamline position-relative border-start ms-4 mt-0">
                    <div className="sl-item my-3 pb-3 border-bottom">
                      <div className="sl-left float-start text-center rounded-circle text-white me-3 bg-success">
                        <img src={img2} width="40" alt="user" className="rounded-circle" />
                      </div>
                      <div className="sl-right ps-4">
                        <div>
                          <a href="/" className="text-dark fs-5 text-decoration-none">
                            John Doe
                          </a>
                          <span className="ms-2 text-muted">5 minutes ago</span>
                          <p className="text-muted">
                            assign a new task
                            <a href="/"> Design weblayout</a>
                          </p>
                          <Row className="ms-1">
                            <Col lg="3" md="6" className="mb-3">
                              <img src={time1} className="img-fluid rounded" alt="" />
                            </Col>
                            <Col lg="3" md="6" className="mb-3">
                              <img src={time2} className="img-fluid rounded" alt="" />
                            </Col>
                            <Col lg="3" md="6" className="mb-3">
                              <img src={time3} className="img-fluid rounded" alt="" />
                            </Col>
                            <Col lg="3" md="6" className="mb-3">
                              <img src={time4} className="img-fluid rounded" alt="" />
                            </Col>
                          </Row>
                          <div className="desc ms-3">
                            <a href="/" className="text-decoration-none text-dark me-2">
                              2 comment
                            </a>
                            <a href="/" className="text-decoration-none text-dark me-2">
                              <i className="bi bi-heart-fill me-2 text-danger"></i>5 Love
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sl-item my-3 pb-3 border-bottom">
                      <div className="sl-left float-start text-center rounded-circle text-white me-3 bg-success">
                        <img src={img3} width="40" alt="user" className="rounded-circle" />
                      </div>
                      <div className="sl-right ps-4">
                        <div>
                          <a href="/" className="text-dark fs-5 text-decoration-none">
                            John Doe
                          </a>
                          <span className="ms-2 text-muted">5 minutes ago</span>
                          <Row className="mt-3 ms-1">
                            <Col md="3" xs="12">
                              <img src={time1} alt="user" className="img-fluid rounded" />
                            </Col>
                            <Col md="9" xs="12">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                                odio. Praesent libero. Sed cursus ante dapibus diam.
                              </p>
                              <a href="/" className="btn btn-success">
                                Design weblayout
                              </a>
                            </Col>
                          </Row>
                          <div className="desc ms-3 mt-3">
                            <a href="/" className="text-decoration-none text-dark me-2">
                              2 comment
                            </a>
                            <a href="/" className="text-decoration-none text-dark me-2">
                              <i className="bi bi-heart-fill me-2 text-danger"></i>5 Love
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sl-item my-3 pb-3 border-bottom">
                      <div className="sl-left float-start text-center rounded-circle text-white me-3 bg-success">
                        <img src={img4} width="40" alt="user" className="rounded-circle" />
                      </div>
                      <div className="sl-right ps-4">
                        <div>
                          <a href="/" className="text-dark fs-5 text-decoration-none">
                            John Doe
                          </a>
                          <span className="ms-2 text-muted">5 minutes ago</span>
                          <p className="mt-2 ms-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
                            mauris. Fusce nec tellus sed augue semper
                          </p>
                        </div>
                        <div className="desc ms-3 mt-3">
                          <a href="/" className="text-decoration-none text-dark me-2">
                            2 comment
                          </a>
                          <a href="/" className="text-decoration-none text-dark me-2">
                            <i className="bi bi-heart-fill me-2 text-danger"></i>5 Love
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="sl-item my-3 pb-3 border-bottom">
                      <div className="sl-left float-start text-center rounded-circle text-white me-3 bg-success">
                        <img src={img1} width="40" alt="user" className="rounded-circle" />
                      </div>
                      <div className="sl-right ps-4">
                        <div>
                          <a href="/" className="text-dark fs-5 text-decoration-none">
                            John Doe
                          </a>
                          <span className="ms-2 text-muted">5 minutes ago</span>
                          <div className="mt-2 ms-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <div className="p-4">
                  <Row>
                    <Col md="3" xs="6" className="border-end">
                      <strong>Full Name</strong>
                      <br />
                      <p className="text-muted">Johnathan Deo</p>
                    </Col>
                    <Col md="3" xs="6" className="border-end">
                      <strong>Mobile</strong>
                      <br />
                      <p className="text-muted">(123) 456 7890</p>
                    </Col>
                    <Col md="3" xs="6" className="border-end">
                      <strong>Email</strong>
                      <br />
                      <p className="text-muted">johnathan@admin.com</p>
                    </Col>
                    <Col md="3" xs="6" className="border-end">
                      <strong>Location</strong>
                      <br />
                      <p className="text-muted">London</p>
                    </Col>
                  </Row>
                  <p className="mt-4">
                    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
                    justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
                    pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper
                    nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                    consequat vitae, eleifend ac, enim.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries
                  </p>
                  <p>
                    It was popularised in the 1960s with the release of Letraset sheets containing
                    Lorem Ipsum passages, and more recently with desktop publishing software like
                    Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  <h4 className="font-medium mt-4">Skill Set</h4>
                  <hr />
                  <h5 className="mt-4">
                    Wordpress <span className="float-end">80%</span>
                  </h5>
                  <Progress value={2 * 5} />
                  <h5 className="mt-4">
                    HTML 5 <span className="float-end">90%</span>
                  </h5>
                  <Progress color="success" value="25" />
                  <h5 className="mt-4">
                    jQuery <span className="float-end">50%</span>
                  </h5>
                  <Progress color="info" value={50} />
                  <h5 className="mt-4">
                    Photoshop <span className="float-end">70%</span>
                  </h5>
                  <Progress color="warning" value={75} />
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <div className="p-4">
                  <Form>
                    <FormGroup>
                      <Label>Full Name</Label>
                      <Input type="text" placeholder="Shaina Agrawal" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input type="email" placeholder="Jognsmith@cool.com" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input type="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Phone No</Label>
                      <Input type="text" placeholder="123 456 1020" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Message</Label>
                      <Input type="textarea" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Select Country</Label>
                      <Input type="select">
                        <option>USA</option>
                        <option>India</option>
                        <option>America</option>
                      </Input>
                    </FormGroup>
                    <Button color="primary">Update Profile</Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Card>
    </>
  );
};

export default Timeline;
