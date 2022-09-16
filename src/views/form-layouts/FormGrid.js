import React from 'react';

import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Form,
  Label,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const FormGrids = () => {
  return (
    <div>
      <BreadCrumbs />
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <ComponentCard title="Horizontal Grid">
        <Form>
          <Row>
            <Col md="1">
              <FormGroup>
                <Input type="text" placeholder="1" />
              </FormGroup>
            </Col>
            <Col md="11">
              <FormGroup>
                <Input type="text" placeholder="md-11" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <FormGroup>
                <Input type="text" placeholder="md-2" />
              </FormGroup>
            </Col>
            <Col md="10">
              <FormGroup>
                <Input type="text" placeholder="md-10" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
                <Input type="text" placeholder="md-3" />
              </FormGroup>
            </Col>
            <Col md="9">
              <FormGroup>
                <Input type="text" placeholder="md-9" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Input type="text" placeholder="md-4" />
              </FormGroup>
            </Col>
            <Col md="8">
              <FormGroup>
                <Input type="text" placeholder="md-8" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="5">
              <FormGroup>
                <Input type="text" placeholder="md-5" />
              </FormGroup>
            </Col>
            <Col md="7">
              <FormGroup>
                <Input type="text" placeholder="md-7" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <Input type="text" placeholder="md-6" />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Input type="text" placeholder="md-6" />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2">
            <Button color="primary" type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="reset" color="danger">
              Reset
            </Button>
          </div>
        </Form>
      </ComponentCard>
      <ComponentCard title="Grid With Row Label">
        <Form>
          <Label>Row Label </Label>
          <Row>
            <Col md="1">
              <FormGroup>
                <Input type="text" placeholder="1" />
              </FormGroup>
            </Col>
            <Col md="11">
              <FormGroup>
                <Input type="text" placeholder="md-11" />
              </FormGroup>
            </Col>
          </Row>
          <Label>Row Label </Label>
          <Row>
            <Col md="2">
              <FormGroup>
                <Input type="text" placeholder="md-2" />
              </FormGroup>
            </Col>
            <Col md="10">
              <FormGroup>
                <Input type="text" placeholder="md-10" />
              </FormGroup>
            </Col>
          </Row>
          <Label>Row Label </Label>
          <Row>
            <Col md="3">
              <FormGroup>
                <Input type="text" placeholder="md-3" />
              </FormGroup>
            </Col>
            <Col md="9">
              <FormGroup>
                <Input type="text" placeholder="md-9" />
              </FormGroup>
            </Col>
          </Row>
          <Label>Row Label </Label>
          <Row>
            <Col md="4">
              <FormGroup>
                <Input type="text" placeholder="md-4" />
              </FormGroup>
            </Col>
            <Col md="8">
              <FormGroup>
                <Input type="text" placeholder="md-8" />
              </FormGroup>
            </Col>
          </Row>
          <Label>Row Label </Label>
          <Row>
            <Col md="5">
              <FormGroup>
                <Input type="text" placeholder="md-5" />
              </FormGroup>
            </Col>
            <Col md="7">
              <FormGroup>
                <Input type="text" placeholder="md-7" />
              </FormGroup>
            </Col>
          </Row>
          <Label>Row Label </Label>
          <Row>
            <Col md="6">
              <FormGroup>
                <Input type="text" placeholder="md-6" />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Input type="text" placeholder="md-6" />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2">
            <Button color="primary" type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="reset" color="danger">
              Reset
            </Button>
          </div>
        </Form>
      </ComponentCard>
      <ComponentCard title="Grid With Label">
        <Form>
          <Row>
            <Col md="1">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="1" />
              </FormGroup>
            </Col>
            <Col md="11">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-11" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-2" />
              </FormGroup>
            </Col>
            <Col md="10">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-10" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-3" />
              </FormGroup>
            </Col>
            <Col md="9">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-9" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-4" />
              </FormGroup>
            </Col>
            <Col md="8">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-8" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="5">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-5" />
              </FormGroup>
            </Col>
            <Col md="7">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-7" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-6" />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Label </Label>
                <Input type="text" placeholder="md-6" />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2">
            <Button color="primary" type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="reset" color="danger">
              Reset
            </Button>
          </div>
        </Form>
      </ComponentCard>
      <Row>
        <Col md="6">
          <ComponentCard title="Right Offset">
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Input type="text" placeholder="md-12" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="11">
                  <FormGroup>
                    <Input type="text" placeholder="md-11" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="10">
                  <FormGroup>
                    <Input type="text" placeholder="md-10" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" placeholder="md-9" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-8" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="7">
                  <FormGroup>
                    <Input type="text" placeholder="md-7" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input type="text" placeholder="md-6" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="5">
                  <FormGroup>
                    <Input type="text" placeholder="md-5" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Input type="text" placeholder="md-4" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Input type="text" placeholder="md-3" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="2">
                  <FormGroup>
                    <Input type="text" placeholder="md-2" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="1">
                  <FormGroup>
                    <Input type="text" placeholder="md-1" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex align-items-center gap-2">
                <Button color="primary" type="submit" className="mr-2">
                  Submit
                </Button>
                <Button type="reset" color="danger">
                  Reset
                </Button>
              </div>
            </Form>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Left Offset">
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Input type="text" placeholder="md-12" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 11, offset: 1 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-11, offset : 1" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 10, offset: 2 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-10, offset : 2" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 9, offset: 3 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-9, offset : 3" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 8, offset: 4 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-8, offset : 4" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 7, offset: 5 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-7, offset : 5" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 6, offset: 6 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-6, offset : 6" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 5, offset: 7 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-5, offset : 7" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 4, offset: 8 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-4, offset : 8" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 3, offset: 9 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-3, offset : 9" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 2, offset: 10 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-2, offset : 10" />
                  </FormGroup>
                </Col>
                <Col md={{ size: 1, offset: 11 }}>
                  <FormGroup>
                    <Input type="text" placeholder="md-1, offset : 11" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex align-items-center gap-2">
                <Button color="primary" type="submit" className="mr-2">
                  Submit
                </Button>
                <Button type="reset" color="danger">
                  Reset
                </Button>
              </div>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <ComponentCard title="Centered Input">
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Input type="text" placeholder="md-12" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="10" className="m-auto">
                  <FormGroup>
                    <Input type="text" placeholder="md-10 ,m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8" className="m-auto">
                  <FormGroup>
                    <Input type="text" placeholder="md-8 ,m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="m-auto">
                  <FormGroup>
                    <Input type="text" placeholder="md-6 ,m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4" className="m-auto">
                  <FormGroup>
                    <Input type="text" placeholder="md-4 ,m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="2" className="m-auto">
                  <FormGroup>
                    <Input type="text" placeholder="md-2 ,m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Input type="text" placeholder="md-4" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="3" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input type="text" placeholder="md-6" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="2" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-8" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="1" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="10">
                  <FormGroup>
                    <Input type="text" placeholder="md-10" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center d-flex align-items-center gap-2">
                <Button color="primary" type="submit" className="mr-2">
                  Submit
                </Button>
                <Button type="reset" color="danger">
                  Reset
                </Button>
              </div>
            </Form>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Centered Input with Default label">
            <Form>
              <Row>
                <Col md="12" className="m-auto">
                  <FormGroup>
                    <Label>Label</Label>
                    <Input type="text" placeholder="md-12, m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="10" className="m-auto">
                  <FormGroup>
                    <Label>Label</Label>
                    <Input type="text" placeholder="md-10, m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="9" className="m-auto">
                  <FormGroup>
                    <Label>Label</Label>
                    <Input type="text" placeholder="md-9, m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="m-auto">
                  <FormGroup>
                    <Label>Label</Label>
                    <Input type="text" placeholder="md-6, m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4" className="m-auto">
                  <FormGroup>
                    <Label>Label</Label>
                    <Input type="text" placeholder="md-4, m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="2" className="m-auto">
                  <FormGroup>
                    <Label>Label</Label>
                    <Input type="text" placeholder="md-2, m-auto" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center mt-4 d-flex align-items-center gap-2">
                <Button color="primary" type="submit" className="mr-2">
                  Submit
                </Button>
                <Button type="reset" color="danger">
                  Reset
                </Button>
              </div>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <ComponentCard title="Grid With Row Label">
        <Form>
          <Row>
            <Col lg="1">
              <Label>Label</Label>
            </Col>
            <Col lg="11">
              <Row>
                <Col md="1">
                  <FormGroup>
                    <Input type="text" placeholder="md-1" />
                  </FormGroup>
                </Col>
                <Col md="11">
                  <FormGroup>
                    <Input type="text" placeholder="md-11" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg="1">
              <Label>Label</Label>
            </Col>
            <Col lg="11">
              <Row>
                <Col md="2">
                  <FormGroup>
                    <Input type="text" placeholder="md-2" />
                  </FormGroup>
                </Col>
                <Col md="10">
                  <FormGroup>
                    <Input type="text" placeholder="md-10" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg="1">
              <Label>Label</Label>
            </Col>
            <Col lg="11">
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Input type="text" placeholder="md-3" />
                  </FormGroup>
                </Col>
                <Col md="9">
                  <FormGroup>
                    <Input type="text" placeholder="md-9" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg="1">
              <Label>Label</Label>
            </Col>
            <Col lg="11">
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Input type="text" placeholder="md-4" />
                  </FormGroup>
                </Col>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-8" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg="1">
              <Label>Label</Label>
            </Col>
            <Col lg="11">
              <Row>
                <Col md="5">
                  <FormGroup>
                    <Input type="text" placeholder="md-5" />
                  </FormGroup>
                </Col>
                <Col md="7">
                  <FormGroup>
                    <Input type="text" placeholder="md-7" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg="1">
              <Label>Label</Label>
            </Col>
            <Col lg="11">
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input type="text" placeholder="md-6" />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input type="text" placeholder="md-6" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2">
            <Button color="primary" type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="reset" color="danger">
              Reset
            </Button>
          </div>
        </Form>
      </ComponentCard>
      <ComponentCard title="Grid With Inline Input Label">
        <Form>
          <Row>
            <Col md="2">
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-2" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md="10">
              <Row>
                <Col md="4" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-10" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-3" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md="9">
              <Row>
                <Col md="4" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-9" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-4" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md="8">
              <Row>
                <Col md="4" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-8" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="5">
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-5" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md="7">
              <Row>
                <Col md="4" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-7" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-6" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md="6">
              <Row>
                <Col md="4" className="text-right">
                  <FormGroup>
                    <Label>Label</Label>
                  </FormGroup>
                </Col>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="md-6" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2">
            <Button color="primary" type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="reset" color="danger">
              Reset
            </Button>
          </div>
        </Form>
      </ComponentCard>
      <ComponentCard title="Multiple Input With Default Label">
        <Form>
          <FormGroup>
            <Label>Label</Label>
          </FormGroup>
          <Row>
            <Col md="4">
              <FormGroup>
                <Input type="text" placeholder="First Input &amp; First Row" />
              </FormGroup>
              <FormGroup>
                <Input type="text" placeholder="First Input &amp; First Row" />
              </FormGroup>
            </Col>
            <Col md="8">
              <FormGroup>
                <Input type="text" placeholder="Second Input &amp; First Row" />
              </FormGroup>
              <FormGroup>
                <Input type="text" placeholder="Second Input &amp; First Row" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Multiple width Input Label</Label>
          </FormGroup>
          <Row>
            <Col md="7">
              <FormGroup>
                <Input type="text" placeholder="First Input &amp; First Row" />
              </FormGroup>
              <FormGroup>
                <Input type="text" placeholder="Second Input &amp; First Row" />
              </FormGroup>
            </Col>
            <Col md="5">
              <FormGroup>
                <Input type="text" placeholder="First Input &amp; Second Row" />
              </FormGroup>
              <FormGroup>
                <Input type="text" placeholder="Second Input &amp; Second Row" />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2">
            <Button color="primary" type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="reset" color="danger">
              Reset
            </Button>
          </div>
        </Form>
      </ComponentCard>
      <ComponentCard title="Multiple Input With Inline Label">
        <Form>
          <Row>
            <Col md="2">
              <FormGroup>
                <Label>Label</Label>
              </FormGroup>
            </Col>
            <Col md="10">
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Input type="text" placeholder="First Input &amp; First Row" />
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" placeholder="First Input &amp; Second Row" />
                  </FormGroup>
                </Col>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="Second Input &amp; First Row" />
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" placeholder="Second Input &amp; Second Row" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <FormGroup>
                <Label>Multiple width Input Label</Label>
              </FormGroup>
            </Col>
            <Col md="10">
              <Row>
                <Col md="7">
                  <FormGroup>
                    <Input type="text" placeholder="First Input &amp; First Row" />
                  </FormGroup>
                </Col>
                <Col md="5">
                  <FormGroup>
                    <Input type="text" placeholder="Second Input &amp; First Row" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Input type="text" placeholder="First Input &amp; Second Row" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Input type="text" placeholder="Second Input &amp; Second Row" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2">
            <Button color="primary" type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="reset" color="danger">
              Reset
            </Button>
          </div>
        </Form>
      </ComponentCard>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default FormGrids;
