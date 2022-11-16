/* eslint-disable */
import React, { useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Label, FormGroup, Row, Col, Input, InputGroupText, InputGroup } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import validator from 'validator';

import authRegister from '../../services/authRegister';
import authLogin from '../../services/authLogin';
import AuthContext from '../../context/AuthProvider';
import postValidateUniqueEmailAndId from '../../services/postValidateUniqueEmailAndId';

const RegisterFormik = () => {

  const [passwordType, setPasswordType] = useState('password');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [email, setEmail] = useState('');

  // console.log(password);

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };

  const initialValues = {
    idType: 'CC',
    idNumber: '',
    userName: '',
    lastName: '',
    phone: '',
    alternativePhone: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    idNumber: Yup.string()
      .min(7, "El numero de identificación debe tener mínimo 7 caracteres")
      .max(10, "El numero de identificación debe tener máximo 10 caracteres")
      .required('Número de identificación requerido'),
    userName: Yup.string().required('Nombre requerido'),
    lastName: Yup.string().required('Apellidos requerido'),
    phone: Yup.string().required('Número requerido'),
    email: Yup.string().email('Email no valido').required('Email requerido'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(15, 'La contraseña debe tener menos de 15 caracteres')
      .matches(/^(?=.*[!@#%&])/, "La contraseña debe tener al menos un caracter especial, ejemplo: !@#%&")
      .required('Contraseña requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Se requiere confirmar contraseña'),
    // acceptTerms: Yup.bool().oneOf([true], 'Aceptar los términos y condiciones es obligatorio'),
  });


  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = (fields) => {
    // console.log(fields)

    const formData = new FormData();
    formData.append("email", fields.email)
    formData.append("id", fields.idNumber)

    setLoading(true);
    postValidateUniqueEmailAndId(formData)
      .then(response => {
        // console.log("Respuesta validate:", response)
        // console.log(response.status)
        if (response.status != 404) {
          Swal.fire({
            title: 'Condiciones de servicio.',
            text: 'Las condiciones de uso y servicio de Celuparts incluyen el uso y tratamiento de datos requeridos para ofrecer el servicio.',
            input: 'checkbox',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            inputPlaceholder: 'Acepto las condiciones de servicio y política de privacidad de Celuparts.'
          }).then((result) => {
            if (result.isConfirmed) {
              if (result.value) {
                authRegister({
                  idType: fields.idType,
                  idNumber: fields.idNumber,
                  names: fields.userName,
                  surnames: fields.lastName,
                  phone: fields.phone,
                  alternativePhone: fields.alternativePhone,
                  email: fields.email,
                  password: fields.password,
                  accountStatus: "Habilitada"
                })
                  .then(data => {
                    authLogin({
                      email: fields.email,
                      password: fields.password
                    })
                      .then(response2 => {
                        // console.log("Response from sign in:", response2);
                        if (response2 !== undefined) {
                          if (response2 === "Account disabled") {
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Cuenta inhabilitada, contacte con el número 315-808-0836 para soporte técnico'
                            })
                          } else {
                            const user = jwtDecode(response2)
                            // console.log("user", user);
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
                  })

              } else {
                Swal.fire({ icon: 'error', text: "Debes aceptar los términos y condiciones para registrarte en el sistema." });
                setLoading(false);
              }
            } else {
              setLoading(false)
            }
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: 'El email o número de identificación que estas intentando ingresar ya esta registrado'
          })
            .then(responseError => {
              setLoading(false)
            })
        }

      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
    // authRegister({
    //   idType: fields.idType,
    //   idNumber: fields.idNumber,
    //   names: fields.userName,
    //   surnames: fields.lastName,
    //   phone: fields.phone,
    //   alternativePhone: fields.alternativePhone,
    //   email: fields.email,
    //   password: fields.password,
    //   accountStatus: "Habilitada"
    // })
    //   .then(data => {
    //     setLoading(false);

    //     if (data.status !== 200) {
    //       Swal.fire({
    //         icon: 'error',
    //         text: 'El email o número de identificación que estas intentando ingresar ya esta registrado'
    //       })
    //       return;
    //     }

    //     Swal.fire({
    //       title: 'Condiciones de servicio.',
    //       text: 'Las condiciones de uso y servicio de Celuparts incluyen el uso y tratamiento de datos requeridos para ofrecer el servicio.',
    //       input: 'checkbox',
    //       inputPlaceholder: 'Acepto las condiciones de servicio y política de privacidad de Celuparts.'
    //     }).then((result) => {

    //       if (result.isConfirmed) {

    //         if (result.value) {

    //           authLogin({
    //             email: fields.email,
    //             password: fields.password
    //           })
    //             .then(response2 => {
    //               console.log("Response from sign in:", response2);
    //               if (response2 !== undefined) {
    //                 if (response2 === "Account disabled") {
    //                   Swal.fire({
    //                     icon: 'error',
    //                     title: 'Oops...',
    //                     text: 'Cuenta inhabilitada, contacte con el número 315-808-0836 para soporte técnico'
    //                   })
    //                 } else {
    //                   const user = jwtDecode(response2)
    //                   console.log("user", user);
    //                   localStorage.setItem('user', JSON.stringify(user));
    //                   setAuth(true);
    //                   navigate('/home/dashboards/dashboard1');
    //                 }
    //               }
    //             })
    //             .catch(error => {
    //               console.log("error:", error);
    //               Swal.fire({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 text: 'Usuario o contraseña incorrecto!'
    //               })
    //             });
    //         } else {
    //           Swal.fire({ icon: 'error', text: "Debes aceptar los términos y condiciones para registrarte en el sistema." });
    //           setLoading(false);
    //         }

    //       }
    //     })


    //   }).catch(error => {
    //     setLoading(false);
    //   });
  };



  return (

    <section className="h-100 gradient-form bg-white">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xxl-10">
            <div className='mb-sm-5 mb-2 mt-4 mt-lg-2 d-flex justify-content-center' style={{ position: 'relative', zIndex: '2' }}>
              <img src="/celuparts-transparent-2.png" alt="celuparts-logo" className="right-card-image w-25"></img>
            </div>
            <div className="card rounded-3 text-black shadow-lg">
              <div className="row g-0 ">

                <div className="col-lg-5 d-flex align-items-center gradient-custom-2">
                  <div className="px-0">
                    <img className='d-none d-lg-block float-left rounded-start' style={{ textDecoration: 'none' }} src="registrousuario.png" height="600" alt="logo" />
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="card-body p-md-5 mx-md-4 ">

                    <h4 className="mb-0 fw-bold text-center">Regístrate</h4>
                    <div className="d-flex align-items-center justify-content-center pb-4">
                      <p className="mb-0 me-2">¿Ya tienes una cuenta?</p>
                      <Link style={{ textDecoration: 'none' }} to="/">
                        <button type="button" className="btn btn-outline-primary">Iniciar</button>
                      </Link>
                    </div>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={(fields) => {
                        // eslint-disable-next-line no-alert
                        // alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                        handleSubmit(fields)
                      }}
                    >
                      {({ touched, errors }) => (
                        <Form>
                          <Row>
                            <Col lg="6">
                              <Label htmlFor="idType">Tipo de documento</Label>
                              <div >
                                <Field id="idType" className="form-select mb-3" name="idType" as="select">
                                  <option value="CC">Cédula de ciudadania</option>
                                  <option value="TI">Tarjeta de identidad</option>
                                  <option value="CE">Cédula de extranjeria</option>
                                  <option value="NIP">Número de identificación tributaria</option>
                                </Field>
                              </div>
                            </Col>

                            <Col lg="6">
                              <FormGroup >
                                <Label htmlFor="idNumber">Número de identificación</Label>
                                <Field
                                  id="idNumber"
                                  name="idNumber"
                                  type="number"
                                  className={`form-control ${errors.idNumber && touched.idNumber ? ' is-invalid' : ''
                                    }`}
                                  required
                                />
                                <ErrorMessage
                                  name="idNumber"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>

                            <Col md="6">
                              <FormGroup>
                                {/* <Label htmlFor="firstName">Nombres*</Label> */}
                                <Field
                                  id="userName"
                                  name="userName"
                                  type="text"
                                  placeholder="Nombres"
                                  className={`form-control ${errors.userName && touched.userName ? ' is-invalid' : ''
                                    }`}
                                  required
                                />
                                <ErrorMessage
                                  name="userName"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                {/* <Label htmlFor="LastName">Apellidos*</Label> */}
                                <Field
                                  id="surnames"
                                  name="lastName"
                                  type="text"
                                  placeholder="Apellidos"
                                  className={`form-control ${errors.lastName && touched.lastName ? ' is-invalid' : ''
                                    }`}
                                  required
                                />
                                <ErrorMessage
                                  name="lastName"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <FormGroup>
                            {/* <Label htmlFor="email">Email*</Label> */}
                            <Field
                              id="email"
                              name="email"
                              type="text"
                              // value={email}
                              // onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email"
                              // className="form-control"
                              className={`form-control ${errors.email && touched.email ? ' is-invalid' : ''
                                }`}
                              required
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>

                          <Row>
                            <Col md="6">
                              <FormGroup>
                                {/* <Label htmlFor="number">Número de teléfono*</Label> */}
                                <Field
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  placeholder="Número de teléfono"
                                  className={`form-control ${errors.phone && touched.phone ? ' is-invalid' : ''
                                    }`}
                                  required
                                />
                                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                {/* <Label htmlFor="numberAlternative">Número de teléfono</Label> */}
                                <Field
                                  id="alternativePhone"
                                  name="alternativePhone"
                                  type="tel"
                                  placeholder="Teléfono opcional"
                                  className="form-control"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md="6">
                              <InputGroup>
                                <Field
                                  id="password"
                                  name="password"
                                  // value={password}
                                  // onChange={(e) => setPassword(e.target.value)}
                                  type={passwordType}
                                  placeholder="Contraseña"
                                  // className="form-control"
                                  className={`form-control ${errors.password && touched.password ? ' is-invalid' : ''
                                    }`}
                                  required
                                />
                                <Button color='primary' type='button' onClick={togglePassword}>
                                  {passwordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                </Button>
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </InputGroup>
                            </Col>
                            <Col md="6">
                              <InputGroup>
                                <Field
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  // value={confirmPassword}
                                  // onChange={(e) => setConfirmPassword(e.target.value)}
                                  type={passwordType}
                                  placeholder="Confirmar contraseña"
                                  // className="form-control"
                                  className={`form-control ${errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                                    }`}
                                  required
                                />
                                <Button color='primary' type='button' onClick={togglePassword}>
                                  {passwordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                </Button>
                                <ErrorMessage
                                  name="confirmPassword"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </InputGroup>
                            </Col>
                          </Row>
                          <FormGroup className='d-flex align-items-center justify-content-center pt-5'>
                            <Button className="btn btn-outline-secondary me-2" type="reset" color="">
                              Limpiar
                            </Button>
                            {
                              loading ? (
                                <button className="btn btn-primary" type="button" disabled>
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                  <span className="sr-only">Cargando...</span>
                                </button>
                              ) : (
                                <Button type="submit" color="primary">
                                  Registrate
                                </Button>
                              )
                            }
                          </FormGroup>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterFormik;
