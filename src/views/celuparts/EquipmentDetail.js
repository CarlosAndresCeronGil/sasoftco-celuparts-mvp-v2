/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
import getSingleRequest from '../../services/getSingleRequest';

export default function EquipmentDetail() {
    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState()

    const params = useParams()

    useEffect(function () {
        setLoading(true)
        getSingleRequest({ id: params.id })
            .then(response => {
                console.log(response[0])
                setInfo(response[0])
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [params.id])

    return (
        loading ? <div>Cargando...</div> : (
            <div>
                <Row>
                    <Col>
                        <Card>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                Observaciones del cliente
                            </CardTitle>
                            <CardBody>
                                {
                                    info.autoDiagnosis
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    )
}
