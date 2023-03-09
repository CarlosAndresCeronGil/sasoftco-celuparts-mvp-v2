/* eslint-disable */
import React, { useState, useEffect } from "react";
import getSingleUser from "../../services/getSingleUser";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import getSingleRequest from "../../services/getSingleRequest";
import putRequest from "../../services/putRequest";
import Swal from "sweetalert2";
import getSingleEquipment from "../../services/getSingleEquipment";
import putRequestNotification from "../../services/putRequestNotification";
import BreadCrumbsCeluparts from "../../layouts/breadcrumbs/BreadCrumbsCeluparts";
import { Link } from "react-router-dom";
import putHomeServiceByIdRequest from "../../services/putHomeServiceByIdRequest";

export default function UserRetomaRequests() {
  const [userInfo, setUserInfo] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [viewDetails, setViewDetails] = useState({
    autoDiagnosis: "",
    deliveryAddress: "",
    deliveryDate: "",
    pickUpAddress: "",
    pickUpDate: ""
  });

  const [currentDeliveryDate, setCurrentDeliveryDate] = useState("");

  const handleViewDetails = ({
    autoDiagnosis,
    deliveryAddress,
    pickUpAddress,
    homeServices
  }) => {
    setIsOpenModal(!isOpenModal);
    setViewDetails({
      autoDiagnosis,
      deliveryAddress,
      deliveryDate: homeServices[0]?.deliveryDate,
      pickUpAddress,
      pickUpDate: homeServices[0]?.pickUpDate
    });
    setCurrentDeliveryDate(
      homeServices[0].deliveryDate != null ? deliveryDate : "Sin definir"
    );
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  useEffect(
    function () {
      setLoading(true);
      getSingleUser({ id: JSON.parse(localStorage.getItem("user")).idUser })
        .then(response => {
          setUserInfo(response);
          response[0].requests.map(tdata =>
            tdata.requestNotifications.length !== 0
              ? setNotifications(prev => [
                  ...prev,
                  tdata.requestNotifications[0]
                ])
              : console.log("nothing")
          );
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    },
    [showButtons]
  );

  const handleAcceptClick = id => {
    getSingleRequest({ id })
      .then(response => {
        console.log(response);
        putRequest({
          idRequest: id,
          idUser: response[0].idUser,
          idEquipment: response[0].idEquipment,
          requestType: response[0].requestType,
          pickUpAddress: response[0].pickUpAddress,
          deliveryAddress: response[0].deliveryAddress,
          statusQuote: "Aceptada",
          autoDiagnosis: response[0].autoDiagnosis
        })
          .then(response => {
            setShowButtons(false);
          })
          .catch(error => {
            console.log(error);
          });
        getSingleEquipment({ id: response[0].idEquipment }).then(response => {
          /*El cliente acepta el precio de venta, por lo tanto se envia una notificacion 
                        al tecnico para que empiece con la reparacion */
          notifications.map(tdata =>
            tdata.idRequest === id
              ? putRequestNotification({
                  idRequestNotification: tdata.idRequestNotification,
                  idRequest: id,
                  message:
                    "El cliente del producto " +
                    response.equipmentBrand +
                    " " +
                    response.modelOrReference +
                    " aceptó el valor de venta.",
                  wasReviewed: false,
                  notificationType: "to_admin"
                })
                  .then(response2 => {
                    console.log("exito put request notification", response2);
                  })
                  .catch(error => {
                    console.log(error);
                  })
              : null
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
    Swal.fire({
      icon: "success",
      title: "Exito!",
      text: "Cotización aceptada!"
    });
  };

  const handleRejectClick = id => {
    getSingleRequest({ id })
      .then(response => {
        putRequest({
          idRequest: id,
          idUser: response[0].idUser,
          idEquipment: response[0].idEquipment,
          requestType: response[0].requestType,
          pickUpAddress: response[0].pickUpAddress,
          deliveryAddress: response[0].deliveryAddress,
          statusQuote: "Rechazada",
          autoDiagnosis: response[0].autoDiagnosis
        })
          .then(response2 => {
            getSingleEquipment({ id: response[0].idEquipment }).then(
              responseE => {
                /*Notificación al mensajero para decirle que debe devolver el producto
                                a una determinada direccion*/
                notifications.map(tdata =>
                  tdata.idRequest === id
                    ? putRequestNotification({
                        idRequestNotification: tdata.idRequestNotification,
                        idRequest: id,
                        message:
                          "Devolver el producto " +
                          responseE.equipmentBrand +
                          " " +
                          responseE.modelOrReference +
                          " a la dirección: " +
                          response[0].deliveryAddress +
                          " el día: " +
                          addDays(new Date(), 1).toLocaleDateString("es", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric"
                          }),
                        wasReviewed: false,
                        notificationType: "to_courier"
                      })
                        .then(response3 => {
                          console.log(
                            "exito put request notification",
                            response3
                          );
                          putHomeServiceByIdRequest({
                            idRequest: tdata.idRequest,
                            deliveryDate: addDays(new Date(), 1)
                          });
                        })
                        .catch(error => {
                          console.log(error);
                        })
                    : null
                );
              }
            );
            setShowButtons(false);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
    Swal.fire(
      "Cotización rechazada, tu producto será devuelto en las siguientes 24 horas",
      "",
      "info"
    );
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <BreadCrumbsCeluparts breadcrumbName="Solicitudes de retoma" />
      <Card>
        <CardBody>
          <CardTitle tag="h5">Solicitudes de retoma</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive>
            <thead>
              <tr>
                <th>Marca referencia</th>
                <th>Estado de la solicitud</th>
                <th>Valor de venta</th>
                <th>Estado Cotización</th>
                <th>Número de teléfono</th>
                <th>Ver detalles</th>
                <th>Ver historial de solicitud</th>
              </tr>
            </thead>
            <tbody>
              {userInfo[0]?.requests.map((tdata, index) =>
                tdata.requestType === "Retoma" ? (
                  <tr key={index} className="border-top">
                    <td>
                      {tdata.equipment.equipmentBrand}{" "}
                      {tdata.equipment.modelOrReference}
                    </td>
                    <td>{tdata.requestStatus[0].status}</td>
                    <td>
                      {tdata.retoma[0].retomaQuote == "0" &&
                      tdata.retoma[0].priceReviewedByAdmin == false
                        ? "Pendiente"
                        : tdata.retoma[0].retomaQuote}
                    </td>
                    <td>
                      {tdata.statusQuote === "Pendiente" &&
                      tdata.retoma[0].priceReviewedByAdmin === true &&
                      showButtons ? (
                        <div className="text-danger">
                          <button
                            type="button"
                            onClick={() => handleAcceptClick(tdata.idRequest)}
                            className="btn btn-primary"
                          >
                            Aceptar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectClick(tdata.idRequest)}
                            className="btn btn-danger"
                          >
                            Rechazar
                          </button>
                        </div>
                      ) : (
                        <i>{tdata.statusQuote}</i>
                      )}
                    </td>
                    <td>{userInfo[0].phone}</td>
                    <td>
                      <Button
                        className="btn"
                        color="info"
                        type="button"
                        onClick={() => handleViewDetails(tdata)}
                      >
                        Detalles
                      </Button>
                    </td>
                    <td>
                      <Link
                        to={`/home/request-history-table/${tdata.idRequest}`}
                      >
                        <Button type="button" className="btn" color="primary">
                          Ver
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </Table>
          <Modal isOpen={isOpenModal} toggle={handleViewDetails.bind(null)}>
            <ModalHeader toggle={handleViewDetails.bind(null)}>
              Detalles de la solicitud
            </ModalHeader>
            <ModalBody>
              <div>
                <span className="fw-bold">Estado de tu dispositivo:</span>
              </div>
              {viewDetails.autoDiagnosis}
              <hr />
              <div>
                <span className="fw-bold">Dirección de recogida:</span>
              </div>
              {viewDetails.pickUpAddress}
              <hr />
              <div>
                <span className="fw-bold">Fecha de recogida:</span>
              </div>
              {viewDetails.pickUpDate}
              <hr />
              <div>
                <span className="fw-bold">Dirección de entrega:</span>
              </div>
              {viewDetails.deliveryAddress}
              <hr />
              <div>
                <span className="fw-bold">Fecha de entrega:</span>
              </div>
              {currentDeliveryDate != "Sin definir"
                ? new Date(viewDetails.deliveryDate).toLocaleDateString("es", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  })
                : "Sin definir"}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={handleViewDetails.bind(null)}>
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}
