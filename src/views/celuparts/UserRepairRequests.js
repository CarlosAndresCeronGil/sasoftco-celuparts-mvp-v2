/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import Swal from 'sweetalert2'
import getSingleRequest from '../../services/getSingleRequest';
import getSingleUser from '../../services/getSingleUser';
import putRequest from '../../services/putRequest';
import postRetoma from '../../services/postRetoma';
import postRetomaPayment from '../../services/postRetomaPayment';
import putRequestNotification from '../../services/putRequestNotification';
import getSingleEquipment from '../../services/getSingleEquipment'
import putRequestStatus from '../../services/putRequestStatus';

export default function UserRepairRequests() {
    const [userInfo, setUserInfo] = useState([]);
    const [notifications, setNotifications] = useState([])

    const [showButtons, setShowButtons] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        setLoading(true);
        console.log(JSON.parse(localStorage.getItem('user')).idUser)
        getSingleUser({ id: JSON.parse(localStorage.getItem('user')).idUser })
            .then(response => {
                console.log(response);
                setUserInfo(response);
                //Saca las notificaciones que tiene ese usuario y las almacena en un arreglo
                response[0].requests.map(tdata => (
                    tdata.requestNotifications.length !== 0 ?
                        setNotifications(prev => [...prev, tdata.requestNotifications[0]])
                        : console.log("nothing")
                ))
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
    }, [showButtons]);

    const handleAcceptClick = (id) => {
        getSingleRequest({ id })
            .then(response => {
                // console.log("RESPUESTA del single request", response[0])
                putRequest({
                    idRequest: id,
                    idUser: response[0].idUser,
                    idEquipment: response[0].idEquipment,
                    requestType: response[0].requestType,
                    pickUpAddress: response[0].pickUpAddress,
                    deliveryAddress: response[0].deliveryAddress,
                    statusQuote: "Aceptada"
                })
                    .then(response => {
                        setShowButtons(false);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                getSingleEquipment({ id: response[0].idEquipment })
                    .then(response => {
                        /*El cliente acepta la cuota, por lo tanto se envia una notificacion al tecnico
                        para que empiece con la reparacion */
                        notifications.map(tdata => (
                            tdata.idRequest === id ? (
                                putRequestNotification({
                                    idRequestNotification: tdata.idRequestNotification,
                                    idRequest: id,
                                    message: "El cliente del producto " + response.equipmentBrand + " " + response.modelOrReference + " aceptó la cuota de reparación.",
                                    wasReviewed: false,
                                    notificationType: "to_technician"
                                })
                                    .then(response2 => {
                                        console.log("exito put request notification", response2)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            ) : null
                        ))
                    })
            })
            .catch(error => {
                console.log(error);
            })
        Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Cotización aceptada!',
        })
    }

    const handleRejectClick = (id) => {
        Swal.fire({
            title: '¿Desea iniciar una retoma para este producto?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, iniciar retoma',
            denyButtonText: `No, y rechazar cotización`,
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                getSingleRequest({ id })
                    .then(response => {
                        putRequest({
                            idRequest: id,
                            idUser: response[0].idUser,
                            idEquipment: response[0].idEquipment,
                            requestType: "Retoma",
                            pickUpAddress: response[0].pickUpAddress,
                            deliveryAddress: response[0].deliveryAddress,
                            statusQuote: "Pendiente"
                        })
                            .then(data => {
                                /* --- EMPIEZA NUEVA RETOMA --- */
                                postRetoma({
                                    idRequest: id,
                                    idEquipment: response[0].idEquipment,
                                    retomaQuote: "0",
                                    deviceDiagnostic: "",
                                })
                                    .then(data => {
                                        postRetomaPayment({
                                            idRetoma: data.idRetoma
                                        })
                                            .then(dataRetomaPayment => {
                                                setShowButtons(false);
                                            }).catch(error => {
                                                console.log(error);
                                            }
                                            )
                                    }).catch(error => {
                                        console.log(error);
                                    }
                                    )
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        putRequestStatus({
                            idRequestStatus: response[0].requestStatus[0].idRequestStatus,
                            idRequest: response[0].requestStatus[0].idRequest,
                            status: "Recibida tecnico",
                            paymentStatus: response[0].requestStatus[0].paymentStatus,
                            productReturned: response[0].requestStatus[0].productReturned,
                            productSold: response[0].requestStatus[0].productSold
                        })
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        getSingleEquipment({ id: response[0].idEquipment })
                            .then(responseE => {
                                /*Notificación al mensajero para decirle que debe devolver el producto
                                a una determinada direccion*/
                                notifications.map(tdata => (
                                    tdata.idRequest === id ? (
                                        putRequestNotification({
                                            idRequestNotification: tdata.idRequestNotification,
                                            idRequest: id,
                                            message: "El cliente del producto " + responseE.equipmentBrand + " " + responseE.modelOrReference + " decidio cambiar reparación por retoma, realizar cotización del producto a vender",
                                            wasReviewed: false,
                                            notificationType: "to_technician"
                                        })
                                            .then(response3 => {
                                                console.log("exito put request notification", response3)
                                            })
                                            .catch(error => {
                                                console.log(error)
                                            })
                                    ) : null
                                ))
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                console.log("Entro al rechazar")
                getSingleRequest({ id })
                    .then(response => {
                        putRequest({
                            idRequest: id,
                            idUser: response[0].idUser,
                            idEquipment: response[0].idEquipment,
                            requestType: response[0].requestType,
                            pickUpAddress: response[0].pickUpAddress,
                            deliveryAddress: response[0].deliveryAddress,
                            statusQuote: "Rechazada"
                        })
                            .then(response2 => {
                                console.log(response2);
                                getSingleEquipment({ id: response[0].idEquipment })
                                    .then(responseE => {
                                        console.log("get single equipment response", responseE)
                                        /*Notificación al mensajero para decirle que debe devolver el producto
                                        a una determinada direccion*/
                                        notifications.map(tdata => (
                                            tdata.idRequest === id ? (
                                                putRequestNotification({
                                                    idRequestNotification: tdata.idRequestNotification,
                                                    idRequest: id,
                                                    message: "El cliente del producto " + responseE.equipmentBrand + " " + responseE.modelOrReference + " rechazó el valor de reparación, devolver a la dirección: " + response[0].deliveryAddress,
                                                    wasReviewed: false,
                                                    notificationType: "to_courier"
                                                })
                                                    .then(response3 => {
                                                        console.log("exito put request notification", response3)
                                                    })
                                                    .catch(error => {
                                                        console.log(error)
                                                    })
                                            ) : null
                                        ))
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                                setShowButtons(false);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        putRequestStatus({
                            idRequestStatus: response[0].requestStatus[0].idRequestStatus,
                            idRequest: response[0].requestStatus[0].idRequest,
                            status: "En devolucion",
                            paymentStatus: response[0].requestStatus[0].paymentStatus,
                            productReturned: response[0].requestStatus[0].productReturned,
                            productSold: response[0].requestStatus[0].productSold
                        })
                            .then(responseRequestStatus => {
                                console.log(responseRequestStatus)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
                Swal.fire('Cotización rechazada', '', 'info')
            }
        })
    }

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Solicitudes de reparación</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive>
                            <thead>
                                <tr>
                                    <th>Marca referencia</th>
                                    <th>Estado de la solicitud</th>
                                    <th>Valor de la Reparación</th>
                                    <th>Estado Cotización</th>
                                    <th>Fecha de entrega</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo[0]?.requests.map((tdata, index) => (
                                    tdata.requestType === "Reparacion" ? (
                                        <tr key={index} className="border-top">
                                            <td>
                                                {tdata.equipment?.equipmentBrand} {tdata.equipment?.modelOrReference}
                                            </td>
                                            <td>{tdata.requestStatus[0].status}</td>
                                            <td>{tdata.repairs[0].repairQuote}</td>
                                            <td>

                                                {
                                                    tdata.statusQuote === 'Pendiente' && tdata.repairs[0].repairQuote !== "0" && showButtons ? (
                                                        <div className="text-danger">
                                                            <button type='button' onClick={() => handleAcceptClick(tdata.idRequest)} className="btn btn-primary">Aceptar</button>
                                                            <button type='button' onClick={() => handleRejectClick(tdata.idRequest)} className="btn btn-danger">Rechazar</button>
                                                        </div>
                                                    ) : (
                                                        <i>{tdata.statusQuote}</i>
                                                    )
                                                }

                                            </td>
                                            {
                                                tdata.homeServices[0]?.deliveryDate ? (
                                                    // <td>{tdata.homeServices[0].deliveryDate}</td> ${new Date(tdata.requestDate).getHours()}:${new Date(tdata.requestDate).getMinutes()}
                                                    <td>{`${new Date(tdata.requestDate).getFullYear()}-${new Date(tdata.requestDate).getMonth() + 1}-${new Date(tdata.requestDate).getDate()}`}</td>
                                                ) : (
                                                    <td>Fecha sin definir</td>
                                                )
                                            }
                                        </tr>
                                    ) : (
                                        null
                                    )
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    )
}
