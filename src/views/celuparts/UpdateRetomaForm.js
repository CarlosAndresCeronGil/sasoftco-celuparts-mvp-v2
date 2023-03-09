/* eslint-disable */
import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import getSingleRetoma from "../../services/getSingleRetoma";
import putRetoma from "../../services/putRetoma";
import getRequestNotification from "../../services/getRequestNotification";
import putRequestNotification from "../../services/putRequestNotification";
import getTechnicianByEmail from "../../services/getTechnicianByEmail";
import putRequestStatus from "../../services/putRequestStatus";
import postRequestHistory from "../../services/postRequestHistory";

export default function UpdateRetomaForm() {
  const [idTechnician, setIdTechnician] = useState({ idTechnician: 0 });
  const [deviceDiagnostic, setDeviceDiagnostic] = useState({
    deviceDiagnostic: ""
  });
  const [retomaQuote, setRetomaQuote] = useState({ retomaQuote: 0 });
  const [idRetoma, setIdRetoma] = useState({ idRetoma: 0 });
  const [idRequest, setIdRequest] = useState({ idRequest: 0 });
  const [priceReviewedByAdmin, setPriceReviewedByAdmin] = useState({
    priceReviewedByAdmin: false
  });

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingPut, setLoadingPut] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /*
   *   Usado para verificar que el usuario logeado sea tecnico, en caso que lo sea
   *   no mostrara el input de "Id de tecnico asociado" dado que lo tomara automaticamente
   */
  const [isTechnician, setIsTechnician] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  console.log("id retoma estado", location.state.idRetoma);

  useEffect(
    function () {
      setLoading(true);
      JSON.parse(localStorage.getItem("user")).role === "admin" ||
      JSON.parse(localStorage.getItem("user")).role === "aux_admin"
        ? setIsUserAdmin(true)
        : setIsUserAdmin(false);
      getSingleRetoma({ id: location.state.idRetoma })
        .then(response => {
          console.log(response);
          setIdTechnician({ idTechnician: response.idTechnician });
          setDeviceDiagnostic({ deviceDiagnostic: response.deviceDiagnostic });
          setRetomaQuote({ retomaQuote: response.retomaQuote });
          setIdRetoma({ idRetoma: response.idRetoma });
          setIdRequest({ idRequest: response.idRequest });
          setPriceReviewedByAdmin({
            priceReviewedByAdmin: response.priceReviewedByAdmin
          });

          if (JSON.parse(localStorage.getItem("user")).role == "tecnico") {
            getTechnicianByEmail({
              email: JSON.parse(localStorage.getItem("user")).email
            }).then(responseTechnicianInfo => {
              setIdTechnician({
                idTechnician: responseTechnicianInfo.idTechnician
              });
            });
            setIsTechnician(true);
          } else {
            setIsTechnician(false);
          }

          getRequestNotification()
            .then(response => {
              setNotifications(response);
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    },
    [location.state.idRetoma]
  );

  const handleSubmit = e => {
    e.preventDefault();
    setLoadingPut(true);
    putRetoma({
      idRetoma: location.state.idRetoma,
      idRequest: idRequest.idRequest,
      idTechnician: idTechnician.idTechnician,
      deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
      retomaQuote: retomaQuote.retomaQuote,
      priceReviewedByAdmin:
        isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin ? true : false
    })
      .then(() => {
        putRequestStatus({
          idRequestStatus: location.state.idStatus,
          idRequest: idRequest.idRequest,
          status: "Revisado",
          paymentStatus: "No Pago"
        }).then(data => {
          postRequestHistory({
            idRequest: data.idRequest,
            status: "Revisado",
            date: new Date()
          }).then(() => {
            !isUserAdmin
              ? notifications.map(tdata =>
                  tdata.idRequest === idRequest.idRequest
                    ? putRequestNotification({
                        idRequestNotification: tdata.idRequestNotification,
                        idRequest: tdata.idRequest,
                        message:
                          "Tu dispositivo ya ha sido revisado por uno de nuestros técnicos",
                        wasReviewed: false,
                        notificationType: "to_customer"
                      })
                        .then(response => {
                          navigate(-1);
                        })
                        .catch(error => {
                          console.log(error);
                        })
                    : null
                )
              : null;
          });
        });

        isUserAdmin
          ? notifications.map(tdata =>
              tdata.idRequest === idRequest.idRequest
                ? putRequestNotification({
                    idRequestNotification: tdata.idRequestNotification,
                    idRequest: tdata.idRequest,
                    message:
                      'Tu dispositivo ya tiene precio de retoma! haz click en "Mis retomas" para revisar',
                    wasReviewed: false,
                    notificationType: "to_customer"
                  })
                    .then(response => {
                      console.log("Exito!", response);
                      navigate(-1);
                    })
                    .catch(error => {
                      console.log(error);
                    })
                : null
            )
          : null;
        setLoadingPut(false);
      })
      .catch(error => {
        console.log(error);
        setLoadingPut(false);
      });
  };

  const handleIdTechnicianChange = e => {
    setIdTechnician(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDeviceDiagnosticChange = e => {
    setDeviceDiagnostic(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRepairQuoteChange = e => {
    setRetomaQuote(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>
        <Row>
          <Col>
            <Card className="container">
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                    <i className="bi bi-eyeglasses"> </i>
                    <strong>Datos de la Revisión</strong>
                  </CardSubtitle>
                  {isTechnician ? null : (
                    <FormGroup>
                      <Label for="idTechnician">Id de tecnico asociado</Label>
                      <Input
                        id="idTechnician"
                        name="idTechnician"
                        placeholder="Ingrese el ID del técnico asociado a esta reparación"
                        type="number"
                        value={idTechnician.idTechnician}
                        onChange={handleIdTechnicianChange}
                        required
                      />
                    </FormGroup>
                  )}
                  <FormGroup>
                    <Label for="deviceDiagnostic">
                      Diagnostico del dispositivo
                    </Label>
                    <Input
                      id="deviceDiagnostic"
                      name="deviceDiagnostic"
                      placeholder="Ingrese el diagnostico del dispositivo a vender"
                      type="textarea"
                      value={deviceDiagnostic.deviceDiagnostic}
                      onChange={handleDeviceDiagnosticChange}
                      required
                    />
                  </FormGroup>
                  {isUserAdmin ? (
                    <FormGroup>
                      <Label for="retomaQuote">Precio de compra</Label>
                      <Input
                        id="retomaQuote"
                        name="retomaQuote"
                        placeholder="Ingrese la cuota de reparación del producto"
                        type="number"
                        value={retomaQuote.retomaQuote}
                        onChange={handleRepairQuoteChange}
                        required
                      />
                    </FormGroup>
                  ) : null}

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
    </div>
  );
}
