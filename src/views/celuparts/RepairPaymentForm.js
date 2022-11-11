/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import putRepairPayment from '../../services/putRepairPayment';
import getSingleRepairPayment from '../../services/getSingleRepairPayment'

export default function RepairPaymentForm() {
    const [paymentMethod, setPaymentMethod] = useState({ paymentMethod: '' })
    const [billPayment, setBillPayment] = useState({ billPayment: '' })
    const [paymentDate, setPaymentDate] = useState({ paymentDate: new Date() })
    const [isPaymentDateNull, setIsPaymentDateNull] = useState({ isPaymentDateNull: false })
    const [idRpeair, setIdRpeair] = useState({ idRpeair: 0 })

    const [loading, setLoading] = useState(false)
    const [loadingPut, setLoadingPut] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(function () {
        setLoading(true)
        getSingleRepairPayment({ id: params.id })
            .then((response) => {
                setPaymentMethod({ paymentMethod: response.paymentMethod })
                setBillPayment({ billPayment: response.billPayment })
                setIdRpeair({ idRpeair: response.idRepair })
                if (response.paymentDate === null) {
                    setIsPaymentDateNull({ isPaymentDateNull: true })
                    setPaymentDate({ paymentDate: new Date() })
                } else {
                    setIsPaymentDateNull({ isPaymentDateNull: false })
                    setPaymentDate({ paymentDate: new Date(response.paymentDate) })
                }
                setLoading(false)
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
            idRepairPayment: parseInt(params.id),
            idRepair: idRpeair.idRpeair,
            paymentMethod: paymentMethod.paymentMethod,
            billPayment: billPayment.billPayment,
            paymentDate: paymentDate.paymentDate
        }
        putRepairPayment(data)
            .then((response) => {
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

    const handleBillPaymentChange = (e) => {
        setBillPayment((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleBackPage = (e) => {
        navigate(-1)
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
                <Button className='btn btn-danger' onClick={handleBackPage}>
                   Atrás
                </Button>
                <Row>
                    <Col>
                        <Card className='container'>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                Actualizar estado del pago de reparación
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
                                            <option value={"Datafono"}>Datáfono</option>
                                        </Input>
                                    </FormGroup>
                                    {/* <FormGroup>
                                        <Label for="billPayment">Factura de pago</Label>
                                        <Input
                                            id="billPayment"
                                            name="billPayment"
                                            value={billPayment.billPayment}
                                            onChange={handleBillPaymentChange}
                                        />
                                    </FormGroup> */}
                                    {
                                        isPaymentDateNull.isPaymentDateNull ? (
                                            <FormGroup>
                                                <Label for="paymentDate">Ingrese la fecha de realización del pago</Label>
                                                <DatePicker
                                                    id='paymentDate'
                                                    dateFormat="yyyy-MM-dd h:mm aa"
                                                    showTimeSelect
                                                    selected={new Date()}
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
