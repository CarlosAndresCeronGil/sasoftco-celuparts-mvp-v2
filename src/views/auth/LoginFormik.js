/* eslint-disable */
import React, { useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import AuthContext from '../../context/AuthProvider';
import authLogin from '../../services/authLogin';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const LoginFormik = () => {

  const navigate = useNavigate();

  const initialValues = {
    emailData: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    emailData: Yup.string().email('Email is invalid').required('Email requerido'),
    password: Yup.string()
      .min(5, 'La contraseña debe tener al menos 6 caracteres')
      .max(10, 'La contraseña debe tener menos de 10 caracteres')
      .required('Contraseña requerida'),
  });


  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      try {
          authLogin({
              email,
              password
          })
              .then(response => {
                  console.log("Response from sign in:", response);
                  if (response !== undefined) {
                      if (response === "Account disabled") {
                          Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Cuenta inhabilitada, contacte con el número 3xx-xxx-xxxx para soporte técnico'
                          })
                      } else {
                          const user = jwtDecode(response)
                          console.log("user", user);
                          localStorage.setItem('user', JSON.stringify(user));
                          setAuth(true);
                          navigate('/home');
                      }
                  }
              })
              .catch(error => {
                  console.log("error:", error);
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Usuario o contraseña incorrecto!'
                  })
              });

      } catch (error) {
          console.log(error);
      }
  }

  



  return (
    <div className="loginBox">
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
          <div className='mb-3 d-flex justify-content-center '>
              <img src="/celuparts-transparent-2.png" alt="celuparts-logo" className="right-card-image w-75"></img>
          </div>
            <Card>
              <CardBody className="p-4 m-1">
                <h4 className="mb-0 fw-bold">Ingresar</h4>
                <small className="pb-4 d-block">
                ¿No tienes cuenta? <Link to="/auth/registerformik">!Registrate!</Link>
                </small>
                <Formik
                  // initialValues={initialValues}
                  // validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    navigate('/');
                  }}
                  render={({ errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label htmlFor="emailData">Email</Label>
                        <Field
                          id="emailData"
                          name="emailData"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={ email }
                          placeholder="Ingrese su email"
                          className={`form-control${
                            errors.emailData && touched.emailData ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="emailData" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Contraseña</Label>
                        <Field
                          id="examplePassword"
                          name="password"
                          type="password"
                          placeholder="Ingrese su contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
                          Recordarme
                        </Label>
                        {/* <Link className="ms-auto text-decoration-none" to="/auth/forgotPwd">
                          <small>Forgot Pwd?</small>
                        </Link> */}
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2 center">
                          Iniciar
                        </Button>
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

export default LoginFormik;
