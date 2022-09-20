/* eslint-disable */
import React, { useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Label, FormGroup, Row, Col } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import authRegister from '../../services/authRegister';
import authLogin from '../../services/authLogin';
import AuthContext from '../../context/AuthProvider';

const RegisterFormik = () => {
  const initialValues = {
    idNumber: '',
    UserName: '',
    LastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    idNumber: Yup.string().required('Número de identificación requerido'),
    UserName: Yup.string().required('Nombre requerido'),
    LastName: Yup.string().required('Apellidos requerido'),
    phone: Yup.string().required('Número requerido'),
    email: Yup.string().email('Email no valido').required('Email requerido'),
    password: Yup.string()
      .min(5, 'La contraseña debe tener al menos 5 caracteres')
      .max(10, 'La contraseña debe tener menos de 10 caracteres')
      .required('Contraseña requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Se requiere confirmar contraseña'),
    acceptTerms: Yup.bool().oneOf([true], 'Aceptar los términos y condiciones es obligatorio'),
  });


  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate()


  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Swal.fire({
        title: 'Condiciones de servicio.',
        text: 'Las condiciones de uso y servicio de Celuparts incluyen el uso y tratamiento de datos requeridos para ofrecer el servicio.',
        input: 'checkbox',
        inputPlaceholder: 'Acepto las condiciones de servicio y política de privacidad de Celuparts.'
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value) {
                authRegister({
                    idType: e.target.elements.idType.value,
                    idNumber: e.target.elements.idNumber.value,
                    names: e.target.elements.names.value,
                    surnames: e.target.elements.surnames.value,
                    phone: e.target.elements.phone.value,
                    alternativePhone: e.target.elements.alternativePhone.value,
                    email: e.target.elements.email.value,
                    password: e.target.elements.password.value,
                    accountStatus: "Habilitada"
                })
                    .then(data => {
                        setLoading(false);
                        console.log(data.status)
                        if(data.status === 200) {
                            Swal.fire({ 
                                icon: 'success',
                                text: 'Registro exitoso!' 
                            })
                            .then(() => {
                                // console.log("respuesta del ok del alert", response)
                                // Una vez el registro sea exitoso, ingresar al usuario dentro del
                                // sistema
                                authLogin({
                                  email: e.target.elements.email.value,
                                  password: e.target.elements.password.value
                                })
                                    .then(response2 => {
                                        console.log("Response from sign in:", response2);
                                        if (response2 !== undefined) {
                                            if (response2 === "Account disabled") {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Oops...',
                                                    text: 'Cuenta inhabilitada, contacte con el número 3xx-xxx-xxxx para soporte técnico'
                                                })
                                            } else {
                                                const user = jwtDecode(response2)
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
                            })
                        } else {
                            Swal.fire({ 
                                icon: 'error',
                                text: 'El email que estas intentando ingresar ya esta registrado' 
                            })
                        }
                    }).catch(error => {
                        console.log("ERROR", error);
                        setLoading(false);
                    });
            } else {
                Swal.fire({ icon: 'error', text: "Debes aceptar los términos y condiciones para registrarte en el sistema." });
                setLoading(false);
            }
        } else {
            console.log(`modal was dismissed by ${result.dismiss}`)
        }
    })
}

  
  return (
    
    <section className="h-100 gradient-form bg-white">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xxl-10">
        <div className='mb-sm-5 mb-2 mt-4 mt-lg-2 d-flex justify-content-center' style={{position: 'relative',zIndex:'2'}}>
              <img src="/celuparts-transparent-2.png" alt="celuparts-logo" className="right-card-image w-25"></img>
          </div>
          <div className="card rounded-3 text-black shadow-lg">
            <div className="row g-0 ">

              <div className="col-lg-5 d-flex align-items-center gradient-custom-2">
                <div className="px-0">
                  <img className='d-none d-lg-block float-left rounded-start' style={{ textDecoration: 'none' }} src="https://images.pexels.com/photos/8490073/pexels-photo-8490073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height="600" alt="logo" />
                </div>
              </div>

              <div className="col-lg-7">
                <div className="card-body p-md-5 mx-md-4 ">
 
                <h4 className="mb-0 fw-bold text-center">Regístrate</h4>
                <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">¿Ya tienes una cuenta?</p>
                  <button type="button" className="btn btn-outline-primary"><Link style={{ textDecoration: 'none' }} to="/auth/loginformik">Iniciar</Link></button>
                </div>

                 {/* <small className="pb-4 d-block">
                 ¿Ya tienes una cuenta? <Link to="/auth/loginformik">Iniciar</Link>
                 </small> */}
                 <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    // alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                  }}
                  render={({ errors, touched }) => (
                    <Form onSubmit={ handleSubmit }>

                      <Row>
                        <Col lg="6">
                          <Label htmlFor="idType">Tipo de documento</Label>
                          <div >
                            <select id="idType" className="form-select mb-3">
                              <option value="CC">Cédula de ciudadania</option>
                              <option value="TI">Tarjeta de identidad</option>
                              <option value="CE">Cédula de extranjeria</option>
                              <option value="NIP">Número de identificación tributaria</option>
                            </select>
                          </div>
                        </Col>

                        <Col lg="6">
                        <FormGroup >
                          <Label htmlFor="idNumber">Número de identificación</Label>
                          <Field
                            id="idNumber"
                            name="idNumber"
                            type="number"
                            className={`form-control ${
                              errors.idNumber && touched.idNumber ? ' is-invalid' : ''
                            }`}
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
                              id="names"
                              name="UserName"
                              type="text"
                              placeholder="Nombres"
                              className={`form-control ${
                                errors.UserName && touched.UserName ? ' is-invalid' : ''
                              }`}
                            />
                            <ErrorMessage
                              name="UserName"
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
                            name="LastName"
                            type="text"
                            placeholder="Apellidos"
                            className={`form-control ${
                              errors.LastName && touched.LastName ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="LastName"
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
                          // placeholder="Email"
                          // value={ email }
                          // onChange={ e => setEmail(e.target.value) }
                          className={`form-control ${
                            errors.email && touched.email ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
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
                            className={`form-control ${
                              errors.phone && touched.phone ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          {/* <Label htmlFor="numberAlternative">Número de teléfono</Label> */}
                          <Field
                            id="alternativePhone"
                            name="numberAlternative"
                            type="tel"
                            placeholder="Teléfono opcional"
                            className="form-control"
                          />
                        </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <FormGroup>
                          {/* <Label htmlFor="password">Contraseña*</Label> */}
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            // value={password}
                            // onChange={ e => setPassword(e.target.value) }
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
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          {/* <Label htmlFor="confirmPassword">Confirmar contraseña*</Label> */}
                          <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirmar contraseña"
                            className={`form-control${
                              errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup className='d-flex align-items-center justify-content-center pt-5'>
                        <Button className="btn btn-outline-secondary me-2" type="reset" color="">
                          Limpiar
                        </Button>
                        {/* <Button type="submit" color="primary" className="">
                          Registrate
                        </Button> */}
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
                />
            
                  

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    
    
    
    
    
    
    
    
    
    
    
    
    // <div className="loginBox">
    //   <LeftBg className="position-absolute left bottom-0" />
    //   <RightBg className="position-absolute end-0 top" />
    //   <Container fluid className="h-100">
    //     <Row className="justify-content-center align-items-center h-100">
    //       <Col sm="12" md="6" className="">
    //       <div className='mb-2 mt-4 mt-lg-2  d-flex justify-content-center' style={{position: 'relative',zIndex:'2'}}>
    //           <img src="/celuparts-transparent-2.png" alt="celuparts-logo" className="right-card-image w w-50"></img>
    //       </div>
    //         <Card>
    //           <CardBody className="p-3 m-1">
    //             <h4 className="mb-0 fw-bold">Regístrate</h4>
    //             <small className="pb-4 d-block">
    //             ¿Ya tienes una cuenta? <Link to="/auth/loginformik">Iniciar</Link>
    //             </small>
    //             <Formik
    //               initialValues={initialValues}
    //               validationSchema={validationSchema}
    //               onSubmit={(fields) => {
    //                 // eslint-disable-next-line no-alert
    //                 alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
    //               }}
    //               render={({ errors, touched }) => (
    //                 <Form>

    //                   <Row>
    //                     <Col lg="6">
    //                       <Label htmlFor="idType">Tipo de documento*</Label>
    //                       <div >
    //                         <select className="form-select mb-3">
    //                           <option value="CC">Cédula de ciudadania</option>
    //                           <option value="TI">Tarjeta de identidad</option>
    //                           <option value="CE">Cédula de extranjeria</option>
    //                           <option value="NIP">Número de identificación tributaria</option>
    //                         </select>
    //                       </div>
    //                     </Col>

    //                     <Col lg="6">
    //                     <FormGroup>
    //                       <Label htmlFor="idNumber">Número de identificación*</Label>
    //                       <Field
    //                         id="numberId"
    //                         name="idNumber"
    //                         type="number"
    //                         className={`form-control ${
    //                           errors.idNumber && touched.idNumber ? ' is-invalid' : ''
    //                         }`}
    //                       />
    //                       <ErrorMessage
    //                         name="UserName"
    //                         component="div"
    //                         className="invalid-feedback"
    //                       />
    //                     </FormGroup>
    //                     </Col>
    //                   </Row>

                      
    //                   <Row>
                        
    //                     <Col md="6">
    //                       <FormGroup>
    //                         <Label htmlFor="firstName">Nombres*</Label>
    //                         <Field
    //                           name="UserName"
    //                           type="text"
    //                           className={`form-control ${
    //                             errors.UserName && touched.UserName ? ' is-invalid' : ''
    //                           }`}
    //                         />
    //                         <ErrorMessage
    //                           name="UserName"
    //                           component="div"
    //                           className="invalid-feedback"
    //                         />
    //                       </FormGroup>
    //                     </Col>
    //                     <Col md="6">
    //                       <FormGroup>
    //                       <Label htmlFor="LastName">Apellidos*</Label>
    //                       <Field
    //                         name="LastName"
    //                         type="text"
    //                         className={`form-control ${
    //                           errors.LastName && touched.LastName ? ' is-invalid' : ''
    //                         }`}
    //                       />
    //                       <ErrorMessage
    //                         name="LastName"
    //                         component="div"
    //                         className="invalid-feedback"
    //                       />
    //                       </FormGroup>
    //                     </Col>
    //                 </Row>

    //                   <FormGroup>
    //                     <Label htmlFor="email">Email*</Label>
    //                     <Field
    //                       name="email"
    //                       type="text"
    //                       placeholder="example@celuparts.com"
    //                       className={`form-control ${
    //                         errors.email && touched.email ? ' is-invalid' : ''
    //                       }`}
    //                     />
    //                     <ErrorMessage name="email" component="div" className="invalid-feedback" />
    //                   </FormGroup>


    //                   <Row>
    //                     <Col md="6">
    //                     <FormGroup>
    //                       <Label htmlFor="number">Número de teléfono*</Label>
    //                       <Field
    //                         name="phone"
    //                         type="tel"
    //                         className={`form-control ${
    //                           errors.phone && touched.phone ? ' is-invalid' : ''
    //                         }`}
    //                       />
    //                       <ErrorMessage name="phone" component="div" className="invalid-feedback" />
    //                     </FormGroup>
    //                     </Col>
    //                     <Col md="6">
    //                     <FormGroup>
    //                       <Label htmlFor="numberAlternative">Número de teléfono</Label>
    //                       <Field
    //                         name="numberAlternative"
    //                         type="tel"
    //                         placeholder="Alternativo opcional"
    //                         className="form-control"
    //                       />
    //                     </FormGroup>
    //                     </Col>
    //                   </Row>

    //                   <Row>
    //                     <Col md="6">
    //                     <FormGroup>
    //                       <Label htmlFor="password">Contraseña*</Label>
    //                       <Field
    //                         name="password"
    //                         type="password"
    //                         placeholder="********"
    //                         className={`form-control${
    //                           errors.password && touched.password ? ' is-invalid' : ''
    //                         }`}
    //                       />
    //                       <ErrorMessage
    //                         name="password"
    //                         component="div"
    //                         className="invalid-feedback"
    //                       />
    //                     </FormGroup>
    //                     </Col>
    //                     <Col md="6">
    //                     <FormGroup>
    //                       <Label htmlFor="confirmPassword">confirmar contraseña*</Label>
    //                       <Field
    //                         name="confirmPassword"
    //                         type="password"
    //                         placeholder="********"
    //                         className={`form-control${
    //                           errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
    //                         }`}
    //                       />
    //                       <ErrorMessage
    //                         name="confirmPassword"
    //                         component="div"
    //                         className="invalid-feedback"
    //                       />
    //                     </FormGroup>
    //                     </Col>
    //                   </Row>
    //                   <FormGroup inline className="form-check">
    //                     <Field
    //                       type="checkbox"
    //                       name="acceptTerms"
    //                       id="acceptTerms"
    //                       className={`form-check-input ${
    //                         errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
    //                       }`}
    //                     />
    //                     <Label htmlFor="acceptTerms" className="form-check-label">
    //                       Aceptar Términos y Condiciones
    //                     </Label>
    //                     <ErrorMessage
    //                       name="acceptTerms"
    //                       component="div"
    //                       className="invalid-feedback"
    //                     />
    //                   </FormGroup>
    //                   <FormGroup>
    //                     <Button type="submit" color="primary" className="me-2">
    //                       Registrate
    //                     </Button>
    //                     <Button type="reset" color="secondary">
    //                       Limpiar
    //                     </Button>
    //                   </FormGroup>
    //                 </Form>
    //               )}
    //             />
    //           </CardBody>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
  );
};

export default RegisterFormik;
