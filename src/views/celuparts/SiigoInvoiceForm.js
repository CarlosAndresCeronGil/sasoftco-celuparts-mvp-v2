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
import postSiigoInvoice from '../../services/postSiigoInvoice';
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';

export default function SiigoInvoiceForm() {
    const [loadingPost, setLoadingPost] = useState(false)
    const [invoice, setInvoice] = useState({
        id: 0,
        date: new Date(),
        customerIdentification: "",
        description: "",
        seller: 0
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingPost(true)
        postSiigoInvoice({
            document: {
                id: 24446
            },
            date: "2015-12-15",
            customer: {
                identification: "13832081"
            },
            currency: {
                code: "USD",
                exchange_rate: 3725.03
            },
            seller: 629,
            items: [
                {
                    code: "Item-1",
                    description: "Camiseta de algodón",
                    quantity: 1,
                    price: 1069.77,
                    discount: 0,
                    taxes: [
                        {
                            id: 13156
                        }
                    ]
                }
            ],
            payments: [
                {
                    id: 5636,
                    value: 1273.03,
                    due_date: "2021-03-19"
                }
            ],
            additional_fields: {}
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
        setInvoice((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div>
            <BreadCrumbsCeluparts breadcrumbName="Nueva factura SIIGO"/>
            <Row>
                <Col>
                    <Card className='container'>
                        <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                            Nueva factura SIIGO
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                    <i className="bi bi-box-seam"> </i>
                                    <strong>Datos de la factura</strong>
                                </CardSubtitle>
                                <FormGroup>
                                    <Label for="id">Codigo de la factura*</Label>
                                    <Input
                                        id="id"
                                        name="id"
                                        placeholder="Ingrese el numero de la factura"
                                        type="number"
                                        value={invoice.id}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="date">Edite la fecha de realización de la factura</Label>
                                    <DatePicker
                                        id='date'
                                        dateFormat="yyyy-MM-dd"
                                        showTimeSelect
                                        value={invoice.date}
                                        selected={invoice.date}
                                        onChange={(newDate) => setInvoice({ date: newDate })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="customerIdentification">Identificación del cliente*</Label>
                                    <Input
                                        id="customerIdentification"
                                        name="customerIdentification"
                                        placeholder="Ingrese la identificación del cliente"
                                        type="text"
                                        value={invoice.customerIdentification}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Descripción</Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Ingrese el valor del producto"
                                        type="textarea"
                                        value={invoice.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="seller">Descripción del producto</Label>
                                    <Input
                                        id="seller"
                                        name="seller"
                                        placeholder="Ingrese la descripción producto"
                                        type="number"
                                        value={invoice.seller}
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
