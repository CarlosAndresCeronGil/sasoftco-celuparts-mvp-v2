/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
} from "reactstrap";
import getRequestNotification from '../../services/getRequestNotification';
import getRequestNotificationByIdRequest from '../../services/getRequestNotificationByIdRequest';
import getSingleEquipment from '../../services/getSingleEquipment';
import getSingleRequest from '../../services/getSingleRequest';
import getSingleRequestStatus from '../../services/getSingleRequestStatus';
import putRequestNotification from '../../services/putRequestNotification';
import putRequestStatus from '../../services/putRequestStatus';
import Swal from 'sweetalert2'
import getCelupartsInfo from '../../services/getCelupartsInfo';

export default function RequestStatusForm() {
    const [dataRequestStatus, setDataRequestStatus] = useState({});
    const [status, setStatus] = useState({ status: "" });
    const [paymentStatus, setPaymentStatus] = useState({ paymentStatus: "" });
    const [productReturned, setProductReturned] = useState({ productReturned: false });
    const [idRequest, setIdRequest] = useState({ idRequest: 0 })

    const [notifications, setNotifications] = useState([])
    const [equipmentData, setEquipmentData] = useState({
        equipmentBrand: "",
        modelOrReference: ""
    })
    const [deliveryAddress, setDeliveryAddress] = useState({ deliveryAddress: "" })
    const [deliveryDate, setDeliveryDate] = useState({ deliveryDate: new Date() })

    const [celupartsContactPhone, setCelupartsContactPhone] = useState("")
    const [celupartsContactEmail, setCelupartsContactEmail] = useState("")

    const [loading, setLoading] = useState(false);
    const [loadingPut, setLoadingPut] = useState(false);

    const params = useParams()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingPut(true);
        putRequestStatus({
            idRequestStatus: dataRequestStatus.idRequestStatus,
            idRequest: dataRequestStatus.idRequest,
            status: status.status,
            paymentStatus: paymentStatus.paymentStatus,
            productReturned: productReturned.productReturned === 'true' ? true : false,
        })
            .then(data => {
                // console.log("DATA", data);
                /*Aqui se mira el estado de la solicitud, para asi, enviar un mensaje en la 
                notificacion a quien corresponda*/
                status.status === "En proceso de recogida" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "Tu dispositivo esta en proceso de recogida!",
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "Recibida tecnico" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "Tu dispositivo ya ha sido recibido por uno de nuestros tecnicos",
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "Revisado" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "Tu dispositivo ya ha sido revisado por uno de nuestros técnicos",
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "En reparacion" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "El técnico ha empezado con la reparación de tu producto",
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "Reparado pendiente de pago" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "Tú dispositivo ha sido reparado, contactate con el administrador al siguiente número: " + celupartsContactPhone + " o al siguiente correo " + celupartsContactEmail + " para confirmar pago",
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "En camino" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "Producto " + equipmentData.equipmentBrand + " " + equipmentData.modelOrReference + " para devolución el día " + deliveryDate.deliveryDate + " al barrio " + deliveryAddress.deliveryAddress,
                                wasReviewed: false,
                                notificationType: "to_courier"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "Terminada" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "",
                                wasReviewed: false,
                                notificationType: "to_none"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "Devuelto sin reparacion" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "",
                                wasReviewed: false,
                                notificationType: "to_none"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "Retoma" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: "Tu pago sobre tu retoma se realizara pronto! Revisa tu medio de pago registrado a celuparts para confirmarlo.",
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                                .then(response => {
                                    console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : console.log("do nothing")
                setLoadingPut(false);
            })
            .then(finalResponse => {
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    text: 'Estado de solicitud actualizado!',
                })
                    .then(response => {
                        navigate(-1)
                    })
            })
            .catch(error => {
                console.log(error);
                setLoadingPut(false);
            });

    }

    const handleStatusChange = (e) => {
        setStatus((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handlePaymentStatusChange = (e) => {
        setPaymentStatus((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleProductReturnedChange = (e) => {
        setProductReturned((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(function () {
        setLoading(true);
        getSingleRequestStatus({ id: params.id })
            .then((response) => {
                console.log("request status response",response)
                setDataRequestStatus(response)
                setIdRequest({ idRequest: response.idRequest })
                setStatus({ status: response.status })
                setPaymentStatus({ paymentStatus: response.paymentStatus })
                setProductReturned({ productReturned: response.productReturned })
                // getRequestNotificationByIdRequest({idRequest: response.idRequest})
                //     .then((response) => {
                //         console.log("requestNotificationByIdRequest:", response)
                //     })
                //     .catch(error => {
                //         console.log("Error in requestNotificationByIdRequest",error)
                //     })
                getRequestNotificationByIdRequest({ idRequest: response.idRequest })
                    .then(response2 => {
                        console.log("requestNotificationByIdRequest:", response2)
                        setNotifications(response2)
                        /*Esta parte se necesita para el mensaje final al mensajero donde necesita saber fecha, 
                        nombre del producto y direccion de entrega*/
                        getSingleRequest({ id: response.idRequest })
                            .then(response3 => {
                                setDeliveryDate({ deliveryDate: new Date(response3[0].homeServices[0].deliveryDate) })
                                setDeliveryAddress({ deliveryAddress: response3[0].deliveryAddress })
                                getSingleEquipment({ id: response3[0].idEquipment })
                                    .then(response => {
                                        setEquipmentData({
                                            equipmentBrand: response.equipmentBrand,
                                            modelOrReference: response.modelOrReference
                                        })
                                        setLoading(false);
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                                setLoading(false);
                            })
                        getCelupartsInfo()
                            .then(response => {
                                console.log("respuesta de celuparts info", response[0])
                                setCelupartsContactPhone(response[0].contactPhone)
                                setCelupartsContactEmail(response[0].contactEmail)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false);
                    })
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [params.id, idRequest.idRequest])

    return (
        loading ? <div>Cargando...</div> : 
            <div>
                <div>
                    <Row>
                        <Col>
                            <Card className='container'>
                                <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                    Actualizar estado de solicitud
                                </CardTitle>
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                            <i className="bi bi-card-list"> </i>
                                            <strong>Datos del estado</strong>
                                        </CardSubtitle>
                                        {
                                            JSON.parse(localStorage.getItem('user')).role === "mensajero" ?
                                                <FormGroup>
                                                    <Label for="status">Estado solicitud</Label>
                                                    <Input
                                                        type="select"
                                                        name="status"
                                                        id="status"
                                                        value={status.status}
                                                        onChange={handleStatusChange}
                                                    >
                                                        <option>Iniciada</option>
                                                        <option>En proceso de recogida</option>
                                                        <option>En camino</option>
                                                        <option value="En devolucion">En devolución</option>
                                                        <option value="Devuelto sin reparacion">Devuelto sin reparación</option>
                                                        <option>Terminada</option>
                                                    </Input>
                                                </FormGroup>
                                                :
                                                <FormGroup>
                                                    <Label for="status">Estado solicitud</Label>
                                                    <Input
                                                        type="select"
                                                        name="status"
                                                        id="status"
                                                        value={status.status}
                                                        onChange={handleStatusChange}
                                                    >
                                                        <option>Iniciada</option>
                                                        <option>En proceso de recogida</option>
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
                                                    </Input>
                                                </FormGroup>
                                        }
                                        {
                                            JSON.parse(localStorage.getItem('user')).role === "mensajero" ?
                                                null :
                                                <FormGroup>
                                                    <Label for="paymentStatus">Estado de pago</Label>
                                                    <Input
                                                        type="select"
                                                        name="paymentStatus"
                                                        id="paymentStatus"
                                                        defaultValue={paymentStatus.paymentStatus}
                                                        onChange={handlePaymentStatusChange}
                                                    >
                                                        <option>Pago</option>
                                                        <option>No pago</option>
                                                    </Input>
                                                </FormGroup>
                                        }
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
                                        {
                                            loadingPut ? (
                                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="sr-only">Cargando...</span>
                                                </button>
                                            )
                                                : (
                                                    <Button className="btn" color="primary">Guardar</Button>
                                                )
                                        }
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        
    )
}
