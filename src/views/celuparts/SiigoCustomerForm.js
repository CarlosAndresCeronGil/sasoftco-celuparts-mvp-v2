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
import postSiigoCustomer from '../../services/postSiigoCustomer';

export default function SiigoCustomerForm() {
    const [loadingPost, setLoadingPost] = useState(false)
    const [customer, setCustomer] = useState({
        identification: "",
        id_type: {
            code: "",
            name: ""
        },
        name: "",
        surname: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // setLoadingPost(true)
        // postSiigoCustomer({
        //     code: customer.identification, 
        //     name: customer.name, 
        //     account_group: 1253, 
        //     type: "Product",
        //     taxes: [
        //         {
        //             id: 13156
        //         }
        //     ],
        //     prices: [
        //         {
        //             currency_code: "COP",
        //             price_list: [
        //                 {
        //                     position: 1,
        //                     value: parseInt(customer.value)
        //                 }
        //             ]
        //         }
        //     ],
        //     unit: "94",
        //     unit_label: "unidad",
        //     reference: "REF1",
        //     description: customer.description
        // })
        //     .then(response => {
        //         console.log(response)
        //         setLoadingPost(false)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         setLoadingPost(false)
        //     })
        console.log(customer)
    }

    const handleChange = (e) => {
        setCustomer((prev) => ({
            ...prev,
            [e.target.getAttribute('name')]: e.target.value
        }));
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card className='container'>
                        <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                            Nueva cliente SIIGO
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                    <i className="bi bi-box-seam"> </i>
                                    <strong>Datos del cliente</strong>
                                </CardSubtitle>
                                <FormGroup>
                                    <Label for="customer.id_type.name">Tipo de documento del cliente*</Label>
                                    <Input onChange={handleChange} id="customer.id_type.name" name="customer.id_type.name" type="select">
                                        <option value="13" name="customer.id_type.code" onChange={handleChange}>Cédula de ciudadanía</option>
                                        <option value="31" name="customer.id_type.code" onChange={handleChange}>NIT</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="identification">Identificacion de cliente*</Label>
                                    <Input
                                        id="identification"
                                        name="identification"
                                        placeholder="Digite el numero de identificacion del cliente"
                                        type="text"
                                        value={customer.identification}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">Nombres del cliente*</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Ingrese los nombres del cliente"
                                        type="text"
                                        value={customer.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="surname">Apellidos del cliente*</Label>
                                    <Input
                                        id="surname"
                                        name="surname"
                                        placeholder="Ingrese el nombre del producto"
                                        type="text"
                                        value={customer.surname}
                                        onChange={handleChange}
                                        required
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
