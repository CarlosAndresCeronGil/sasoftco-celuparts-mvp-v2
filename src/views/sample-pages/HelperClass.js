import React from 'react';
import { Card, CardBody, CardTitle, Row, Col, Table, CardSubtitle, Button } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const setheight = {
  height: '100px',
};

const HelperClass = () => {
  return (
    <>
      <BreadCrumbs />
      <Card>
        <CardBody>
          <CardTitle tag="h4">Text Color Classes</CardTitle>
          <Row className="mt-4">
            <Col xs="12">
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.text-muted</code>
                    </td>
                    <td className="text-muted">
                      Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.text-primary</code>
                    </td>
                    <td className="text-primary">
                      Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.text-success</code>
                    </td>
                    <td className="text-success">
                      Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.text-info</code>
                    </td>
                    <td className="text-info">
                      Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.text-warning</code>
                    </td>
                    <td className="text-warning">
                      Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.text-danger</code>
                    </td>
                    <td className="text-danger">
                      Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.text-dark</code>
                    </td>
                    <td className="text-dark">
                      Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs="12">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Font Weight
              </CardTitle>
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.fw-light</code>
                    </td>
                    <td>Font weight will be light (300).</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.fw-normal</code>
                    </td>
                    <td>Font weight will be normal</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.fw-bold </code>
                    </td>
                    <td>Font weight will be bold (600)</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Padding Classes
              </CardTitle>
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.p-0</code>
                    </td>
                    <td>Padding will be 0px from all side.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.p-1</code>
                    </td>
                    <td>Padding will be 4px from all side.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.p-2</code>
                    </td>
                    <td>Padding will be 8px from all side.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.p-3</code>
                    </td>
                    <td>Padding will be 16px from all side.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.p-4</code>
                    </td>
                    <td>Padding will be 24px from all side</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.p-5</code>
                    </td>
                    <td>Padding will be 48px from all side.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Padding Left Classes
              </CardTitle>
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ps-0</code>
                    </td>
                    <td>Only Padding Left will be 0px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ps-1</code>
                    </td>
                    <td>Only Padding Left will be 4px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ps-2</code>
                    </td>
                    <td>Only Padding Left will be 8px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ps-3</code>
                    </td>
                    <td>Only Padding Left will be 16px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ps-4</code>
                    </td>
                    <td>Only Padding Left will be 24px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ps-5</code>
                    </td>
                    <td>Only Padding Left will be 48px.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Padding Right Classes
              </CardTitle>
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pe-0</code>
                    </td>
                    <td>Only Padding right will be 0px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pe-1</code>
                    </td>
                    <td>Only Padding right will be 4px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pe-2</code>
                    </td>
                    <td>Only Padding right will be 8px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pe-3</code>
                    </td>
                    <td>Only Padding right will be 16px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pe-4</code>
                    </td>
                    <td>Only Padding right will be 24px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pe-5</code>
                    </td>
                    <td>Only Padding right will be 48px.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Padding Top Classes
              </CardTitle>
              <Table className="mb-0" bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pt-0</code>
                    </td>
                    <td>Only Padding top will be 0px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pt-1</code>
                    </td>
                    <td>Only Padding top will be 4px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pt-2</code>
                    </td>
                    <td>Only Padding top will be 8px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pt-3</code>
                    </td>
                    <td>Only Padding top will be 16px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pt-4</code>
                    </td>
                    <td>Only Padding top will be 24px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.pt-5</code>
                    </td>
                    <td>Only Padding top will be 48px.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Margin Top Classes
              </CardTitle>
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mt-0</code>
                    </td>
                    <td>Only Margin top will be 0px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mt-1 </code>
                    </td>
                    <td>Only Margin top will be 4px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mt-2 </code>
                    </td>
                    <td>Only Margin top will be 8px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mt-3</code>
                    </td>
                    <td>Only Margin top will be 16px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mt-4</code>
                    </td>
                    <td>Only Margin top will be 24px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mt-5</code>
                    </td>
                    <td>Only Margin top will be 48px.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Margin Bottom Classes
              </CardTitle>
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mb-0</code>
                    </td>
                    <td>Only Margin Bottom will be 0px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mb-1 </code>
                    </td>
                    <td>Only Margin Bottom will be 4px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mb-2 </code>
                    </td>
                    <td>Only Margin Bottom will be 8px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mb-3</code>
                    </td>
                    <td>Only Margin Bottom will be 16px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mb-4</code>
                    </td>
                    <td>Only Margin Bottom will be 24px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.mb-5</code>
                    </td>
                    <td>Only Margin Bottom will be 48px.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Margin Right Classes
              </CardTitle>
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.me-0</code>
                    </td>
                    <td>Only Margin Right will be 0px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.me-1</code>
                    </td>
                    <td>Only Margin Right will be 4px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.me-2</code>
                    </td>
                    <td>Only Margin Right will be 8px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.me-3</code>
                    </td>
                    <td>Only Margin Right will be 16px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.me-4</code>
                    </td>
                    <td>Only Margin Right will be 24px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.me-5</code>
                    </td>
                    <td>Only Margin Right will be 48px.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <CardTitle tag="h4" className="mt-5 mb-4">
                Margin Left Classes
              </CardTitle>
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ms-0</code>
                    </td>
                    <td>Only Margin Left will be 0px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ms-1</code>
                    </td>
                    <td>Only Margin Left will be 4px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ms-2 </code>
                    </td>
                    <td>Only Margin Left will be 8px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ms-3 </code>
                    </td>
                    <td>Only Margin Left will be 16px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ms-4</code>
                    </td>
                    <td>Only Margin Left will be 24px.</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.ms-5</code>
                    </td>
                    <td>Only Margin Left will be 48px.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <CardTitle tag="h4" className="mt-5 mb-4">
              Background Colors
            </CardTitle>
            <Col md="4">
              <Table className="mb-0" hover bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.bg-primary</code>
                    </td>
                    <td>For Primary background color</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.bg-success</code>
                    </td>
                    <td>For Success (green) background color</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.bg-info</code>
                    </td>
                    <td>For info (Blue) background color</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="4">
              <Table className="mb-0" bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Class</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap">
                      <code>.bg-warning</code>
                    </td>
                    <td>For Warning (yellow) background color</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.bg-danger</code>
                    </td>
                    <td>For Danger (red) background color</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap">
                      <code>.bg-theme</code>
                    </td>
                    <td>For Theme background color</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* card 2 */}
      <CardTitle tag="h4" className="mt-5 mb-4">
        Bootstrap Classes
      </CardTitle>
      <Card>
        <CardBody>
          <CardTitle tag="h4">Borders</CardTitle>
          <CardSubtitle className="text-muted">
            Use border utilities to quickly style the border and border-radius of an element. Great
            for images, buttons, or any other element.
          </CardSubtitle>
          <CardTitle tag="h4" className="mt-4">
            Additive border
          </CardTitle>
          <CardSubtitle className="text-muted">
            Use of below classes as per your requiements, which side you want border.
          </CardSubtitle>
        </CardBody>
        <div className="table-responsive">
          <Table className="mb-0" hover bordered>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.border</code>
                </td>
                <td>Use to add solid border of 1px on every side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border-top</code>
                </td>
                <td>Use to add solid border top of 1px on obejct.</td>
              </tr>
              <tr>
                <td>
                  <code>.border-bottom</code>
                </td>
                <td>Use to add solid border bottom of 1px on object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border-start</code>
                </td>
                <td>Use to add solid border left of 1px on object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border-end</code>
                </td>
                <td>Use to add solid border right of 1px on object.</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <CardBody>
          <div className="card-text my-1">
            <CardTitle tag="h4">Subtractive border</CardTitle>
            <CardSubtitle className="text-muted">
              Use of below classes as per your requiements, which side you do not want to add
              border.
            </CardSubtitle>
          </div>
        </CardBody>
        <div className="table-responsive">
          <Table className="mb-0" hover bordered>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.border-0</code>
                </td>
                <td>Use when remove border from all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border-top-0</code>
                </td>
                <td>Use when remove border from the top side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border-bottom-0</code>
                </td>
                <td>Use when remove border from the bottom side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border-start-0</code>
                </td>
                <td>Use when remove border from the left side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border-end-0</code>
                </td>
                <td>Use when remove border from the right side of the object.</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <CardBody>
          <CardTitle tag="h4">Border color</CardTitle>
          <CardSubtitle className="text-muted">
            When you want add color in the border you can choose any of the below classes.
          </CardSubtitle>
        </CardBody>
        <div className="table-responsive">
          <Table className="mb-0" hover bordered>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.border border-primary</code>
                </td>
                <td>Use when add primary color border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border border-secondary</code>
                </td>
                <td>Use when add secondary color border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border border-success</code>
                </td>
                <td>Use when add success color border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border border-danger</code>
                </td>
                <td>Use when add danger color border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border border-warning</code>
                </td>
                <td>Use when add warning color border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border border-info</code>
                </td>
                <td>Use when add info color border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border border-light</code>
                </td>
                <td>Use when add light color border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border border-dark</code>
                </td>
                <td>Use when add dark color border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.border border-white</code>
                </td>
                <td>Use when add white color border to all side of the object.</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <CardBody>
          <CardTitle tag="h4">Border-radius</CardTitle>
          <CardSubtitle className="text-muted">
            Use to give rounded corner to the object.
          </CardSubtitle>
        </CardBody>
        <div className="table-responsive">
          <Table className="mb-0" hover bordered>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.rounded</code>
                </td>
                <td>Add round corners border to all side of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.rounded-top</code>
                </td>
                <td>Add round corners border to top side only of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.rounded-bottom</code>
                </td>
                <td>Add round corners border to bottom side only of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.rounded-left</code>
                </td>
                <td>Add round corners border to left side only of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.rounded-right</code>
                </td>
                <td>Add round corners border to right side only of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.rounded-circle</code>
                </td>
                <td>Create round circle border of the object.</td>
              </tr>
              <tr>
                <td>
                  <code>.rounded-0</code>
                </td>
                <td>Remove border corder from the all side of the object.</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>
      {/* card 3 */}
      <Card>
        <CardBody>
          <CardTitle tag="h4">Clearfix</CardTitle>
          <CardSubtitle className="text-muted">
            Quickly and easily clear floated content within a container by adding a clearfix
            utility.
          </CardSubtitle>
          <span>
            Easily clear <code>float</code>s by adding <code>.clearfix</code>{' '}
            <strong>to the parent element</strong>. Can also be used as a mixin.
          </span>
          <p className="py-1">
            The following example shows how the clearfix can be used. Without the clearfix the
            wrapping div would not span around the buttons which would cause a broken layout.
          </p>
          <div className="bd-example my-3">
            <div className="bg-info clearfix">
              <Button color="secondary" className="float-left">
                Example Button floated left
              </Button>
              <Button color="secondary" className="float-right">
                Example Button floated right
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* card 4 */}
      <Card>
        <CardBody>
          <CardTitle tag="h4">Close icon</CardTitle>
          <CardSubtitle className="text-muted">
            Use a generic close icon for dismissing content like modals and alerts.
          </CardSubtitle>
          <span>
            <strong>Be sure to include text for screen readers</strong>, as we’ve done with{' '}
            <code>aria-label</code>.
          </span>
          <div className="bd-example d-flex mt-4">
            <Button className="close" aria-label="Close">
              <span aria-hidden="true">×</span>
            </Button>
          </div>
        </CardBody>
      </Card>
      {/* card 5 */}
      <Card>
        <CardBody>
          <CardTitle tag="h4">Display property</CardTitle>
          <CardSubtitle className="text-muted">
            Quickly and responsively toggle the display value of components and more with our
            display utilities. Includes support for some of the more common values, as well as some
            extras for controlling display when printing.
          </CardSubtitle>
          <CardTitle tag="h4" className="mt-4">
            Basic display values
          </CardTitle>
          <CardSubtitle className="text-muted">
            The
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/display">
              <code>display</code> property
            </a>
            accepts a handful of values and we support many of them with utility classes. We
            purposefully don’t provide every value as a utility, so here’s what we support:
          </CardSubtitle>
        </CardBody>
        <div className="table-responsive">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.d-none</code>
                </td>
                <td>Used for object to hide on all viewports.</td>
              </tr>
              <tr>
                <td>
                  <code>.d-inline</code>
                </td>
                <td>Used for object to behave like an inline object.</td>
              </tr>
              <tr>
                <td>
                  <code>.d-inline-block</code>
                </td>
                <td>Used for object to behave like an inline-block object.</td>
              </tr>
              <tr>
                <td>
                  <code>.d-block</code>
                </td>
                <td>Used for object to behave like an block object.</td>
              </tr>
              <tr>
                <td>
                  <code>.d-table</code>
                </td>
                <td>
                  Used for object to behave like <code>&lt;table&gt;</code> object.
                </td>
              </tr>
              <tr>
                <td>
                  <code>.d-table-cell</code>
                </td>
                <td>
                  Used for object to behave like <code>&lt;td&gt;</code> object.
                </td>
              </tr>
              <tr>
                <td>
                  <code>.d-flex</code>
                </td>
                <td>Used for object as a block-level flex container.</td>
              </tr>
              <tr>
                <td>
                  <code>.d-inline-flex</code>
                </td>
                <td>Used for object as an inline-level flex container.</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <CardBody>
          <p>
            Use above classes as per your requirements. For example, here’s how you could use the
            inline, block, or inline-block utilities.
          </p>
          <div className="bd-example bg-light-info p-3 my-3">
            <div className="d-inline bg-info p-1 me-1 text-white">d-inline</div>
            <div className="d-inline bg-info  p-1 text-white">d-inline</div>
          </div>
          <div className="bd-example bg-light-info p-3 my-3">
            <span className="d-block bg-info p-1 text-white">d-block</span>
          </div>

          <div className="bd-example bg-light-info p-3 my-3">
            <div className="d-inline-block bg-info p-1 me-1 text-white">d-inline-block</div>
            <div className="d-inline-block bg-info p-1 text-white">d-inline-block</div>
          </div>
          <p>Responsive variations also exist for every single utility mentioned above.</p>
          <ul className="list-unstyled">
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-none</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-inline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-inline-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-table</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-table-cell</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-inline-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-none</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-inline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-inline-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-table</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-table-cell</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-inline-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-none</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-inline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-inline-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-table</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-table-cell</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-inline-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-none</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-inline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-inline-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-table</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-table-cell</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-inline-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-none</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-inline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-inline-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-block</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-table</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-table-cell</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-inline-flex</code>
            </li>
          </ul>
          <CardTitle tag="h4" className="mt-4">
            Hiding Elements
          </CardTitle>
          <p>
            For faster mobile-friendly development, use responsive display classes for showing and
            hiding elements by device. Avoid creating entirely different versions of the same site,
            instead hide element responsively for each screen size.
          </p>
          <p>
            To hide elements simply use the <code>.d-none</code> class or one of the{' '}
            <code>.d-sm,md,lg,xl-none</code> classes for any responsive screen variation.
          </p>
          <p>
            To show an element only on a given interval of screen sizes you can combine one{' '}
            <code>.d-*-none</code> class with a <code>.d-*-*</code> class, for example{' '}
            <code>.d-none.d-md-block.d-xl-none</code> will hide the element for all screen sizes
            except on medium and large devices.
          </p>
        </CardBody>
        <div className="table-responsive">
          <Table hover bordered>
            <thead>
              <tr>
                <th>Screen Size</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hidden on all</td>
                <td>
                  <code>d-none</code>
                </td>
              </tr>
              <tr>
                <td>Hidden only on xs</td>
                <td>
                  <code>d-none d-sm-block</code>
                </td>
              </tr>
              <tr>
                <td>Hidden only on sm</td>
                <td>
                  <code>d-sm-none d-md-block</code>
                </td>
              </tr>
              <tr>
                <td>Hidden only on md</td>
                <td>
                  <code>d-md-none d-lg-block</code>
                </td>
              </tr>
              <tr>
                <td>Hidden only on lg</td>
                <td>
                  <code>d-lg-none d-xl-block</code>
                </td>
              </tr>
              <tr>
                <td>Hidden only on xl</td>
                <td>
                  <code>d-xl-none</code>
                </td>
              </tr>
              <tr>
                <td>Visible on all</td>
                <td>
                  <code>d-block</code>
                </td>
              </tr>
              <tr>
                <td>Visible only on xs</td>
                <td>
                  <code>d-block d-sm-none</code>
                </td>
              </tr>
              <tr>
                <td>Visible only on sm</td>
                <td>
                  <code>d-none d-sm-block d-md-none</code>
                </td>
              </tr>
              <tr>
                <td>Visible only on md</td>
                <td>
                  <code>d-none d-md-block d-lg-none</code>
                </td>
              </tr>
              <tr>
                <td>Visible only on lg</td>
                <td>
                  <code>d-none d-lg-block d-xl-none</code>
                </td>
              </tr>
              <tr>
                <td>Visible only on xl</td>
                <td>
                  <code>d-none d-xl-block</code>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <CardBody>
          <CardTitle tag="h4">Display in print</CardTitle>
          <CardSubtitle className="text-muted">
            Change the <code>display</code> value of elements when printing with our print display
            utilities.
          </CardSubtitle>
        </CardBody>
        <div className="table-responsive">
          <Table className="mb-0" bordered>
            <thead>
              <tr>
                <th>Class</th>
                <th>Print style</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.d-print-none</code>
                </td>
                <td>
                  Applies <code>display: none</code> to the element when printing
                </td>
              </tr>
              <tr>
                <td>
                  <code>.d-print-inline</code>
                </td>
                <td>
                  Applies <code>display: inline</code> to the element when printing
                </td>
              </tr>
              <tr>
                <td>
                  <code>.d-print-inline-block</code>
                </td>
                <td>
                  Applies <code>display: inline-block</code> to the element when printing
                </td>
              </tr>
              <tr>
                <td>
                  <code>.d-print-block</code>
                </td>
                <td>
                  Applies <code>display: block</code> to the element when printing
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>
      {/* card 6 */}
      <Card>
        <CardBody>
          <CardTitle tag="h4">Flex</CardTitle>
          <CardSubtitle className="text-muted">
            Quickly manage the layout, alignment, and sizing of grid columns, navigation,
            components, and more with a full suite of responsive flexbox utilities. For more complex
            implementations, custom CSS may be necessary.
          </CardSubtitle>
          <CardTitle tag="h4" className="mt-4">
            Enable flex behaviors
          </CardTitle>
          <CardSubtitle className="text-muted">
            Apply <code>display</code> utilities to create a flexbox container and transform{' '}
            <strong>direct children elements</strong> into flex items. Flex containers and items are
            able to be modified further with additional flex properties.
          </CardSubtitle>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex p-2 bg-info text-white">I&apos;m a flexbox container!</div>
          </div>

          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-inline-flex p-2 bg-info text-white">
              I&apos;m an inline flexbox container!
            </div>
          </div>

          <p>
            Responsive variations also exist for <code>.d-flex</code> and{' '}
            <code>.d-inline-flex</code>.
          </p>
          <ul className="list-unstyled">
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-inline-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-sm-inline-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-md-inline-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-lg-inline-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-flex</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.d-xl-inline-flex</code>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Direction</CardTitle>
          <p>
            Set the direction of flex items in a flex container with direction utilities. In most
            cases you can omit the horizontal class here as the browser default is <code>row</code>.
            However, you may encounter situations where you needed to explicitly set this value
            (like responsive layouts).
          </p>
          <p>
            Use <code>.flex-row</code> to set a horizontal direction (the browser default), or{' '}
            <code>.flex-row-reverse</code> to start the horizontal direction from the opposite side.
          </p>
          <div className="bd-example c">
            <div className="d-flex flex-row bg-info text-white mb-3">
              <div className="p-2 bg-info border-right">Flex item 1</div>
              <div className="p-2 bg-info border-right">Flex item 2</div>
              <div className="p-2 bg-info border-right">Flex item 3</div>
            </div>
            <div className="d-flex flex-row-reverse bg-info text-white">
              <div className="p-2 bg-info border-left">Flex item 1</div>
              <div className="p-2 bg-info border-left">Flex item 2</div>
              <div className="p-2 bg-info border-left">Flex item 3</div>
            </div>
          </div>
          <p>
            Use <code>.flex-column</code> to set a vertical direction, or{' '}
            <code>.flex-column-reverse</code> to start the vertical direction from the opposite
            side.
          </p>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex flex-column bg-info text-white mb-3">
              <div className="p-2 bg-info border-bottom">Flex item 1</div>
              <div className="p-2 bg-info border-bottom">Flex item 2</div>
              <div className="p-2 bg-info">Flex item 3</div>
            </div>
            <div className="d-flex flex-column-reverse bg-info text-white">
              <div className="p-2 bg-info">Flex item 1</div>
              <div className="p-2 bg-info border-bottom">Flex item 2</div>
              <div className="p-2 bg-info border-bottom">Flex item 3</div>
            </div>
          </div>
          <span>
            Responsive variations also exist for <code>flex-direction</code>.
          </span>
          <ul className="list-unstyled">
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-row</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-row-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-column</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-column-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-sm-row</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-sm-row-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-sm-column</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-sm-column-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-md-row</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-md-row-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-md-column</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-md-column-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-lg-row</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-lg-row-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-lg-column</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-lg-column-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-xl-row</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-xl-row-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-xl-column</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-xl-column-reverse</code>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <div>
            <CardTitle tag="h4">Justify content</CardTitle>
            <CardSubtitle className="text-muted">
              Use <code>justify-content</code> utilities on flexbox containers to change the
              alignment of flex items on the main axis (the x-axis to start, y-axis if{' '}
              <code>flex-direction: column</code>). Choose from <code>start</code> (browser
              default), <code>end</code>, <code>center</code>,<code>between</code>, or{' '}
              <code>around</code>.
            </CardSubtitle>
            <div className="bd-example p-3 bg-light-info my-3">
              <div className="d-flex justify-content-start bg-light mb-3 text-white">
                <div className="p-2 bg-info border-right">Flex item</div>
                <div className="p-2 bg-info border-right">Flex item</div>
                <div className="p-2 bg-info border-right">Flex item</div>
              </div>
              <div className="d-flex justify-content-end bg-light mb-3 text-white">
                <div className="p-2 bg-info border-left">Flex item</div>
                <div className="p-2 bg-info border-left">Flex item</div>
                <div className="p-2 bg-info border-left">Flex item</div>
              </div>
              <div className="d-flex justify-content-center bg-light mb-3 text-white">
                <div className="p-2 bg-info border-left border-right">Flex item</div>
                <div className="p-2 bg-info border-right">Flex item</div>
                <div className="p-2 bg-info border-right">Flex item</div>
              </div>
              <div className="d-flex justify-content-between bg-light mb-3 text-white">
                <div className="p-2 bg-info border-right">Flex item</div>
                <div className="p-2 bg-info border-left border-right">Flex item</div>
                <div className="p-2 bg-info border-left">Flex item</div>
              </div>
              <div className="d-flex justify-content-around bg-light text-white">
                <div className="p-2 bg-info border-left border-right">Flex item</div>
                <div className="p-2 bg-info border-left border-right">Flex item</div>
                <div className="p-2 bg-info border-left border-right">Flex item</div>
              </div>
            </div>
            <span>
              Responsive variations also exist for <code>justify-content</code>.
            </span>
            <ul className="list-unstyled">
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-start</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-end</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-center</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-between</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-around</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-sm-start</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-sm-end</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-sm-center</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-sm-between</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-sm-around</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-md-start</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-md-end</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-md-center</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-md-between</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-md-around</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-lg-start</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-lg-end</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-lg-center</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-lg-between</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-lg-around</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-xl-start</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-xl-end</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-xl-center</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-xl-between</code>
              </li>
              <li>
                <i className="mr-2 mdi mdi-arrow-right" />
                <code>.justify-content-xl-around</code>
              </li>
            </ul>
          </div>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Align items</CardTitle>
          <CardSubtitle className="text-muted">
            Use <code>align-items</code> utilities on flexbox containers to change the alignment of
            flex items on the cross axis (the y-axis to start, x-axis if{' '}
            <code>flex-direction: column</code>). Choose from <code>start</code>, <code>end</code>,{' '}
            <code>center</code>, <code>baseline</code>, or <code>stretch</code> (browser default).
          </CardSubtitle>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex align-items-start bg-light mb-3 text-white" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex align-items-end bg-light mb-3 text-white" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex align-items-center bg-light mb-3 text-white" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex align-items-baseline bg-light mb-3 text-white" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex align-items-stretch bg-light text-white" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
          </div>
          <span>
            Responsive variations also exist for <code>align-items</code>.
          </span>
          <ul className="list-unstyled">
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-sm-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-sm-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-sm-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-sm-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-sm-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-md-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-md-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-md-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-md-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-md-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-lg-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-lg-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-lg-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-lg-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-lg-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-xl-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-xl-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-xl-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-xl-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-items-xl-stretch</code>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Align self</CardTitle>
          <CardSubtitle className="text-muted">
            Use <code>align-self</code> utilities on flexbox items to individually change their
            alignment on the cross axis (the y-axis to start, x-axis if{' '}
            <code>flex-direction: column</code>). Choose from the same options as{' '}
            <code>align-items</code>: <code>start</code>, <code>end</code>, <code>center</code>,{' '}
            <code>baseline</code>, or <code>stretch</code> (browser default).
          </CardSubtitle>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex bg-light text-white mb-3" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="align-self-start p-2 bg-info border-right">Aligned flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex bg-light text-white mb-3" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="align-self-end p-2 bg-info border-right">Aligned flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex bg-light text-white mb-3" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="align-self-center p-2 bg-info border-right">Aligned flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex bg-light text-white mb-3" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="align-self-baseline p-2 bg-info border-right">Aligned flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex bg-light text-white" style={setheight}>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="align-self-stretch p-2 bg-info border-right">Aligned flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
          </div>
          <span>
            Responsive variations also exist for <code>align-self</code>.
          </span>
          <ul className="list-unstyled">
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-sm-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-sm-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-sm-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-sm-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-sm-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-md-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-md-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-md-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-md-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-md-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-lg-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-lg-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-lg-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-lg-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-lg-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-xl-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-xl-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-xl-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-xl-baseline</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-self-xl-stretch</code>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Auto margins</CardTitle>
          <CardSubtitle className="text-muted">
            Flexbox can do some pretty awesome things when you mix flex alignments with auto
            margins. Shown below are three examples of controlling flex items via auto margins:
            default (no auto margin), pushing two items to the right (<code>.mr-auto</code>), and
            pushing two items to the left (<code>.ml-auto</code>).
          </CardSubtitle>
          <span>
            <strong>
              Unfortunately, IE10 and IE11 do not properly support auto margins on flex items whose
              parent has a non-default <code>justify-content</code> value.
            </strong>{' '}
            <a href="https://stackoverflow.com/a/37535548">See this StackOverflow answer</a> for
            more details.
          </span>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex bg-light text-white mb-3">
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
            <div className="d-flex bg-light text-white mb-3">
              <div className="mr-auto p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-left">Flex item</div>
              <div className="p-2 bg-info border-left">Flex item</div>
            </div>
            <div className="d-flex bg-light text-white mb-3">
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="ml-auto p-2 bg-info border-left">Flex item</div>
            </div>
          </div>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">With align-items</CardTitle>
          <CardSubtitle className="text-muted">
            Vertically move one flex item to the top or bottom of a container by mixing{' '}
            <code>align-items</code>, <code>flex-direction: column</code>, and{' '}
            <code>margin-top: auto</code> or <code>margin-bottom: auto</code>.
          </CardSubtitle>
          <div className="bd-example p-3 bg-light-info my-3">
            <div
              className="d-flex align-items-start flex-column bg-light text-white mb-3"
              style={setheight}
            >
              <div className="mb-auto p-2 bg-info">Flex item</div>
              <div className="p-2 bg-info border-bottom">Flex item</div>
              <div className="p-2 bg-info">Flex item</div>
            </div>
            <div
              className="d-flex align-items-end flex-column bg-light text-white mb-3"
              style={setheight}
            >
              <div className="p-2 bg-info border-bottom">Flex item</div>
              <div className="p-2 bg-info">Flex item</div>
              <div className="mt-auto p-2 bg-info">Flex item</div>
            </div>
          </div>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Wrap</CardTitle>
          <CardSubtitle className="text-muted">
            Change how flex items wrap in a flex container. Choose from no wrapping at all (the
            browser default) with <code>.flex-nowrap</code>, wrapping with <code>.flex-wrap</code>,
            or reverse wrapping with <code>.flex-wrap-reverse</code>.
          </CardSubtitle>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex flex-nowrap bg-light">
              <div className="p-2 bg-info text-white">Flex item</div>
              <div className="p-2 bg-info text-white">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
              <div className="p-2">Flex item</div>
            </div>
          </div>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex flex-wrap bg-light text-white">
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right bg-info">Flex item</div>
              <div className="p-2 border-right border-top bg-info">Flex item</div>
              <div className="p-2 border-right border-top bg-info">Flex item</div>
            </div>
          </div>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex flex-wrap-reverse bg-light text-white">
              <div className="p-2 bg-info border-bottom border-right border-top">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
          </div>
          <span>
            Responsive variations also exist for <code>flex-wrap</code>.
          </span>
          <ul className="list-unstyled">
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-nowrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-wrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-wrap-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-sm-nowrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-sm-wrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-sm-wrap-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-md-nowrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-md-wrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-md-wrap-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-lg-nowrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-lg-wrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-lg-wrap-reverse</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-xl-nowrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-xl-wrap</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.flex-xl-wrap-reverse</code>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Order</CardTitle>
          <CardSubtitle className="text-muted">
            Change the <em>visual</em> order of specific flex items with a handful of{' '}
            <code>order</code> utilities. We only provide options for making an item first or last,
            as well as a reset to use the DOM order. As <code>order</code> takes any integer value
            (e.g., <code>5</code>), add custom CSS for any additional values needed.
          </CardSubtitle>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="d-flex flex-nowrap bg-light text-white">
              <div className="order-3 p-2 bg-info border-right">First flex item</div>
              <div className="order-2 p-2 bg-info border-right">Second flex item</div>
              <div className="order-1 p-2 bg-info border-right">Third flex item</div>
            </div>
          </div>
          <span>
            Responsive variations also exist for <code>order</code>.
          </span>
          <ul className="list-unstyled">
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-1</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-2</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-3</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-4</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-5</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-6</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-7</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-8</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-9</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-10</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-11</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-12</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-1</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-2</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-3</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-4</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-5</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-6</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-7</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-8</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-9</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-10</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-11</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-sm-12</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-1</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-2</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-3</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-4</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-5</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-6</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-7</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-8</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-9</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-10</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-11</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-md-12</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-1</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-2</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-3</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-4</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-5</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-6</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-7</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-8</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-9</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-10</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-11</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-lg-12</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-1</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-2</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-3</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-4</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-5</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-6</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-7</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-8</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-9</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-10</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-11</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.order-xl-12</code>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Align content</CardTitle>
          <CardSubtitle className="text-muted">
            Use <code>align-content</code> utilities on flexbox containers to align flex items{' '}
            <em>together</em> on the cross axis. Choose from <code>start</code> (browser default),{' '}
            <code>end</code>, <code>center</code>, <code>between</code>, <code>around</code>, or{' '}
            <code>stretch</code>. To demonstrate these utilities, we’ve enforced{' '}
            <code>flex-wrap: wrap</code> and increased the number of flex items.
          </CardSubtitle>
          <span>
            <strong>Heads up!</strong> This property has no effect on single rows of flex items.
          </span>
          <div className="bd-example p-3 bg-light-info my-3">
            <div
              className="d-flex align-content-start flex-wrap bg-light text-white mb-3"
              style={setheight}
            >
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
            </div>
          </div>
          <div className="bd-example p-3 bg-light-info my-3">
            <div
              className="d-flex align-content-end flex-wrap bg-light text-white mb-3"
              style={setheight}
            >
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
            </div>
          </div>
          <div className="bd-example p-3 bg-light-info my-3">
            <div
              className="d-flex align-content-center flex-wrap bg-light text-white mb-3"
              style={setheight}
            >
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
            </div>
          </div>
          <div className="bd-example p-3 bg-light-info my-3">
            <div
              className="d-flex align-content-between flex-wrap bg-light text-white mb-3"
              style={setheight}
            >
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
          </div>
          <div className="bd-example p-3 bg-light-info my-3">
            <div
              className="d-flex align-content-around flex-wrap bg-light text-white mb-3"
              style={setheight}
            >
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
            </div>
          </div>
          <div className="bd-example p-3 bg-light-info my-3">
            <div
              className="d-flex align-content-stretch flex-wrap bg-light text-white mb-3"
              style={setheight}
            >
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
              <div className="p-2 bg-info border-right border-top">Flex item</div>
            </div>
          </div>
          <span>
            Responsive variations also exist for <code>align-content</code>.
          </span>
          <ul className="list-unstyled">
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-around</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-sm-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-sm-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-sm-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-sm-around</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-sm-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-md-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-md-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-md-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-md-around</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-md-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-lg-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-lg-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-lg-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-lg-around</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-lg-stretch</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-xl-start</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-xl-end</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-xl-center</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-xl-around</code>
            </li>
            <li>
              <i className="mr-2 mdi mdi-arrow-right" />
              <code>.align-content-xl-stretch</code>
            </li>
          </ul>
        </CardBody>
      </Card>
      {/* card 7 */}
      <Card>
        <CardBody>
          <CardTitle tag="h4">Float</CardTitle>
          <CardSubtitle className="text-muted">
            Toggle floats on any element, across any breakpoint, using our responsive float
            utilities.
          </CardSubtitle>
          <span>
            These utility classes float an element to the left or right, or disable floating, based
            on the current viewport size using the{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/float">
              CSS <code>float</code> property
            </a>
            .<code>!important</code> is included to avoid specificity issues. These use the same
            viewport breakpoints as our grid system.
          </span>
          <span>Toggle a float with a class:</span>
          <div className="bd-example bg-light-info p-3 my-3">
            <div className="float-start">Float start on all viewport sizes</div>
            <br />
            <div className="float-end">Float end on all viewport sizes</div>
            <br />
            <div className="float-none">Don&apos;t float on all viewport sizes</div>
          </div>
          <CardTitle tag="h4" className="mt-4">
            Responsive
          </CardTitle>
          <CardSubtitle className="text-muted">
            Responsive variations also exist for each <code>float</code> value.
          </CardSubtitle>
          <div className="bd-example bg-light-info p-3 my-3">
            <div className="float-sm-start">Float start on viewports sized SM (small) or wider</div>
            <br />
            <div className="float-md-start">
              Float start on viewports sized MD (medium) or wider
            </div>
            <br />
            <div className="float-lg-start">Float start on viewports sized LG (large) or wider</div>
            <br />
            <div className="float-xl-start">
              Float start on viewports sized XL (extra-large) or wider
            </div>
            <br />
          </div>
          <span>Here are all the support classes;</span>
          <ul className="list-unstyled">
            <li>
              <code>.float-start</code>
            </li>
            <li>
              <code>.float-end</code>
            </li>
            <li>
              <code>.float-none</code>
            </li>
            <li>
              <code>.float-sm-start</code>
            </li>
            <li>
              <code>.float-sm-end</code>
            </li>
            <li>
              <code>.float-sm-none</code>
            </li>
            <li>
              <code>.float-md-start</code>
            </li>
            <li>
              <code>.float-md-end</code>
            </li>
            <li>
              <code>.float-md-none</code>
            </li>
            <li>
              <code>.float-lg-start</code>
            </li>
            <li>
              <code>.float-lg-end</code>
            </li>
            <li>
              <code>.float-lg-none</code>
            </li>
            <li>
              <code>.float-xl-start</code>
            </li>
            <li>
              <code>.float-xl-end</code>
            </li>
            <li>
              <code>.float-xl-none</code>
            </li>
          </ul>
        </CardBody>
      </Card>
      {/* card 8 */}
      <Card>
        <CardBody>
          <CardTitle tag="h4">Position</CardTitle>
          <CardSubtitle className="text-muted">
            Use these shorthand utilities for quickly configuring the position of an element.
          </CardSubtitle>
        </CardBody>
        <div className="table-responsive">
          <Table hover bordered>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.position-fixed</code>
                </td>
                <td>Changes object&apos;s position to fixed.</td>
              </tr>
              <tr>
                <td>
                  <code>.position-relative</code>
                </td>
                <td>Changes object&apos;s position to relative.</td>
              </tr>
              <tr>
                <td>
                  <code>.position-absolute</code>
                </td>
                <td>Changes object&apos;s position to absolute.</td>
              </tr>
              <tr>
                <td>
                  <code>.position-static</code>
                </td>
                <td>Changes object&apos;s position to static.</td>
              </tr>
              <tr>
                <td>
                  <code>.position-sticky</code>
                </td>
                <td>Changes object&apos;s position to static.</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <CardBody>
          <CardTitle tag="h4">Fixed top</CardTitle>
          <CardSubtitle className="text-muted">
            Position an element at the top of the viewport, from edge to edge. Be sure you
            understand the ramifications of fixed position in your project; you may need to add
            aditional CSS.
          </CardSubtitle>
          <div className="bg-secondary p-3 rounded my-3">
            <code className="text-white">
              &lt;div className=&quot;fixed-top&quot;&gt;...&lt;/div&gt;
            </code>
          </div>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Fixed bottom</CardTitle>
          <CardSubtitle className="text-muted">
            Position an element at the bottom of the viewport, from edge to edge. Be sure you
            understand the ramifications of fixed position in your project; you may need to add
            aditional CSS.
          </CardSubtitle>
          <div className="bg-secondary p-3 rounded my-3">
            <code className="text-white">
              &lt;div className=&quot;fixed-bottom&quot;&gt;...&lt;/div&gt;
            </code>
          </div>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Sticky top</CardTitle>
          <CardSubtitle className="text-muted">
            Position an element at the top of the viewport, from edge to edge, but only after you
            scroll past it. The <code>.sticky-top</code> utility uses CSS’s{' '}
            <code>position: sticky</code>, which isn’t fully supported in all browsers.
          </CardSubtitle>
          <div className="bg-secondary p-3 rounded my-3">
            <code className="text-white">
              &lt;div className=&quot;sticky-top&quot;&gt;...&lt;/div&gt;
            </code>
          </div>
          <span>
            <strong>
              Microsoft Edge and IE11 will render <code>position: sticky</code> as{' '}
              <code>position: relative</code>.
            </strong>{' '}
            As such, we wrap the styles in a <code>@supports</code> query, limiting the stickiness
            to only browsers that properly can render it.
          </span>
        </CardBody>
      </Card>
      {/* card 9 */}
      <Card>
        <CardBody>
          <CardTitle tag="h4">Sizing</CardTitle>
          <CardSubtitle className="text-muted">
            Easily make an element as wide or as tall (relative to its parent) with our width and
            height utilities.
          </CardSubtitle>
          <span>
            Width and height utilities are generated from the <code>$sizes</code> Sass map in{' '}
            <code>_variables.scss</code>. Includes support for <code>25%</code>,<code>50%</code>,{' '}
            <code>75%</code>, and <code>100%</code> by default. Modify those values as you need to
            generate different utilities here.
          </span>
          <div className="bd-example p-3 bg-light-info my-3">
            <div className="w-25 p-3 bg-light">Width 25%</div>
            <div className="w-50 p-3 bg-light">Width 50%</div>
            <div className="w-75 p-3 bg-light">Width 75%</div>
            <div className="w-100 p-3 bg-light">Width 100%</div>
          </div>
          <div className="bd-example p-3 bg-light-info my-3">
            <div style={setheight} className="bg-light">
              <div className="h-25 d-inline-block bg-info text-white me-1 p-1" style={setheight}>
                Height 25%
              </div>
              <div className="h-50 d-inline-block bg-info text-white me-1 p-2" style={setheight}>
                Height 50%
              </div>
              <div className="h-75 d-inline-block bg-info text-white me-1 p-2" style={setheight}>
                Height 75%
              </div>
              <div className="h-100 d-inline-block bg-info text-white me-1 p-2" style={setheight}>
                Height 100%
              </div>
            </div>
          </div>
          <span>
            You can also use <code>max-width: 100%;</code> and <code>max-height: 100%;</code>{' '}
            utilities as needed.
          </span>
          <div className="bd-example bg-light-info p-3 my-3">
            <div className="bg-light" style={setheight}>
              <div className="mh-100 bg-info text-white" style={setheight}>
                Max-height 100%
              </div>
            </div>
          </div>
        </CardBody>
        <CardBody>
          <CardTitle tag="h4">Fixed Width</CardTitle>
          <CardSubtitle className="text-muted">
            Add one of these to class to set fixed width of the content.
          </CardSubtitle>
        </CardBody>
        <div className="table-responsive">
          <Table hover bordered>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.width-size</code>
                </td>
                <td>
                  Set content fixed width in pixel of selected size where size can be 50, 100, 150,
                  200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750 and 800. i.e{' '}
                  <code>.width-50</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>.width-size-per</code>
                </td>
                <td>
                  Set content fixed width in percentage of selected size where size can be 5%, 10%,
                  15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%, 55%, 60%, 65%, 70%, 75% and 80%. i.e{' '}
                  <code>.width-5-per</code>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <CardBody>
          <CardTitle tag="h4">Fixed Height</CardTitle>
          <CardSubtitle className="text-muted">
            Add one of these to class to set fixed height of the content.
          </CardSubtitle>
        </CardBody>
        <div className="table-responsive">
          <Table hover bordered>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.height-size</code>
                </td>
                <td>
                  Set content fixed height in pixel of selected size where size can be 50, 100, 150,
                  200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750 and 800. i.e{' '}
                  <code>.height-50</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>.height-size-per</code>
                </td>
                <td>
                  Set content fixed height in percentage of selected size where size can be 5%, 10%,
                  15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%, 55%, 60%, 65%, 70%, 75% and 80%. i.e{' '}
                  <code>.height-5-per</code>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>
      {/* card 10 */}
      <Card>
        <CardBody>
          <CardTitle tag="h4">Vertical alignment</CardTitle>
          <CardSubtitle className="text-muted">
            Easily change the vertical alignment of inline, inline-block, inline-table, and table
            cell elements.
          </CardSubtitle>
          <p>
            Change the alignment of elements with the{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align">
              <code>vertical-alignment</code>
            </a>{' '}
            utilities. Please note that vertical-align only affects inline, inline-block,
            inline-table, and table cell elements.
          </p>
          <p>
            Choose from <code>.align-baseline</code>, <code>.align-top</code>,{' '}
            <code>.align-middle</code>, <code>.align-bottom</code>, <code>.align-text-bottom</code>,
            and <code>.align-text-top</code> as needed.
          </p>
          <div className="bd-example bg-light-info p-3">
            <span className="me-3 p-1 bg-info text-white align-baseline">baseline</span>
            <span className="me-3 p-1 bg-info text-white align-top">top</span>
            <span className="me-3 p-1 bg-info text-white align-middle">middle</span>
            <span className="me-3 p-1 bg-info text-white align-bottom">bottom</span>
            <span className="me-3 p-1 bg-info text-white align-text-top">text-top</span>
            <span className="me-3 p-1 bg-info text-white align-text-bottom">text-bottom</span>
          </div>
        </CardBody>
        <div className="table-responsive">
          <Table hover bordered>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.align-top</code>
                </td>
                <td>Changes element&apos;s vertical alignment to top.</td>
              </tr>
              <tr>
                <td>
                  <code>.align-middle</code>
                </td>
                <td>Changes element&apos;s vertical alignment to middle.</td>
              </tr>
              <tr>
                <td>
                  <code>.align-bottom</code>
                </td>
                <td>Changes element&apos;s vertical alignment to bottom.</td>
              </tr>
              <tr>
                <td>
                  <code>.align-baseline</code>
                </td>
                <td>Changes element&apos;s vertical alignment to baseline.</td>
              </tr>
              <tr>
                <td>
                  <code>.align-text-top</code>
                </td>
                <td>
                  Top of the element is aligned with the top of the parent element&apos;s font.
                </td>
              </tr>
              <tr>
                <td>
                  <code>.align-text-bottom</code>
                </td>
                <td>
                  The bottom of the element is aligned with the bottom of the parent element&apos;s
                  font.
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <CardBody>
          <div>
            <p>With table cells:</p>
            <div className="bd-example">
              <table className="bg-light" style={setheight}>
                <tbody>
                  <tr>
                    <td className="me-3 p-1 bg-info text-white align-baseline">baseline</td>
                    <td className="me-3 p-1 bg-info text-white align-top">top</td>
                    <td className="me-3 p-1 bg-info text-white align-middle">middle</td>
                    <td className="me-3 p-1 bg-info text-white align-bottom">bottom</td>
                    <td className="me-3 p-1 bg-info text-white align-text-top">text-top</td>
                    <td className="me-3 p-1 bg-info text-white align-text-bottom">text-bottom</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default HelperClass;
