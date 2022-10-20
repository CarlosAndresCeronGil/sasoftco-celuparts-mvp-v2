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
import postSiigoVoucher from '../../services/postSiigoVoucher';
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';

export default function SiigoVoucherForm() {
    const [loadingPost, setLoadingPost] = useState(false)
    const [voucher, setVoucher] = useState({
        id: "",
        date: new Date(),
        customerIdentification: "",
        description: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingPost(true)
        postSiigoVoucher({
            document: {
              "id": 24445
            },
            date: "2021-04-22",
            type: "DebtPayment",
            customer: {
              identification: "209048401",
              branch_office: 0
            },
            currency: {
              code: "USD",
              exchange_rate: 3825.03
            },
            items: [
              {
                due: {
                  prefix: "FEL",
                  consecutive: 68,
                  quote: 1,
                  date: "2021-04-22"
                },
                value: 119000
              }
            ],
            payment: {
              id: 5636,
              value: 119000
            },
            observations: "Observaciones"
          })
            .then(response => {
                console.log(response)
                setLoadingPost(false)
            })
            .catch(error => {
                console.log(error)
                setLoadingPost(false)
            })
        // console.log(product)
    }

    const handleChange = (e) => {
        setVoucher((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div>
            <BreadCrumbsCeluparts />
            <Row>
                <Col>
                    <Card className='container'>
                        <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                            Nuevo recibo de caja SIIGO
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                    <i className="bi bi-box-seam"> </i>
                                    <strong>Datos del recibo</strong>
                                </CardSubtitle>
                                <FormGroup>
                                    <Label for="id">Codigo del recibo*</Label>
                                    <Input
                                        id="id"
                                        name="id"
                                        placeholder="Ingrese el codigo del recibo"
                                        type="text"
                                        value={voucher.id}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="date">Ingrese la fecha de realización del recibo de caja</Label>
                                    <DatePicker
                                        id='date'
                                        dateFormat="yyyy-MM-dd"
                                        showTimeSelect
                                        value={voucher.date}
                                        selected={voucher.date}
                                        onChange={(newDate) => setVoucher({ date: newDate })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="customerIdentification">identificación del cliente asociado*</Label>
                                    <Input
                                        id="customerIdentification"
                                        name="customerIdentification"
                                        placeholder="Ingrese la identificacion del cliente asociado"
                                        type="text"
                                        value={voucher.customerIdentification}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Descripción del recibo de caja</Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Ingrese la descripción del recibo de caja"
                                        type="textarea"
                                        value={voucher.description}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                {
                                    loadingPost ? (
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="sr-only">Cargando...</span>
                                        </button>
                                    ) : (
                                        <Button color="primary">
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
    )
}
