/* eslint-disable */
import React from 'react';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

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


  // const { setAuth } = useContext(AuthContext);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const navigate = useNavigate();

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col sm="12" md="6" className="">
          <div className='mb-2 mt-4 mt-lg-2  d-flex justify-content-center' style={{position: 'relative',zIndex:'2'}}>
              <img src="/celuparts-transparent-2.png" alt="celuparts-logo" className="right-card-image w w-50"></img>
          </div>
            <Card>
              <CardBody className="p-3 m-1">
                <h4 className="mb-0 fw-bold">Regístrate</h4>
                <small className="pb-4 d-block">
                ¿Ya tienes una cuenta? <Link to="/auth/loginformik">Iniciar</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                  }}
                  render={({ errors, touched }) => (
                    <Form>

                      <Row>
                        <Col lg="6">
                          <Label htmlFor="idType">Tipo de documento*</Label>
                          <div >
                            <select className="form-select mb-3">
                              <option value="CC">Cédula de ciudadania</option>
                              <option value="TI">Tarjeta de identidad</option>
                              <option value="CE">Cédula de extranjeria</option>
                              <option value="NIP">Número de identificación tributaria</option>
                            </select>
                          </div>
                        </Col>

                        <Col lg="6">
                        <FormGroup>
                          <Label htmlFor="idNumber">Número de identificación*</Label>
                          <Field
                            id="numberId"
                            name="idNumber"
                            type="number"
                            className={`form-control ${
                              errors.idNumber && touched.idNumber ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="UserName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        </Col>
                      </Row>

                      
                      <Row>
                        
                        <Col md="6">
                          <FormGroup>
                            <Label htmlFor="firstName">Nombres*</Label>
                            <Field
                              name="UserName"
                              type="text"
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
                          <Label htmlFor="LastName">Apellidos*</Label>
                          <Field
                            name="LastName"
                            type="text"
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
                        <Label htmlFor="email">Email*</Label>
                        <Field
                          name="email"
                          type="text"
                          placeholder="example@celuparts.com"
                          className={`form-control ${
                            errors.email && touched.email ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>


                      <Row>
                        <Col md="6">
                        <FormGroup>
                          <Label htmlFor="number">Número de teléfono*</Label>
                          <Field
                            name="phone"
                            type="tel"
                            className={`form-control ${
                              errors.phone && touched.phone ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          <Label htmlFor="numberAlternative">Número de teléfono</Label>
                          <Field
                            name="numberAlternative"
                            type="tel"
                            placeholder="Alternativo opcional"
                            className="form-control"
                          />
                        </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <FormGroup>
                          <Label htmlFor="password">Contraseña*</Label>
                          <Field
                            name="password"
                            type="password"
                            placeholder="********"
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
                          <Label htmlFor="confirmPassword">confirmar contraseña*</Label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="********"
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
                      <FormGroup inline className="form-check">
                        <Field
                          type="checkbox"
                          name="acceptTerms"
                          id="acceptTerms"
                          className={`form-check-input ${
                            errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
                          }`}
                        />
                        <Label htmlFor="acceptTerms" className="form-check-label">
                          Aceptar Términos y Condiciones
                        </Label>
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Registrate
                        </Button>
                        <Button type="reset" color="secondary">
                          Limpiar
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

export default RegisterFormik;
