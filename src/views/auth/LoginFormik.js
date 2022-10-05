/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import AuthContext from '../../context/AuthProvider';
import authLogin from '../../services/authLogin';
import { FormGroup, Container, InputGroupText, InputGroup, Button, Spinner } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const LoginFormik = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email no valido').required('Email requerido'),
    password: Yup.string()
      .min(5, 'Debe tener al menos 5 caracteres')
      .max(10, 'Debe tener menos de 10 caracteres')
      .required('Contraseña requerida'),
  });


  const { setAuth } = useContext(AuthContext);

  const handleCallbackResponse = (response) => {
    console.log("Google JWT", response.credential)
    var userObject = jwtDecode(response.credential)

    console.log(userObject)
  }

  // useEffect(function() {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: "180088451221-aq25n429q5jh3547bm29m2vceggdh5k6.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("SingInGoogle"),
  //     { theme: "outline", size: "large" }
  //   )
  // }, [])

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      authLogin({
        email: e.target.elements.email.value,
        password: e.target.elements.password.value
      })
        .then(response => {
          // console.log("Response from sign in:", response);
          if (response !== undefined) {
            if (response === "Account disabled") {
              setLoading(false);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cuenta inhabilitada, contacte con el número 3xx-xxx-xxxx para soporte técnico'
              })
            } else {
              const user = jwtDecode(response)
              // console.log("user", user);
              localStorage.setItem('user', JSON.stringify(user));
              setAuth(true);
              navigate('/home/dashboards/dashboard1');
            }
          }
        })
        .catch(error => {
          setLoading(false);
          console.log("error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrecto!'
          })
        });

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


  return (
    <div className="loginBox bg-white">
      <Container fluid className="h-100">
        <section className="h-100 gradient-form">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xxl-8 col-xl-9 col-lg-10">
                <div className="card rounded-3 text-black shadow-lg">
                  <div className="row g-0">
                    <div className="col-lg-6 d-flex align-items-center justify-content-center ">
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
                            // alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                            navigate('/');
                          }}
                          render={({ errors, touched }) => (

                            <Form onSubmit={handleSubmit} autoComplete="off">
                              <p className='text-center'>Inicia sesión con tu cuenta</p>
                              <FormGroup className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email</label>
                                <InputGroup>
                                  <InputGroupText>
                                    <i className="bi bi-person"></i>
                                  </InputGroupText>
                                  <Field
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="ejemplo@celuparts.com"
                                    className={`form-control${errors.email && touched.email ? ' is-invalid' : ''
                                      }`}
                                  />
                                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </InputGroup>
                              </FormGroup>

                              <FormGroup className="form-outline mb-4">
                                <label className="form-label" htmlFor="password" >Contraseña</label>
                                <InputGroup>
                                  <InputGroupText>
                                    <i className="bi bi-lock"></i>
                                  </InputGroupText>
                                  <Field
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder='********'
                                    // onChange={(e) => setPassword(e.target.value)}
                                    className={`form-control${errors.password && touched.password ? ' is-invalid' : ''
                                      }`}
                                  />
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </InputGroup>
                              </FormGroup>
                              {
                                loading ? (
                                  <div className="d-flex justify-content-center mb-5">
                                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                      <span className='ms-2'>Cargando...</span>
                                      </button>
                                    
                                  </div>
                                ) : (
                                  <>
                                    <div className="text-center pt-1 mb-3 pb-1">
                                      <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Iniciar sesión</button>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center mb-4">
                                      <Link to="/recoverpassword" className="text-muted">Olvidaste la contraseña?</Link>
                                    </div>
                                    
                                  </>
                                )
                              }

                              {/* <div className="d-inline-flex p-2 pt-1 mb-5 pb-1">
                                <div id='SingInGoogle' className="g-signin2" data-onsuccess="onSignIn"></div>
                              </div> */}

                              <div className="d-flex align-items-center justify-content-center pb-4">
                                <p className="mb-0 me-2">¿No tienes cuenta?</p>

                                <Link style={{ textDecoration: 'none' }} to="/registerformik">
                                  <button type="button" className="btn btn-outline-primary">!Registrate!</button>
                                </Link>
                              </div>

                            </Form>
                          )}
                        />

                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2 border">
                      <div className="img-fluid">
                        <img className='d-none d-lg-block rounded-end' src="https://images.pexels.com/photos/8490071/pexels-photo-8490071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height="650" alt="logo" />
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