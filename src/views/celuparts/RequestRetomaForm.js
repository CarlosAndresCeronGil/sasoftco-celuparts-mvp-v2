/* eslint-disable */
import React, { useState, useEffect } from 'react'
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

import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

import { useNavigate } from 'react-router-dom';
import postRequest from '../../services/postRequest';
import postEquipment from '../../services/postEquipment';
import postRequestStatus from '../../services/postRequestStatus';
import postHomeService from '../../services/postHomeService';
import postRetoma from '../../services/postRetoma';
import postRetomaPayment from '../../services/postRetomaPayment';
import postRequestNotification from '../../services/postRequestNotification'
import postRequestHistory from '../../services/postRequestHistory';

import getRequestWithUserInfo from '../../services/getRequestWithUserInfo';
import getCellphoneBrands from '../../services/getCellphoneBrands'
import getComputerBrands from '../../services/getComputerBrands'
import getTypeOfEquipments from '../../services/getTypeOfEquipments'
import getVerifyImei from '../../services/getVerifyImei';

import { Checkbox } from '@blueprintjs/core';
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getUserLastRetomaRequestInfo from '../../services/getUserLastRetomaRequestInfo';
import ComponentCard from '../../components/ComponentCard';
import getSmartWatchesBrands from '../../services/getSmartWatchesBrands';
import getTabletsBrands from '../../services/getTabletsBrands';


export default function RequestRetomaForm() {


    const [selectedFile, setSelectedFile] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    //Variables del formulario
    const [typeOfEquipment, setTypeOfEquipment] = useState({ typeOfEquipment: '1' })
    const [imei, setImei] = useState('')
    const [serial, setSerial] = useState('')
    const [verifyResponse, setVerifyResponse] = useState('')
    const [isSameAddresses, setIsSameAddresses] = useState(false);
    const [pickUpAddress, setPickUpAddress] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [equipmentBrand, setEquipmentBrand] = useState('');

    /*Datos donde iran la lista de marcas de celulares, computadoras mas populares y tipops de
    dispositivo*/
    const [cellphoneList, setCellphoneList] = useState([])
    const [computersList, setComputersList] = useState([])
    const [tabletsList, setTabletsList] = useState([])
    const [smartWatchesList, setSmartWatchesList] = useState([])
    const [typeOfEquipmentList, setTypeOfEquipmentList] = useState([])

    const handleSameAddresses = () => {
        setIsSameAddresses(!isSameAddresses)
    }

    //Variables para las fechas, finish date empieza en un día despues al día actual
    const [startDate, setStartDate] = useState(new Date())
    // const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16))
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
    if(isSelectedDateInFuture) {
        currentMins = 0;
    }

    const navigate = useNavigate()

    useEffect(function () {
        setLoadingPage(true)
        date.getHours() >= 17 && setStartDate(addDays(startDate, 1))
        getTypeOfEquipments()
            .then(typeOfEquipmentResponse => {
                setTypeOfEquipmentList(typeOfEquipmentResponse)
                getCellphoneBrands()
                    .then(cellphonesResponse => {
                        setCellphoneList(cellphonesResponse)
                        getComputerBrands()
                            .then(computersResponse => {
                                setComputersList(computersResponse)
                                setEquipmentBrand(computersResponse[0].brandName)
                                getTabletsBrands()
                                    .then(tabletsResponse => {
                                        setTabletsList(tabletsResponse)
                                        getSmartWatchesBrands()
                                            .then(smartWatchesResponse => {
                                                setSmartWatchesList(smartWatchesResponse)
                                                getUserLastRetomaRequestInfo({ id: JSON.parse(localStorage.getItem('user')).idUser })
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

        const MAX_FILE_SIZE = 1024 // 1MB

        if (!selectedFile) {
            setErrorMsg("Por favor seleccione un archivo");
            setIsSuccess(false)
            return
        }

        const fileSizeKiloBytes = selectedFile.size / 1024

        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            setErrorMsg("Tamaño máximo de archivo 1MB");
            setIsSuccess(false)
            setLoading(false);
            return
        }

        if (fileSizeKiloBytes < MAX_FILE_SIZE) {

            setLoading(true);
            const formData = new FormData()

            //formData.append("typeOfEquipment", e.target.elements.typeOfEquipment.value)
            formData.append("idTypeOfEquipment", e.target.elements.typeOfEquipment.value)
            formData.append("equipmentBrand", equipmentBrand)
            formData.append("modelOrReference", e.target.elements.modelOrReference.value)
            formData.append("imeiOrSerial", e.target.elements.imei.value)
            formData.append("equipmentInvoice", e.target.elements.equipmentInvoice.files[0])

            const deliveryAddress2 = isSameAddresses ? e.target.elements.pickUpAddress.value : e.target.elements.deliveryAddress.value
            // console.log('deliveryAddress: ', deliveryAddress2)

            postEquipment(formData)
                .then(dataEquipment => {
                    postRequest({
                        idUser: JSON.parse(localStorage.getItem('user')).idUser,
                        idEquipment: dataEquipment.idEquipment,
                        requestType: "Retoma",
                        pickUpAddress: pickUpAddress,
                        deliveryAddress: deliveryAddress2,
                        statusQuote: "Pendiente",
                        autoDiagnosis: e.target.elements.autoDiagnosis.value
                    })
                        .then(dataRequest => {
                            getRequestWithUserInfo({ id: dataRequest.idRequest })
                                .then(userInfo => {
                                    postRequestNotification({
                                        idRequest: dataRequest.idRequest,
                                        // message: "Nueva solicitud de servicio a domicilio a la dirección: " + dataRequest.pickUpAddress + " para la fecha " + startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate() + " a las " + startDate.getHours() + ":" + startDate.getMinutes() + " para recoger el dispositivo " + equipmentBrand + " " + e.target.elements.modelOrReference.value + " con imei o serial: " + e.target.elements.imei.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de teléfono de contácto: " + userInfo[0].userDto.phone + ", el usuario decidió pagar por medio de " + e.target.elements.paymentMethod.value,
                                        message: "Nueva solicitud de servicio a domicilio a la dirección: " + dataRequest.pickUpAddress + " para la fecha " + startDate.toLocaleDateString('es', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }) + " para recoger el dispositivo " + equipmentBrand + " " + e.target.elements.modelOrReference.value + " con imei o serial: " + e.target.elements.imei.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de teléfono de contácto: " + userInfo[0].userDto.phone + ", el usuario decidió pagar por medio de " + e.target.elements.paymentMethod.value,
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
                            postRequestHistory({
                                idRequest: dataRequest.idRequest,
                                status: "Iniciada",
                                date: new Date()
                            })
                                .catch(error => {
                                    setLoading(false)
                                    console.log(error)
                                })
                            postHomeService({
                                idRequest: dataRequest.idRequest,
                                pickUpDate: startDate,
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            // postRequestNotification({
                            //     idRequest: dataRequest.idRequest,
                            //     message: "Nueva solicitud de servicio a domicilio a la dirección: " + dataRequest.pickUpAddress + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name,
                            //     wasReviewed: false,
                            //     notificationType: "to_courier",
                            // })
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

    const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const handleVerifySerial = (e) => {
        e.preventDefault()
        getVerifyImei({ id: serial })
            .then(response => {
                // console.log(response)
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
                // console.log(response)
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
                            <CardTitle tag="h4" className="border-bottom p-3 mb-0 justify-content-start">
                                Nueva solicitud de retoma
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
                                            {/* <Col lg={6}> */}

                                            <FormGroup>
                                                <Label for="PickUpTime">Fecha y hora de recogida* (El mensajero llegará en un estimado de 1 hora)</Label>
                                                <DatePicker
                                                    id='PickUpTime'
                                                    className='form-control'
                                                    dateFormat="yyyy-MM-dd h:mm aa"
                                                    showTimeSelect
                                                    minTime={new Date(new Date().setHours(minTimeHour + 1, currentMins, 0, 0))}
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
                                                    filterDate={isWeekDay}
                                                    selected={startDate.getDay() === 0 ? addDays(startDate, 1) : startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    timeFormat="HH:mm"
                                                />
                                            </FormGroup>

                                            {/* </Col> */}
                                            {/* <Col lg={6}>
                                                {
                                                    startDate.getDay() === 6 ?
                                                        <FormGroup>
                                                            <Label for="DeliveryDate">Fecha y hora tentativa a entrega en caso de no aceptar valor de venta* (El mensajero llegará en un estimado de 1 hora)</Label>
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
                                                            <Label for="DeliveryDate">Fecha y hora tentativa a entrega en caso de no aceptar valor de venta* (El mensajero llegará en un estimado de 1 hora)</Label>
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
                                            </Col> */}
                                        </Row>
                                        <FormGroup>
                                            <Label for="paymentMethod">Método de pago (de celuparts a ti)*</Label>
                                            <Input id="paymentMethod" name="paymentMethod" type="select">
                                                <option>Contraentrega</option>
                                                <option>Transferencia bancaria</option>
                                                <option value={"Datafono"}>Datáfono</option>
                                            </Input>
                                        </FormGroup>
                                    </ComponentCard>

                                    <ComponentCard title="Datos del equipo">
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
                                                    setTypeOfEquipment({ typeOfEquipment: e.target.value })
                                                    e.target.value == "1" ? setEquipmentBrand(computersList[0].brandName) :
                                                        e.target.value == "2" ? setEquipmentBrand(cellphoneList[0].brandName) :
                                                            e.target.value == "3" ? setEquipmentBrand(tabletsList[0].brandName) :
                                                                setEquipmentBrand(smartWatchesList[0].brandName)
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
                                                    {/* <Combobox
                                                        required
                                                        placeholder='Seleccione la marca del computador'
                                                        id="equipmentBrand"
                                                        name="equipmentBrand"
                                                        defaultValue={''}
                                                        data={computersList.map(computerData => computerData.brandName)}
                                                        value={equipmentBrand}
                                                        onChange={brand => setEquipmentBrand(brand)}
                                                    /> */}
                                                    <Input
                                                        required
                                                        id="equipmentBrand"
                                                        name="equipmentBrand"
                                                        type="select"
                                                        value={equipmentBrand}
                                                        onChange={(e) => setEquipmentBrand(e.target.value)}
                                                    >
                                                        {
                                                            computersList.map((computerData, index) => (
                                                                <option value={computerData.brandName} key={index}>{computerData.brandName}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                </FormGroup>
                                                : typeOfEquipment.typeOfEquipment === '2' ?
                                                    <FormGroup>
                                                        <Label for="typeOfEquipment">Marca del celular*</Label>
                                                        {/* <Combobox
                                                        required
                                                        placeholder='Seleccione la marca del celular'
                                                        id="equipmentBrand"
                                                        name="equipmentBrand"
                                                        defaultValue={''}
                                                        data={cellphoneList.map(cellphoneData => cellphoneData.brandName)}
                                                        value={equipmentBrand}
                                                        onChange={brand => setEquipmentBrand(brand)}
                                                    /> */}
                                                        <Input
                                                            required
                                                            id="equipmentBrand"
                                                            name="equipmentBrand"
                                                            type="select"
                                                            value={equipmentBrand}
                                                            onChange={(e) => setEquipmentBrand(e.target.value)}
                                                        >
                                                            {
                                                                cellphoneList.map((cellphoneData, index) => (
                                                                    <option value={cellphoneData.brandName} key={index}>{cellphoneData.brandName}</option>
                                                                ))
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                    : typeOfEquipment.typeOfEquipment === '3' ?
                                                        <FormGroup>
                                                            <Label for="typeOfEquipment">Marca de la tablet*</Label>
                                                            <Input
                                                                required
                                                                id="equipmentBrand"
                                                                name="equipmentBrand"
                                                                type="select"
                                                                value={equipmentBrand}
                                                                onChange={(e) => setEquipmentBrand(e.target.value)}
                                                            >
                                                                {
                                                                    tabletsList.map((tabletData, index) => (
                                                                        <option value={tabletData.brandName} key={index}>{tabletData.brandName}</option>
                                                                    ))
                                                                }
                                                            </Input>
                                                        </FormGroup>
                                                        :
                                                        <FormGroup>
                                                            <Label for="typeOfEquipment">Marca del smartWatch*</Label>
                                                            <Input
                                                                required
                                                                id="equipmentBrand"
                                                                name="equipmentBrand"
                                                                type="select"
                                                                value={equipmentBrand}
                                                                onChange={(e) => setEquipmentBrand(e.target.value)}
                                                            >
                                                                {
                                                                    smartWatchesList.map((smartWatchData, index) => (
                                                                        <option value={smartWatchData.brandName} key={index}>{smartWatchData.brandName}</option>
                                                                    ))
                                                                }
                                                            </Input>
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
                                            typeOfEquipment.typeOfEquipment === "1" ?
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
                                            <Label for="equipmentInvoice">Factura del dispositivo*</Label>
                                            <Input
                                                id="equipmentInvoice"
                                                name="equipmentInvoice"
                                                placeholder="Ingrese la factura dispositivo"
                                                type="file"
                                                accept='.pdf'
                                                onChange={handleFileChange}
                                                required
                                            />
                                        </FormGroup>
                                        <h6 className={errorMsg ? 'alert alert-danger' : null} >{errorMsg}</h6>
                                        <FormGroup>
                                            <Label for="autoDiagnosis">Cuentanos brevemente el estado de tu dispositivo a vender*</Label>
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
                                                    <button className="btn btn-primary" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span className="sr-only">Cargando...</span>
                                                    </button>
                                                ) : (
                                                    <Button color="celuparts-dark-blue " className='btn btn-primary'>
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
