/* eslint-disable */
import React, { useState } from 'react';
import {
  Button,
  Label,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import postStartRecovery from '../../services/postStartRecovery';
import Swal from 'sweetalert2'

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false)

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email no es valido').required('Email es requerido'),
  });

  return (
    <div className="loginBox">
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <Card>
              <CardBody className="p-4 m-1">

                <div className="text-center">
                  <img src="/celuparts-transparent-2.png"
                    width="200" alt="logo" />
                  <h5 className="mt-4 mb-5 pb-1">Escribe tu correo y se te enviará las instrucciones!</h5>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    // alert(fields.email)
                    setLoadingButton(true)
                    postStartRecovery(fields.email)
                      .then(response => {
                        if (response.status == 200) {
                          setLoadingButton(false)
                          console.log("start recovery response", response)
                          Swal.fire({
                            icon: 'success',
                            title: 'Exito!',
                            text: 'Revisa tu correo!'
                          })
                            .then(response => {
                              navigate('/');
                            })
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'El correo que ingresaste no existe'
                          })
                            .then(response => {
                              setLoadingButton(false)
                            })
                        }
                      })
                      .catch(error => {
                        setLoadingButton(false)
                        console.log("error ", error)
                      })
                  }}
                  render={({ errors, touched }) => (
                    <Form className="mt-3">
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${errors.email && touched.email ? ' is-invalid' : ''
                            }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        {
                          loadingButton ? (
                            <div className="d-flex justify-content-center mb-5">
                              <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className='ms-2'>Cargando...</span>
                              </button>
                            </div>
                          )
                            :
                            (
                              <div className="text-center pt-1 mb-3 pb-1">
                                <Button type="submit" color="primary" className="me-2">
                                  Solicitar
                                </Button>
                              </div>
                            )
                        }
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecoverPassword;
