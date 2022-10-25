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
import Swal from 'sweetalert2';

import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

import { useNavigate } from 'react-router-dom';
import postRequest from '../../services/postRequest';
import postEquipment from '../../services/postEquipment';
import postRequestStatus from '../../services/postRequestStatus';
import postRepair from '../../services/postRepair';
import postRepairPayment from '../../services/postRepairPayment';
import postHomeService from '../../services/postHomeService';
import postRequestNotification from '../../services/postRequestNotification'
import postRequestHistory from '../../services/postRequestHistory';

import getRequestWithUserInfo from '../../services/getRequestWithUserInfo';
import getCellphoneBrands from '../../services/getCellphoneBrands'
import getComputerBrands from '../../services/getComputerBrands'
import getTypeOfEquipments from '../../services/getTypeOfEquipments'
import getVerifyImei from '../../services/getVerifyImei';

import { Checkbox } from '@blueprintjs/core';
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getUserLastRepairRequestInfo from '../../services/getUserLastRepairRequestInfo';
import ComponentCard from '../../components/ComponentCard';


export default function RequestRepairForm() {

    //Variables del formulario
    const [typeOfEquipment, setTypeOfEquipment] = useState({ typeOfEquipment: '1' })
    const [imei, setImei] = useState('')
    const [serial, setSerial] = useState('')
    const [verifyResponse, setVerifyResponse] = useState('');
    const [isSameAddresses, setIsSameAddresses] = useState(false);
    const [pickUpAddress, setPickUpAddress] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [equipmentBrand, setEquipmentBrand] = useState('');

    /*Datos donde iran la lista de marcas de celulares, computadoras mas populares y tipops de
    dispositivo*/
    const [cellphoneList, setCellphoneList] = useState([])
    const [computersList, setComputersList] = useState([])
    const [typeOfEquipmentList, setTypeOfEquipmentList] = useState([])

    /**Este objeto pondra la ultima direccion registrada por el cliente para que sea llenado este
     * campo automaticamente
     */


    const handleSameAddresses = () => {
        setIsSameAddresses(!isSameAddresses)
    }

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
                getCellphoneBrands()
                    .then(cellphonesResponse => {
                        setCellphoneList(cellphonesResponse)
                        getComputerBrands()
                            .then(computersResponse => {
                                setComputersList(computersResponse)
                                getUserLastRepairRequestInfo({ id: JSON.parse(localStorage.getItem('user')).idUser })
                                    .then(lastRequestInfoResponse => {
                                        setPickUpAddress(lastRequestInfoResponse[0].requests[0].pickUpAddress)
                                        setDeliveryAddress(lastRequestInfoResponse[0].requests[0].deliveryAddress)
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
            })
            .catch(error => {
                console.log(error)
                setLoadingPage(false)
            })
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true);

        console.log("Entro al handleSubmit")

        const formData = new FormData()
        //formData.append("typeOfEquipment", e.target.elements.typeOfEquipment.value)
        formData.append("idTypeOfEquipment", e.target.elements.typeOfEquipment.value)
        formData.append("equipmentBrand", equipmentBrand)
        formData.append("modelOrReference", e.target.elements.modelOrReference.value)
        formData.append("imeiOrSerial", e.target.elements.imei.value)
        // formData.append("equipmentInvoice", null)

        const deliveryAddress2 = isSameAddresses ? e.target.elements.pickUpAddress.value : e.target.elements.deliveryAddress.value
        console.log('deliveryAddress: ', deliveryAddress2)

        postEquipment(formData)
            .then(data => {
                postRequest({
                    idUser: JSON.parse(localStorage.getItem('user')).idUser,
                    idEquipment: data.idEquipment,
                    requestType: "Reparacion",
                    pickUpAddress: pickUpAddress,
                    deliveryAddress: deliveryAddress2,
                    statusQuote: "Pendiente",
                    autoDiagnosis: e.target.elements.autoDiagnosis.value
                })
                    .then(data => {
                        getRequestWithUserInfo({ id: data.idRequest })
                            .then(userInfo => {
                                postRequestNotification({
                                    idRequest: data.idRequest,
                                    message: "Nueva solicitud de servicio a domicilio a la dirección: " + data.pickUpAddress + " para la fecha " + startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate() + " a las " + startDate.getHours() + ":" + startDate.getMinutes() + " para recoger el dispositivo " + equipmentBrand + " " + e.target.elements.modelOrReference.value + " con imei o serial: " + e.target.elements.imei.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de teléfono de contácto: " + userInfo[0].userDto.phone + ", el usuario decidió pagar por medio de " + e.target.elements.paymentMethod.value,
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
                        postRequestHistory({
                            idRequest: data.idRequest,
                            status: "Iniciada",
                            date: new Date()
                        })
                            .catch(error => {
                                setLoading(false)
                                console.log(error)
                            })
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

    const handleCancel = () => {
        navigate("/home/dashboards/dashboard1")
    }

    const currentRole = JSON.parse(localStorage.getItem('user')).role;


    return (
        loadingPage ? <div>Cargando...</div> :
            <div>
                <BreadCrumbsCeluparts />
                <div>
                    <Row>
                        <Col>
                            {/* <Card className='container'> */}
                            <CardTitle tag="h4" className="border-bottom p-3 mb-0 justify-content-start" >
                                Nueva solicitud de reparación
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <ComponentCard title="Datos de la solicitud">
                                        {/* <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                            <i className="bi bi-box-seam"> </i>
                                            <strong>Datos de la solicitud</strong>
                                        </CardSubtitle> */}
                                        <FormGroup>
                                            <Label for="pickUpAddress">Dirección de recogida*</Label>
                                            <Checkbox className='ms-0 ms-md-5' label="Usar la misma dirección" onChange={handleSameAddresses} />
                                            <Input
                                                id="pickUpAddress"
                                                name="pickUpAddress"
                                                value={pickUpAddress}
                                                onChange={(e) => setPickUpAddress(e.target.value)}
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
                                                        value={deliveryAddress}
                                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                                        placeholder="Ingrese la dirección donde se entregara el producto"
                                                        type="text"
                                                        required
                                                    />
                                                </FormGroup>
                                                :
                                                <FormGroup>
                                                    <Label for="deliveryAddress">Dirección de entrega*</Label>
                                                    <Input
                                                        id="deliveryAddress"
                                                        name="deliveryAddress"
                                                        value={pickUpAddress}
                                                        // placeholder="Ingrese la dirección donde se entregara el producto"
                                                        type="text"
                                                        disabled
                                                    />
                                                </FormGroup>
                                        }

                                        <Row>
                                            <Col lg='6'>
                                                <FormGroup>
                                                    <Label for="PickUpTime">Fecha y hora de recogida* (El mensajero llegará en un estimado de 1 hora)</Label>
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
                                                            <Label for="DeliveryDate">Fecha y hora de entrega* (El mensajero llegará en un estimado de 1 hora)</Label>
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
                                                            <Label for="DeliveryDate">Fecha y hora de entrega* (El mensajero llegará en un estimado de 1 hora)</Label>
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
                                        <FormGroup>
                                            <Label for="paymentMethod">Método de pago*</Label>
                                            <Input id="paymentMethod" name="paymentMethod" type="select">
                                                <option>Contraentrega</option>
                                                <option>Transferencia bancaria</option>
                                            </Input>
                                        </FormGroup>
                                    </ComponentCard>

                                    <ComponentCard title='Datos del equipo'>
                                        {/* --------------- Datos equipo ---------------- */}
                                        {/* <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                            <i className="bi bi-box-seam"> </i>
                                            <strong>Datos del equipo</strong>
                                        </CardSubtitle> */}
                                        <FormGroup>
                                            <Label for="typeOfEquipment">Tipo de dispositivo*</Label>
                                            <Input
                                                id="typeOfEquipment"
                                                name="select"
                                                type="select"
                                                value={typeOfEquipment.typeOfEquipment}
                                                onChange={(e) => {
                                                    setEquipmentBrand('')
                                                    setTypeOfEquipment({ typeOfEquipment: e.target.value })
                                                }}
                                            >
                                                {
                                                    typeOfEquipmentList.map((typeOfEquipmentData, index) => (
                                                        <option value={typeOfEquipmentData.idTypeOfEquipment} key={index}>{typeOfEquipmentData.equipmentTypeName}</option>
                                                    ))
                                                }
                                            </Input>
                                        </FormGroup>
                                        {
                                            typeOfEquipment.typeOfEquipment === '1' ?
                                                <FormGroup>
                                                    <Label for="typeOfEquipment">Marca del computador*</Label>
                                                    <Combobox
                                                        required
                                                        placeholder='Seleccione la marca del computador'
                                                        id="equipmentBrand"
                                                        name="equipmentBrand"
                                                        defaultValue={''}
                                                        data={computersList.map(computerData => computerData.brandName)}
                                                        value={equipmentBrand}
                                                        onChange={brand => setEquipmentBrand(brand)}
                                                    />
                                                </FormGroup>
                                                :
                                                <FormGroup>
                                                    <Label for="typeOfEquipment">Marca del celular*</Label>
                                                    <Combobox
                                                        required
                                                        placeholder='Seleccione la marca del celular'
                                                        id="equipmentBrand"
                                                        name="equipmentBrand"
                                                        defaultValue={''}
                                                        data={cellphoneList.map(cellphoneData => cellphoneData.brandName)}
                                                        value={equipmentBrand}
                                                        onChange={brand => setEquipmentBrand(brand)}
                                                    />
                                                </FormGroup>
                                        }

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
                                        <div className='d-flex justify-content-between'>
                                            {
                                                loading ? (
                                                    <button className="btn btn-primary center" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span className="sr-only">Cargando...</span>
                                                    </button>
                                                ) : (
                                                    computersList.some(e => e.brandName == equipmentBrand) || cellphoneList.some(e => e.brandName == equipmentBrand) ? (
                                                        <Button color="celuparts-dark-blue " className='btn btn-primary'>
                                                            Enviar
                                                        </Button>
                                                    ) :
                                                        <Button color="celuparts-dark-blue " className='btn btn-primary' disabled>
                                                            Enviar
                                                        </Button>
                                                )
                                            }
                                            <Button className='btn btn-danger justify-content-end' onClick={handleCancel}>
                                                Cancelar
                                            </Button>
                                        </div>
                                    </ComponentCard>
                                </Form>
                            </CardBody>
                            {/* </Card> */}

                        </Col>
                    </Row>
                </div>
            </div>
    )
}
