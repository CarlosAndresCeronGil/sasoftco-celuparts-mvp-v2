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
import postHomeService from '../../services/postHomeService';
import postRetoma from '../../services/postRetoma';
import postRetomaPayment from '../../services/postRetomaPayment';
import postRequestNotification from '../../services/postRequestNotification'
import getRequestWithUserInfo from '../../services/getRequestWithUserInfo';
import getVerifyImei from '../../services/getVerifyImei';

export default function RequestRetomaForm() {


    const [selectedFile, setSelectedFile] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
  
    const handleFileChange = (event) => {
      if(event.target.files.length > 0){
        setSelectedFile(event.target.files[0]);
      }
    };


    //Variables del formulario
    const [typeOfEquipment, setTypeOfEquipment] = useState({ typeOfEquipment: 'Computador portatil' })
    const [imei, setImei] = useState('')
    const [serial, setSerial] = useState('')
    const [verifyResponse, setVerifyResponse] = useState('')

    //Variables para las fechas, finish date empieza en un día despues al día actual
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16))
    console.log("startDate: ", startDate)
    // Select date tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [finishDate, setFinishDate] = useState(tomorrow);
    console.log("finishDate: ", finishDate)

    const [loading, setLoading] = useState(false);

    //Variables para permitir que se haga un registro en una hora correcta
    const isSelectedDateToday = new Date().getDate() === startDate.getDate();
    let minTimeHour = new Date().getHours();
    if (!isSelectedDateToday) minTimeHour = 0;

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const MAX_FILE_SIZE = 1024 // 1MB
  
        if (!selectedFile) {
          setErrorMsg("Por favor seleccione un archivo");
          setIsSuccess(false)
          return 
        }
    
        const fileSizeKiloBytes = selectedFile.size / 1024
    
        if(fileSizeKiloBytes > MAX_FILE_SIZE){
          setErrorMsg("Tamaño máximo de archivo 1MB");
          setIsSuccess(false)
          setLoading(false);
          return
        }
  
        if(fileSizeKiloBytes < MAX_FILE_SIZE){

            setLoading(true);
            const formData = new FormData()

            formData.append("typeOfEquipment", e.target.elements.typeOfEquipment.value)
            formData.append("equipmentBrand", e.target.elements.equipmentBrand.value)
            formData.append("modelOrReference", e.target.elements.modelOrReference.value)
            formData.append("imeiOrSerial", e.target.elements.imei.value)
            formData.append("equipmentInvoice", e.target.elements.equipmentInvoice.files[0])

            postEquipment(formData)
                .then(dataEquipment => {
                    postRequest({
                        idUser: JSON.parse(localStorage.getItem('user')).idUser,
                        idEquipment: dataEquipment.idEquipment,
                        requestType: "Retoma",
                        pickUpAddress: e.target.elements.pickUpAddress.value,
                        deliveryAddress: e.target.elements.deliveryAddress.value,
                        statusQuote: "Pendiente",
                        autoDiagnosis: e.target.elements.autoDiagnosis.value
                    })
                        .then(dataRequest => {
                            getRequestWithUserInfo({ id: dataRequest.idRequest })
                                .then(userInfo => {
                                    postRequestNotification({
                                        idRequest: dataRequest.idRequest,
                                        message: "Nueva solicitud de servicio a domicilio a la dirección: " + dataRequest.pickUpAddress + " para la fecha " + startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate() + " a las " + startDate.getHours() + ":" + startDate.getMinutes() + " para recoger el dispositivo " + e.target.elements.equipmentBrand.value + " " + e.target.elements.modelOrReference.value + " con imei o serial: " + e.target.elements.imei.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de teléfono de contácto: " + userInfo[0].userDto.phone + ", el usuario decidió pagar por medio de " + e.target.elements.paymentMethod.value,
                                        hideNotification: false,
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
                            // postRequestNotification({
                            //     idRequest: dataRequest.idRequest,
                            //     message: "Nueva solicitud de servicio a domicilio a la dirección: " + dataRequest.pickUpAddress + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name,
                            //     hideNotification: false,
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

    return (
        <div>
            <div>
                <Row>
                    <Col>
                        <Card className='container'>
                            <CardTitle tag="h4" className="border-bottom p-3 mb-0 row justify-content-start">
                                Nueva solicitud de retoma
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-box-seam"> </i>
                                        <strong>Datos de la solicitud</strong>
                                    </CardSubtitle>
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


                                    <Row>
                                            <Col lg={6}>

                                            <FormGroup>
                                                <Label for="PickUpTime">Fecha y hora de recogida*</Label>
                                                <DatePicker
                                                    id='PickUpTime'
                                                    className='form-control'
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
                                                    filterDate={isWeekDay}
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    timeFormat="HH:mm"
                                                />
                                                </FormGroup>
                                                
                                            </Col>
                                            <Col lg={6}>
                                            {
                                                startDate.getDay() === 6 ?
                                                    <FormGroup>
                                                        <Label for="DeliveryDate">Fecha y hora tentativa a entrega en caso de no aceptar valor de venta*</Label>
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
                                                        <Label for="DeliveryDate">Fecha y hora tentativa a entrega en caso de no aceptar valor de venta*</Label>
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
                                        <Label for="paymentMethod">Método de pago (de celuparts a ti)*</Label>
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
                                                    serial === '' ?
                                                        <FormGroup>
                                                            <Button disabled>
                                                                Verificar serial
                                                            </Button>
                                                        </FormGroup>
                                                        :
                                                        <FormGroup>
                                                            <Button onClick={handleVerifySerial}>
                                                                Verificar serial
                                                            </Button>
                                                        </FormGroup>
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
                                                    imei === '' ?
                                                        <FormGroup>
                                                            <Button disabled>
                                                                Verificar imei
                                                            </Button>
                                                        </FormGroup>
                                                        :
                                                        <FormGroup>
                                                            <Button onClick={handleVerifyImei}>
                                                                Verificar imei
                                                            </Button>
                                                        </FormGroup>
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
                                    <h6 className={ errorMsg ? 'alert alert-danger' : null } >{errorMsg}</h6>
                                    <FormGroup>
                                        <Label for="autoDiagnosis">Cuentanos brevemente el estado de tu dispositivo a vender*</Label>
                                        <Input
                                            id="autoDiagnosis"
                                            name="autoDiagnosis"
                                            placeholder="Ingrese una breve descripción del estado de su dispositivo"
                                            type="textarea"
                                            maxLength={250}
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
                                            <Button color="celuparts-dark-blue" className='btn btn-primary'>
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
