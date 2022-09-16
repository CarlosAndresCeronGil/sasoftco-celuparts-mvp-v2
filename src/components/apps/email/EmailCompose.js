import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const EmailCompose = () => {
  const [composeModal, setComposeModal] = useState(false);

  const toggle = () => {
    setComposeModal(!composeModal);
  };

  return (
    <>
      <Button color="danger" onClick={toggle} block>
        Compose
      </Button>
      <Modal isOpen={composeModal} size="lg">
        <ModalHeader toggle={toggle}>Compose New Message</ModalHeader>
        <ModalBody>
          <Form>
            <div className="form-body">
              <Row>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="to">To</Label>
                    <Input type="text" id="to" name="to" />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="cc">CC</Label>
                    <Input type="text" id="cc" name="cc" />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input type="text" id="subject" name="subject" />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="msg">Email Message</Label>
                    <Input type="textarea" name="msg" id="msg" />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label>Attachment</Label>
                <Input type="file" className="form-control-file" id="projectinput8" />
              </FormGroup>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Send
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EmailCompose;
