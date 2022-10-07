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
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ChangePassword = () => {
  const navigate = useNavigate();
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

                <div className="text-center">
                  <img src="/celuparts-transparent-2.png"
                    width="200" alt="logo" />
                  <h5 className="mt-4 mb-5 pb-1">Tu contraseña será restablecida!</h5>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    navigate('/');
                  }}
                  render={({ errors, touched }) => (
                    <Form className="mt-3">
                        
                        <InputGroup className='mb-4'>
                        <Field
                            id="password"
                            name="password"
                            type={passwordType}
                            placeholder="Nueva contraseña"
                            // value={password}
                            // onChange={ e => setPassword(e.target.value) }
                            className={`form-control${errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                            required
                        />
                        <Button color='primary' type='button' onClick={togglePassword}>
                            { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                        </Button>
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                        />
                        </InputGroup>
                        <InputGroup>
                        <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            type={passwordType}
                            placeholder="Confirmar contraseña"
                            className={`form-control${errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                            }`}
                            required
                        />
                        <Button color='primary' type='button' onClick={togglePassword}>
                            { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                        </Button>
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="invalid-feedback"
                        />
                        </InputGroup>
                      <FormGroup>
                        <div className="text-center pt-4 mb-3 pb-1">
                          <Button type="submit" color="primary" className="me-2">
                            Cambiar contraseña
                          </Button>
                        </div>
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

export default ChangePassword;
