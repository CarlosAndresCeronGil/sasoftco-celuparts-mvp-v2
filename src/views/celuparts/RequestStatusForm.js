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
import getRequestNotificationByIdRequest from '../../services/getRequestNotificationByIdRequest';
import getSingleEquipment from '../../services/getSingleEquipment';
import getSingleRequest from '../../services/getSingleRequest';
import getSingleRequestStatus from '../../services/getSingleRequestStatus';
import putRequestNotification from '../../services/putRequestNotification';
import putRequestStatus from '../../services/putRequestStatus';
import Swal from 'sweetalert2'
import getCelupartsInfo from '../../services/getCelupartsInfo';
import putRequestHistory from '../../services/putRequestHistory';
import postRequestHistory from '../../services/postRequestHistory';
import getRequestHistoryByIdRequest from '../../services/getRequestHistoryByIdRequest';
import putHomeServiceByIdRequest from '../../services/putHomeServiceByIdRequest';
import putRepairStartDateByIdRequest from '../../services/putRepairStartDateByIdRequest';

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
    // console.log('Date: ', deliveryDate.deliveryDate.toLocaleDateString('es', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }))

    const [celupartsContactPhone, setCelupartsContactPhone] = useState("")
    const [celupartsContactEmail, setCelupartsContactEmail] = useState("")

    const [loading, setLoading] = useState(false);
    const [loadingPut, setLoadingPut] = useState(false);

    //En caso de que sea una reparacion, el flujo no debe permitir seguir al estado "En reparacion"
    const [isRepair, setIsRepair] = useState(false)

    //Usado para filtrar cuales estados no mostrar
    const [requestHistory, setRequestHistory] = useState([])

    const [currentStatus, setCurrentStatus] = useState('')

    const [currentOption, setCurrentOption] = useState({
        value: '',
        toShow: '',
        priority: 0
    })

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
            toShow: 'Iniciada',
            priority: 0,
            showToCourier: true,
            showToTechnician: true
        },
        {
            value: "En proceso de recogida",
            toShow: 'En proceso de recogida',
            priority: 1,
            showToCourier: true,
            showToTechnician: false
        },
        {
            value: "Recibida tecnico",
            toShow: 'Recibida técnico',
            priority: 2,
            showToCourier: false,
            showToTechnician: true
        },
        {
            value: "Revisado",
            toShow: 'Revisado',
            priority: 3,
            showToCourier: false,
            showToTechnician: true
        },
        {
            value: "En reparacion",
            toShow: 'En reparación',
            priority: 4,
            showToCourier: false,
            showToTechnician: true
        },
        {
            value: "Reparado pendiente de pago",
            toShow: 'Reparado, pendiente de pago',
            priority: 5.1,
            showToCourier: false,
            showToTechnician: true
        },
        {
            value: "En camino",
            toShow: 'En camino',
            priority: 6,
            showToCourier: true,
            showToTechnician: false
        },
        {
            value: "Terminada",
            toShow: 'Terminada',
            priority: 7,
            showToCourier: true,
            showToTechnician: false
        },
        {
            value: "En devolucion",
            toShow: 'En devolución',
            priority: 4,
            showToCourier: true,
            showToTechnician: false
        },
        {
            value: "Devuelto sin reparacion",
            toShow: 'Devuelto sin reparación',
            priority: 5.2,
            showToCourier: true,
            showToTechnician: false
        },
        {
            value: "Retoma",
            toShow: 'Retoma',
            priority: 4,
            showToCourier: false,
            showToTechnician: false
        },
        {
            value: "Abandonada",
            toShow: 'Abandonada',
            priority: -1,
            showToCourier: false,
            showToTechnician: false
        },
        {
            value: "Anulado por IMEI",
            toShow: 'Anulado por IMEI',
            priority: 2,
            showToCourier: true,
            showToTechnician: false
        },
    ]

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
                postRequestHistory({
                    idRequest: data.idRequest,
                    status: status.status,
                    date: new Date()
                })
                    .catch(error => {
                        console.log(error)
                    })
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
                                    // console.log("exito!", response)
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
                                    // console.log("exito!", response)
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
                                    // console.log("exito!", response)
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
                                    // console.log("exito!", response)
                                    putRepairStartDateByIdRequest({
                                        id: tdata.idRequest
                                    })
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
                                    // console.log("exito!", response)
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
                                // message: "Producto " + equipmentData.equipmentBrand + " " + equipmentData.modelOrReference + " para devolución el día " + deliveryDate.deliveryDate.toLocaleDateString('es', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }) + " al barrio " + deliveryAddress.deliveryAddress,
                                message: "Producto " + equipmentData.equipmentBrand + " " + equipmentData.modelOrReference + " para devolución el día " + (addDays(new Date(), 1)).toLocaleDateString('es', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }) + " al barrio " + deliveryAddress.deliveryAddress,
                                wasReviewed: false,
                                notificationType: "to_courier"
                            })
                                .then(response => {
                                    // console.log("exito!", response)
                                    putHomeServiceByIdRequest({
                                        idRequest: tdata.idRequest,
                                        deliveryDate: addDays(new Date(), 1)
                                    })
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
                                    // console.log("exito!", response)
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
                                    // console.log("exito!", response)
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
                                    // console.log("exito!", response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : status.status === "Anulado por IMEI" ? (
                    notifications.map((tdata) => (
                        tdata.idRequest === idRequest.idRequest ? (
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
                                    console.log(error)
                                })
                        ) : null
                    ))
                ) : console.log("do nothing")
                setLoadingPut(false);
            })
            .finally(finalResponse => {
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

    const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
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

    const handleBackPage = (e) => {
        navigate(-1)
    }

    useEffect(function () {
        setLoading(true);
        getSingleRequestStatus({ id: params.id })
            .then((responseRequestStatus) => {
                // console.log("request status response", responseRequestStatus)
                responseRequestStatus.request.requestType == "Reparacion" ? setIsRepair(true) : setIsRepair(false)
                setDataRequestStatus(responseRequestStatus)
                setIdRequest({ idRequest: responseRequestStatus.idRequest })
                setStatus({ status: responseRequestStatus.status })
                setCurrentStatus(responseRequestStatus.status)
                setCurrentOption({
                    value: responseRequestStatus.status,
                    toShow: options.find(n => n.value === responseRequestStatus.status).toShow,
                    priority: options.find(n => n.value === responseRequestStatus.status).priority
                })
                setPaymentStatus({ paymentStatus: responseRequestStatus.paymentStatus })
                setProductReturned({ productReturned: responseRequestStatus.productReturned })
                getRequestNotificationByIdRequest({ idRequest: responseRequestStatus.idRequest })
                    .then(response2 => {
                        setNotifications(response2)
                        /*Esta parte se necesita para el mensaje final al mensajero donde necesita saber fecha,
                        nombre del producto y direccion de entrega*/
                        getSingleRequest({ id: responseRequestStatus.idRequest })
                            .then(response3 => {
                                setDeliveryDate({ deliveryDate: new Date(response3[0].homeServices[0].deliveryDate) })
                                setDeliveryAddress({ deliveryAddress: response3[0].deliveryAddress })
                                getSingleEquipment({ id: response3[0].idEquipment })
                                    .then(response => {
                                        setEquipmentData({
                                            equipmentBrand: response.equipmentBrand,
                                            modelOrReference: response.modelOrReference
                                        })
                                        getRequestHistoryByIdRequest({ id: responseRequestStatus.idRequest })
                                            .then(responseHistory => {
                                                setRequestHistory(responseHistory)
                                                setLoading(false);
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                setLoading(false)
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        setLoading(false)
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                                setLoading(false);
                            })
                        getCelupartsInfo()
                            .then(response => {
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
                <Button className='btn btn-danger' onClick={handleBackPage}>
                    Atrás
                </Button>
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
                                                        {
                                                            options.map((option, index) => (
                                                                <option hidden={
                                                                    (!option.showToCourier) ||
                                                                    ((currentOption.priority != 4 && currentOption.priority != 5.1) && option.priority > currentOption.priority + 1 && currentOption.value != "En devolucion") ||
                                                                    ((currentOption.value != "En devolucion" && currentOption.priority != 5.1 && option.priority < currentOption.priority + 1) && !requestHistory.some(n => n.status === option.value)) ||
                                                                    (option.value == "Elija una opcion") ||
                                                                    (requestHistory.some(n => n.status === option.value)) ||
                                                                    (currentOption.priority == 2 && currentOption.value == "Anulado por IMEI" && option.priority >= 2) ||
                                                                    (currentOption.priority == 4 && currentOption.value == "En reparacion" && option.priority >= 5.2) ||
                                                                    (currentOption.priority == 4 && currentOption.value == "En devolucion" && ((option.priority == 5.1 || option.priority <= 4) || option.priority > currentOption.priority + 1.2)) ||
                                                                    (currentOption.priority == 4 && currentOption.value == "Retoma") ||
                                                                    (currentOption.priority == 5.1 && option.priority != 6)
                                                                }
                                                                    value={option.value} key={index}>{option.toShow}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                </FormGroup>
                                                : JSON.parse(localStorage.getItem('user')).role === "tecnico" ?
                                                    <FormGroup>
                                                        {
                                                            !isRepair
                                                        }
                                                        <br></br>
                                                        <Label for="status">Estado solicitud</Label>
                                                        <Input
                                                            type="select"
                                                            name="status"
                                                            id="status"
                                                            value={status.status}
                                                            onChange={handleStatusChange}
                                                        >
                                                            {
                                                                options.map((option, index) => (
                                                                    <option hidden={
                                                                        (!option.showToTechnician) ||
                                                                        ((currentOption.priority != 4 && currentOption.priority != 5.1) && option.priority > currentOption.priority + 1 && currentOption.value != "En devolucion") ||
                                                                        ((currentOption.value != "En devolucion" && currentOption.priority != 5.1 && option.priority < currentOption.priority + 1) && !requestHistory.some(n => n.status === option.value)) ||
                                                                        (option.value == "Elija una opcion") ||
                                                                        (requestHistory.some(n => n.status === option.value) && !(!isRepair && requestHistory.some(n => n.status == "Revisado") && option.priority > 2)) ||
                                                                        (currentOption.priority == 2 && currentOption.value == "Anulado por IMEI" && option.priority >= 2) ||
                                                                        (currentOption.priority == 4 && currentOption.value == "En reparacion" && option.priority >= 5.2) ||
                                                                        (currentOption.priority == 4 && currentOption.value == "En devolucion" && ((option.priority == 5.1 || option.priority <= 4) || option.priority > currentOption.priority + 1.2)) ||
                                                                        (currentOption.priority == 4 && currentOption.value == "Retoma") ||
                                                                        (currentOption.priority == 5.1 && option.priority != 6) ||
                                                                        (!isRepair && option.priority > 3)
                                                                    }
                                                                        value={option.value} key={index}>{option.toShow}</option>
                                                                ))
                                                            }
                                                        </Input>
                                                    </FormGroup> :
                                                    <FormGroup>
                                                        <Label for="status">Estado solicitud</Label>
                                                        <Input
                                                            type="select"
                                                            name="status"
                                                            id="status"
                                                            value={status.status}
                                                            onChange={handleStatusChange}
                                                        >
                                                            {
                                                                options.map((option, index) => (
                                                                    <option hidden={
                                                                        ((currentOption.priority != 4 && currentOption.priority != 5.1) && option.priority > currentOption.priority + 1 && currentOption.value != "En devolucion") ||
                                                                        ((currentOption.value != "En devolucion" && currentOption.priority != 5.1 && option.priority < currentOption.priority + 1) && !requestHistory.some(n => n.status === option.value)) ||
                                                                        (option.value == "Elija una opcion") ||
                                                                        (requestHistory.some(n => n.status === option.value)) ||
                                                                        (currentOption.priority == 2 && currentOption.value == "Anulado por IMEI" && option.priority >= 2) ||
                                                                        (currentOption.priority == 4 && currentOption.value == "En reparacion" && option.priority >= 5.2) ||
                                                                        (currentOption.priority == 4 && currentOption.value == "En devolucion" && ((option.priority == 5.1 || option.priority <= 4) || option.priority > currentOption.priority + 1.2)) ||
                                                                        (currentOption.priority == 4 && currentOption.value == "Retoma") ||
                                                                        (currentOption.priority == 5.1 && option.priority != 6) ||
                                                                        (!isRepair && option.value == "En reparacion")
                                                                    }
                                                                        value={option.value} key={index}>{option.toShow}</option>
                                                                ))
                                                            }
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
                                        }
                                        {
                                            JSON.parse(localStorage.getItem('user')).role === "mensajero" || JSON.parse(localStorage.getItem('user')).role === "tecnico" ?
                                                null :
                                                currentStatus == "Iniciada" ||
                                                    currentStatus == "En proceso de recogida" ||
                                                    currentStatus == "Recibida tecnico" ||
                                                    currentStatus == "Revisado" ||
                                                    currentStatus == "En reparacion"
                                                    ?
                                                    null
                                                    :
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
                                        {
                                            JSON.parse(localStorage.getItem('user')).role === "tecnico" ?
                                                null :
                                                currentStatus == "Iniciada" ||
                                                currentStatus == "Recibida tecnico" ||
                                                currentStatus == "Revisado" ||
                                                currentStatus == "En reparacion" ||
                                                currentStatus == "Reparado pendiente de pago" ||
                                                currentStatus == "Retoma"
                                                ? null :
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
                                        }
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
