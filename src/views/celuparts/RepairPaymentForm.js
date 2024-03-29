/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
  Card,
  Row,
  Col,
  CardTitle,
  CardSubtitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import putRepairPayment from "../../services/putRepairPayment";
import getSingleRepairPayment from "../../services/getSingleRepairPayment";
import putRequestStatus from "../../services/putRequestStatus";
import moment from "moment";

export default function RepairPaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState({ paymentMethod: "" });
  const [billPayment, setBillPayment] = useState({ billPayment: "" });
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [isPaymentDateNull, setIsPaymentDateNull] = useState({
    isPaymentDateNull: false
  });
  const [idRpeair, setIdRpeair] = useState({ idRpeair: 0 });

  const [loading, setLoading] = useState(false);
  const [loadingPut, setLoadingPut] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    function () {
      setLoading(true);
      getSingleRepairPayment({ id: location.state.idRepairPayment })
        .then(response => {
          setPaymentMethod({ paymentMethod: response.paymentMethod });
          setBillPayment({ billPayment: response.billPayment });
          setIdRpeair({ idRpeair: response.idRepair });
          if (response.paymentDate === null) {
            setIsPaymentDateNull({ isPaymentDateNull: true });
            setPaymentDate(new Date());
          } else {
            setIsPaymentDateNull({ isPaymentDateNull: false });
            setPaymentDate(new Date(response.paymentDate));
          }
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    },
    [location.state.idRepairPayment]
  );

  const handleSubmit = e => {
    e.preventDefault();
    setLoadingPut(true);
    const data = {
      idRepairPayment: parseInt(location.state.idRepairPayment),
      idRepair: idRpeair.idRpeair,
      paymentMethod: paymentMethod.paymentMethod,
      billPayment: billPayment.billPayment,
      paymentDate: moment(paymentDate).format("YYYY-MM-DD HH:mm:ss")

    };
    putRepairPayment(data)
      .then(response => {
        setLoadingPut(false);
      })
      .catch(error => {
        console.log(error);
        setLoadingPut(false);
      });

    putRequestStatus({
      idRequestStatus: location.state.idStatus,
      idRequest: location.state.idRequest,
      status: location.state.status,
      paymentStatus: "Pago"
    })
      .then(response => {
        setLoadingPut(false);
        navigate(-1);
      })
      .catch(error => {
        console.log(error);
        setLoadingPut(false);
      });
  };

  const handlePaymentMethodChange = e => {
    setPaymentMethod(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBillPaymentChange = e => {
    setBillPayment(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBackPage = e => {
    navigate(-1);
  };

  return loading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  ) : (
    <div>
      <Row>
        <Col>
          <Card className="container">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                  <i className="bi bi-eyeglasses"> </i>
                  <strong>Datos de la pago</strong>
                </CardSubtitle>
                <FormGroup>
                  <Label for="paymentMethod">Método de pago</Label>
                  <Input
                    type="select"
                    name="paymentMethod"
                    id="paymentMethod"
                    value={paymentMethod.paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option>Contraentrega</option>
                    <option>Transferencia bancaria</option>
                    <option value={"Datafono"}>Datáfono</option>
                  </Input>
                </FormGroup>
                {/* <FormGroup>
                                        <Label for="billPayment">Factura de pago</Label>
                                        <Input
                                            id="billPayment"
                                            name="billPayment"
                                            value={billPayment.billPayment}
                                            onChange={handleBillPaymentChange}
                                        />
                                    </FormGroup> */}
                {isPaymentDateNull.isPaymentDateNull ? (
                  <FormGroup>
                    <Label for="paymentDate">
                      Ingrese la fecha de realización del pago
                    </Label>
                    <DatePicker
                      id="paymentDate"
                      dateFormat="yyyy-MM-dd h:mm aa"
                      showTimeSelect
                      value={paymentDate}
                      selected={paymentDate}
                      onChange={date => setPaymentDate(date)}
                      timeFormat="HH:mm"
                      withPortal
                      portalId="root-portal"
                    />
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <Label for="paymentDate">
                      Edite la fecha de realización del pago
                    </Label>
                    <DatePicker
                      id="paymentDate"
                      dateFormat="yyyy-MM-dd h:mm aa"
                      showTimeSelect
                      value={paymentDate}
                      selected={paymentDate}
                      onChange={date => setPaymentDate(date)}
                      required
                      timeFormat="HH:mm"
                      withPortal
                      portalId="root-portal"
                    />
                  </FormGroup>
                )}
                {loadingPut ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Cargando...</span>
                  </button>
                ) : (
                  <Button color="primary">Guardar</Button>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
