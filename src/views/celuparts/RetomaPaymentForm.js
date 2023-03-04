/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  Input,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import putRepairPayment from '../../services/putRepairPayment';
import putRetomaPayment from '../../services/putRetomaPayment';
import getSingleRetomaPayment from '../../services/getSingleRetomaPayment';
import getSingleRetoma from '../../services/getSingleRetoma';
// import getSingleRequest from '../../services/getSingleRequest';
import getRequestNotification from '../../services/getRequestNotification';
import putRequestNotification from '../../services/putRequestNotification';
import moment from 'moment';

export default function RetomaPaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState({ paymentMethod: '' });
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [isPaymentDateNull, setIsPaymentDateNull] = useState({ isPaymentDateNull: false });
  const [idRetoma, setIdRetoma] = useState({ idRetoma: 0 });
  const [idRequest, setIdRequest] = useState({ idRequest: 0 });
  const [voucherNumber, setVoucherNumber] = useState('');

  const [selectedFile, setSelectedFile] = useState();

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingPut, setLoadingPut] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    function () {
      setLoading(true);
      getSingleRetomaPayment({ id: location.state.idRetomaPayment })
        .then((response) => {
          setPaymentMethod({ paymentMethod: response.paymentMethod });
          setIdRetoma({ idRetoma: response.idRetoma });
          if (response.paymentDate === null) {
            setIsPaymentDateNull({ isPaymentDateNull: true });
            setPaymentDate(new Date());
          } else {
            setIsPaymentDateNull({ isPaymentDateNull: false });
            setPaymentDate(new Date(response.paymentDate));
          }
          getSingleRetoma({ id: response.idRetoma }).then((response2) => {
            // console.log(response2.idRequest)
            setIdRequest({ idRequest: response2.idRequest });
            getRequestNotification()
              .then((response3) => {
                setNotifications(response3);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
              });
          });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    },
    [location.state?.idRetomaPayment],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingPut(true);

    const formData = new FormData();

    formData.append('idRetomaPayment', location.state.idRetomaPayment);
    formData.append('idRetoma', idRetoma.idRetoma);
    formData.append('PaymentMethod', paymentMethod.paymentMethod);
    formData.append('paymentDate', moment(paymentDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('voucherNumber', voucherNumber.voucherNumber);
    formData.append('retomaBillPayment', e.target.elements.retomaBillPayment.files[0]);

    const data = {
      idRetomaPayment: parseInt(location.state.idRetomaPayment),
      idRetoma: idRetoma.idRetoma,
      paymentMethod: paymentMethod.paymentMethod,
      paymentDate: paymentDate.paymentDate,
    };
    putRetomaPayment(formData)
      .then((response) => {
        // console.log(response)
        // console.log(notifications)
        // console.log(idRequest.idRequest)
        notifications.map((tdata) =>
          tdata.idRequest === idRequest.idRequest
            ? putRequestNotification({
                idRequestNotification: tdata.idRequestNotification,
                idRequest: tdata.idRequest,
                message: '',
                wasReviewed: false,
                notificationType: 'to_none',
              })
                .then((response2) => {
                  // console.log("Exito!", response2)
                })
                .catch((error) => {
                  console.log(error);
                })
            : null,
        );
        setLoadingPut(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingPut(false);
      });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
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
            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
              Actualizar estado del pago de retoma
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                  <i className="bi bi-eyeglasses"> </i>
                  <strong>Datos del pago</strong>
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
                    <option value={'Datafono'}>Datáfono</option>
                  </Input>
                </FormGroup>
                {isPaymentDateNull.isPaymentDateNull ? (
                  <FormGroup>
                    <Label for="paymentDate">Ingrese la fecha de realización del pago</Label>
                    <DatePicker
                      id="paymentDate"
                      dateFormat="yyyy-MM-dd h:mm aa"
                      showTimeSelect
                      value={paymentDate}
                      selected={paymentDate}
                      onChange={(date) => setPaymentDate(date)}
                      timeFormat="HH:mm"
                    />
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <Label for="paymentDate">Edite la fecha de realización del pago</Label>
                    <DatePicker
                      id="paymentDate"
                      dateFormat="yyyy-MM-dd h:mm aa"
                      showTimeSelect
                      value={paymentDate}
                      selected={paymentDate}
                      onChange={(date) => setPaymentDate(date)}
                      required
                      timeFormat="HH:mm"
                    />
                  </FormGroup>
                )}
                <FormGroup>
                  <Label for="voucherNumber">Número del voucher</Label>
                  <Input
                    type="number"
                    name="voucherNumber"
                    id="voucherNumber"
                    value={voucherNumber.voucherNumber}
                    onChange={(e) => setVoucherNumber({ voucherNumber: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="retomaBillPayment">Factura del pago*</Label>
                  <Input
                    id="retomaBillPayment"
                    name="retomaBillPayment"
                    placeholder="Ingrese la factura de pago"
                    type="file"
                    accept="image/png, image/jpeg,image/jpg,.pdf"
                    onChange={handleFileChange}
                    required
                  />
                </FormGroup>
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
