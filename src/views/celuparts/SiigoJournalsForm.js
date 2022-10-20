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
import postSiigoJournal from '../../services/postSiigoJournal';
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';

export default function SiigoJournalsForm() {
    const [loadingPost, setLoadingPost] = useState(false)
    const [journal, setJournal] = useState({
        id: 0,
        date: new Date(),
        observations: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingPost(true)
        postSiigoJournal({
            document: {
                id: 27441
            },
            date: "2021-05-15",
            items: [
                {
                    account: {
                        code: "11050501",
                        movement: "Debit"
                    },
                    customer: {
                        identification: "209048401",
                        branch_office: 0
                    },
                    description: "Descripción Débito",
                    cost_center: 235,
                    value: 119000
                },
                {
                    account: {
                        code: "11100501",
                        movement: "Credit"
                    },
                    customer: {
                        identification: "209048401",
                        branch_office: 0
                    },
                    description: "Descripción Crédito",
                    cost_center: 235,
                    value: 119000
                }
            ],
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
        setJournal((prev) => ({
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
                            Nueva comprobante contable SIIGO
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                    <i className="bi bi-box-seam"> </i>
                                    <strong>Datos del comprobante</strong>
                                </CardSubtitle>
                                <FormGroup>
                                    <Label for="id">Codigo del comprobante contable*</Label>
                                    <Input
                                        id="id"
                                        name="id"
                                        placeholder="Ingrese el numero del comprobante contable"
                                        type="number"
                                        value={journal.id}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="date">Edite la fecha de realización del comprobante</Label>
                                    <DatePicker
                                        id='date'
                                        dateFormat="yyyy-MM-dd"
                                        showTimeSelect
                                        value={journal.date}
                                        selected={journal.date}
                                        onChange={(newDate) => setJournal({ date: newDate })}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="observations">Observaciones del comprobante</Label>
                                    <Input
                                        id="observations"
                                        name="observations"
                                        placeholder="Ingrese una observacion del comprobante"
                                        type="textarea"
                                        value={journal.observations}
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
