/* eslint-disable */
import React, { useEffect, useState } from 'react'
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
import * as Yup from 'yup';
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
import postRequestNotification from '../../services/postRequestNotification'

import getRequestWithUserInfo from '../../services/getRequestWithUserInfo';
import getCellphoneBrands from '../../services/getCellphoneBrands'
import getComputerBrands from '../../services/getComputerBrands'
import getTypeOfEquipments from '../../services/getTypeOfEquipments'
import getVerifyImei from '../../services/getVerifyImei';

import { Checkbox } from '@blueprintjs/core';

export default function RequestRepairForm() {

    //Variables del formulario
    const [typeOfEquipment, setTypeOfEquipment] = useState({ typeOfEquipment: '1' })
    const [imei, setImei] = useState('')
    const [serial, setSerial] = useState('')
    const [verifyResponse, setVerifyResponse] = useState('');
    const [isSameAddresses, setIsSameAddresses] = useState(false);

    /*Datos donde iran la lista de marcas de celulares, computadoras mas populares y tipops de
    dispositivo*/
    const [cellphoneList, setCellphoneList] = useState([])
    const [computersList, setComputersList] = useState([])
    const [typeOfEquipmentList, setTypeOfEquipmentList] = useState([])

    const handleSameAddresses = () => {
        setIsSameAddresses(!isSameAddresses)
    }

    console.log('isSameAddresses: ', isSameAddresses)

    //Variables para las fechas, finish date empieza en un día despues al día actual
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [finishDate, setFinishDate] = useState(tomorrow);

    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false)

    //Variables para permitir que se haga un registro en una hora correcta
    const isSelectedDateToday = new Date().getDate() === startDate.getDate();
    const isSelectedDateInFuture = +startDate > +new Date()
    let minTimeHour = new Date().getHours();
    if (!isSelectedDateToday) minTimeHour = 0;

    const date = new Date();
    let currentMins = date.getMinutes();
    let currentHour = date.getHours();
    if (isSelectedDateInFuture) {
        currentHour = 0;
        currentMins = 0;
    }

    const navigate = useNavigate()

    useEffect(function () {
        setLoadingPage(true)
        getTypeOfEquipments()
            .then(typeOfEquipmentResponse => {
                setTypeOfEquipmentList(typeOfEquipmentResponse)
                console.log("Lista de tipos de equipos", typeOfEquipmentResponse)
                getCellphoneBrands()
                    .then(cellphonesResponse => {
                        setCellphoneList(cellphonesResponse)
                        console.log("Lista de celulares", cellphonesResponse)
                        getComputerBrands()
                            .then(computersResponse => {
                                setComputersList(computersResponse)
                                console.log("Lista de computadoras", computersResponse)
                                setLoadingPage(false)
                            })
                            .catch(error => {
                                console.log(error)
                                setLoadingPage(false)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        setLoadingPage(false)
                    })
            })
            .catch(error => {
                console.log(error)
                setLoadingPage(false)
            })
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true);

        const formData = new FormData()
        //formData.append("typeOfEquipment", e.target.elements.typeOfEquipment.value)
        formData.append("idTypeOfEquipment", e.target.elements.typeOfEquipment.value)
        formData.append("equipmentBrand", e.target.elements.equipmentBrand.value)
        formData.append("modelOrReference", e.target.elements.modelOrReference.value)
        formData.append("imeiOrSerial", e.target.elements.imei.value)
        // formData.append("equipmentInvoice", null)

        const deliveryAddress = isSameAddresses ? e.target.elements.pickUpAddress.value : e.target.elements.deliveryAddress.value
        console.log('deliveryAddress: ', deliveryAddress)

        postEquipment(formData)
            .then(data => {
                postRequest({
                    idUser: JSON.parse(localStorage.getItem('user')).idUser,
                    idEquipment: data.idEquipment,
                    requestType: "Reparacion",
                    pickUpAddress: e.target.elements.pickUpAddress.value,
                    deliveryAddress: deliveryAddress,
                    statusQuote: "Pendiente",
                    autoDiagnosis: e.target.elements.autoDiagnosis.value
                })
                    .then(data => {
                        getRequestWithUserInfo({ id: data.idRequest })
                            .then(userInfo => {
                                postRequestNotification({
                                    idRequest: data.idRequest,
                                    message: "Nueva solicitud de servicio a domicilio a la dirección: " + data.pickUpAddress + " para la fecha " + startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate() + " a las " + startDate.getHours() + ":" + startDate.getMinutes() + " para recoger el dispositivo " + e.target.elements.equipmentBrand.value + " " + e.target.elements.modelOrReference.value + " con imei o serial: " + e.target.elements.imei.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de teléfono de contácto: " + userInfo[0].userDto.phone + ", el usuario decidió pagar por medio de " + e.target.elements.paymentMethod.value,
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
                                console.log("Entro al then de repair", data2);
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
                            deliveryDate: finishDate,
                        })
                            .catch(error => {
                                setLoading(false);
                                console.log(error);
                            });
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


    }

    const isWeekDay = (date) => {
        const day = date.getDay();
        // return day !== 0 && day !== 6; ignora sabados y domingos
        return day !== 0 //solo ignora los domingos
    }

    const handleVerifySerial = (e) => {
        e.preventDefault()
        getVerifyImei({ id: serial })
            .then(response => {
                console.log(response)
                setVerifyResponse(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleVerifyImei = (e) => {
        e.preventDefault()
        getVerifyImei({ id: imei })
            .then(response => {
                console.log(response)
                setVerifyResponse(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const currentRole = JSON.parse(localStorage.getItem('user')).role;


    return (
        loadingPage ? <div>Cargando...</div> :
            <div>
                <div>
                    <Row>
                        <Col>
                            <Card className='container'>
                                <CardTitle tag="h4" className="border-bottom p-3 mb-0 row justify-content-start">
                                    Nueva solicitud de reparación
                                </CardTitle>
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                            <i className="bi bi-box-seam"> </i>
                                            <strong>Datos de la solicitud</strong>
                                        </CardSubtitle>
                                        <FormGroup>
                                            <Label for="pickUpAddress">Dirección de recogida*</Label>
                                            <Checkbox className='ms-0 ms-md-5' label="Usar la misma dirección" onChange={handleSameAddresses} />
                                            <Input
                                                id="pickUpAddress"
                                                name="pickUpAddress"
                                                placeholder="Ingrese la dirección donde se recogera el producto"
                                                type="text"
                                                required
                                            />
                                        </FormGroup>

                                        {
                                            !isSameAddresses ?
                                                <FormGroup>
                                                    <Label for="deliveryAddress">Dirección de entrega*</Label>
                                                    <Input
                                                        id="deliveryAddress"
                                                        name="deliveryAddress"
                                                        placeholder="Ingrese la dirección donde se entregara el producto"
                                                        type="text"
                                                        required
                                                    />
                                                </FormGroup>
                                                : null
                                        }

                                        {/* <div className='d-flex align-items-center justify-content-center border'>
                                        <div className='d-flex align-items-center justify-content-center'> */}

                                        <Row>
                                            <Col lg='6'>
                                                <FormGroup>
                                                    <Label for="PickUpTime">Fecha y hora de recogida*</Label>
                                                    <DatePicker
                                                        id='PickUpTime'
                                                        className='form-control'
                                                        dateFormat="yyyy-MM-dd h:mm aa"
                                                        minTime={new Date(new Date().setHours(minTimeHour, currentMins, 0, 0))}
                                                        // minTime={new Date(new Date().setHours(currentHour, currentMins, 0, 0))}
                                                        maxTime={new Date(new Date().setHours(23, 59, 0, 0))}
                                                        minDate={new Date()}
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
                                                        filterDate={isWeekDay}
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        timeFormat="HH:mm"
                                                    />
                                                </FormGroup>
                                            </Col>


                                            <Col lg='6'>
                                                {
                                                    startDate.getDay() === 6 ?
                                                        <FormGroup>
                                                            <Label for="DeliveryDate">Fecha y hora de entrega*</Label>
                                                            <DatePicker
                                                                id='DeliveryDate'
                                                                className='form-control'
                                                                dateFormat="yyyy-MM-dd h:mm aa"
                                                                // minDate={new Date().setDate(new Date().getDate() + 1)}
                                                                minDate={new Date().setDate(new Date(startDate).getDate() + 1)}
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
                                                                // selected={new Date().setDate(new Date(startDate).getDate() + 2)}
                                                                selected={finishDate}
                                                                filterDate={isWeekDay}
                                                                onChange={(date) => setFinishDate(date)}
                                                                timeFormat="HH:mm"
                                                            />
                                                        </FormGroup>
                                                        :
                                                        <FormGroup>
                                                            <Label for="DeliveryDate">Fecha y hora de entrega*</Label>
                                                            <DatePicker
                                                                id='DeliveryDate'
                                                                className='form-control'
                                                                dateFormat="yyyy-MM-dd h:mm aa"
                                                                // minDate={new Date().setDate(new Date().getDate() + 1)}
                                                                minDate={new Date().setDate(new Date(startDate).getDate() + 1)}
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
                                                                // selected={new Date().setDate(new Date(startDate).getDate() + 2)}
                                                                selected={finishDate}
                                                                onChange={(date) => setFinishDate(date)}
                                                                filterDate={isWeekDay}
                                                                timeFormat="HH:mm"
                                                            />
                                                        </FormGroup>
                                                }
                                            </Col>
                                        </Row>

                                        {/* </div> */}

                                        {/* <div className='d-flex align-items-center justify-content-center border'> */}

                                        {/* </div> */}


                                        {/* </div> */}


                                        <FormGroup>
                                            <Label for="paymentMethod">Método de pago*</Label>
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
                                                {
                                                    typeOfEquipmentList.map((typeOfEquipmentData, index) => (
                                                        <option value={typeOfEquipmentData.idTypeOfEquipment} key={index}>{typeOfEquipmentData.equipmentTypeName}</option>
                                                    ))
                                                }
                                                {/* <option value="Computador portatil">Computador portátil</option>
                                            <option value="Telefono celular">Teléfono celular</option> */}
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="equipmentBrand">Marca del dispositivo*</Label>
                                            <Input
                                                id="equipmentBrand"
                                                name="equipmentBrand"
                                                placeholder="Ingrese la marca del dispositivo"
                                                type="select"
                                                required
                                            >
                                                {
                                                    typeOfEquipment.typeOfEquipment === '1' ?
                                                        computersList.map((computerData, index) => (
                                                            <option key={index}>{computerData.brandName}</option>
                                                        ))
                                                        :
                                                        cellphoneList.map((cellphoneData, index) => (
                                                            <option key={index}>{cellphoneData.brandName}</option>
                                                        ))
                                                }
                                            </Input>
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
                                            typeOfEquipment.typeOfEquipment === '1' ?
                                                <div>
                                                    <FormGroup>
                                                        <Label for="imei">Serial del dispositivo*</Label>
                                                        <Input
                                                            id="imei"
                                                            name="imei"
                                                            value={serial}
                                                            placeholder="Ingrese el imei dispositivo"
                                                            type="text"
                                                            onChange={(e) => setSerial(e.target.value)}
                                                            required
                                                        />
                                                    </FormGroup>
                                                    {
                                                        serial === '' && currentRole !== 'user' ?
                                                            <FormGroup>
                                                                <Button disabled>
                                                                    Verificar serial
                                                                </Button>
                                                            </FormGroup>
                                                            : currentRole !== 'user' ?
                                                                <FormGroup>
                                                                    <Button onClick={handleVerifySerial}>
                                                                        Verificar serial
                                                                    </Button>
                                                                </FormGroup>
                                                                : null
                                                    }
                                                </div>
                                                :
                                                <div>
                                                    <FormGroup>
                                                        <Label for="imei">Imei del dispositivo*</Label>
                                                        <Input
                                                            id="imei"
                                                            name="imei"
                                                            value={imei}
                                                            placeholder="Ingrese el imei dispositivo"
                                                            type="text"
                                                            onChange={(e) => setImei(e.target.value)}
                                                            required
                                                        />
                                                    </FormGroup>
                                                    {
                                                        imei === '' && currentRole !== 'user' ?
                                                            <FormGroup>
                                                                <Button disabled>
                                                                    Verificar imei
                                                                </Button>
                                                            </FormGroup>
                                                            : currentRole !== 'user' ?
                                                                <FormGroup>
                                                                    <Button onClick={handleVerifyImei}>
                                                                        Verificar imei
                                                                    </Button>
                                                                </FormGroup>
                                                                : null
                                                    }
                                                </div>
                                        }
                                        {
                                            verifyResponse
                                        }
                                        <FormGroup>
                                            <Label for="autoDiagnosis">Describe brevemente en qué falla tu equipo*</Label>
                                            <Input
                                                id="autoDiagnosis"
                                                name="autoDiagnosis"
                                                placeholder="máximo 250 caracteres"
                                                type="textarea"
                                                maxLength={250}
                                                required
                                            />
                                        </FormGroup>
                                        {
                                            loading ? (
                                                <button className="btn btn-primary center" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="sr-only">Cargando...</span>
                                                </button>
                                            ) : (
                                                <Button color="celuparts-dark-blue " className='btn btn-primary'>
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
