import React from 'react';

import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
  InputGroup,
  InputGroupText,
  Button,
  FormFeedback,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const FormInputs = () => {
  return (
    <div>
      <BreadCrumbs />
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Default Input"
            subtitle={
              <p>
                To use add <code>Input</code> in the form group
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="text" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input With Helper Text"
            subtitle={
              <p>
                To use add <code>Formtext</code> in the form group
              </p>
            }
          >
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" placeholder="Name" />
                <FormText className="text-muted">Helper Text</FormText>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Password"
            subtitle={
              <p>
                To use add <code>type=&quot;password&quot;</code> in the form group
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="password" placeholder="password" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Disabled Input"
            subtitle={
              <p>
                Add attribute <code>disabled</code> to disable input field.
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="text" placeholder="Name" disabled />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Predefined Input Value"
            subtitle={
              <p>
                Add attribute <code>defaultValue=&quot;VALUE&quot;</code>.
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="text" defaultValue="Predefined Value" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Readonly Input Field"
            subtitle={
              <p>
                Add attribute <code>readonly</code> to set field.
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="text" defaultValue="Readonly Text" readOnly />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input With Placeholder"
            subtitle={
              <p>
                Add attribute <code>placeholder=&quot;...&quot;</code> to input area
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="text" placeholder="Placeholder Text" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Maximum Value"
            subtitle={
              <p>
                Add attribute <code>maxLength=&quot;6&quot;</code> to input area
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="text" maxLength="6" placeholder="Text Here" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Minimum Value"
            subtitle={
              <p>
                Add attribute <code>minLength=&quot;5&quot;</code> to input area
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="text" minLength="6" placeholder="Text Here" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Input Type Options</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Text"
            subtitle={
              <p>
                Using <code>input type=&quot;text&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="text" defaultValue="Text Here" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Password"
            subtitle={
              <p>
                Using <code>input type=&quot;password&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="password" defaultValue="Text Here" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Phone Number"
            subtitle={
              <p>
                Using <code>input type=&quot;tel&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="tel" defaultValue="1-(444)-444-4445" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Email"
            subtitle={
              <p>
                Using <code>input type=&quot;email&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="email" defaultValue="abc@example.com" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type URL"
            subtitle={
              <p>
                Using <code>input type=&quot;url&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="url" defaultValue="http://google.com" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Search"
            subtitle={
              <p>
                Using <code>input type=&quot;url&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="search" defaultValue="how to..." />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Numbers"
            subtitle={
              <p>
                Using <code>input type=&quot;number&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="number" defaultValue="6029" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Date Time"
            subtitle={
              <p>
                Using <code>input type=&quot;datetime-local&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="datetime-local" defaultValue="2008-05-13T22:33:00" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Date"
            subtitle={
              <p>
                Using <code>input type=&quot;date&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="date" defaultValue="2018-05-13" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Time"
            subtitle={
              <p>
                Using <code>input type=&quot;time&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="time" defaultValue="22:33:00" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Week"
            subtitle={
              <p>
                Using <code>input type=&quot;week&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="week" defaultValue="2011-W33" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Input Type Month"
            subtitle={
              <p>
                Using <code>input type=&quot;month&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="month" defaultValue="1999-08" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Input Type Color"
            subtitle={
              <p>
                Using <code>input type=&quot;color&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="color" defaultValue="#563d7c" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Input Type Range"
            subtitle={
              <p>
                Using <code>input type=&quot;range&quot;</code>
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="range" defaultValue="1999-08" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">General Textarea</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Textarea">
            <Form>
              <FormGroup>
                <Input type="textarea" rows="3" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Textarea With Placeholder">
            <Form>
              <FormGroup>
                <Input type="textarea" placeholder="Textarea Text" rows="3" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Textarea With Helper Text">
            <Form>
              <FormGroup className="mb-0">
                <Input type="textarea" placeholder="Textarea Text" rows="3" />
                <FormText>Helper Text</FormText>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Inline Checkboxes &amp; Radios</h4>
      <Row>
        <Col sm="12" md="6">
          <ComponentCard title="Inline Default Checkbox">
            <Form inline>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <Label for="inlineCheckbox1">1</Label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="option2"
                />
                <Label for="inlineCheckbox2">2</Label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox3"
                  value="option3"
                  disabled
                />
                <Label for="inlineCheckbox3">3 (disabled)</Label>
              </div>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Inline Default Radio Button">
            <Form inline>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineradio1"
                  value="option1"
                />
                <Label for="inlineradio1">1</Label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineradio2"
                  value="option2"
                />
                <Label for="inlineradio2">2</Label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineradio3"
                  value="option3"
                  disabled
                />
                <Label for="inlineradio3">3 (disabled)</Label>
              </div>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Inline Custom Checkbox">
            <Form inline>
              <div className="form-check form-check-inline">
                <Input type="checkbox" id="exampleCustomCheckbox1" label="1" />
              </div>
              <div className="form-check form-check-inline">
                <Input type="checkbox" id="exampleCustomCheckbox2" label="2" />
              </div>
              <div className="form-check form-check-inline">
                <Input type="checkbox" id="exampleCustomCheckbox3" label="3" />
              </div>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Inline Custom Radio Button">
            <Form inline>
              <div className="form-check form-check-inline">
                <Input type="radio" id="exampleCustomRadio" name="customRadio" label="1" />
              </div>
              <div className="form-check form-check-inline">
                <Input type="radio" id="exampleCustomRadio2" name="customRadio" label="2" />
              </div>
              <div className="form-check form-check-inline">
                <Input type="radio" id="exampleCustomRadio3" label="3" disabled />
              </div>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">General Select</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Select">
            <Form className="mt-3">
              <FormGroup>
                <Label for="exampleCustomSelect">Select Value</Label>
                <Input type="select">
                  <option value="">Select</option>
                  <option>Value 1</option>
                  <option>Value 2</option>
                  <option>Value 3</option>
                  <option>Value 4</option>
                  <option>Value 5</option>
                </Input>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Form Select"
            subtitle={
              <p>
                To use add <code>.form-select</code> class
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Label for="exampleCustomSelect">Select Value</Label>
                <Input type="select" className="form-select">
                  <option value="">Select</option>
                  <option>Value 1</option>
                  <option>Value 2</option>
                  <option>Value 3</option>
                  <option>Value 4</option>
                  <option>Value 5</option>
                </Input>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Multiple Select">
            <Form>
              <FormGroup>
                <Input type="select" multiple>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Select With Addons">
            <Form>
              <InputGroup>
                <InputGroupText>Options</InputGroupText>
                <Input type="select" className="custom-select">
                  <option value="">Select</option>
                  <option>Value 1</option>
                  <option>Value 2</option>
                  <option>Value 3</option>
                  <option>Value 4</option>
                  <option>Value 5</option>
                </Input>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Select With Buttons">
            <Form>
              <InputGroup>
                <Input type="select" className="custom-select">
                  <option value="">Select</option>
                  <option>Value 1</option>
                  <option>Value 2</option>
                  <option>Value 3</option>
                  <option>Value 4</option>
                  <option>Value 5</option>
                </Input>
                <Button color="primary">Button</Button>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">File Upload</h4>
      <Row>
        <Col sm="12" md="6">
          <ComponentCard
            title="Default File Upload"
            subtitle={
              <p>
                To use add <code>type=&quot;file&quot;</code> to the input
              </p>
            }
          >
            <Form>
              <FormGroup>
                <Input type="file" name="file" id="exampleFile" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard
            title="Custom File Upload"
            subtitle={
              <p>
                To use add <code>.custom-file-input</code> class to the input
              </p>
            }
          >
            <Form>
              <FormGroup className="mb-1">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" id="customFile1" />
                </div>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Custom File Upload with Button Left">
            <Form>
              <InputGroup>
                <Button color="outline-secondary">Button</Button>
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" id="customFile2" />
                </div>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Custom File Upload with Button Right">
            <Form>
              <InputGroup>
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" id="customFile3" />
                </div>
                <Button color="outline-secondary">Button</Button>
              </InputGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Different Style in Helper Text</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Left Helper Text"
            subtitle={
              <p>
                To use add <code>float-left</code> class to the text
              </p>
            }
          >
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" />
                <small className="badge badge-default badge-info text-white float-left">
                  Helper Text
                </small>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Center Helper Text"
            subtitle={
              <p>
                To use add <code>text-center</code> class to the text
              </p>
            }
          >
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" />
                <p className="text-center mb-0">
                  <small className="badge badge-default badge-warning text-white">
                    Helper Text
                  </small>
                </p>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard
            title="Right Helper Text"
            subtitle={
              <p>
                To use add <code>float-right</code> class to the text
              </p>
            }
          >
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" />
                <small className="badge badge-default badge-danger float-right">Helper Text</small>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Inline Helper Text">
            <Form>
              <Row>
                <Col md="8">
                  <Input type="text" placeholder="Helper Text" />
                </Col>
                <Col md="4">
                  <FormText className="text-muted">Helper Text</FormText>
                </Col>
              </Row>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Inline Helper Text With Color">
            <Form>
              <Row>
                <Col md="8">
                  <Input type="text" placeholder="Helper Text" />
                </Col>
                <Col md="4">
                  <small className="badge bg-success text-white">
                    Helper Text
                  </small>
                </Col>
              </Row>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Input With Validaton</h4>
      <Row>
        <Col sm="12" md="6">
          <ComponentCard title="Input With Success">
            <Form>
              <FormGroup>
                <Label>Input with success</Label>
                <Input valid />
                <FormFeedback valid>Sweet! that name is available</FormFeedback>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Input With Danger">
            <Form>
              <FormGroup>
                <Label>Input with Danger</Label>
                <Input invalid />
                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Input With Success">
            <Form>
              <FormGroup>
                <Label>Input with success</Label>
                <Input valid />
                <FormFeedback valid tooltip>
                  Sweet! that name is available
                </FormFeedback>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6">
          <ComponentCard title="Input With Danger">
            <Form>
              <FormGroup>
                <Label>Input with Danger</Label>
                <Input invalid />
                <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Input Text Styles</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Text Bold">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" className="font-weight-bold" placeholder="Bold Text" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Text Normal">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" className="font-weight-normal" placeholder="Normal Text" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Text Light">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" className="font-weight-light" placeholder="Light Text" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Text Italic">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" className="font-italic" placeholder="Italic Text" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Text Lowercase">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" className="text-lowercase" placeholder="Lowercase" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Input Text Uppercase">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" className="text-uppercase" placeholder="Uppercase" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <h4 className="mt-5 mb-4">Input Sizing</h4>
      <Row>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Small Input">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" placeholder="Small" bsSize="sm" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Normal Input">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" placeholder="Normal" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        <Col sm="12" md="6" lg="4">
          <ComponentCard title="Large Input">
            <Form>
              <FormGroup className="mb-0">
                <Input type="text" placeholder="Large" bsSize="lg" />
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default FormInputs;
