/* eslint-disable */
import React, { useState } from 'react'
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom';
import postRequest from '../../services/postRequest';
import postEquipment from '../../services/postEquipment';
import postRequestStatus from '../../services/postRequestStatus';
import postRepair from '../../services/postRepair';
import postRepairPayment from '../../services/postRepairPayment';
import postHomeService from '../../services/postHomeService';
import postRetoma from '../../services/postRetoma';
import postRetomaPayment from '../../services/postRetomaPayment';
import postRequestNotification from '../../services/postRequestNotification'
import getRequestWithUserInfo from '../../services/getRequestWithUserInfo';

export default function RequestForm() {
    //Variables del formulario
    const [requestType, setRequestType] = useState({ requestType: 'Reparacion' })
    const [typeOfEquipment, setTypeOfEquipment] = useState({ typeOfEquipment: 'Computador portatil' })

    //Variables para las fechas, finish date empieza en un día despues al día actual
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16))
    const [finishDate, setFinishDate] = useState(new Date().setDate(new Date().getDate() + 1))

    const [loading, setLoading] = useState(false);

    //Variables para permitir que se haga un registro en una hora correcta
    const isSelectedDateToday = new Date().getDate() === startDate.getDate();
    let minTimeHour = new Date().getHours();
    if (!isSelectedDateToday) minTimeHour = 0;

    //Datos necesarios para el mensaje de recogida al mensajero
    const [userPhone, setUserPhone] = useState("")

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (requestType.requestType === "Reparacion") {
            postEquipment({
                typeOfEquipment: e.target.elements.typeOfEquipment.value,
                equipmentBrand: e.target.elements.equipmentBrand.value,
                modelOrReference: e.target.elements.modelOrReference.value,
                imeiOrSerial: e.target.elements.imei.value,
                equipmentInvoice: e.target.elements.equipmentInvoice.value,
            })
                .then(data => {
                    postRequest({
                        idUser: JSON.parse(localStorage.getItem('user')).idUser,
                        idEquipment: data.idEquipment,
                        requestType: e.target.elements.requestType.value,
                        pickUpAddress: e.target.elements.pickUpAddress.value,
                        deliveryAddress: e.target.elements.deliveryAddress.value,
                        statusQuote: "Pendiente",
                    })
                        .then(data => {
                            getRequestWithUserInfo({ id: data.idRequest })
                                .then(userInfo => {
                                    setUserPhone(userInfo[0].userDto.phone)
                                    postRequestNotification({
                                        idRequest: data.idRequest,
                                        message: "Nueva solicitud de servicio a domicilio a la dirección: " + data.pickUpAddress + " para la fecha " + startDate.getFullYear()+"/"+(startDate.getMonth()+1)+"/"+startDate.getDate()+ " a las " + startDate.getHours() + ":"+ startDate.getMinutes() + " para recoger el dispositivo " + e.target.elements.equipmentBrand.value + " " + e.target.elements.modelOrReference.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de telefono de contácto: " + userInfo[0].userDto.phone,
                                        wasReviewed: false,
                                        notificationType: "to_courier"
                                    })
                                        .catch(error => {
                                            setLoading(false)
                                            console.log(error)
                                        })
                                })
                            postRepair({
                                idRequest: data.idRequest,
                                repairQuote: "0"
                            })
                                .then(data2 => {
                                    // console.log("Entro al then de repair", data2);
                                    postRepairPayment({
                                        idRepair: data2.idRepair,
                                        paymentMethod: e.target.elements.paymentMethod.value,
                                    })
                                        .then(finalResponse => {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Exito!',
                                                text: 'Solicitud de reparación enviada!',
                                            })
                                                .then(response => {
                                                    navigate("/home/user-repair-requests")
                                                })
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
                            postRequestStatus({
                                idRequest: data.idRequest,
                                status: "Iniciada",
                                paymentStatus: "No pago",
                                productReturned: false,
                                productSold: false
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            postHomeService({
                                idRequest: data.idRequest,
                                pickUpDate: startDate,
                                deliveryDate: finishDate
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            // postRequestNotification({
                            //     idRequest: data.idRequest,
                            //     message: "Nueva solicitud de servicio a domicilio a la dirección: " + data.pickUpAddress + " para la fecha " + startDate + " para recoger el dispositivo " + e.target.elements.equipmentBrand.value + " " + e.target.elements.modelOrReference.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de telefono de contácto: " + userPhone,
                            //     wasReviewed: false,
                            //     notificationType: "to_courier"
                            // })
                            //     .catch(error => {
                            //         setLoading(false)
                            //         console.log(error)
                            //     })
                            setLoading(false);
                        })
                        .catch(error => {
                            setLoading(false);
                            console.log(error);
                        })
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
        } else if (requestType.requestType === "Retoma") {
            postEquipment({
                typeOfEquipment: e.target.elements.typeOfEquipment.value,
                equipmentBrand: e.target.elements.equipmentBrand.value,
                modelOrReference: e.target.elements.modelOrReference.value,
                imeiOrSerial: e.target.elements.imei.value,
                equipmentInvoice: e.target.elements.equipmentInvoice.value,
            })
                .then(dataEquipment => {
                    postRequest({
                        idUser: JSON.parse(localStorage.getItem('user')).idUser,
                        idEquipment: dataEquipment.idEquipment,
                        requestType: e.target.elements.requestType.value,
                        pickUpAddress: e.target.elements.pickUpAddress.value,
                        deliveryAddress: e.target.elements.deliveryAddress.value,
                        statusQuote: "Pendiente",
                    })
                        .then(dataRequest => {
                            getRequestWithUserInfo({ id: dataRequest.idRequest })
                                .then(userInfo => {
                                    setUserPhone(userInfo[0].userDto.phone)
                                    postRequestNotification({
                                        idRequest: dataRequest.idRequest,
                                        message: "Nueva solicitud de servicio a domicilio a la dirección: " + dataRequest.pickUpAddress + " para la fecha " + startDate.getFullYear()+"/"+(startDate.getMonth()+1)+"/"+startDate.getDate()+ " a las " + startDate.getHours() + ":"+ startDate.getMinutes() + " para recoger el dispositivo " + e.target.elements.equipmentBrand.value + " " + e.target.elements.modelOrReference.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de telefono de contácto: " + userInfo[0].userDto.phone,
                                        wasReviewed: false,
                                        notificationType: "to_courier"
                                    })
                                        .catch(error => {
                                            setLoading(false)
                                            console.log(error)
                                        })
                                })
                            postRetoma({
                                idRequest: dataRequest.idRequest,
                                retomaQuote: "0",
                                deviceDiagnostic: ""
                            })
                                .then(dataRetoma => {
                                    // console.log("Entro al then de retoma", dataRetoma);
                                    postRetomaPayment({
                                        idRetoma: dataRetoma.idRetoma,
                                        paymentMethod: e.target.elements.paymentMethod.value
                                    })
                                        .then(finalResponse => {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Exito!',
                                                text: 'Solicitud de retoma enviada!',
                                            })
                                                .then(response => {
                                                    navigate("/home/user-retoma-requests")
                                                })
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
                            postRequestStatus({
                                idRequest: dataRequest.idRequest,
                                status: "Iniciada",
                                paymentStatus: "No pago",
                                productReturned: false,
                                productSold: false
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            postHomeService({
                                idRequest: dataRequest.idRequest,
                                pickUpDate: startDate,
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            postRequestNotification({
                                idRequest: dataRequest.idRequest,
                                message: "Nueva solicitud de servicio a domicilio a la dirección: " + dataRequest.pickUpAddress + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name,
                                wasReviewed: false,
                                notificationType: "to_courier",
                            })
                            setLoading(false);
                        })
                        .catch(error => {
                            setLoading(false);
                            console.log(error);
                        })
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Solicitud de retoma enviada!',
            })
                .then(response => {
                    navigate("/home/user-retoma-requests")
                })
        }
    }

    const isWeekDay = (date) => {
        const day = date.getDay();
        // return day !== 0 && day !== 6; sabados y domingos
        return day !== 0 //solo ignora los domingos
    }

    return (
        <div>
            <div>
                <Row>
                    <Col>
                        <Card className='container'>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                Nueva solicitud
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-box-seam"> </i>
                                        <strong>Datos de la solicitud</strong>
                                    </CardSubtitle>
                                    <FormGroup>
                                        <Label for="requestType">Tipo de solicitud*</Label>
                                        <Input
                                            id="requestType"
                                            name="requestType"
                                            type="select"
                                            value={requestType.requestType}
                                            onChange={(e) => setRequestType({ requestType: e.target.value })}
                                        >
                                            <option value="Reparacion">Reparación</option>
                                            <option>Retoma</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="pickUpAddress">Dirección de recogida*</Label>
                                        <Input
                                            id="pickUpAddress"
                                            name="pickUpAddress"
                                            placeholder="Ingrese la dirección donde se recogera el producto"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="deliveryAddress">Dirección de entrega*</Label>
                                        <Input
                                            id="deliveryAddress"
                                            name="deliveryAddress"
                                            placeholder="Ingrese la dirección donde se devolvera el producto"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="PickUpTime">Fecha y hora de recogida*</Label>
                                        <DatePicker
                                            id='PickUpTime'
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            showTimeSelect
                                            minTime={new Date(new Date().setHours(minTimeHour, 0, 0, 0))}
                                            maxTime={new Date(new Date().setHours(23, 59, 0, 0))}
                                            minDate={new Date()}
                                            includeTimes={[
                                                setHours(setMinutes(new Date(), 30), 8),
                                                setHours(setMinutes(new Date(), 0), 9),
                                                setHours(setMinutes(new Date(), 30), 9),
                                                setHours(setMinutes(new Date(), 0), 10),
                                                setHours(setMinutes(new Date(), 30), 10),
                                                setHours(setMinutes(new Date(), 0), 11),
                                                setHours(setMinutes(new Date(), 30), 11),
                                                setHours(setMinutes(new Date(), 0), 12),
                                                setHours(setMinutes(new Date(), 0), 14),
                                                setHours(setMinutes(new Date(), 30), 14),
                                                setHours(setMinutes(new Date(), 0), 15),
                                                setHours(setMinutes(new Date(), 30), 15),
                                                setHours(setMinutes(new Date(), 0), 16),
                                                setHours(setMinutes(new Date(), 30), 16),
                                                setHours(setMinutes(new Date(), 0), 17),
                                                setHours(setMinutes(new Date(), 30), 17),
                                                setHours(setMinutes(new Date(), 0), 18),
                                            ]}
                                            locale="es-CO"
                                            filterDate={isWeekDay}
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            timeFormat="HH:mm"
                                        />
                                    </FormGroup>
                                    {
                                        requestType.requestType === "Reparacion" ? (
                                            <FormGroup>
                                                <Label for="DeliveryDate">Fecha y hora de entrega*</Label>
                                                <DatePicker
                                                    id='DeliveryDate'
                                                    dateFormat="yyyy-MM-dd h:mm aa"
                                                    minDate={new Date().setDate(new Date().getDate() + 1)}
                                                    showTimeSelect
                                                    includeTimes={[
                                                        setHours(setMinutes(new Date(), 30), 8),
                                                        setHours(setMinutes(new Date(), 0), 9),
                                                        setHours(setMinutes(new Date(), 30), 9),
                                                        setHours(setMinutes(new Date(), 0), 10),
                                                        setHours(setMinutes(new Date(), 30), 10),
                                                        setHours(setMinutes(new Date(), 0), 11),
                                                        setHours(setMinutes(new Date(), 30), 11),
                                                        setHours(setMinutes(new Date(), 0), 12),
                                                        setHours(setMinutes(new Date(), 0), 14),
                                                        setHours(setMinutes(new Date(), 30), 14),
                                                        setHours(setMinutes(new Date(), 0), 15),
                                                        setHours(setMinutes(new Date(), 30), 15),
                                                        setHours(setMinutes(new Date(), 0), 16),
                                                        setHours(setMinutes(new Date(), 30), 16),
                                                        setHours(setMinutes(new Date(), 0), 17),
                                                        setHours(setMinutes(new Date(), 30), 17),
                                                        setHours(setMinutes(new Date(), 0), 18),
                                                    ]}
                                                    selected={finishDate}
                                                    onChange={(date) => setFinishDate(date)}
                                                    timeFormat="HH:mm"
                                                />
                                            </FormGroup>
                                        )
                                            : (<FormGroup>
                                                <Label for="DeliveryDate">Fecha y hora tentativa a entrega en caso de no aceptar valor de venta*</Label>
                                                <DatePicker
                                                    id='DeliveryDate'
                                                    dateFormat="yyyy-MM-dd h:mm aa"
                                                    minDate={new Date().setDate(new Date().getDate() + 1)}
                                                    showTimeSelect
                                                    selected={finishDate}
                                                    includeTimes={[
                                                        setHours(setMinutes(new Date(), 30), 8),
                                                        setHours(setMinutes(new Date(), 0), 9),
                                                        setHours(setMinutes(new Date(), 30), 9),
                                                        setHours(setMinutes(new Date(), 0), 10),
                                                        setHours(setMinutes(new Date(), 30), 10),
                                                        setHours(setMinutes(new Date(), 0), 11),
                                                        setHours(setMinutes(new Date(), 30), 11),
                                                        setHours(setMinutes(new Date(), 0), 12),
                                                        setHours(setMinutes(new Date(), 0), 14),
                                                        setHours(setMinutes(new Date(), 30), 14),
                                                        setHours(setMinutes(new Date(), 0), 15),
                                                        setHours(setMinutes(new Date(), 30), 15),
                                                        setHours(setMinutes(new Date(), 0), 16),
                                                        setHours(setMinutes(new Date(), 30), 16),
                                                        setHours(setMinutes(new Date(), 0), 17),
                                                        setHours(setMinutes(new Date(), 30), 17),
                                                        setHours(setMinutes(new Date(), 0), 18),
                                                    ]}
                                                    onChange={(date) => setFinishDate(date)}
                                                    timeFormat="HH:mm"
                                                />
                                            </FormGroup>
                                            )
                                    }
                                    <FormGroup>
                                        {
                                            requestType.requestType === "Reparacion" ? (
                                                <Label for="paymentMethod">Método de pago*</Label>
                                            ) : (
                                                <Label for="paymentMethod">Método de pago (de celuparts a ti)*</Label>
                                            )
                                        }

                                        <Input id="paymentMethod" name="paymentMethod" type="select">
                                            <option>Contraentrega</option>
                                            <option>Transferencia bancaria</option>
                                        </Input>
                                    </FormGroup>
                                    {/* --------------- Datos equipo ---------------- */}
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-box-seam"> </i>
                                        <strong>Datos del equipo</strong>
                                    </CardSubtitle>
                                    <FormGroup>
                                        <Label for="typeOfEquipment">Tipo de dispositivo*</Label>
                                        <Input
                                            id="typeOfEquipment"
                                            name="select"
                                            type="select"
                                            value={typeOfEquipment.typeOfEquipment}
                                            onChange={(e) => setTypeOfEquipment({ typeOfEquipment: e.target.value })}
                                        >
                                            <option value="Computador portatil">Computador portátil</option>
                                            <option value="Telefono celular">Teléfono celular</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="equipmentBrand">Marca del dispositivo*</Label>
                                        <Input
                                            id="equipmentBrand"
                                            name="equipmentBrand"
                                            placeholder="Ingrese la marca del dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="modelOrReference">Modelo o referencia dispositivo*</Label>
                                        <Input
                                            id="modelOrReference"
                                            name="modelOrReference"
                                            placeholder="Ingrese el modelo o referencia del dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    {
                                        typeOfEquipment.typeOfEquipment === "Computador portatil" ?
                                            <FormGroup>
                                                <Label for="imei">Serial del dispositivo*</Label>
                                                <Input
                                                    id="imei"
                                                    name="imei"
                                                    placeholder="Ingrese el imei dispositivo"
                                                    type="text"
                                                    required
                                                />
                                            </FormGroup>
                                            :
                                            <FormGroup>
                                                <Label for="imei">Imei del dispositivo*</Label>
                                                <Input
                                                    id="imei"
                                                    name="imei"
                                                    placeholder="Ingrese el imei dispositivo"
                                                    type="text"
                                                    required
                                                />
                                            </FormGroup>
                                    }
                                    <FormGroup>
                                        <Label for="equipmentInvoice">Factura del dispositivo*</Label>
                                        <Input
                                            id="equipmentInvoice"
                                            name="equipmentInvoice"
                                            placeholder="Ingrese la factura dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    {
                                        loading ? (
                                            <button className="btn btn-primary" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span className="sr-only">Cargando...</span>
                                            </button>
                                        ) : (
                                            <Button color="celuparts-dark-blue">
                                                Enviar
                                            </Button>
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
