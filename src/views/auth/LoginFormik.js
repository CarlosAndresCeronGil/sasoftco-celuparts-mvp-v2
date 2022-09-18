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
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email no valido').required('Email requerido'),
    password: Yup.string()
      .min(5, 'La contraseña debe tener al menos 5 caracteres')
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

                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={(fields) => {
                            // eslint-disable-next-line no-alert
                            alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                            navigate('/');
                          }}
                          render={({ errors, touched }) => (
                          
                          <Form >
                            <p className='text-center'>Inicia sesión con tu cuenta</p>
                            <FormGroup className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email</label>
                                <Field 
                                  id="email" 
                                  type="email"
                                  name="email" 
                                  placeholder="ejemplo@celuparts.com"
                                  
                                  className={`form-control${
                                    errors.email && touched.email ? ' is-invalid' : ''
                                  }`}
                                  />    
                              <ErrorMessage name="user" component="div" className="invalid-feedback" />
                            </FormGroup>
  
                            <FormGroup className="form-outline mb-4">
                                <label className="form-label" htmlFor="password" >Contraseña</label>
                                <Field 
                                  id="password" 
                                  type="password"
                                  name="password" 
                                  placeholder='********'
                                  // onChange={(e) => setPassword(e.target.value)}
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
  
                            <div className="text-center pt-1 mb-5 pb-1">
                              <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Iniciar</button>
                              {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                            </div>
  
                            <div className="d-flex align-items-center justify-content-center pb-4">
                              <p className="mb-0 me-2">¿No tienes cuenta?</p>
                              
                              <button type="button" className="btn btn-outline-primary"><Link to="/auth/registerformik">!Registrate!</Link></button>
                            </div>
  
                          </Form>
                          )}
                        />


                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                      <div className="px-3 mx-md-4">
                        <img className='d-none d-lg-block' src="https://images.pexels.com/photos/8490071/pexels-photo-8490071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height="650" alt="logo" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </Container>
    </div>
  );
};

export default LoginFormik;