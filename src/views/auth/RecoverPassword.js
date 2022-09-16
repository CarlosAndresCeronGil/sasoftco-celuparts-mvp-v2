import React from 'react';
import {
  Button,
  Label,
  FormGroup,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import img1 from '../../assets/images/users/user4.jpg';

const RecoverPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    uname: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    uname: Yup.string().required('Username is required'),
  });
  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <div className="text-center">
                  <img src={img1} alt="avatar" className="rounded-circle" width="95" />
                  <CardTitle tag="h4" className="mt-2">
                    John Deo
                  </CardTitle>
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
                    <Form className="mt-3">
                      <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Field
                          name="name"
                          type="text"
                          className={`form-control${
                            errors.uname && touched.uname ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="info" block className="me-2">
                          Reset
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

export default RecoverPassword;
