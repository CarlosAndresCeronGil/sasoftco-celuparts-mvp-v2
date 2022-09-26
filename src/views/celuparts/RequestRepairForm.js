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
import getVerifyImei from '../../services/getVerifyImei';
import { useRef } from 'react';

export default function RequestRepairForm() {

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
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
    console.log("startDate: ", startDate)
    // const [finishDate, setFinishDate] = useState(new Date().setDate(new Date().getDate() + 1))

    // Select date tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [finishDate, setFinishDate] = useState(tomorrow);
    console.log("finishDate: ", finishDate)

    const [loading, setLoading] = useState(false);

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
          console.log("Archivo válido");
            setLoading(true);

          const formData = new FormData()
          formData.append("typeOfEquipment", e.target.elements.typeOfEquipment.value)
          formData.append("equipmentBrand", e.target.elements.equipmentBrand.value)
          formData.append("modelOrReference", e.target.elements.modelOrReference.value)
          formData.append("imeiOrSerial", e.target.elements.imei.value)
          formData.append("equipmentInvoice", e.target.elements.equipmentInvoice.files[0])
  
          postEquipment(formData)
              .then(data => {
                  postRequest({
                      idUser: JSON.parse(localStorage.getItem('user')).idUser,
                      idEquipment: data.idEquipment,
                      requestType: "Reparacion",
                      pickUpAddress: e.target.elements.pickUpAddress.value,
                      deliveryAddress: e.target.elements.deliveryAddress.value,
                      statusQuote: "Pendiente",
                      autoDiagnosis: e.target.elements.autoDiagnosis.value
                  })
                      .then(data => {
                          getRequestWithUserInfo({ id: data.idRequest })
                              .then(userInfo => {
                                  postRequestNotification({
                                      idRequest: data.idRequest,
                                      message: "Nueva solicitud de servicio a domicilio a la dirección: " + data.pickUpAddress + " para la fecha " + startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate() + " a las " + startDate.getHours() + ":" + startDate.getMinutes() + " para recoger el dispositivo " + e.target.elements.equipmentBrand.value + " " + e.target.elements.modelOrReference.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de teléfono de contácto: " + userInfo[0].userDto.phone,
                                      hideNotification: false,
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

    return (
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
                                        <Label htmlFor="equipmentInvoice">Factura del dispositivo*</Label>
                                        <Input
                                            id="equipmentInvoice"
                                            name="equipmentInvoice"
                                            type="file"
                                            accept='.pdf'
                                            placeholder="Ingrese la factura dispositivo"
                                            required
                                            onChange={handleFileChange}
                                            className="form-control"
                                        />
                                        
                                    </FormGroup>
                                    <h6 className={ errorMsg ? 'alert alert-danger' : null } >{errorMsg}</h6>
                                    <FormGroup>
                                        <Label for="autoDiagnosis">Cuentanos brevemente que quieres que reparemos*</Label>
                                        <Input
                                            id="autoDiagnosis"
                                            name="autoDiagnosis"
                                            placeholder="Ingrese una breve descripción de los daños de tu dispositivo"
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
