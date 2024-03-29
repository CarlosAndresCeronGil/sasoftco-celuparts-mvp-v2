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
import getRequestNotificationByIdRequest from "../../services/getRequestNotificationByIdRequest";
import getSingleEquipment from "../../services/getSingleEquipment";
import getSingleRequest from "../../services/getSingleRequest";
import getSingleRequestStatus from "../../services/getSingleRequestStatus";
import putRequestNotification from "../../services/putRequestNotification";
import putRequestStatus from "../../services/putRequestStatus";
import Swal from "sweetalert2";
import getCelupartsInfo from "../../services/getCelupartsInfo";
import putRequestHistory from "../../services/putRequestHistory";
import postRequestHistory from "../../services/postRequestHistory";
import getRequestHistoryByIdRequest from "../../services/getRequestHistoryByIdRequest";
import putHomeServiceByIdRequest from "../../services/putHomeServiceByIdRequest";
import putRepairStartDateByIdRequest from "../../services/putRepairStartDateByIdRequest";
import putRequestUpdateTechnician from "../../services/putUpdateTechnician";
import putRequestRetomaUpdateTechnician from "../../services/putUpdateRetomaTechnician";
import getTechnicianByEmail from "../../services/getTechnicianByEmail";
import getTechnicians from "../../services/getTechnicians";

export default function RequestStatusForm() {
  const location = useLocation();

  const [dataRequestStatus, setDataRequestStatus] = useState({});
  const [status, setStatus] = useState({ status: "" });
  const [paymentStatus, setPaymentStatus] = useState({ paymentStatus: "" });
  const [productReturned, setProductReturned] = useState({
    productReturned: false
  });
  const [idRequest, setIdRequest] = useState({ idRequest: 0 });
  const [idTechnician, setIdTechnician] = useState({ idTechnician: 0 });
  const [technicians, setTechnicians] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [equipmentData, setEquipmentData] = useState({
    equipmentBrand: "",
    modelOrReference: ""
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    deliveryAddress: ""
  });
  const [deliveryDate, setDeliveryDate] = useState({
    deliveryDate: new Date()
  });
  // console.log('Date: ', deliveryDate.deliveryDate.toLocaleDateString('es', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }))

  const [celupartsContactPhone, setCelupartsContactPhone] = useState("");
  const [celupartsContactEmail, setCelupartsContactEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingPut, setLoadingPut] = useState(false);

  //En caso de que sea una reparacion, el flujo no debe permitir seguir al estado "En reparacion"
  const [isRepair, setIsRepair] = useState(false);

  //Usado para filtrar cuales estados no mostrar
  const [requestHistory, setRequestHistory] = useState([]);

  const [currentStatus, setCurrentStatus] = useState("");

  const [currentOption, setCurrentOption] = useState({
    value: "",
    toShow: "",
    priority: 0
  });
  const [opcionesMensajero, setOpcionesMensajero] = useState([]);
  const [opcionesTecnico, setopcionesTecnico] = useState([]);
  const [opcionesAdmin, setOpcionesAdmin] = useState([]);

  const options = [
    {
      value: "Elija una opcion",
      toShow: "Elija una opción",
      priority: -100,
      showToCourier: true,
      showToTechnician: true
    },
    {
      value: "Iniciada",
      toShow: "Iniciada",
      priority: 0,
      showToCourier: true,
      showToTechnician: true
    },
    {
      value: "En proceso de recogida",
      toShow: "En proceso de recogida",
      priority: 1,
      showToCourier: true,
      showToTechnician: false
    },
    {
      value: "Recibida tecnico",
      toShow: "Recibida técnico",
      priority: 2,
      showToCourier: false,
      showToTechnician: true
    },
    {
      value: "Revisado",
      toShow: "Revisado",
      priority: 3,
      showToCourier: false,
      showToTechnician: false
    },
    {
      value: "En reparacion",
      toShow: "En reparación",
      priority: 4,
      showToCourier: false,
      showToTechnician: true
    },
    {
      value: "Reparado pendiente de pago",
      toShow: "Reparado, pendiente de pago",
      priority: 5.1,
      showToCourier: false,
      showToTechnician: false
    },
    {
      value: "En camino",
      toShow: "En camino",
      priority: 6,
      showToCourier: true,
      showToTechnician: false
    },
    {
      value: "Terminada",
      toShow: "Terminada",
      priority: 7,
      showToCourier: true,
      showToTechnician: false
    },
    {
      value: "En devolucion",
      toShow: "En devolución",
      priority: 4,
      showToCourier: true,
      showToTechnician: false
    },
    {
      value: "Devuelto sin reparacion",
      toShow: "Devuelto sin reparación",
      priority: 5.2,
      showToCourier: true,
      showToTechnician: false
    },
    {
      value: "Retoma",
      toShow: "Retoma",
      priority: 4,
      showToCourier: false,
      showToTechnician: false
    },
    {
      value: "Abandonada",
      toShow: "Abandonada",
      priority: -1,
      showToCourier: false,
      showToTechnician: false
    },
    {
      value: "Anulado por IMEI",
      toShow: "Anulado por IMEI",
      priority: 2,
      showToCourier: true,
      showToTechnician: false
    }
  ];

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setLoadingPut(true);
    if (
      status.status == "Anulado por IMEI" ||
      status.status == "Devuelto sin reparacion" ||
      status.status == "Terminada"
    ) {
      productReturned.productReturned = true;
    } else {
      productReturned.productReturned = false;
    }
    putRequestStatus({
      idRequestStatus: dataRequestStatus.idRequestStatus,
      idRequest: dataRequestStatus.idRequest,
      status: status.status,
      paymentStatus: paymentStatus.paymentStatus,
      productReturned: productReturned.productReturned
    })
      .then(data => {
        // console.log("DATA", data);
        /*Aqui se mira el estado de la solicitud, para asi, enviar un mensaje en la 
                notificacion a quien corresponda*/
        postRequestHistory({
          idRequest: data.idRequest,
          status: status.status,
          date: new Date()
        }).catch(error => {
          console.log(error);
        });
        status.status === "En proceso de recogida"
          ? [
            notifications.find(
              tdata => tdata.idRequest === idRequest.idRequest
            )
          ].map(tdata =>
            putRequestNotification({
              idRequestNotification: tdata.idRequestNotification,
              idRequest: tdata.idRequest,
              message: "Tu dispositivo esta en proceso de recogida!",
              wasReviewed: false,
              notificationType: "to_customer"
            })
              .then(response => {
                // console.log("exito!", response)
              })
              .catch(error => {
                console.log(error);
              })
          )
          : status.status === "Recibida tecnico"
            ? [
              notifications.find(tdata => {
                return tdata.idRequest === idRequest.idRequest;
              })
            ].map(tdata => {
              if (
                JSON.parse(localStorage.getItem("user"))?.role == "tecnico" ||
                JSON.parse(localStorage.getItem("user"))?.role == "admin" ||
                JSON.parse(localStorage.getItem("user"))?.role == "aux_admin"
              ) {
                if (dataRequestStatus.request.requestType === "Reparacion") {
                  putRequestUpdateTechnician({
                    id: tdata.idRequest,
                    idTechnician: idTechnician.idTechnician
                  });
                } else {
                  putRequestRetomaUpdateTechnician({
                    id: tdata.idRequest,
                    idTechnician: idTechnician.idTechnician
                  });
                }
              }
              putRequestNotification({
                idRequestNotification: tdata.idRequestNotification,
                idRequest: tdata.idRequest,
                message:
                  "Tu dispositivo ya ha sido recibido por uno de nuestros tecnicos",
                wasReviewed: false,
                notificationType: "to_customer"
              })
                .then(response => {
                  // console.log("exito!", response)
                })
                .catch(error => {
                  console.log(error);
                });
            })
            : status.status === "En reparacion"
              ? [
                notifications.find(
                  tdata => tdata.idRequest === idRequest.idRequest
                )
              ].map(tdata =>
                putRequestNotification({
                  idRequestNotification: tdata.idRequestNotification,
                  idRequest: tdata.idRequest,
                  message:
                    "El técnico ha empezado con la reparación de tu producto",
                  wasReviewed: false,
                  notificationType: "to_customer"
                })
                  .then(response => {
                    // console.log("exito!", response)
                    putRepairStartDateByIdRequest({
                      id: tdata.idRequest
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  })
              )
              : status.status === "En camino"
                ? [
                  notifications.find(
                    tdata => tdata.idRequest === idRequest.idRequest
                  )
                ].map(tdata =>
                  putRequestNotification({
                    idRequestNotification: tdata.idRequestNotification,
                    idRequest: tdata.idRequest,
                    // message: "Producto " + equipmentData.equipmentBrand + " " + equipmentData.modelOrReference + " para devolución el día " + deliveryDate.deliveryDate.toLocaleDateString('es', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }) + " al barrio " + deliveryAddress.deliveryAddress,
                    message:
                      "Producto " +
                      equipmentData.equipmentBrand +
                      " " +
                      equipmentData.modelOrReference +
                      " para devolución el día " +
                      addDays(new Date(), 1).toLocaleDateString("es", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                      }) +
                      " al barrio " +
                      deliveryAddress.deliveryAddress,
                    wasReviewed: false,
                    notificationType: "to_courier"
                  })
                    .then(response => {
                      // console.log("exito!", response)
                      putHomeServiceByIdRequest({
                        idRequest: tdata.idRequest,
                        deliveryDate: addDays(new Date(), 1)
                      });
                    })
                    .catch(error => {
                      console.log(error);
                    })
                )
                : status.status === "Terminada"
                  ? [
                    notifications.find(
                      tdata => tdata.idRequest === idRequest.idRequest
                    )
                  ].map(tdata =>
                    putRequestNotification({
                      idRequestNotification: tdata.idRequestNotification,
                      idRequest: tdata.idRequest,
                      message: "",
                      wasReviewed: false,
                      notificationType: "to_none"
                    })
                      .then(response => {
                        // console.log("exito!", response)
                      })
                      .catch(error => {
                        console.log(error);
                      })
                  )
                  : status.status === "Devuelto sin reparacion"
                    ? [
                      notifications.find(
                        tdata => tdata.idRequest === idRequest.idRequest
                      )
                    ].map(tdata =>
                      putRequestNotification({
                        idRequestNotification: tdata.idRequestNotification,
                        idRequest: tdata.idRequest,
                        message: "",
                        wasReviewed: false,
                        notificationType: "to_none"
                      })
                        .then(response => {
                          // console.log("exito!", response)
                        })
                        .catch(error => {
                          console.log(error);
                        })
                    )
                    : status.status === "Retoma"
                      ? [
                        notifications.find(
                          tdata => tdata.idRequest === idRequest.idRequest
                        )
                      ].map(tdata =>
                        putRequestNotification({
                          idRequestNotification: tdata.idRequestNotification,
                          idRequest: tdata.idRequest,
                          message:
                            "Tu pago sobre tu retoma se realizara pronto! Revisa tu medio de pago registrado a celuparts para confirmarlo.",
                          wasReviewed: false,
                          notificationType: "to_customer"
                        })
                          .then(response => {
                            // console.log("exito!", response)
                          })
                          .catch(error => {
                            console.log(error);
                          })
                      )
                      : status.status === "Anulado por IMEI"
                        ? [
                          notifications.find(
                            tdata => tdata.idRequest === idRequest.idRequest
                          )
                        ].map(tdata =>
                          putRequestNotification({
                            idRequestNotification: tdata.idRequestNotification,
                            idRequest: tdata.idRequest,
                            message: "Anulado por IMEI",
                            wasReviewed: false,
                            notificationType: "to_none"
                          })
                            .then(response => {
                              // console.log("exito!", response)
                            })
                            .catch(error => {
                              console.log(error);
                            })
                        )
                        : console.log("do nothing");
        setLoadingPut(false);
      })
      .then(finalResponse => {
        console.log("sss 5");
        Swal.fire({
          icon: "success",
          title: "Exito!",
          text: "Estado de solicitud actualizado!"
        }).then(response => {
          navigate(-1);
        });
      })
      .catch(error => {
        console.log(error);
        setLoadingPut(false);
      });
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleStatusChange = e => {
    setStatus(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePaymentStatusChange = e => {
    setPaymentStatus(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProductReturnedChange = e => {
    setProductReturned(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBackPage = e => {
    navigate(-1);
  };
  const llenarOpcionesMensajero = () => {
    const newOpcionesMensajero = [];
    if (status.status) {
      options.forEach((option, index) => {
        if (
          !option.showToCourier ||
          (currentOption.priority != 4 &&
            currentOption.priority != 5.1 &&
            option.priority > currentOption.priority + 1 &&
            currentOption.value != "En devolucion") ||
          (currentOption.value != "En devolucion" &&
            currentOption.priority != 5.1 &&
            option.priority < currentOption.priority + 1 &&
            !requestHistory.some(n => n.status === option.value)) ||
          option.value == "Elija una opcion" ||
          requestHistory.some(n => n.status === option.value) ||
          (currentOption.priority == 2 &&
            currentOption.value == "Anulado por IMEI" &&
            option.priority >= 2) ||
          (currentOption.priority == 4 &&
            currentOption.value == "En reparacion" &&
            option.priority >= 5.2) ||
          (currentOption.priority == 4 &&
            currentOption.value == "En devolucion" &&
            (option.priority == 5.1 ||
              option.priority <= 4 ||
              option.priority > currentOption.priority + 1.2)) ||
          (currentOption.priority == 4 && currentOption.value == "Retoma") ||
          (currentOption.priority == 5.1 && option.priority != 6) ||
          (option.value === "En camino" &&
            dataRequestStatus.paymentStatus === "No pago") ||
          (currentOption.value === "Revisado" &&
            option.value === "En devolucion" &&
            location.state.statusQuote != "Rechazada")
        ) {
        } else {
          newOpcionesMensajero.push(option);
        }
      });

      setOpcionesMensajero([
        options.find(v => v.value === status.status),
        ...newOpcionesMensajero
      ]);
    }
  };

  const llenarOpcionesTecnico = () => {
    const newOpcionesTecnico = [];
    if (status.status) {
      options.forEach((option, index) => {
        if (
          !option.showToTechnician ||
          (currentOption.priority != 4 &&
            currentOption.priority != 5.1 &&
            option.priority > currentOption.priority + 1 &&
            currentOption.value != 'En devolucion') ||
          (currentOption.value != 'En devolucion' &&
            currentOption.priority != 5.1 &&
            option.priority < currentOption.priority + 1 &&
            !requestHistory.some((n) => n.status === option.value)) ||
          option.value == 'Elija una opcion' ||
          (requestHistory.some((n) => n.status === option.value) &&
            !(
              !isRepair &&
              requestHistory.some((n) => n.status == 'Revisado') &&
              option.priority > 2
            )) ||
          (currentOption.priority == 2 &&
            currentOption.value == 'Anulado por IMEI' &&
            option.priority >= 2) ||
          (currentOption.priority == 4 &&
            currentOption.value == 'En reparacion' &&
            option.priority >= 5.2) ||
          (currentOption.priority == 4 &&
            currentOption.value == 'En devolucion' &&
            (option.priority == 5.1 ||
              option.priority <= 4 ||
              option.priority > currentOption.priority + 1.2)) ||
          (currentOption.priority == 4 && currentOption.value == 'Retoma') ||
          (currentOption.priority == 5.1 && option.priority != 6) ||
          (location.state.statusQuote !== "Aceptada" &&
            option.value === "En reparacion") ||
          (!isRepair && option.priority > 3)
        ) {
          // No hagas nada
        } else {
          newOpcionesTecnico.push(option);
        }
      });
      setopcionesTecnico([
        options.find(v => v.value === status.status),
        ...newOpcionesTecnico
      ]);
    }
  };

  const llenarOpcionesAdmin = () => {
    const newOpcionesAdmin = [];
    if (status.status) {
      options.forEach((option, index) => {
        if (
          option.value == "Revisado" ||
          (currentOption.priority != 4 &&
            currentOption.priority != 5.1 &&
            option.priority > currentOption.priority + 1 &&
            currentOption.value != "En devolucion") ||
          (currentOption.value != "En devolucion" &&
            currentOption.priority != 5.1 &&
            option.priority < currentOption.priority + 1 &&
            !requestHistory.some(n => n.status === option.value)) ||
          option.value == "Elija una opcion" ||
          requestHistory.some(n => n.status === option.value) ||
          (currentOption.priority == 2 &&
            currentOption.value == "Anulado por IMEI" &&
            option.priority >= 2) ||
          (currentOption.priority == 4 &&
            currentOption.value == "En reparacion" &&
            option.priority >= 5.2) ||
          (currentOption.priority == 4 &&
            currentOption.value == "En devolucion" &&
            (option.priority == 5.1 ||
              option.priority <= 4 ||
              option.priority > currentOption.priority + 1.2)) ||
          (currentOption.priority == 4 && currentOption.value == "Retoma") ||
          (currentOption.priority == 5.1 && option.priority != 6) ||
          (!isRepair && option.value == "En reparacion") ||
          (option.value === "En camino" &&
            dataRequestStatus.paymentStatus === "No pago") ||
          (location.state.statusQuote !== "Aceptada" &&
            option.value === "En reparacion") ||
          (location.state.statusQuote !== "Aceptada" &&
            option.value === "Retoma") ||
          (currentOption.value === "Revisado" &&
            option.value === "En devolucion" &&
            location.state.statusQuote != "Rechazada") || option.value === 'Reparado pendiente de pago'
        ) {
        }
        // No hagas nada
        else {
          newOpcionesAdmin.push(option);
        }
      });
      setOpcionesAdmin([
        options.find(v => v.value === status.status),
        ...newOpcionesAdmin
      ]);
    }
  };
  useEffect(
    function () {
      setLoading(true);
      if (JSON.parse(localStorage.getItem("user"))?.role == "tecnico") {
        getTechnicianByEmail({
          email: JSON.parse(localStorage.getItem("user")).email
        }).then(responseTechnicianInfo => {
          setIdTechnician({
            idTechnician: responseTechnicianInfo.idTechnician
          });
        });
      }
      getSingleRequestStatus({ id: location.state.idStatus })
        .then(responseRequestStatus => {
          // console.log("request status response", responseRequestStatus)
          responseRequestStatus.request.requestType == "Reparacion"
            ? setIsRepair(true)
            : setIsRepair(false);
          setDataRequestStatus(responseRequestStatus);
          setIdRequest({ idRequest: responseRequestStatus.idRequest });
          setStatus({ status: responseRequestStatus.status });
          setCurrentStatus(responseRequestStatus.status);
          setCurrentOption({
            value: responseRequestStatus.status,
            toShow: options.find(n => n.value === responseRequestStatus.status)
              .toShow,
            priority: options.find(
              n => n.value === responseRequestStatus.status
            ).priority
          });
          setPaymentStatus({
            paymentStatus: responseRequestStatus.paymentStatus
          });
          setProductReturned({
            productReturned: responseRequestStatus.productReturned
          });
          getRequestNotificationByIdRequest({
            idRequest: responseRequestStatus.idRequest
          })
            .then(response2 => {
              setNotifications(response2);
              /*Esta parte se necesita para el mensaje final al mensajero donde necesita saber fecha,
                        nombre del producto y direccion de entrega*/
              getSingleRequest({ id: responseRequestStatus.idRequest })
                .then(response3 => {
                  setDeliveryDate({
                    deliveryDate: new Date(
                      response3[0].homeServices[0].deliveryDate
                    )
                  });
                  setDeliveryAddress({
                    deliveryAddress: response3[0].deliveryAddress
                  });
                  getSingleEquipment({ id: response3[0].idEquipment })
                    .then(response => {
                      setEquipmentData({
                        equipmentBrand: response.equipmentBrand,
                        modelOrReference: response.modelOrReference
                      });
                      getRequestHistoryByIdRequest({
                        id: responseRequestStatus.idRequest
                      })
                        .then(responseHistory => {
                          setRequestHistory(responseHistory);
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
                })
                .catch(error => {
                  console.log(error);
                  setLoading(false);
                });
              getCelupartsInfo()
                .then(response => {
                  setCelupartsContactPhone(response[0].contactPhone);
                  setCelupartsContactEmail(response[0].contactEmail);
                })
                .catch(error => {
                  console.log(error);
                });
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
    [location.state?.idStatus, idRequest.idRequest]
  );

  useEffect(() => {
    if (status.status === "Recibida tecnico") {
      getTechnicians().then(response => {
        setTechnicians(response);
      });
    }
  }, [status.status]);

  useEffect(() => {
    console.log("se repite");
    llenarOpcionesMensajero();
    llenarOpcionesTecnico();
  }, []);

  useEffect(() => {
    llenarOpcionesMensajero();
    llenarOpcionesTecnico();
    llenarOpcionesAdmin();
  }, [requestHistory]);

  return loading ? (
    <div>Cargando...</div>
  ) : (
    <div>
      <div>
        <Row>
          <Col>
            <Card className="container">
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                    <i className="bi bi-card-list"> </i>
                    <strong>Datos del estado</strong>
                  </CardSubtitle>

                  {JSON.parse(localStorage.getItem("user")).role ===
                    "mensajero" ? (
                    <FormGroup>
                      <Label for="status">Estado solicitud</Label>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        value={status.status}
                        onChange={handleStatusChange}
                      >
                        {opcionesMensajero.map((option, index) => {
                          return (
                            <option value={option.value} key={index}>
                              {option.toShow}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  ) : JSON.parse(localStorage.getItem("user")).role ===
                    "tecnico" ? (
                    <FormGroup>
                      {!isRepair}
                      <br></br>
                      <Label for="status">Estado solicitud</Label>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        value={status.status}
                        onChange={handleStatusChange}
                      >
                        {opcionesTecnico.map((option, index) => {
                          return (
                            <option value={option.value} key={index}>
                              {option.toShow}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  ) : (
                    <FormGroup>
                      <Label for="status">Estado solicitud</Label>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        value={status.status}
                        onChange={handleStatusChange}
                      >
                        {opcionesAdmin.map((option, index) => {
                          return (
                            <option value={option.value} key={index}>
                              {option.toShow}
                            </option>
                          );
                        })}
                        {/* <option>En proceso de recogida</option>
                                                        <option value="Recibida tecnico">Recibida técnico</option>
                                                        <option>Revisado</option>
                                                        <option value="En reparacion">En reparación</option>
                                                        <option value="Reparado pendiente de pago">Reparado, pendiente de pago</option>
                                                        <option>En camino</option>
                                                        <option>Terminada</option>
                                                        <option value="En devolucion">En devolución</option>
                                                        <option value="Devuelto sin reparacion">Devuelto sin reparación</option>
                                                        <option>Retoma</option>
                                                        <option>Abandonada</option>
                                                        <option>Anulado por IMEI</option> */}
                      </Input>
                    </FormGroup>
                  )}
                  {JSON.parse(localStorage.getItem("user")).role ===
                    "mensajero" ||
                    JSON.parse(localStorage.getItem("user")).role ===
                    "tecnico" ? null : status.status == "Iniciada" ||
                      status.status == "En proceso de recogida" ||
                      status.status == "Recibida tecnico" ||
                      status.status == "En camino" ||
                      status.status == "Revisado" ||
                      status.status == "Anulado por IMEI" ||
                      status.status == "En devolucion" ||
                      status.status == "Devuelto sin reparacion" ||
                      status.status == "Terminada" ||
                      status.status == "En reparacion" ? null : (
                    <FormGroup>
                      <Label for="paymentStatus">Estado de pago</Label>
                      <Input
                        type="select"
                        name="paymentStatus"
                        id="paymentStatus"
                        disabled={
                          status.status == "Reparado pendiente de pago" ||
                          status.status == "Retoma"
                        }
                        defaultValue={paymentStatus.paymentStatus}
                        onChange={handlePaymentStatusChange}
                      >
                        <option value={"Pago"}>Pago</option>
                        <option value={"No pago"}>No pago</option>
                      </Input>
                    </FormGroup>
                  )}
                  {JSON.parse(localStorage.getItem("user")).role ===
                    "tecnico" ? null : status.status == "Iniciada" ||
                      status.status == "Recibida tecnico" ||
                      status.status == "En proceso de recogida" ||
                      status.status == "Revisado" ||
                      status.status == "Anulado por IMEI" ||
                      status.status == "En reparacion" ||
                      status.status == "En devolucion" ||
                      status.status == "Devuelto sin reparacion" ||
                      status.status == "Reparado pendiente de pago" ||
                      status.status == "En camino" ||
                      status.status == "Terminada" ||
                      status.status == "Retoma" ? null : (
                    <FormGroup>
                      <Label for="productReturned">Producto devuelto</Label>
                      <Input
                        id="productReturned"
                        name="productReturned"
                        type="select"
                        defaultValue={productReturned.productReturned}
                        onChange={handleProductReturnedChange}
                      >
                        <option value={true}>Devuelto</option>
                        <option value={false}>No devuelto</option>
                      </Input>
                    </FormGroup>
                  )}
                  {(JSON.parse(localStorage.getItem("user")).role ===
                    "aux_admin" ||
                    JSON.parse(localStorage.getItem("user")).role ===
                    "admin") &&
                    status.status == "Recibida tecnico" && (
                      <FormGroup>
                        <Label for="productReturned">Técnico Asociado</Label>
                        <Input
                          id="tecnicoAsociado"
                          name="tecnicoAsociado"
                          type="select"
                          required
                          defaultValue={
                            location.state.data.technician == 0
                              ? ""
                              : location.state.data.technician
                          }
                          onChange={e =>
                            setIdTechnician({
                              idTechnician: Number(e.target.value)
                            })
                          }
                        >
                          <option value="">Seleccione un técnico</option>
                          {technicians.map(value => {
                            return (
                              <option
                                key={value.idTechnician}
                                value={value.idTechnician}
                              >
                                {value.names} {value.surnames}
                              </option>
                            );
                          })}
                        </Input>
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
                    <Button className="btn" color="primary">
                      Guardar
                    </Button>
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