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
                          navigate('/home/dashboards/dashboard1');
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
      <Container fluid className="h-100 border">

      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-8">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                      <div className="text-center">
                        <img src="/celuparts-transparent-2.png"
                           width="200" alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Tu móvil en nuestras manos</h4>
                      </div>

                      <form>
                        <p>Inicia sesión con tu cuenta</p>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example11">Email</label>
                          <input type="email" id="form2Example11" className="form-control"
                            placeholder="ejemplo@celuparts.com" />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example22" >Contraseña</label>
                          <input type="password" id="form2Example22" placeholder='********' className="form-control" />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Iniciar</button>
                          {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">¿No tienes cuenta?</p>
                          <button type="button" className="btn btn-outline-danger">Crear nueva</button>
                        </div>

                      </form>

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="px-3 mx-md-4">
                      <img className='d-none d-lg-block' src="https://images.pexels.com/photos/8490071/pexels-photo-8490071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height="650" alt="logo" />
                      {/* <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        {/* <Row className="justify-content-center align-items-center h-100">
          <Col lg="6" className="loginContainer">
          <div className='mb-3 d-flex justify-content-center '>
              <img src="/celuparts-transparent-2.png" alt="celuparts-logo" className="right-card-image w-75"></img>
          </div>
            <Card>
              <CardBody className="p-4 m-1">
                <h4 className="mb-0 fw-bold">Ingresar</h4>
                <small className="pb-4 d-block">
                ¿No tienes cuenta? <Link to="/registerformik">!Registrate!</Link>
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
                      {/* <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
                          Recordarme
                        </Label>
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
          <Col lg="6" className="loginContainer">
            <Card>
              <CardBody className="p-4 m-1">
                <h4 className="mb-0 fw-bold">Ingresar con</h4>
                <small className="pb-4 d-block">Otras opciones</small>
                <FormGroup>
                  <Button type="submit" color="primary" className="me-2 center">
                    Google
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Button type="submit" color="primary" className="me-2 center">
                    Facebook
                  </Button>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default LoginFormik;
