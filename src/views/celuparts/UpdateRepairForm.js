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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import getSingleRepair from '../../services/getSingleRepair';
import putRepair from '../../services/putRepair';
import getRequestNotification from '../../services/getRequestNotification';
import putRequestNotification from '../../services/putRequestNotification';

export default function UpdateRepairForm() {
    const [idTechnician, setIdTechnician] = useState({ idTechnician: 0 });
    const [deviceDiagnostic, setDeviceDiagnostic] = useState({ deviceDiagnostic: "" });
    const [repairDate, setRepairDate] = useState({ repairDate: new Date() });
    const [isRepairDateNull, setIsRepairDateNull] = useState({ isRepairDateNull: false });
    const [repairQuote, setRepairQuote] = useState({ repairQuote: 0 });
    const [idRequest, setIdRequest] = useState({ idRequest: 0 });

    const [nullDateArrived, setNullDateArrived] = useState(false)

    const [notifications, setNotifications] = useState([])

    const [loading, setLoading] = useState(false);
    const [loadingPut, setLoadingPut] = useState(false);

    const params = useParams()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingPut(true);
        console.log(repairDate.repairDate)
        nullDateArrived ? (
            //PRODUCTO REVISADO SIN SER ACEPTADA LA COTIZACION
            putRepair({
                idRepair: params.id,
                idRequest: idRequest.idRequest,
                idTechnician: idTechnician.idTechnician,
                repairDate: null,
                deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
                repairQuote: repairQuote.repairQuote,
            })
                .then(data => {
                    console.log(data)
                    notifications.map(tdata => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: 'Tu dispositivo ya tiene precio de reparación! haz click en "Mis reparaciones" para revisar',
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                            .then(response=> {
                                console.log("Exito!", response)
                            })
                            .then(finalResponse => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Exito!',
                                    text: 'Estado de reparación actualizadisimo!',
                                })
                                    .then(response => {
                                        navigate(-1)
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        ) : null
                    ))
                    console.log("se envio fecha null")
                    setLoadingPut(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoadingPut(false);
                })
        )
            :
            putRepair({
                idRepair: params.id,
                idRequest: idRequest.idRequest,
                idTechnician: idTechnician.idTechnician,
                repairDate: repairDate.repairDate,
                deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
                repairQuote: repairQuote.repairQuote,
            })
                .then(data => {
                    setLoadingPut(false);
                    console.log(data)
                    console.log("se envio con fecha")
                })
                .then(finalResponse => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: 'Estado de reparación actualizadisimo!',
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

    useEffect(function () {
        setLoading(true);
        getSingleRepair({ id: params.id })
            .then(response => {
                // console.log(response);
                setIdTechnician({ idTechnician: response.idTechnician })
                setDeviceDiagnostic({ deviceDiagnostic: response.deviceDiagnostic })
                setRepairQuote({ repairQuote: response.repairQuote })
                setIdRequest({ idRequest: response.idRequest })
                if (response.repairDate === null) {
                    setIsRepairDateNull({ isRepairDateNull: true })
                    setRepairDate({ repairDate: new Date() })
                    setNullDateArrived(true)
                }
                else {
                    setIsRepairDateNull({ isRepairDateNull: false })
                    setRepairDate({ repairDate: new Date(response.repairDate) })
                }
                getRequestNotification()
                    .then(response => {
                        setNotifications(response)
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false)
                    })
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            }
            );
    }, [params.id])

    const handleIdTechnicianChange = (e) => {
        setIdTechnician((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleDeviceDiagnosticChange = (e) => {
        setDeviceDiagnostic((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleRepairQuoteChange = (e) => {
        setRepairQuote((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleBackPage = (e) => {
        navigate(-1)
    }

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Button className='btn btn-danger' onClick={handleBackPage}>
                   Atrás
                </Button>
                <div>
                    <Row>
                        <Col>
                            <Card className='container'>
                                <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                    Actualizar estado de reparación
                                </CardTitle>
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                            <i className="bi bi-eyeglasses"> </i>
                                            <strong>Datos de la reparación</strong>
                                        </CardSubtitle>
                                        <FormGroup>
                                            <Label for="idTechnician">Id de tecnico asociado</Label>
                                            <Input
                                                id="idTechnician"
                                                name="idTechnician"
                                                placeholder="Ingrese el ID del técnico asociado a esta reparación"
                                                type="number"
                                                value={idTechnician.idTechnician}
                                                onChange={handleIdTechnicianChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="deviceDiagnostic">Diagnostico del dispositivo</Label>
                                            <Input
                                                id="deviceDiagnostic"
                                                name="deviceDiagnostic"
                                                placeholder="Ingrese el diagnostico del dispositivo reparado"
                                                type="textarea"
                                                value={deviceDiagnostic.deviceDiagnostic}
                                                onChange={handleDeviceDiagnosticChange}
                                                required
                                            />
                                        </FormGroup>
                                        {
                                            isRepairDateNull.isRepairDateNull ? (
                                                <FormGroup>
                                                    <Label for="repairDate">Ingrese la fecha de finalización de la reparación</Label>
                                                    <DatePicker
                                                        id='repairDate'
                                                        dateFormat="yyyy-MM-dd h:mm aa"
                                                        showTimeSelect
                                                        value={repairDate.repairDate}
                                                        selected={repairDate.repairDate}
                                                        onChange={(date) => {
                                                            setRepairDate({ repairDate: date })
                                                            setNullDateArrived(false)
                                                        }}
                                                        required
                                                        timeFormat="HH:mm"
                                                    />
                                                </FormGroup>
                                            ) : (
                                                <FormGroup>
                                                    <Label for="repairDate">Edite la fecha de finalización de la reparación</Label>
                                                    <DatePicker
                                                        id='repairDate'
                                                        dateFormat="yyyy-MM-dd h:mm aa"
                                                        showTimeSelect
                                                        value={repairDate.repairDate}
                                                        selected={repairDate.repairDate}
                                                        onChange={(date) => setRepairDate({ repairDate: date })}
                                                        required
                                                        timeFormat="HH:mm"
                                                    />
                                                </FormGroup>
                                            )
                                        }

                                        {
                                            JSON.parse(localStorage.getItem('user')).role == "admin" || JSON.parse(localStorage.getItem('user')).role == "aux_admin" ?
                                            <FormGroup>
                                                <Label for="repairQuote">Cuota de reparación</Label>
                                                <Input
                                                    id="repairQuote"
                                                    name="repairQuote"
                                                    placeholder="Ingrese la cuota de reparación del producto"
                                                    type="number"
                                                    value={repairQuote.repairQuote}
                                                    onChange={handleRepairQuoteChange}
                                                    required
                                                />
                                            </FormGroup>
                                            : null
                                        }

                                        {
                                            loadingPut ? (
                                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="sr-only">Cargando...</span>
                                                </button>
                                            ) : (
                                                <Button color="primary">
                                                    Guardar
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
    )
}
