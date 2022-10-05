/* eslint-disable */
/* eslint-disable */
import React from 'react';
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

const ChangePassword = () => {
  const navigate = useNavigate();

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
                        <div className="text-center pt-1 mb-3 pb-1">
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
