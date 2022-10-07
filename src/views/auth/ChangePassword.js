/* eslint-disable */
import React, { useState } from 'react';
import {
  Button,
  FormGroup,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  InputGroup,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import postRecoverPassword from '../../services/postRecoverPassword';
import Swal from 'sweetalert2'

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false)

  const params = useParams()
  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(15, 'La contraseña debe tener menos de 15 caracteres')
      .required('Contraseña requerida')
      .matches(/^(?=.*[!@#%&])/, "La contraseña debe tener al menos un caracter especial"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Se requiere confirmar contraseña'),
  });
  return (
    <div className="loginBox">
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <Card>
              <CardBody className="p-4 m-1">
                {/* token {params.token} */}
                <div className="text-center">
                  <img src="/celuparts-transparent-2.png"
                    width="200" alt="logo" />
                  <h5 className="mt-4 mb-5 pb-1">Tu contraseña será restablecida!</h5>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    setLoadingButton(true)
                    // alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    const formData = new FormData();
                    formData.append("newPassword", fields.password)
                    formData.append("token", params.token)
                    postRecoverPassword(formData)
                      .then(response => {
                        setLoadingButton(false)
                        console.log("respuesta recover password", response)
                        Swal.fire({
                          icon: 'success',
                          title: 'Exito!',
                          text: 'Contraseña actualizada!'
                        })
                          .then(response => {
                            navigate('/');
                          })
                      })
                      .catch(error => {
                        console.log("error del recover password", error)
                        setLoadingButton(false)
                      })
                    // navigate('/');
                  }}
                  render={({ errors, touched }) => (
                    <Form className="mt-3">

                      <FormGroup>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Nueva contraseña"
                          // value={password}
                          // onChange={ e => setPassword(e.target.value) }
                          className={`form-control${errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                          required
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirmar contraseña"
                          className={`form-control${errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                            }`}
                          required
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-feedback"
                        />
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
                          ) :
                            (
                              <div className="text-center pt-1 mb-3 pb-1">
                                <Button type="submit" color="primary" className="me-2">
                                  Cambiar contraseña
                                </Button>
                              </div>
                            )
                        }                      </FormGroup>
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

export default ChangePassword;
