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
import postSiigoCreditNote from '../../services/postSiigoCreditNote';

export default function SiigoCreditNotesForm() {
    const [loadingPost, setLoadingPost] = useState(false)
    const [creditNotes, setCreditNotes] = useState({
        id: 0,
        number: 0,
        date: new Date(),
        customerIdentification: "",
        description: "",
        seller: 0
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingPost(true)
        postSiigoCreditNote({
            document: {
              id: 77775
            },
            number: 22,
            date: "2015-12-15",
            invoice: "01af88fd-3e2b-4a80-bee5-1ab17bd5cac5",
            cost_center: 235,
            reason: "1",
            retentions: [
              {
                id: 13156
              }
            ],
            observations: "Observaciones",
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
            ]
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
        setCreditNotes((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card className='container'>
                        <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                            Nueva nota de crédito SIIGO
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                    <i className="bi bi-box-seam"> </i>
                                    <strong>Datos de la nota de crédito</strong>
                                </CardSubtitle>
                                <FormGroup>
                                    <Label for="id">Codigo de la factura*</Label>
                                    <Input
                                        id="id"
                                        name="id"
                                        placeholder="Ingrese el numero de la factura"
                                        type="number"
                                        value={creditNotes.id}
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
                                        value={creditNotes.date}
                                        selected={creditNotes.date}
                                        onChange={(newDate) => setCreditNotes({ date: newDate })}
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
                                        value={creditNotes.customerIdentification}
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
                                        value={creditNotes.description}
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
                                        value={creditNotes.seller}
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
