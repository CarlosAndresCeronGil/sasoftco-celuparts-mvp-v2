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
import postSiigoProduct from '../../services/postSiigoProduct';

export default function SiigoProductForm() {
    const [loadingPost, setLoadingPost] = useState(false)
    const [product, setProduct] = useState({
        code: "",
        name: "",
        value: 0,
        description: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoadingPost(true)
        postSiigoProduct({
            code: product.code, 
            name: product.name, 
            account_group: 1253, 
            type: "Product",
            taxes: [
                {
                    id: 13156
                }
            ],
            prices: [
                {
                    currency_code: "COP",
                    price_list: [
                        {
                            position: 1,
                            value: parseInt(product.value)
                        }
                    ]
                }
            ],
            unit: "94",
            unit_label: "unidad",
            reference: "REF1",
            description: product.description
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
        setProduct((prev) => ({
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
                            Nueva producto SIIGO
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                    <i className="bi bi-box-seam"> </i>
                                    <strong>Datos del producto</strong>
                                </CardSubtitle>
                                <FormGroup>
                                    <Label for="code">Codigo de producto*</Label>
                                    <Input
                                        id="code"
                                        name="code"
                                        placeholder="Ejem: Celuparts-Item-X"
                                        type="text"
                                        value={product.code}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">Nombre del producto*</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Ingrese el nombre del producto"
                                        type="text"
                                        value={product.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="value">Valor del producto*</Label>
                                    <Input
                                        id="value"
                                        name="value"
                                        placeholder="Ingrese el valor del producto"
                                        type="number"
                                        value={product.value}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Descripción del producto</Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Ingrese la descripción producto"
                                        type="textarea"
                                        value={product.description}
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
