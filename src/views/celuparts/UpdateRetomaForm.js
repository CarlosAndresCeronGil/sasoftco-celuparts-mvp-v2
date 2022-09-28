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
import { useParams } from 'react-router-dom';
import getSingleRetoma from '../../services/getSingleRetoma';
import putRetoma from '../../services/putRetoma';
import getRequestNotification from '../../services/getRequestNotification';
import putRequestNotification from '../../services/putRequestNotification';

export default function UpdateRetomaForm() {
    const [idTechnician, setIdTechnician] = useState({ idTechnician: 0 });
    const [deviceDiagnostic, setDeviceDiagnostic] = useState({ deviceDiagnostic: "" });
    const [retomaQuote, setRetomaQuote] = useState({ retomaQuote: 0 });
    const [idRetoma, setIdRetoma] = useState({ idRetoma: 0 });
    const [idRequest, setIdRequest] = useState({ idRequest: 0 });

    const [notifications, setNotifications] = useState([])

    const [loading, setLoading] = useState(false);
    const [loadingPut, setLoadingPut] = useState(false);

    const params = useParams()

    useEffect(function () {
        setLoading(true);
        getSingleRetoma({ id: params.id })
            .then(response => {
                // console.log(response);
                setIdTechnician({ idTechnician: response.idTechnician })
                setDeviceDiagnostic({ deviceDiagnostic: response.deviceDiagnostic })
                setRetomaQuote({ retomaQuote: response.retomaQuote })
                setIdRetoma({ idRetoma: response.idRetoma })
                setIdRequest({ idRequest: response.idRequest })

                getRequestNotification()
                    .then(response => {
                        setNotifications(response)
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false);
                    })
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });

    }, [params.id])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingPut(true);
        putRetoma({
            idRetoma: params.id,
            idRequest: idRequest.idRequest,
            idTechnician: idTechnician.idTechnician,
            deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
            retomaQuote: retomaQuote.retomaQuote,
        })
            .then(() => {
                notifications.map(tdata => (
                    tdata.idRequest === idRequest.idRequest ? (
                        putRequestNotification({
                            idRequestNotification: tdata.idRequestNotification,
                            idRequest: tdata.idRequest,
                            message: 'Tu dispositivo ya tiene precio de retoma! haz click en "Mis retomas" para revisar',
                            hideNotification: false,
                            notificationType: "to_customer"
                        })
                            .then(response => {
                                console.log("Exito!", response)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    ) : null
                ))
                setLoadingPut(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingPut(false);
            });
    }

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
        setRetomaQuote((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <div>
                    <Row>
                        <Col>
                            <Card className='container'>
                                <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                    Actualizar diagnostico de retoma
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
                                                placeholder="Ingrese el diagnostico del dispositivo a vender"
                                                type="textarea"
                                                value={deviceDiagnostic.deviceDiagnostic}
                                                onChange={handleDeviceDiagnosticChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="retomaQuote">Precio de compra</Label>
                                            <Input
                                                id="retomaQuote"
                                                name="retomaQuote"
                                                placeholder="Ingrese la cuota de reparación del producto"
                                                type="number"
                                                value={retomaQuote.retomaQuote}
                                                onChange={handleRepairQuoteChange}
                                                required
                                            />
                                        </FormGroup>
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
