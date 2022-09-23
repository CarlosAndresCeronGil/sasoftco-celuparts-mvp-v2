/* eslint-disable */
import React, { useState, useEffect } from 'react'
import getSingleUser from '../../services/getSingleUser';
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSingleRequest from '../../services/getSingleRequest';
import putRequest from '../../services/putRequest';
import Swal from 'sweetalert2'
import getSingleEquipment from '../../services/getSingleEquipment';
import putRequestNotification from '../../services/putRequestNotification'

export default function UserRetomaRequests() {
    const [userInfo, setUserInfo] = useState([]);
    
    const [notifications, setNotifications] = useState([])

    const [showButtons, setShowButtons] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        setLoading(true);
        getSingleUser({ id: JSON.parse(localStorage.getItem('user')).idUser })
            .then(response => {
                console.log("datos del usuario", response);
                setUserInfo(response);
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
                console.log(response);
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
                        /*El cliente acepta el precio de venta, por lo tanto se envia una notificacion 
                        al tecnico para que empiece con la reparacion */
                        notifications.map(tdata => (
                            tdata.idRequest === id ? (
                                putRequestNotification({
                                    idRequestNotification: tdata.idRequestNotification,
                                    idRequest: id,
                                    message: "El cliente del producto " + response.equipmentBrand + " " + response.modelOrReference + " aceptó el valor de venta.",
                                    hideNotification: false,
                                    notificationType: "to_admin"
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
                        getSingleEquipment({ id: response[0].idEquipment })
                            .then(responseE => {
                                /*Notificación al mensajero para decirle que debe devolver el producto
                                a una determinada direccion*/
                                notifications.map(tdata => (
                                    tdata.idRequest === id ? (
                                        putRequestNotification({
                                            idRequestNotification: tdata.idRequestNotification,
                                            idRequest: id,
                                            message: "El cliente del producto " + responseE.equipmentBrand + " " + responseE.modelOrReference + " rechazó el valor de la venta, devolver a la dirección: " + response[0].deliveryAddress,
                                            hideNotification: false,
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
                        setShowButtons(false);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
        Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Cotización rechazada!',
        })
    }

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Esta es la lista de tus solicitudes de retoma {JSON.parse(localStorage.getItem('user')).name} </CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive>
                            <thead>
                                <tr>
                                    <th>Marca referencia</th>
                                    <th>Estado de la solicitud</th>
                                    <th>Valor de venta</th>
                                    <th>Estado Cotización</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo[0]?.requests.map((tdata, index) => (
                                    tdata.requestType === "Retoma" ? (
                                        <tr key={index} className="border-top">
                                            <td>
                                                {tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}
                                            </td>
                                            <td>{tdata.requestStatus[0].status}</td>
                                            <td>{tdata.retoma[0].retomaQuote}</td>
                                            <td>

                                                {
                                                    tdata.statusQuote === 'Pendiente' && tdata.retoma[0].retomaQuote !== "0" && showButtons ? (
                                                        <div className="text-danger">
                                                            <button type='button' onClick={() => handleAcceptClick(tdata.idRequest)} className="btn btn-primary">Aceptar</button>
                                                            <button type='button' onClick={() => handleRejectClick(tdata.idRequest)} className="btn btn-danger">Rechazar</button>
                                                        </div>
                                                    ) : (
                                                        <i>{tdata.statusQuote}</i>
                                                    )
                                                }
                                            </td>
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
