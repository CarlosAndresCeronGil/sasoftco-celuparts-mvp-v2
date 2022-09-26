/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
// import putRepairPayment from '../../services/putRepairPayment';
import putRetomaPayment from '../../services/putRetomaPayment';
import getSingleRetomaPayment from '../../services/getSingleRetomaPayment';
import getSingleRetoma from '../../services/getSingleRetoma';
// import getSingleRequest from '../../services/getSingleRequest';
import getRequestNotification from '../../services/getRequestNotification';
import putRequestNotification from '../../services/putRequestNotification';

export default function RetomaPaymentForm() {
    const [paymentMethod, setPaymentMethod] = useState({ paymentMethod: '' })
    const [paymentDate, setPaymentDate] = useState({ paymentDate: new Date() })
    const [isPaymentDateNull, setIsPaymentDateNull] = useState({ isPaymentDateNull: false })
    const [idRetoma, setIdRetoma] = useState({ idRpeair: 0 })
    const [idRequest, setIdRequest] = useState({ idRequest: 0 })

    const [notifications, setNotifications] = useState([])

    const [loading, setLoading] = useState(false)
    const [loadingPut, setLoadingPut] = useState(false)

    const params = useParams()

    useEffect(function () {
        setLoading(true)
        getSingleRetomaPayment({ id: params.id })
            .then((response) => {
                setPaymentMethod({ paymentMethod: response.paymentMethod })
                setIdRetoma({ idRpeair: response.idRetoma })
                if (response.paymentDate === null) {
                    setIsPaymentDateNull({ isPaymentDateNull: true })
                    setPaymentDate({ paymentDate: new Date() })
                } else {
                    setIsPaymentDateNull({ isPaymentDateNull: false })
                    setPaymentDate({ paymentDate: new Date(response.paymentDate) })
                }
                getSingleRetoma({ id: response.idRetoma })
                    .then(response2 => {
                        // console.log(response2.idRequest)
                        setIdRequest({ idRequest: response2.idRequest})
                        getRequestNotification()
                            .then(response3 => {
                                setNotifications(response3)
                                setLoading(false)
                            })
                            .catch(error => {
                                console.log(error)
                                setLoading(false)
                            })
                    })
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [params.id])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingPut(true)
        const data = {
            idRetomaPayment: parseInt(params.id),
            idRetoma: idRetoma.idRpeair,
            paymentMethod: paymentMethod.paymentMethod,
            paymentDate: paymentDate.paymentDate
        }
        putRetomaPayment(data)
            .then((response) => {
                // console.log(response)
                console.log(notifications)
                console.log(idRequest.idRequest)
                notifications.map(tdata => (
                    tdata.idRequest === idRequest.idRequest ? (
                        putRequestNotification({
                            idRequestNotification: tdata.idRequestNotification,
                            idRequest: tdata.idRequest,
                            message: '',
                            hideNotification: false,
                            notificationType: "to_none"
                        })
                            .then(response2 => {
                                console.log("Exito!", response2)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    ) : null
                ))
                setLoadingPut(false)
            })
            .catch((error) => {
                console.log(error)
                setLoadingPut(false)
            })
    }

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        loading ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        ) : (
            <div>
                <Row>
                    <Col>
                        <Card className='container'>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                Actualizar estado del pago de retoma
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-eyeglasses"> </i>
                                        <strong>Datos de la pago</strong>
                                    </CardSubtitle>
                                    <FormGroup>
                                        <Label for="paymentMethod">Método de pago</Label>
                                        <Input
                                            type="select"
                                            name="paymentMethod"
                                            id="paymentMethod"
                                            value={paymentMethod.paymentMethod}
                                            onChange={handlePaymentMethodChange}
                                        >
                                            <option>Contraentrega</option>
                                            <option>Transferencia bancaria</option>
                                        </Input>
                                    </FormGroup>
                                    {
                                        isPaymentDateNull.isPaymentDateNull ? (
                                            <FormGroup>
                                                <Label for="paymentDate">Ingrese la fecha de realización del pago</Label>
                                                <DatePicker
                                                    id='paymentDate'
                                                    dateFormat="yyyy-MM-dd h:mm aa"
                                                    showTimeSelect
                                                    value={paymentDate.paymentDate}
                                                    selected={paymentDate.paymentDate}
                                                    onChange={(date) => setPaymentDate({ paymentDate: date })}
                                                    timeFormat="HH:mm"
                                                />
                                            </FormGroup>
                                        ) : (
                                            <FormGroup>
                                                <Label for="paymentDate">Edite la fecha de realización del pago</Label>
                                                <DatePicker
                                                    id='paymentDate'
                                                    dateFormat="yyyy-MM-dd h:mm aa"
                                                    showTimeSelect
                                                    value={paymentDate.paymentDate}
                                                    selected={paymentDate.paymentDate}
                                                    onChange={(date) => setPaymentDate({ paymentDate: date })}
                                                    required
                                                    timeFormat="HH:mm"
                                                />
                                            </FormGroup>
                                        )
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
        )
    )
}
