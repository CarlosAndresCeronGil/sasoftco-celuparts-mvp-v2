import React, { useState } from 'react';
import {
  Button,
  Modal,
  Input,
  Label,
  Form,
  FormGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const ModalComponent = () => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [modal6, setModal6] = useState(false);
  const [modal7, setModal7] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const toggle2 = () => {
    setModal2(!modal2);
  };

  const toggle3 = () => {
    setModal3(!modal3);
  };

  const toggle4 = () => {
    setModal4(!modal4);
  };

  const toggle5 = () => {
    setModal5(!modal5);
  };

  const toggle6 = () => {
    setModal6(!modal6);
  };

  const toggle7 = () => {
    setModal7(!modal7);
  };

  const toggleNested = () => {
    setCloseAll(true);
    setNestedModal(!nestedModal);
  };

  const toggleAll = () => {
    setCloseAll(true);
    setNestedModal(!nestedModal);
  };

  const changeBackdrop = (e) => {
    let { value } = e.target;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    setBackdrop(value);
  };

  const externalCloseBtn = (
    <Button
      className="close"
      style={{
        position: 'absolute',
        right: '15px',
        top: '15px',
      }}
      onClick={toggle.bind(null)}
    >
      &times;
    </Button>
  );

  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="6">
          <ComponentCard title="Modals">
            <Button color="primary" onClick={toggle.bind(null)}>
              Launch Modal
            </Button>
            <Modal isOpen={modal} toggle={toggle.bind(null)}>
              <ModalHeader toggle={toggle.bind(null)}>Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle.bind(null)}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={toggle.bind(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ComponentCard>
        </Col>

        <Col xs="12" md="6">
          <ComponentCard title="Nested Modals">
            <Button color="primary" onClick={toggle3.bind(null)}>
              Launch Modal w/ Nested Example
            </Button>
            <Modal isOpen={modal3} toggle={toggle3.bind(null)}>
              <ModalHeader toggle={toggle3.bind(null)}>Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
                <br />
                <Button color="success" onClick={toggleNested.bind(null)}>
                  Show Nested Modal
                </Button>
                <Modal
                  isOpen={nestedModal}
                  toggle={toggleNested.bind(null)}
                  onClosed={closeAll ? toggle : undefined}
                >
                  <ModalHeader>Nested Modal title</ModalHeader>
                  <ModalBody>Stuff and things</ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={toggleNested.bind(null)}>
                      Done
                    </Button>
                    <Button color="secondary" onClick={toggleAll.bind(null)}>
                      All Done
                    </Button>
                  </ModalFooter>
                </Modal>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle3.bind(null)}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={toggle3.bind(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Backdrop">
            <Form className="d-flex align-items-center" onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label for="backdrop">Backdrop value</Label>
                <Input
                  type="select"
                  name="backdrop"
                  id="backdrop"
                  onChange={(e) => changeBackdrop(e)}
                >
                  <option defaultValue="true">true</option>
                  <option defaultValue="false">false</option>
                  <option defaultValue="static">static</option>
                </Input>
              </FormGroup>
              <Button color="primary" className="ms-2" onClick={toggle2.bind(null)}>
                Launch Modal
              </Button>
            </Form>
            <Modal isOpen={modal2} toggle={toggle2.bind(null)} backdrop={backdrop}>
              <ModalHeader toggle={toggle2.bind(null)}>Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle2.bind(null)}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={toggle2.bind(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Modals with Custom Transition Timeouts">
            <Button color="primary" onClick={toggle4.bind(null)}>
              Launch Modal with Custom Transition Timeouts Example
            </Button>
            <Modal
              isOpen={modal4}
              modalTransition={{ timeout: 700 }}
              backdropTransition={{ timeout: 1300 }}
              toggle={toggle4.bind(null)}
            >
              <ModalHeader toggle={toggle4.bind(null)}>Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle4.bind(null)}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={toggle4.bind(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Launch Modal without Fade Effect Example">
            <Button color="primary" onClick={toggle5.bind(null)}>
              Launch Modal without Fade Effect Example
            </Button>
            <Modal isOpen={modal5} fade={false} toggle={toggle5.bind(null)}>
              <ModalHeader toggle={toggle5.bind(null)}>Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle5.bind(null)}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={toggle5.bind(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Modals with external button">
            <Button color="primary" onClick={toggle6.bind(null)}>
              Modals with external button
            </Button>
            <Modal isOpen={modal6} toggle={toggle6.bind(null)} external={externalCloseBtn}>
              <ModalHeader>Modal title</ModalHeader>
              <ModalBody>
                <b>Look at the top right of the page/viewport!</b>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle6.bind(null)}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={toggle6.bind(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Modals with custom close icon">
            <Button color="primary" onClick={toggle7.bind(null)}>
              Modals with custom close icon
            </Button>
            <Modal isOpen={modal7} toggle={toggle7.bind(null)}>
              <ModalHeader toggle={toggle7.bind(null)} charCode="Y">
                Modal title
              </ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle7.bind(null)}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={toggle7.bind(null)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ComponentCard>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}

      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default ModalComponent;
